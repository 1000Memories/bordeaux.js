class @Bordeaux.Animator extends Backbone.View
  el: '.image-container'

  $currentImage: =>
    @$el.find("img")

  nextImageHtml: (nextImage) =>
    JST['image'](image: nextImage)

  none: (nextImage) =>
    @$el.html(@nextImageHtml(nextImage))

  fadeIn: (nextImage) =>
    @$currentImage().fadeOut 100, =>
      @$el.html(@nextImageHtml(nextImage)).hide(0).fadeIn(100)

  slideToTop: (nextImage) =>
    $nextImage = $(@nextImageHtml(nextImage))
    @$el.append($nextImage)
    $nextImage.css("top", 480).css('z-index', 1)
    $nextImage.animate({top: "-=480"}, 500, @reset)

  slideToLeft: (nextImage) =>
    $nextImage = $(@nextImageHtml(nextImage))
    @$el.append($nextImage)
    $nextImage.css("left", 320).css('z-index', 1)
    $nextImage.animate({left: "-=320"}, 500, @reset)

  slideToRight: (nextImage) =>
    $nextImage = $(@nextImageHtml(nextImage))
    @$el.append($nextImage)
    $nextImage.css("left", -320).css('z-index', 1)
    $nextImage.animate({left: "+=320"}, 500, @reset)

  reset: =>
    @$el.find("img:first").remove()
    @$currentImage().css('z-index', '')
