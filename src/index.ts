import parse from "url-parse";

import { BeaconOptions, BeaconTracker, GAOptions, GATracker } from "./trackers";
import { BaseTracker, PageMeta } from "./trackers/base";

export enum DeviceType {
  PC = "pc",
  Mobile = "mobile",
  Paper = "paper"
}

export interface MainTrackerOptions {
  debug?: boolean;
  userId?: string;
  deviceType: DeviceType;
  gaOptions: GAOptions;
  beaconOptions?: BeaconOptions;
}

export interface ChangeableTrackerOptions {
  userId?: string;
  deviceType?: DeviceType;
}

export class Tracker {
  constructor(private options: MainTrackerOptions) {
    this.trackers.push(new GATracker(options.gaOptions));
    this.trackers.push(new BeaconTracker(options.beaconOptions));

    for (const tracker of this.trackers) {
      tracker.mainOptions = options;
    }
  }

  private trackers: BaseTracker[] = [];

  private getPageMeta(href: string, referrer?: string): PageMeta {
    const url = parse(href, true);
    const path = url.pathname + parse(href, false).query;
    return {
      page: url.pathname.split("/")[1] || "index",
      device: this.options.deviceType,
      query_params: url.query,
      path,
      href,
      referrer: referrer || document.referrer
    };
  }

  private log(eventType: string, meta: object = {}): void {
    if (!this.options.debug) {
      return;
    }
    meta = {
      ...this.options,
      ...meta
    };

    console.group(`[ridi-tracking] Sending '${eventType}' event`);
    for (const [key, value] of Object.entries(meta)) {
      console.log(`${key}\t ${JSON.stringify(value)}`);
    }
    console.groupEnd();
  }

  private throwIfInitializeIsNotCalled(): void {
    if (this.trackers.some(tracker => !tracker.isInitialized())) {
      throw Error("[ridi-tracking] this.initialize must be called first.");
    }
  }

  public set(options: ChangeableTrackerOptions): void {
    this.options = {
      ...this.options,
      ...options
    };

    for (const tracker of this.trackers) {
      tracker.mainOptions = this.options;
    }
  }

  public initialize(): void {
    for (const tracker of this.trackers) {
      tracker.initialize();
    }

    this.log("Initialize");
  }

  public sendPageView(href: string, referrer?: string): void {
    this.throwIfInitializeIsNotCalled();

    const pageMeta = this.getPageMeta(href, referrer);
    for (const tracker of this.trackers) {
      tracker.sendPageView(pageMeta);
    }

    this.log("PageView", pageMeta);
  }
}
