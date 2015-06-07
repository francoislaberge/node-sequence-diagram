var _ = require('underscore');

Diagram = function() {
  this.title   = undefined;
  this.actors  = [];
  this.signals = [];

  this.aliases_ = {};
};

Diagram.prototype.getActor = function(name) {
  console.assert(name == name.trim(), 'Got an untrimmed name.');

  if (name in this.aliases_) {
    name = this.aliases_[name];
  }

  var actors = this.actors;
  for (var i = 0; i < actors.length; ++i) {
    if (actors[i].name == name) {
      return actors[i];
    }
  }

  actors.push(new Diagram.Actor(name, actors.length));
  return actors[actors.length - 1];
};

Diagram.prototype.addAlias = function(input) {
  console.assert(input == input.trim(), 'Got an untrimmed alias input.');

  var s = /([\s\S]+) as (\S+)$/im.exec(input);
  if (!s) {
    throw new Error('No alias specified: ' + input);
  }

  var name = s[1].trim();
  var alias = s[2].trim();

  this.aliases_[alias] = name;
};

Diagram.prototype.setTitle = function(title) {
  this.title = title;
};

Diagram.prototype.addSignal = function(signal) {
  this.signals.push(signal);
};

Diagram.Actor = function(name, index) {
  this.name  = name;
  this.index = index;
};

Diagram.Signal = function(actorA, signaltype, actorB, message) {
  this.type       = "Signal";
  this.actorA     = actorA;
  this.actorB     = actorB;
  this.linetype   = signaltype & 3;
  this.arrowtype  = (signaltype >> 2) & 3;
  this.message    = message;
};

Diagram.Signal.prototype.isSelf = function() {
  return this.actorA == this.actorB;
};

Diagram.Note = function(actor, placement, message) {
  this.type      = "Note";
  this.actor     = actor;
  this.placement = placement;
  this.message   = message;

  if (this.hasManyActors() && actor[0] == actor[1]) {
    throw new Error("Note should be over two different actors");
  }
};

Diagram.Note.prototype.hasManyActors = function() {
  return _.isArray(this.actor);
};

Diagram.unescape = function(s) {
  // Turn "\\n" into "\n"
  return s.trim().replace(/\\n/gm, "\n");
};

Diagram.LINETYPE = {
  SOLID  : 0,
  DOTTED : 1
};

Diagram.ARROWTYPE = {
  NONE    : 0,
  FILLED  : 1,
  OPEN    : 2
};

Diagram.PLACEMENT = {
  LEFTOF  : 0,
  RIGHTOF : 1,
  OVER    : 2
};

/**
 * jison doesn't have a good exception, so we make one.
 * This is brittle as it depends on jison internals
 */
function ParseError(message, hash) {
  _.extend(this, hash);

  this.name = "ParseError";
  this.message = (message || "");
}
ParseError.prototype = new Error();
Diagram.ParseError = ParseError;

Diagram.parse = function(input) {
  var Parser = require('./grammar.js').Parser;

  // Create the object to track state and deal with errors
  var p = new Parser();
  p.yy = new Diagram();
  p.parseError = function(message, hash) {
    throw new ParseError(message, hash);
  };

  var diagram = p.parse(input);

  // Then clean up the parseError key that a user won't care about
  delete diagram.parseError;
  return diagram;
};

Diagram.prototype.drawSVG = function(container) {
  var SimpleTheme = require('./sequence-diagram.js').SimpleTheme;
  new SimpleTheme(this).draw(container);
};

module.exports = Diagram;
