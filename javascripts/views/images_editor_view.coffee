class @Bordeaux.ImagesEditorView extends Backbone.View
  el: '#editor-view'

  initialize: =>
    @views = []
    @collection.each (image) =>
      @views.push(new Bordeaux.ImageEditorView(model: image))
    Bordeaux.pageState.on('change:selected', @render)
    @collection.on('remove', @onRemoveStep)

  render: =>
    @$el.html("")
    for view in @views
      @$el.append(view.html())
      view.bindEvents()

  onRemoveStep: (model) =>
    # Remove the view corresponding to the removed model (TODO: this should not work this way)
    newViews = []
    for view in @views
      newViews.push(view) unless view.model.cid == model.cid
    @views = newViews
    @render()
