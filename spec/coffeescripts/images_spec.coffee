describe "Images", ->
  beforeEach =>
    @validJson = [
      {
        url: 'images/screenshots/1.png',
        animation: 'fadeIn',
        click: {
          x: 10,
          y: 150,
        }
      },
      {
        url: 'images/screenshots/2.png',
        animation: 'slideToTop',
        click: {
          x: 10,
          y: 150,
        }
      },
      {
        url: 'images/screenshots/3.png',
        animation: 'slideToLeft',
        click: {
          x: 10,
          y: 150,
        }
      }
    ]

    @invalidAnimationJson = [
      {
        url: 'valid.png',
        animation: 'invalid',
        click: {
          x: 10,
          y: 150,
        }
      }
    ]

    @invalidUrlJson = [
      {
        url: '',
        animation: 'fadeIn',
        click: {
          x: 10,
          y: 150,
        }
      }
    ]

    @invalidJson_noClickZone = [
      {
        url: 'valid.png',
        animation: 'fadeIn',
      }
    ]

    @invalidJson_clickZoneNotComplete = [
      {
        url: 'valid.png',
        animation: 'fadeIn',
        click: {
          x: 100,
        }
      }
    ]

    @invalidJson_clickZoneOutofBound = [
      {
        url: 'valid.png',
        animation: 'fadeIn',
        click: {
          x: 1000,
          y: 1000
        }
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

  context "on initialize with invalid click zone in JSON", =>
    context "the click zone is not defined", =>
      it "throws an error", =>
        expect( => new Bordeaux.Images(@invalidJson_noClickZone)).toThrow(new Error("Invalid click zone"))

    context "the click is not completely defined", =>
      it "throws an error", =>
        expect( => new Bordeaux.Images(@invalidJson_clickZoneNotComplete)).toThrow(new Error("Invalid click zone"))

    context "the click is out of bounds", =>
      it "throws an error", =>
        expect( => new Bordeaux.Images(@invalidJson_clickZoneOutofBound)).toThrow(new Error("Invalid click zone"))
















