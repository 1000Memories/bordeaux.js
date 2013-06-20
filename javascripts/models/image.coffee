class @Bordeaux.Image extends Backbone.Model
  animations: [
    'fade',
    'slideUp',
    'slideDown',
    'slideLeft',
    'slideRight',
    'none'
  ]

  initialize: =>
    if !@hasValidAnimation()
      throw new Error("Invalid animation '#{@get('animation')}'")

    if !@hasValidUrl()
      throw new Error("Invalid URL '#{@get('url')}'")

  hasValidUrl: =>
    @get('url')? && @get('url').length > 0

  hasValidAnimation: =>
    @get('animation') in @animations
