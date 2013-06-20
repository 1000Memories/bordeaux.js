require 'sprockets'
require 'sprockets-sass'

class SprocketsEnvironmentBuilder
  def self.build(environment = :development)
    environment = environment.to_sym
    sprockets = Sprockets::Environment.new
    sprockets.append_path 'src'
    sprockets
  end
end
