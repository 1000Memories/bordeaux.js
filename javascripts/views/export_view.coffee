class @Bordeaux.ExportView extends Backbone.View
  el: '.export'
  events:
    'click': 'export'

  fetchJsAndCss: (done) =>
    # TODO - use $.when to avoid nested callbacks
    $.ajax
      url: 'build/export.js'
      cache: false
      error: -> alert("Error exporting (fetching JS)")
      success: (jsContent) =>
        $.ajax
          url: 'build/bordeaux.css'
          cache: false
          error: -> alert("Error exporting (fetching CSS")
          success: (cssContent) =>
            done(jsContent, cssContent)

  export: =>
    html = JST['exported_view'](json: @collection.toJSON())
    zip = new JSZip()
    folder = zip.folder('bordeaux')
    folder.file('index.html', html)
    assets = folder.folder("assets")
    @fetchJsAndCss (jsContent, cssContent) =>
      assets.file('bordeaux.js', jsContent)
      assets.file('bordeaux.css', cssContent)
      content = zip.generate()
      location.href = "data:application/zip;base64,"+content
