class @Bordeaux.Images extends Backbone.Collection
  model: Bordeaux.Image

  initialize: =>
    @on('remove', @updateSelectedIfSelectedRemoved)

  updateSelectedIfSelectedRemoved: (model) =>
    if Bordeaux.pageState.get('selected') == model
      # Select the first model
      Bordeaux.pageState.set('selected', @at(0))
