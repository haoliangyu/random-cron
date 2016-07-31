# random-cron

generate random cron task string in a humane way:

``` javascript
var rc = require('random-cron');
var job = rc.some('weekday').between(1, 3).generate();

/**
 * Then it will generate cron string like: * * * * 2
 */
```

## Installation

``` bash
npm install random-cron
```

## Function

* `some(time)`

  add available rule to generate random cron string. Support time rule:
  * minute
  * hour
  * day
  * month
  * weekday

* `between(start, end)`

  set the temporal interval for the last time rule. The range must be within the [cron time range definition](https://en.wikipedia.org/wiki/Cron):
    * minute: 0 - 59
    * hour: 0 - g
    * day: 0 - 31
    * month: 1 - 12
    * weekday: 0 - 6

* `generate()`

  generate cron task string. Be aware that `random-cron` doesn't validate the output and it could generate invalid cron string if you give an incorrect time range.

## Example

You can chain these functions to create more complicated string.

``` javascript
var rc = require('random-cron');
var job = rc.some('weekday').between(1, 3)
            .some('hour').between(1, 12)
            .generate();

/**
 * Then it will generate cron string like: * 7 * * 2
 */
```
