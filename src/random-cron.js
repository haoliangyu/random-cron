var rc = function() {

  var ruleTypes = {
    minute: { range: [0, 59] },
    hour: { range: [0, 23] },
    day: { range: [1, 31] },
    month: { range: [1, 12] },
    weekday: { range: [0, 6] }
  };
  var rules = {};
  var lastRule;

  var some = function(time) {
    lastRule = time;
    rules[lastRule] = {
      range: ruleTypes[time].range
    };

    return this;
  };

  var between = function(start, end) {
    if (lastRule) {
      rules[lastRule].range = [start, end];
    }

    return this;
  };

  var generate = function() {
    if (Object.keys(rules).length < 1) {
      // if rules are not specified, generate totally in random
      rules = {
        minute: { range: [0, 59] },
        hour: { range: [0, 23] },
        day: { range: [0, 31] },
        month: { range: [0, 12] }
      };
    }

    var crontab = [];
    var typeNames = Object.keys(ruleTypes);
    for (var i = 0, total = typeNames.length; i < total; i++) {
      var rule = rules[typeNames[i]];
      crontab.push(rule ? Math.round(Math.random() * (rule.range[1] - rule.range[0]) + rule.range[0]).toString() : '*');
    }

    rules = {};
    lastRule = undefined;

    return crontab.join(' ');
  };

  return {
    some: some,
    between: between,
    generate: generate
  };

};

module.exports = rc();
