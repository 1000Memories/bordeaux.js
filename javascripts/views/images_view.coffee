class @Bordeaux.ImagesView extends Backbone.View
  el: '#images-view'

  initialize: =>
    @loadImage(0)

  loadImage: (i) =>
    image = @collection.models[i]
    $("#images-view").html(JST['image'](image: image))
