class @Bordeaux.ImagesView extends Backbone.View
  el: '#images-view'
  events:
    'click .image-container': 'onImageClick'

  initialize: =>
    @currentImageIndex = 0
    @isAnimating = false
    @animator = new Bordeaux.Animator()
    @preloadImages(@loadImage)

  preloadImages: (done) =>
    @$el.prepend(JST['loading']())
    preloader = new ImagePreloader
      urls: @collection.pluck('url')
      complete: =>
        @$el.find(".loading-overlay").remove()
        done()
    preloader.start()

  loadImage: =>
    image = @collection.models[@currentImageIndex]
    @animator[image.get('animation')](image, => @isAnimating = false)

  onImageClick: =>
    return  if @isAnimating
    @isAnimating = true
    @currentImageIndex += 1
    #  loops back to the first image
    if @currentImageIndex == @collection.models.length
      @currentImageIndex = 0
    @loadImage()
