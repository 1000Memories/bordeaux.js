class @Bordeaux.Image extends Backbone.Model
  initialize: =>
    if !@hasValidAnimation()
      throw new Error("Invalid animation '#{@get('animation')}'")

    if !@hasValidUrl()
      throw new Error("Invalid URL '#{@get('url')}'")

    if !@hasValidClickZone()
      throw new Error("Invalid click zone")

  hasValidUrl: =>
    @get('url')? && @get('url').length > 0

  hasValidAnimation: =>
    @get('animation') in Bordeaux.animations

  hasValidClickZone: =>
    @get('click') && @get('click').x && @get('click').y && @get('click').x > 0 && @get('click').x < 320 && @get('click').y > 0 && @get('click').y < 480
