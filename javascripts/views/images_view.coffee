class @Bordeaux.ImagesView extends Backbone.View
  el: '#images-view'
  events:
    'click .click-zone': 'onClickZoneClick'

  initialize: =>
    @currentImageIndex = 0
    @isAnimating = false
    @animator = new Bordeaux.Animator()
    @preloadImages(@loadImage)
    @collection.on('reset', @onCodeChange)

  currentImage: =>
    @collection.models[@currentImageIndex]

  preloadImages: (done) =>
    @$el.prepend(JST['loading']())
    preloader = new ImagePreloader
      urls: @collection.pluck('url')
      complete: =>
        @$el.find(".loading-overlay").remove()
        done()
    preloader.start()

  loadImage: =>
    @animator[@currentImage().get('animation')](@currentImage(), @onDoneAnimating)

  onDoneAnimating: =>
    @isAnimating = false
    @$el.append(JST['click_zone'](image: @currentImage()))

  onClickZoneClick: =>
    return  if @isAnimating
    @$el.find('.click-zone').hide(100, -> @remove())
    @isAnimating = true
    @currentImageIndex += 1
    #  loops back to the first image
    if @currentImageIndex == @collection.models.length
      @currentImageIndex = 0
    @loadImage()

  onCodeChange: =>
    @$el.find('.click-zone').remove()
    @loadImage()
