require 'sprockets'
require 'sprockets-sass'

class SprocketsEnvironmentBuilder
  def self.build(environment = :development)
    environment = environment.to_sym
    sprockets = Sprockets::Environment.new
    sprockets.append_path 'javascripts'
    sprockets.append_path 'stylesheets'
    sprockets
  end
end
