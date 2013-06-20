(function() {
  var _ref;

  if ((_ref = window.Bordeaux) == null) {
    window.Bordeaux = {};
  }

}).call(this);
(function() {
  var _ref,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  this.Bordeaux.Image = (function(_super) {
    __extends(Image, _super);

    function Image() {
      _ref = Image.__super__.constructor.apply(this, arguments);
      return _ref;
    }

    return Image;

  })(Backbone.Model);

}).call(this);
(function() {
  var _ref,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  this.Bordeaux.Images = (function(_super) {
    __extends(Images, _super);

    function Images() {
      _ref = Images.__super__.constructor.apply(this, arguments);
      return _ref;
    }

    Images.prototype.model = Bordeaux.Image;

    return Images;

  })(Backbone.Collection);

}).call(this);
(function() {


}).call(this);
