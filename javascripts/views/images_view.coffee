class @Bordeaux.ImagesView extends Backbone.View
  el: '#images-view'
  events:
    'click .click-zone': 'onClickZoneClick'

  initialize: =>
    @currentImageIndex = 0
    @isAnimating = false
    @animator = new Bordeaux.AnimatorView()
    @preloadImages()
    @collection.on('change:url', @render)
    @collection.on('change:animation', @render)
    @collection.each (model) =>
      model.on('change:click', @showClickZone)
    Bordeaux.pageState.on('change:selected', @onChangeSelected)

  currentImage: =>
    @collection.models[@currentImageIndex]

  preloadImages: =>
    @$el.prepend(JST['loading']())
    preloader = new ImagePreloader
      urls: @collection.pluck('url')
      complete: =>
        @$el.find(".loading-overlay").remove()
        Bordeaux.pageState.set('selected', @collection.at(@currentImageIndex))
    preloader.start()

  onChangeSelected: =>
    @removeClickZone()
    newImage = Bordeaux.pageState.get('selected')
    @currentImageIndex = @collection.indexOf(newImage)
    @render()

  render: =>
    @animator[@currentImage().get('animation')](@currentImage(), @onDoneAnimating)

  onDoneAnimating: =>
    @isAnimating = false
    @showClickZone()

  showClickZone: =>
    @removeClickZone()
    @$el.append(JST['click_zone'](image: @currentImage()))

  removeClickZone: (fadeOutDuration = 0) =>
    @$el.find('.click-zone').fadeOut(fadeOutDuration, -> @remove())

  onClickZoneClick: =>
    return  if @isAnimating
    @removeClickZone(100)
    @isAnimating = true
    @currentImageIndex += 1
    #  loops back to the first image
    if @currentImageIndex == @collection.models.length
      @currentImageIndex = 0
    Bordeaux.pageState.set('selected', @currentImage())
