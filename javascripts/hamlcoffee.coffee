# HAML Coffee namespace
#
class window.HAML

  # HAML Coffee html escape function.
  #
  # @param text [String] the text to escape
  # @return [String] the escaped text
  #
  @escape: (text) ->
    ("" + text)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#39;")
      .replace(/\//g, "&#47;")

  # HAML Coffee clean value function. Beside just
  # cleaning `null` and `undefined` values, it
  # adds a hidden unicode marker character to
  # boolean values, so that the render time boolean
  # logic can distinguish between real booleans and
  # boolean-like strings.
  #
  # @param text [String] the text to be cleaned
  # @return [String] the cleaned text
  #
  @cleanValue: (text) ->
    switch text
      when null, undefined then ''
      when true, false then '\u0093' + text
      else text

  # Extends an object with the properties from
  # the source objects.
  #
  # @param [Object] obj the object to extended
  # @param [Object] sources the objects to copy from
  # @return [Object] the extended object
  #
  @extend: (obj, sources...) ->
    for source in sources
      obj[key] = val for key, val of source

    obj

  # HAML Coffee global template context.
  #
  # @return [Object] the global template context
  #
  @globals: -> {}

  # Get the HAML template context. This merges the local
  # and the global template context into a new context.
  #
  # @param locals [Object] the local template context
  # @return [Object] the merged context
  #
  @context: (locals) ->
    @extend {}, HAML.globals(), locals

  # Preserve newlines in the text
  #
  # @param text [String] the text to preserve
  # @return [String] the preserved text
  #
  @preserve: (text) ->
    text.replace /\n/g, '&#x000A;'

  # Find and preserve newlines in the preserving tags
  #
  # @param text [String] the text to preserve
  # @return [String] the preserved text
  #
  @findAndPreserve: (text) ->
    tags = 'textarea,pre'.split(',').join('|')
    text = text.replace ///<(#{ tags })>([^]*?)<\/\1>///g, (str, tag, content) ->
        "<#{ tag }>#{ window.HAML.preserve(content) }</#{ tag }>"

  # The surround helper surrounds the function output
  # with the start and end string without whitespace in between.
  #
  # @param [String] start the text to prepend to the text
  # @param [String] end the text to append to the text
  # @param [Function] fn the text generating function
  # @return [String] the surrounded text
  #
  @surround: (start, end, fn) ->
    start + fn.call(@)?.replace(/^\s+|\s+$/g, '') + end

  # The succeed helper appends text to the function output
  # without whitespace in between.
  #
  # @param [String] end the text to append to the text
  # @param [Function] fn the text generating function
  # @return [String] the succeeded text
  #
  @succeed: (end, fn) ->
    fn.call(@)?.replace(/\s+$/g, '') + end

  # The precede helper prepends text to the function output
  # without whitespace in between.
  #
  # @param [String] start the text to prepend to the text
  # @param [Function] fn the text generating function
  # @return [String] the preeceded text
  #
  @precede: (start, fn) ->
    start + fn.call(@)?.replace(/^\s+/g, '')

  # The reference helper creates id and class attributes
  # for an object reference.
  #
  # @param [Object] object the referenced object
  # @param [String] prefix the optional id and class prefix
  # @return [String] the id and class attributes
  #
  @reference: (object, prefix) ->
    name = if prefix then prefix + '_' else ''

    if typeof(object.hamlObjectRef) is 'function'
      name += object.hamlObjectRef()
    else
      name += (object.constructor?.name || 'object').replace(/\W+/g, '_').replace(/([a-z\d])([A-Z])/g, '$1_$2').toLowerCase()

    id = if typeof(object.to_key) is 'function'
           object.to_key()
         else if typeof(object.id) is 'function'
            object.id()
         else if object.id
           object.id
         else
           object

    result  = "class='#{ name }'"
    result += " id='#{ name }_#{ id }'" if id
