class @Bordeaux.ImagesView extends Backbone.View
  el: '#images-view'
  events:
    'click .image-container': 'onImageClick'

  initialize: =>
    @currentImageIndex = 0
    @animator = new Bordeaux.Animator()
    @loadImage()

  loadImage: =>
    image = @collection.models[@currentImageIndex]
    console.log image
    @animator[image.get('animation')](image)

  onImageClick: =>
    @currentImageIndex += 1
    #  loops back to the first image
    if @currentImageIndex == @collection.models.length
      @currentImageIndex = 0
    @loadImage()
