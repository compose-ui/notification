#Notification

> Notification dispatch and presentation

## Usage

```javascript
var notify = require('compose-notification')
```

### `notify(message)`

Uses the 'normal' type of notification.

```javascript
notify('Hello world.')
```

### `notify(type, message)`

Uses the specified type of notification.

```javascript
notify('Hello world.', 'success')
```

### `notify.success`, `notify.error`, `notify.action`, `notify.normal`

Helper functions that do exactly what they say they do.
