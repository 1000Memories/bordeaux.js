describe "Images", ->
  beforeEach =>
    @validJson = [
      {
        url: 'images/screenshots/1.png',
        animation: 'fadeIn'
      },
      {
        url: 'images/screenshots/2.png',
        animation: 'slideToUp'
      },
      {
        url: 'images/screenshots/3.png',
        animation: 'slideToLeft'
      }
    ]

    @invalidAnimationJson = [
      {
        url: 'valid.png',
        animation: 'invalid'
      }
    ]

    @invalidUrlJson = [
      {
        url: '',
        animation: 'fadeIn'
      }
    ]

  context "on initialize with valid JSON", =>
    it "does not throw an error", =>
      expect( => new Bordeaux.Images(@validJson)).not.toThrow()

    it "initializes the expected models in the collection", =>
      images = new Bordeaux.Images(@validJson)
      expect(images.models.length).toEqual(3)
      for model, i in images.models
        expect(model instanceof Bordeaux.Image).toBe(true)
        expect(model.get("url")).toEqual(@validJson[i].url)
        expect(model.get("animation")).toEqual(@validJson[i].animation)

  context "on initialize with invalid animation in JSON", =>
    it "throws an error", =>
      expect( => new Bordeaux.Images(@invalidAnimationJson)).toThrow(new Error("Invalid animation 'invalid'"))

  context "on initialize with invalid URL in JSON", =>
    it "throws an error", =>
      expect( => new Bordeaux.Images(@invalidUrlJson)).toThrow(new Error("Invalid URL ''"))
