(function() {
  var _ref;

  if ((_ref = window.Bordeaux) == null) {
    window.Bordeaux = {};
  }

}).call(this);
(function() {
  var _ref,
    __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    __indexOf = [].indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; };

  this.Bordeaux.Image = (function(_super) {
    __extends(Image, _super);

    function Image() {
      this.hasValidAnimation = __bind(this.hasValidAnimation, this);
      this.hasValidUrl = __bind(this.hasValidUrl, this);
      this.initialize = __bind(this.initialize, this);      _ref = Image.__super__.constructor.apply(this, arguments);
      return _ref;
    }

    Image.prototype.animations = ['fade', 'slideUp', 'slideDown', 'slideLeft', 'slideRight', 'none'];

    Image.prototype.initialize = function() {
      if (!this.hasValidAnimation()) {
        throw new Error("Invalid animation '" + (this.get('animation')) + "'");
      }
      if (!this.hasValidUrl()) {
        throw new Error("Invalid URL '" + (this.get('url')) + "'");
      }
    };

    Image.prototype.hasValidUrl = function() {
      return (this.get('url') != null) && this.get('url').length > 0;
    };

    Image.prototype.hasValidAnimation = function() {
      var _ref1;

      return _ref1 = this.get('animation'), __indexOf.call(this.animations, _ref1) >= 0;
    };

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
