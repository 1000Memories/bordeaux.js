class @Bordeaux.AnimatorView extends Backbone.View
  el: '.image-container'

  $currentImage: =>
    @$el.find("img:first")

  nextImageHtml: (nextImage) =>
    JST['image'](image: nextImage)

  none: (nextImage, done) =>
    @$el.html(@nextImageHtml(nextImage))
    done?()

  fadeIn: (nextImage, done) =>
    @$currentImage().fadeOut 100, =>
      @$el.html(@nextImageHtml(nextImage)).hide(0).fadeIn(150, done)

  slideToTop: (nextImage, done) =>
    $nextImage = $(@nextImageHtml(nextImage))
    @$el.append($nextImage)
    $nextImage.css("top", 480).css('z-index', 2)
    $nextImage.animate {top: "-=480"}, 500, =>
      @reset()
      done?()

  slideToLeft: (nextImage, done) =>
    $nextImage = $(@nextImageHtml(nextImage))
    @$el.append($nextImage)
    $nextImage.css("left", 320).css('z-index', 2)
    $nextImage.animate {left: "-=320"}, 500, =>
      @reset()
      done?()

  slideToRight: (nextImage, done) =>
    $nextImage = $(@nextImageHtml(nextImage))
    @$el.append($nextImage)
    $nextImage.css("left", -320).css('z-index', 2)
    $nextImage.animate {left: "+=320"}, 500, =>
      @reset()
      done?()

  revealFromTop: (nextImage, done) =>
    $nextImage = $(@nextImageHtml(nextImage))
    @$el.append($nextImage)
    $nextImage.css('z-index', 0).css('top', 0)
    @$currentImage().animate {top: "+=480"}, 500, =>
      @reset()
      done()

  flip: (nextImage, done) =>
    flipHtml = JST['flip'](frontImageUrl: @$currentImage().attr('src'), backImageUrl: nextImage.get('url'))
    @$el.html(flipHtml)
    @$el.find(".flip-container").addClass("flip-to-back")
    setTimeout( =>
      @$el.html(@nextImageHtml(nextImage))
      done()
    , 620)

  reset: =>
    @$el.find("img:first").remove()
    @$currentImage().css('z-index', '')
