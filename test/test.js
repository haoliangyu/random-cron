var chai = require('chai');
var chaiAsPromised = require('chai-as-promised');
var rc = require('../src/random-cron');

chai.use(chaiAsPromised);
var expect = chai.expect;

var cronTask = /^(\*|([0-9]|1[0-9]|2[0-9]|3[0-9]|4[0-9]|5[0-9])|\*\/([0-9]|1[0-9]|2[0-9]|3[0-9]|4[0-9]|5[0-9])) (\*|([0-9]|1[0-9]|2[0-3])|\*\/([0-9]|1[0-9]|2[0-3])) (\*|([1-9]|1[0-9]|2[0-9]|3[0-1])|\*\/([1-9]|1[0-9]|2[0-9]|3[0-1])) (\*|([1-9]|1[0-2])|\*\/([1-9]|1[0-2])) (\*|([0-6])|\*\/([0-6]))$/;

describe('generate cron task', function() {
  it('generate() should return a crontab string.', function(done) {
    var cron = rc.generate();

    expect(cron).to.match(cronTask);
    done();
  });

  it('some(\'minute\') should return a crontab string for minutely task.', function(done) {
    var cron = rc.some('minute').generate();
    var minuteTask = /^([0-9]|[1-5][0-9]) \* \* \* \*$/;

    expect(cron).to.match(cronTask);
    expect(cron).to.match(minuteTask);
    done();
  });

  it('some(\'hour\') should return a crontab string for hourly task.', function(done) {
    var cron = rc.some('hour').generate();
    var hourTask = /^\* ([0-9]|1[0-9]|2[0-4]) \* \* \*$/;

    expect(cron).to.match(cronTask);
    expect(cron).to.match(hourTask);
    done();
  });

  it('some(\'day\') should return a crontab string for dayly task.', function(done) {
    var cron = rc.some('day').generate();
    var dayTask = /^\* \* ([0-9]|[1-2][0-9]|3[0-1]) \* \*$/;

    expect(cron).to.match(cronTask);
    expect(cron).to.match(dayTask);
    done();
  });

  it('some(\'month\') should return a crontab string for monthly task.', function(done) {
    var cron = rc.some('month').generate();
    var monthTask = /^\* \* \* ([0-9]|1[0-2]) \*$/;

    expect(cron).to.match(cronTask);
    expect(cron).to.match(monthTask);
    done();
  });

  it('some(\'weekday\') should return a crontab string for weekly task.', function(done) {
    var cron = rc.some('weekday').generate();
    var weekTask = /^\* \* \* \* [0-7]$/;

    expect(cron).to.match(cronTask);
    expect(cron).to.match(weekTask);
    done();
  });

  it('some(\'weekday\').some(\'hour\') should return a crontab string for weekly task.', function(done) {
    var cron = rc.some('weekday').some('hour').generate();
    var weekTask = /^\* ([0-9]|1[0-9]|2[0-4]) \* \* [0-7]$/;

    expect(cron).to.match(cronTask);
    expect(cron).to.match(weekTask);
    done();
  });
});

describe('generate cron task within range', function() {
  it('some(\'minute\').between(1, 30) should return cron string for first half-minute task.', function(done) {
    var cron = rc.some('minute').between(0, 30).generate();
    var minuteTask = /^([0-9]|[1-2][0-9]|30) \* \* \* \*$/;

    expect(cron).to.match(cronTask);
    expect(cron).to.match(minuteTask);
    done();
  });

  it('some(\'minute\').between(1, 30).between(30, 59) should return cron string for second half-minute task.', function(done) {
    var cron = rc.some('minute').between(0, 30).between(30, 59).generate();
    var minuteTask = /^[3-5][0-9] \* \* \* \*$/;

    expect(cron).to.match(cronTask);
    expect(cron).to.match(minuteTask);
    done();
  });

  it('some(\'hour\').between(1, 6).some(\'weekday\').between(0, 6) should return cron string for weekly task at the first half of day.', function(done) {
    var cron = rc.some('hour').between(1, 6).some('weekday').between(0, 6).generate();
    var weekTask = /^\* [1-6] \* \* [0-6]$/;

    expect(cron).to.match(cronTask);
    expect(cron).to.match(weekTask);
    done();
  });
});
