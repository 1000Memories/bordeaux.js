class @Bordeaux.ImageEditorView extends Backbone.View
  onChangeUrl: (e) =>
    value = $(e.currentTarget).val()
    @model.set('url', value)

  onChangeX: (e) =>
    value = parseInt($(e.currentTarget).val())
    click = @model.get('click')
    click.x = value
    @model.set('click', click)
    @model.trigger("change:click")

  onChangeY: (e) =>
    value = parseInt($(e.currentTarget).val())
    click = @model.get('click')
    click.y = value
    @model.set('click', click)
    @model.trigger("change:click")

  onChangeAnimation: (e) =>
    value = $(e.currentTarget).val()
    @model.set('animation', value)

  onClickRemove: (e) =>
    e.preventDefault()
    @model.destroy()

  onClickForm: (e) =>
    Bordeaux.pageState.set('selected', @model)

  html: =>
    JST['edit_image_form'](image: @model)

  $form: =>
    $(".edit-image-form[data-cid=#{@model.cid}]")

  bindEvents: =>
    @$form().on('keyup', '[name=url]', @onChangeUrl)
    @$form().on('keyup', '[name=x]', @onChangeX)
    @$form().on('keyup', '[name=y]', @onChangeY)
    @$form().on 'change', '[name=animation]', (e) =>
      @onChangeAnimation(e)
      @onClickForm(e) # select doesn't fire a "click" event
    @$form().on('click', @onClickForm)
    @$form().on('click', '.remove', @onClickRemove)
