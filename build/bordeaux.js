(function() {
  var __slice = [].slice;

  window.HAML = (function() {
    function HAML() {}

    HAML.escape = function(text) {
      return ("" + text).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#39;").replace(/\//g, "&#47;");
    };

    HAML.cleanValue = function(text) {
      switch (text) {
        case null:
        case void 0:
          return '';
        case true:
        case false:
          return '\u0093' + text;
        default:
          return text;
      }
    };

    HAML.extend = function() {
      var key, obj, source, sources, val, _i, _len;

      obj = arguments[0], sources = 2 <= arguments.length ? __slice.call(arguments, 1) : [];
      for (_i = 0, _len = sources.length; _i < _len; _i++) {
        source = sources[_i];
        for (key in source) {
          val = source[key];
          obj[key] = val;
        }
      }
      return obj;
    };

    HAML.globals = function() {
      return {};
    };

    HAML.context = function(locals) {
      return this.extend({}, HAML.globals(), locals);
    };

    HAML.preserve = function(text) {
      return text.replace(/\n/g, '&#x000A;');
    };

    HAML.findAndPreserve = function(text) {
      var tags;

      tags = 'textarea,pre'.split(',').join('|');
      return text = text.replace(RegExp("<(" + tags + ")>([^]*?)<\\/\\1>", "g"), function(str, tag, content) {
        return "<" + tag + ">" + (window.HAML.preserve(content)) + "</" + tag + ">";
      });
    };

    HAML.surround = function(start, end, fn) {
      var _ref;

      return start + ((_ref = fn.call(this)) != null ? _ref.replace(/^\s+|\s+$/g, '') : void 0) + end;
    };

    HAML.succeed = function(end, fn) {
      var _ref;

      return ((_ref = fn.call(this)) != null ? _ref.replace(/\s+$/g, '') : void 0) + end;
    };

    HAML.precede = function(start, fn) {
      var _ref;

      return start + ((_ref = fn.call(this)) != null ? _ref.replace(/^\s+/g, '') : void 0);
    };

    HAML.reference = function(object, prefix) {
      var id, name, result, _ref;

      name = prefix ? prefix + '_' : '';
      if (typeof object.hamlObjectRef === 'function') {
        name += object.hamlObjectRef();
      } else {
        name += (((_ref = object.constructor) != null ? _ref.name : void 0) || 'object').replace(/\W+/g, '_').replace(/([a-z\d])([A-Z])/g, '$1_$2').toLowerCase();
      }
      id = typeof object.to_key === 'function' ? object.to_key() : typeof object.id === 'function' ? object.id() : object.id ? object.id : object;
      result = "class='" + name + "'";
      if (id) {
        return result += " id='" + name + "_" + id + "'";
      }
    };

    return HAML;

  })();

}).call(this);
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
  var _ref;

  if ((_ref = window.JST) == null) {
    window.JST = {};
  }

  window.JST['image'] = function(context) {
    return (function() {
      var $c, $e, $o;

      $e = window.HAML.escape;
      $c = window.HAML.cleanValue;
      $o = [];
      $o.push("<div class='image-container'>\n  <img src='" + ($e($c(this.image.get('url')))) + "' alt='image'>\n</div>");
      return $o.join("\n").replace(/\s(\w+)='true'/mg, ' $1').replace(/\s(\w+)='false'/mg, '').replace(/\s(?:id|class)=(['"])(\1)/mg, "");
    }).call(window.HAML.context(context));
  };

}).call(this);
(function() {
  var _ref,
    __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  this.Bordeaux.ImagesView = (function(_super) {
    __extends(ImagesView, _super);

    function ImagesView() {
      this.loadImage = __bind(this.loadImage, this);
      this.initialize = __bind(this.initialize, this);      _ref = ImagesView.__super__.constructor.apply(this, arguments);
      return _ref;
    }

    ImagesView.prototype.el = '#images-view';

    ImagesView.prototype.initialize = function() {
      return this.loadImage(0);
    };

    ImagesView.prototype.loadImage = function(i) {
      var image;

      image = this.collection.models[i];
      return $("#images-view").html(JST['image']({
        image: image
      }));
    };

    return ImagesView;

  })(Backbone.View);

}).call(this);
(function() {


}).call(this);
