(function() {
  var __slice = [].slice;

  window.HAML = (function() {
    function HAML() {}

    HAML.escape = function(text) {
      return ("" + text).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#39;");
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
      this.hasValidClickZone = __bind(this.hasValidClickZone, this);
      this.hasValidAnimation = __bind(this.hasValidAnimation, this);
      this.hasValidUrl = __bind(this.hasValidUrl, this);
      this.initialize = __bind(this.initialize, this);      _ref = Image.__super__.constructor.apply(this, arguments);
      return _ref;
    }

    Image.prototype.animations = ['fadeIn', 'slideToTop', 'slideToLeft', 'slideToRight', 'revealFromTop', 'none'];

    Image.prototype.initialize = function() {
      if (!this.hasValidAnimation()) {
        throw new Error("Invalid animation '" + (this.get('animation')) + "'");
      }
      if (!this.hasValidUrl()) {
        throw new Error("Invalid URL '" + (this.get('url')) + "'");
      }
      if (!this.hasValidClickZone()) {
        throw new Error("Invalid click zone");
      }
    };

    Image.prototype.hasValidUrl = function() {
      return (this.get('url') != null) && this.get('url').length > 0;
    };

    Image.prototype.hasValidAnimation = function() {
      var _ref1;

      return _ref1 = this.get('animation'), __indexOf.call(this.animations, _ref1) >= 0;
    };

    Image.prototype.hasValidClickZone = function() {
      return this.get('click') && this.get('click').x && this.get('click').y && this.get('click').x > 0 && this.get('click').x < 320 && this.get('click').y > 0 && this.get('click').y < 480;
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

  window.JST['click_zone'] = function(context) {
    return (function() {
      var $c, $e, $o;

      $e = window.HAML.escape;
      $c = window.HAML.cleanValue;
      $o = [];
      $o.push("<div class='click-zone' style='position: absolute; top: " + ($e($c(this.image.get('click').x))) + "px; left: " + ($e($c(this.image.get('click').y))) + "px'></div>");
      return $o.join("\n").replace(/\s(\w+)='true'/mg, ' $1').replace(/\s(\w+)='false'/mg, '').replace(/\s(?:id|class)=(['"])(\1)/mg, "");
    }).call(window.HAML.context(context));
  };

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
      $o.push("<img src='" + ($e($c(this.image.get('url')))) + "' alt='image'>");
      return $o.join("\n").replace(/\s(\w+)='true'/mg, ' $1').replace(/\s(\w+)='false'/mg, '');
    }).call(window.HAML.context(context));
  };

}).call(this);
(function() {
  var _ref;

  if ((_ref = window.JST) == null) {
    window.JST = {};
  }

  window.JST['loading'] = function(context) {
    return (function() {
      var $o;

      $o = [];
      $o.push("<div class='loading-overlay'></div>");
      return $o.join("\n").replace(/\s(?:id|class)=(['"])(\1)/mg, "");
    }).call(window.HAML.context(context));
  };

}).call(this);
(function() {
  var _ref,
    __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  this.Bordeaux.Animator = (function(_super) {
    __extends(Animator, _super);

    function Animator() {
      this.reset = __bind(this.reset, this);
      this.revealFromTop = __bind(this.revealFromTop, this);
      this.slideToRight = __bind(this.slideToRight, this);
      this.slideToLeft = __bind(this.slideToLeft, this);
      this.slideToTop = __bind(this.slideToTop, this);
      this.fadeIn = __bind(this.fadeIn, this);
      this.none = __bind(this.none, this);
      this.nextImageHtml = __bind(this.nextImageHtml, this);
      this.$currentImage = __bind(this.$currentImage, this);      _ref = Animator.__super__.constructor.apply(this, arguments);
      return _ref;
    }

    Animator.prototype.el = '.image-container';

    Animator.prototype.$currentImage = function() {
      return this.$el.find("img:first");
    };

    Animator.prototype.nextImageHtml = function(nextImage) {
      return JST['image']({
        image: nextImage
      });
    };

    Animator.prototype.none = function(nextImage, done) {
      this.$el.html(this.nextImageHtml(nextImage));
      return typeof done === "function" ? done() : void 0;
    };

    Animator.prototype.fadeIn = function(nextImage, done) {
      var _this = this;

      return this.$currentImage().fadeOut(100, function() {
        return _this.$el.html(_this.nextImageHtml(nextImage)).hide(0).fadeIn(100, done);
      });
    };

    Animator.prototype.slideToTop = function(nextImage, done) {
      var $nextImage,
        _this = this;

      $nextImage = $(this.nextImageHtml(nextImage));
      this.$el.append($nextImage);
      $nextImage.css("top", 480).css('z-index', 2);
      return $nextImage.animate({
        top: "-=480"
      }, 500, function() {
        _this.reset();
        return typeof done === "function" ? done() : void 0;
      });
    };

    Animator.prototype.slideToLeft = function(nextImage, done) {
      var $nextImage,
        _this = this;

      $nextImage = $(this.nextImageHtml(nextImage));
      this.$el.append($nextImage);
      $nextImage.css("left", 320).css('z-index', 2);
      return $nextImage.animate({
        left: "-=320"
      }, 500, function() {
        _this.reset();
        return typeof done === "function" ? done() : void 0;
      });
    };

    Animator.prototype.slideToRight = function(nextImage, done) {
      var $nextImage,
        _this = this;

      $nextImage = $(this.nextImageHtml(nextImage));
      this.$el.append($nextImage);
      $nextImage.css("left", -320).css('z-index', 2);
      return $nextImage.animate({
        left: "+=320"
      }, 500, function() {
        _this.reset();
        return typeof done === "function" ? done() : void 0;
      });
    };

    Animator.prototype.revealFromTop = function(nextImage, done) {
      var $nextImage,
        _this = this;

      $nextImage = $(this.nextImageHtml(nextImage));
      this.$el.append($nextImage);
      $nextImage.css('z-index', 0).css('top', 0);
      return this.$currentImage().animate({
        top: "+=480"
      }, 500, function() {
        _this.reset();
        return done();
      });
    };

    Animator.prototype.reset = function() {
      this.$el.find("img:first").remove();
      return this.$currentImage().css('z-index', '');
    };

    return Animator;

  })(Backbone.View);

}).call(this);
(function() {
  var _ref,
    __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  this.Bordeaux.ImagesView = (function(_super) {
    __extends(ImagesView, _super);

    function ImagesView() {
      this.onClickZoneClick = __bind(this.onClickZoneClick, this);
      this.onDoneAnimating = __bind(this.onDoneAnimating, this);
      this.loadImage = __bind(this.loadImage, this);
      this.preloadImages = __bind(this.preloadImages, this);
      this.currentImage = __bind(this.currentImage, this);
      this.initialize = __bind(this.initialize, this);      _ref = ImagesView.__super__.constructor.apply(this, arguments);
      return _ref;
    }

    ImagesView.prototype.el = '#images-view';

    ImagesView.prototype.events = {
      'click .click-zone': 'onClickZoneClick'
    };

    ImagesView.prototype.initialize = function() {
      this.currentImageIndex = 0;
      this.isAnimating = false;
      this.animator = new Bordeaux.Animator();
      return this.preloadImages(this.loadImage);
    };

    ImagesView.prototype.currentImage = function() {
      return this.collection.models[this.currentImageIndex];
    };

    ImagesView.prototype.preloadImages = function(done) {
      var preloader,
        _this = this;

      this.$el.prepend(JST['loading']());
      preloader = new ImagePreloader({
        urls: this.collection.pluck('url'),
        complete: function() {
          _this.$el.find(".loading-overlay").remove();
          return done();
        }
      });
      return preloader.start();
    };

    ImagesView.prototype.loadImage = function() {
      return this.animator[this.currentImage().get('animation')](this.currentImage(), this.onDoneAnimating);
    };

    ImagesView.prototype.onDoneAnimating = function() {
      this.isAnimating = false;
      return this.$el.append(JST['click_zone']({
        image: this.currentImage()
      }));
    };

    ImagesView.prototype.onClickZoneClick = function() {
      if (this.isAnimating) {
        return;
      }
      this.$el.find('.click-zone').hide(100, function() {
        return this.remove();
      });
      this.isAnimating = true;
      this.currentImageIndex += 1;
      if (this.currentImageIndex === this.collection.models.length) {
        this.currentImageIndex = 0;
      }
      return this.loadImage();
    };

    return ImagesView;

  })(Backbone.View);

}).call(this);
(function() {


}).call(this);
