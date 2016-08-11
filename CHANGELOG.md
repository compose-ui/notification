# Changelog

## 3.0.3
- Notification.clear(true) now removes the notifications immediately.
- Removed test which Phantom JS cannot run properly because of improper animation event support.

## 3.0.2
- Fixed an issue where dismiss animations weren't happening in Chrome.

## 3.0.1
- Fixed issue where event listeners would be removed too soon when multiple notifications were queued up.

## 3.0.0
- Removed runtime dependencies:
  - classie
  - brfs
  - compose-animevent
  - compose-tetromino
  - compose-wagon
  - lodash
  - debug
- Removed a few unused devDepedencies too.
- Upgrade all dependencies to latest.
- Simplified queue management.
- Simplified message system.
- All new tests.

## 2.0.4

- `debug` was causing an issue with an empty message queue

## 2.0.3

- Added listening on animation event "end" to remove the notification

## 2.0.2

- Added @preserve to the comments for multiline to work correctly when uglified.

## ~~2.0.1 (bad publish)~~

## 2.0.0

- Major changes, new specs.
- Not queueing stuff anymore.

## 1.0.0

- Initial release
- Uses a dispatcher pattern to queue up notifications
