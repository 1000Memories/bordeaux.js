class @Bordeaux.ExportView extends Backbone.View
  el: '.export'
  events:
    'click': 'export'

  fetchJsAndCss: (done) =>
    # TODO - use $.when to avoid nested callbacks
    $.ajax
      url: 'build/export.js'
      error: -> alert("Error exporting (fetching JS)")
      success: (jsContent) =>
        $.ajax
          url: 'build/bordeaux.css'
          error: -> alert("Error exporting (fetching CSS")
          success: (cssContent) =>
            done(jsContent, cssContent)

  export: =>
    html = JST['exported_view'](json: @collection.toJSON())
    zip = new JSZip()
    folder = zip.folder('bordeaux')
    folder.file('index.html', html)
    @fetchJsAndCss (jsContent, cssContent) =>
      console.log cssContent
      folder.file('bordeaux.js', jsContent)
      folder.file('bordeaux.css', cssContent)
      content = zip.generate()
      location.href = "data:application/zip;base64,"+content
