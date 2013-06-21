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

  Bordeaux.animations = ['fadeIn', 'slideToTop', 'slideToLeft', 'slideToRight', 'revealFromTop', 'flip', 'none'];

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

      return _ref1 = this.get('animation'), __indexOf.call(Bordeaux.animations, _ref1) >= 0;
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

  this.Bordeaux.PageState = (function(_super) {
    __extends(PageState, _super);

    function PageState() {
      _ref = PageState.__super__.constructor.apply(this, arguments);
      return _ref;
    }

    return PageState;

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
      $o.push("<a class='click-zone' id='target' href='#' style='position: absolute; top: " + ($e($c(this.image.get('click').y))) + "px; left: " + ($e($c(this.image.get('click').x))) + "px'>\n  <div id='pulse'></div>\n</a>");
      return $o.join("\n").replace(/\s(\w+)='true'/mg, ' $1').replace(/\s(\w+)='false'/mg, '').replace(/\s(?:id|class)=(['"])(\1)/mg, "");
    }).call(window.HAML.context(context));
  };

}).call(this);
(function() {
  var _ref;

  if ((_ref = window.JST) == null) {
    window.JST = {};
  }

  window.JST['edit_image_form'] = function(context) {
    return (function() {
      var $c, $e, $o, animation, _i, _len, _ref1;

      $e = window.HAML.escape;
      $c = window.HAML.cleanValue;
      $o = [];
      $o.push("<li class='" + (['edit-image-form', "" + ($e($c(Bordeaux.pageState.get('selected') === this.image ? "selected" : "")))].sort().join(' ').replace(/^\s+|\s+$/g, '')) + "' data-cid='" + ($e($c(this.image.cid))) + "'>\n  <input class='image-url' name='url' value='" + ($e($c(this.image.get('url')))) + "' placeholder='Image URL'>\n  <p>\n    <select name='animation'>");
      _ref1 = Bordeaux.animations;
      for (_i = 0, _len = _ref1.length; _i < _len; _i++) {
        animation = _ref1[_i];
        $o.push("      <option class='animation' value='" + ($e($c(animation))) + "' selected='" + ($e($c(this.image.get('animation') === animation))) + "'>" + ($e($c(animation))) + "</option>");
      }
      $o.push("    </select>\n    <input class='coordinate' name='x' value='" + ($e($c(this.image.get('click').x))) + "' placeholder='X'>\n    <input class='coordinate' name='y' value='" + ($e($c(this.image.get('click').y))) + "' placeholder='Y'>\n  </p>\n</li>");
      return $o.join("\n").replace(/\s(\w+)='true'/mg, ' $1').replace(/\s(\w+)='false'/mg, '').replace(/\s(?:id|class)=(['"])(\1)/mg, "");
    }).call(window.HAML.context(context));
  };

}).call(this);
(function() {
  var _ref;

  if ((_ref = window.JST) == null) {
    window.JST = {};
  }

  window.JST['flip'] = function(context) {
    return (function() {
      var $c, $e, $o;

      $e = window.HAML.escape;
      $c = window.HAML.cleanValue;
      $o = [];
      $o.push("<div class='flip-container'>\n  <div class='flipper'>\n    <div class='front'>\n      <img src='" + ($e($c(this.frontImageUrl))) + "'>\n    </div>\n    <div class='back'>\n      <img src='" + ($e($c(this.backImageUrl))) + "'>\n    </div>\n  </div>\n</div>");
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

  this.Bordeaux.AnimatorView = (function(_super) {
    __extends(AnimatorView, _super);

    function AnimatorView() {
      this.reset = __bind(this.reset, this);
      this.flip = __bind(this.flip, this);
      this.revealFromTop = __bind(this.revealFromTop, this);
      this.slideToRight = __bind(this.slideToRight, this);
      this.slideToLeft = __bind(this.slideToLeft, this);
      this.slideToTop = __bind(this.slideToTop, this);
      this.fadeIn = __bind(this.fadeIn, this);
      this.none = __bind(this.none, this);
      this.nextImageHtml = __bind(this.nextImageHtml, this);
      this.$currentImage = __bind(this.$currentImage, this);      _ref = AnimatorView.__super__.constructor.apply(this, arguments);
      return _ref;
    }

    AnimatorView.prototype.el = '.image-container';

    AnimatorView.prototype.$currentImage = function() {
      return this.$el.find("img:first");
    };

    AnimatorView.prototype.nextImageHtml = function(nextImage) {
      return JST['image']({
        image: nextImage
      });
    };

    AnimatorView.prototype.none = function(nextImage, done) {
      this.$el.html(this.nextImageHtml(nextImage));
      return typeof done === "function" ? done() : void 0;
    };

    AnimatorView.prototype.fadeIn = function(nextImage, done) {
      var _this = this;

      return this.$currentImage().fadeOut(100, function() {
        return _this.$el.html(_this.nextImageHtml(nextImage)).hide(0).fadeIn(150, done);
      });
    };

    AnimatorView.prototype.slideToTop = function(nextImage, done) {
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

    AnimatorView.prototype.slideToLeft = function(nextImage, done) {
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

    AnimatorView.prototype.slideToRight = function(nextImage, done) {
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

    AnimatorView.prototype.revealFromTop = function(nextImage, done) {
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

    AnimatorView.prototype.flip = function(nextImage, done) {
      var flipHtml,
        _this = this;

      flipHtml = JST['flip']({
        frontImageUrl: this.$currentImage().attr('src'),
        backImageUrl: nextImage.get('url')
      });
      this.$el.html(flipHtml);
      this.$el.find(".flip-container").addClass("flip-to-back");
      return setTimeout(function() {
        _this.$el.html(_this.nextImageHtml(nextImage));
        return done();
      }, 620);
    };

    AnimatorView.prototype.reset = function() {
      this.$el.find("img:first").remove();
      return this.$currentImage().css('z-index', '');
    };

    return AnimatorView;

  })(Backbone.View);

}).call(this);
(function() {
  var _ref,
    __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  this.Bordeaux.ImageEditorView = (function(_super) {
    __extends(ImageEditorView, _super);

    function ImageEditorView() {
      this.bindEvents = __bind(this.bindEvents, this);
      this.$form = __bind(this.$form, this);
      this.html = __bind(this.html, this);
      this.onClickForm = __bind(this.onClickForm, this);
      this.onChangeAnimation = __bind(this.onChangeAnimation, this);
      this.onChangeY = __bind(this.onChangeY, this);
      this.onChangeX = __bind(this.onChangeX, this);
      this.onChangeUrl = __bind(this.onChangeUrl, this);      _ref = ImageEditorView.__super__.constructor.apply(this, arguments);
      return _ref;
    }

    ImageEditorView.prototype.onChangeUrl = function(e) {
      var value;

      value = $(e.currentTarget).val();
      return this.model.set('url', value);
    };

    ImageEditorView.prototype.onChangeX = function(e) {
      var click, value;

      value = parseInt($(e.currentTarget).val());
      click = this.model.get('click');
      click.x = value;
      this.model.set('click', click);
      return this.model.trigger("change:click");
    };

    ImageEditorView.prototype.onChangeY = function(e) {
      var click, value;

      value = parseInt($(e.currentTarget).val());
      click = this.model.get('click');
      click.y = value;
      this.model.set('click', click);
      return this.model.trigger("change:click");
    };

    ImageEditorView.prototype.onChangeAnimation = function(e) {
      var value;

      value = $(e.currentTarget).val();
      return this.model.set('animation', value);
    };

    ImageEditorView.prototype.onClickForm = function(e) {
      return Bordeaux.pageState.set('selected', this.model);
    };

    ImageEditorView.prototype.html = function() {
      return JST['edit_image_form']({
        image: this.model
      });
    };

    ImageEditorView.prototype.$form = function() {
      return $(".edit-image-form[data-cid=" + this.model.cid + "]");
    };

    ImageEditorView.prototype.bindEvents = function() {
      var _this = this;

      this.$form().on('keyup', '[name=url]', this.onChangeUrl);
      this.$form().on('keyup', '[name=x]', this.onChangeX);
      this.$form().on('keyup', '[name=y]', this.onChangeY);
      this.$form().on('change', '[name=animation]', function(e) {
        _this.onChangeAnimation(e);
        return _this.onClickForm(e);
      });
      return this.$form().on('click', this.onClickForm);
    };

    return ImageEditorView;

  })(Backbone.View);

}).call(this);
(function() {
  var _ref,
    __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  this.Bordeaux.ImagesEditorView = (function(_super) {
    __extends(ImagesEditorView, _super);

    function ImagesEditorView() {
      this.render = __bind(this.render, this);
      this.initialize = __bind(this.initialize, this);      _ref = ImagesEditorView.__super__.constructor.apply(this, arguments);
      return _ref;
    }

    ImagesEditorView.prototype.el = '#editor-view';

    ImagesEditorView.prototype.initialize = function() {
      var _this = this;

      this.views = [];
      this.collection.each(function(image) {
        return _this.views.push(new Bordeaux.ImageEditorView({
          model: image
        }));
      });
      return Bordeaux.pageState.on('change:selected', this.render);
    };

    ImagesEditorView.prototype.render = function() {
      var view, _i, _len, _ref1, _results;

      this.$el.html("");
      _ref1 = this.views;
      _results = [];
      for (_i = 0, _len = _ref1.length; _i < _len; _i++) {
        view = _ref1[_i];
        this.$el.append(view.html());
        _results.push(view.bindEvents());
      }
      return _results;
    };

    return ImagesEditorView;

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
      this.removeClickZone = __bind(this.removeClickZone, this);
      this.showClickZone = __bind(this.showClickZone, this);
      this.onDoneAnimating = __bind(this.onDoneAnimating, this);
      this.render = __bind(this.render, this);
      this.onChangeSelected = __bind(this.onChangeSelected, this);
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
      var _this = this;

      this.currentImageIndex = 0;
      this.isAnimating = false;
      this.animator = new Bordeaux.AnimatorView();
      this.preloadImages();
      this.collection.on('change:url', this.render);
      this.collection.on('change:animation', this.render);
      this.collection.each(function(model) {
        return model.on('change:click', _this.showClickZone);
      });
      return Bordeaux.pageState.on('change:selected', this.onChangeSelected);
    };

    ImagesView.prototype.currentImage = function() {
      return this.collection.models[this.currentImageIndex];
    };

    ImagesView.prototype.preloadImages = function() {
      var preloader,
        _this = this;

      this.$el.prepend(JST['loading']());
      preloader = new ImagePreloader({
        urls: this.collection.pluck('url'),
        complete: function() {
          _this.$el.find(".loading-overlay").remove();
          return Bordeaux.pageState.set('selected', _this.collection.at(_this.currentImageIndex));
        }
      });
      return preloader.start();
    };

    ImagesView.prototype.onChangeSelected = function() {
      var newImage;

      this.removeClickZone();
      newImage = Bordeaux.pageState.get('selected');
      this.currentImageIndex = this.collection.indexOf(newImage);
      return this.render();
    };

    ImagesView.prototype.render = function() {
      return this.animator[this.currentImage().get('animation')](this.currentImage(), this.onDoneAnimating);
    };

    ImagesView.prototype.onDoneAnimating = function() {
      this.isAnimating = false;
      return this.showClickZone();
    };

    ImagesView.prototype.showClickZone = function() {
      this.removeClickZone();
      return this.$el.append(JST['click_zone']({
        image: this.currentImage()
      }));
    };

    ImagesView.prototype.removeClickZone = function(fadeOutDuration) {
      if (fadeOutDuration == null) {
        fadeOutDuration = 0;
      }
      return this.$el.find('.click-zone').fadeOut(fadeOutDuration, function() {
        return this.remove();
      });
    };

    ImagesView.prototype.onClickZoneClick = function() {
      if (this.isAnimating) {
        return;
      }
      this.removeClickZone(100);
      this.isAnimating = true;
      this.currentImageIndex += 1;
      if (this.currentImageIndex === this.collection.models.length) {
        this.currentImageIndex = 0;
      }
      return Bordeaux.pageState.set('selected', this.currentImage());
    };

    return ImagesView;

  })(Backbone.View);

}).call(this);
(function() {


}).call(this);
