class @Bordeaux.Image extends Backbone.Model
  animations: [
    'fadeIn',
    'slideToTop',
    'slideToLeft',
    'slideToRight',
    'revealFromTop',
    'none'
  ]

  initialize: =>
    if !@hasValidAnimation()
      throw new Error("Invalid animation '#{@get('animation')}'")

    if !@hasValidUrl()
      throw new Error("Invalid URL '#{@get('url')}'")

    @setAbsoluteUrl()

  hasValidUrl: =>
    @get('url')? && @get('url').length > 0

  hasValidAnimation: =>
    @get('animation') in @animations

  setAbsoluteUrl: =>
    if @get('url').match(/^https?:\/\//)
      absolute = @get('url')
    else
      absolute = URI(@get('url')).absoluteTo(window.location.href).toString()
    @set('absolute_url', absolute)
