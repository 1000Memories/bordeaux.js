class @Bordeaux.ImagesEditorView extends Backbone.View
  el: '#editor-view'

  initialize: =>
    @views = []
    @collection.each (image) =>
      @views.push(new Bordeaux.ImageEditorView(model: image))
    Bordeaux.pageState.on('change:selected', @render)

  render: =>
    @$el.html("")
    for view in @views
      @$el.append(view.html())
      view.bindEvents()
