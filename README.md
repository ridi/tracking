# @ridi/event-tracker

[![npm](https://img.shields.io/npm/v/@ridi/event-tracker.svg)](https://www.npmjs.com/package/@ridi/event-tracker)
[![Build Status](https://travis-ci.com/ridi/event-tracker.svg?branch=master)](https://travis-ci.com/ridi/event-tracker)

Provides tracking API that helps to send events to various logging services like Google Analytics, RIDI beacon system

## Install

### NPM

```bash
$ npm install @ridi/event-tracker
```

### Browser

```html
<script src="./node_modules/@ridi/event-tracker/dist/umd/bundle.min.js"></script>
```

## Usage

```javascript
import { Tracker, DeviceType } from "@ridi/event-tracker";

const tracker = new Tracker({
  deviceType: DeviceType.PC,
  userId: "ridi",
  serviceProps: {
    "prop1": "value1",
    "prop2": "value1"
  },
  beaconOptions: {
    use: true
  },
  gaOptions: {
    trackingId: "UA-XXXXXXXX-X",
    pathPrefix: "/PAPERSHOP",
    fields: {
      contentGroup5: "PAPERSHOP"
    }
  },
  pixelOptions: {
    pixelId: "1000000000"
  },
  tagManagerOptions: {
    trackingId: "GTM-XXXX00"
  },
  kakaoOptions: {
    trackingId: "12345678"
  },
  twitterOptions: {
    mainPid: "a1234",
    impressionPid: "b1632",
    booksSignUpPid: "a1245",
    selectStartSubscriptionPid: "z1253",
  }

});

tracker.initialize();

tracker.sendPageView(location.href);

tracker.sendEvent("Purchased", {
  t_id: "201808180210135",
  value: 29000
});
```

## API

### `new Tracker(MainTrackerOptions)`

#### MainTrackerOptions

| Key                            | Required | Type                                                                                  | Description                                                                                                                     |
| ------------------------------ | -------- | ------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------- |
| `debug`                        | false    | `boolean`                                                                             | Defaults to `false` If set to `true`, All fired events are logged to browser via `console.log`                                  |
| `development`                  | false    | `boolean`                                                                             | Represents the state of the system environment your application                                                                 |
| `userId`                       | false    | `string`                                                                              | Logged user's identifier.                                                                                                       |
| `deviceType`                   | true     | `DeviceType`                                                                          | Type of connected user's device. Please refer `DeviceType` type                                                                 |
| `serviceProps`                 | false    | `ServiceProp`                                                                         | Additional properties related to specific service. Please refer `ServiceProp` type, which is `Record<string, string>`           |
| `gaOptions`                    | false    | `GAOptions`                                                                           | Options related with Google Analytics tracking module                                                                           |
| `gaOptions.trackingId`         | true     | `string`                                                                              | GA Tracking ID like `UA-000000-01`.                                                                                             |
| `gaOptions.pathPrefix`         | flase    | `string`                                                                              | Pathname prefix for manual content grouping.                                                                                    |
| `gaOptions.fields`             | false    | [`GAFields`](https://github.com/ridi/event-tracker/blob/master/src/trackers/ga.ts#L4) | [GA configurable create only fields.](https://developers.google.com/analytics/devguides/collection/analyticsjs/field-reference) |
| `beaconOptions`                | false    | `BeaconOptions`                                                                       | Options related with Beacon tracking module                                                                                     |
| `beaconOptions.use`            | false    | `boolean`                                                                             | Defaults to `true`, Specifies whether to send log data to beacon system                                                         |
| `beaconOptions.beaconSrc`      | false    | `string`                                                                              | Source of the image to be used as a beacon                                                                                      |
| `pixelOptions`                 | false    | `PixelOptions`                                                                        | Options related with Pixel tracking module                                                                                      |
| `pixelOptions.pixelId`         | true     | `string | Array<string>`                                                              | Facebook Pixel Tracking ID like `1000000000`.                                                                                   |
| `tagManagerOptions`            | false    | `TagManagerOptions`                                                                   | Options related with Google Tag Manager tracking module                                                                         |
| `tagManagerOptions.trackingId` | true     | `string`                                                                              | Google Tag Manager Tracking ID like `GTM-XXXX00`                                                                                |
| `gTagOptions`                  | false    | `GTagOptions`                                                                         | Options related with GTag tracking module                                                                                       |
| `gTagOptions.trackingId`       | true     | `string`                                                                              | GTag Tracking ID like `AW-XXXX00`                                                                                               |
| `kakaoOptions.trackingId`      | true     | `string`                                                                              | Kakao Pixel Tracking ID                                                                                    |
| `twitterOptions.mainTid`       | true     | `string`                                                                              | Twitter Pixel universal tag type ID                                                                                           |
| `twitterOptions.impressionId`  | true     | `string`                                                                              | ID of `impression` event tag

### `Tracker.initialize()`

To use this library correctly, you need to call this method least once either before calling other methods or after.

written event records before calling `initialize`, this records flush after initialized.



### `Tracker.sendPageView(href, referrer)`

| Key        | Required | Type   | Description                                   |
| ---------- | -------- | ------ | --------------------------------------------- |
| `href`     | true     | string | e.g `https://example.com/path?key=value#hash` |
| `referrer` | false    | string | e.g `https://google.com/search?q=example`     |

### `Tracker.sendEvent(name, data)`

| Key    | Required | Type   | Description                                                   |
| ------ | -------- | ------ | ------------------------------------------------------------- |
| `name` | true     | string | Indicating what the given event is                            |
| `data` | false    | object | Data object to be sent with the event. e.g `{ color: 'red' }` |

### `Tracker.set(ChangeableTrackerOptions)`

Allow to set (change) `MainTrackerOptions`'s attributes

#### ChangeableTrackerOptions

| Key          | Required | Type         | Description |
| ------------ | -------- | ------------ | ----------- |
| `userId`     | false    | `string`     |             |
| `deviceType` | false    | `DeviceType` |             |

## Develop

```bash
$ git clone https://github.com/ridi/event-tracker && cd tracking
$ npm install
$ npm run build
```

## Test

```bash
$ npm run test
```

## Publish

```bash
$ npm run deploy
$ # or
$ npm run build && npm publish --access public
```

## LICENSE

MIT
