class @Bordeaux.ImageEditorView extends Backbone.View
  # events:
  #   'change [name=url]': 'onChangeUrl'
  #   'change [name=animation]': 'onChangeAnimation'
  #   'change [name=x]': 'onChangeX'
  #   'change [name=y]': 'onChangeY'



  # onChangeY: =>
  render: =>
    JST['edit_image_form'](image: @model)
