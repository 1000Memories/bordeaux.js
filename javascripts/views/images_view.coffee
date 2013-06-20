class @Bordeaux.ImagesView extends Backbone.View
  el: '#images-view'
  events:
    'click .image-container': 'onImageClick'

  initialize: =>
    @currentImageIndex = 0
    @loadImage()

  loadImage: =>
    image = @collection.models[@currentImageIndex]
    $("#images-view").html(JST['image'](image: image))

  onImageClick: =>
    @currentImageIndex += 1
    #  loops back to the first image
    if @currentImageIndex == @collection.models.length
      @currentImageIndex = 0
    @loadImage()
