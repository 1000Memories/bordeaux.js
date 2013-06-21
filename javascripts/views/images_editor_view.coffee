class @Bordeaux.ImagesEditorView extends Backbone.View
  el: '#editor-view-wrap'
  events:
    'click .add-step': 'onClickAddStep'

  initialize: =>
    @$steps = $("#editor-view")
    @views = []
    @collection.each (image) =>
      @views.push(new Bordeaux.ImageEditorView(model: image))
    Bordeaux.pageState.on('change:selected', @render)
    @collection.on('add', @render)
    @collection.on('remove', @onRemoveStep)
    @collection.on('change:click', @render)

  render: =>
    @$steps.html("")
    for view in @views
      @$steps.append(view.html())
      view.bindEvents()

  onClickAddStep: =>
    image = new Bordeaux.Image(animation: 'none', click: {x: 0, y: 0})
    @collection.add(image)
    @views.push(new Bordeaux.ImageEditorView(model: image))
    Bordeaux.pageState.set('selected', image)

  onRemoveStep: (model) =>
    # Remove the view corresponding to the removed model (TODO: this should not work this way)
    newViews = []
    removedView = null
    for view in @views
      if view.model.cid == model.cid
        removedView = view
      else
        newViews.push(view)
    @views = newViews
    removedView.remove(@render)
