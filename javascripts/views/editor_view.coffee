class @Bordeaux.EditorView extends Backbone.View
  el: '#editor-view'
  events:
    'click .update-code-button': 'onCodeChange'

  initialize: =>
    @editor = ace.edit("editor")
    # @editor.setTheme("ace-chrome");
    @editor.getSession().setMode("ace-json")
    @editor.getSession().setTabSize(2)
    @editor.getSession().setUseSoftTabs(true)
    @editor.setValue(JSON.stringify(@collection.toJSON(), null, '  '))
    @editor.clearSelection()
    # @editor.getSession().on 'change', =>

  onCodeChange: =>
    try
      json = JSON.parse(@editor.getValue())
      @collection.reset(json)
    catch e
      alert(e)
