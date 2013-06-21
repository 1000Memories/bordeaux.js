class @Bordeaux.ImagesEditorView extends Backbone.View
  el: '#editor-view'

  initialize: =>
    @views = []
    @collection.each (image) =>
      @views.push(new Bordeaux.ImageEditorView(model: image))

    @render()

  render: =>
    @$el.html("")
    for view in @views
      @$el.append(view.render())
      view.bindEvents()
