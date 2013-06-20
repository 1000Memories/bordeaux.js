namespace :assets do
  desc 'compile sprockets to static files for testing purposes'
  require './lib/sprockets_environment_builder'

  task :compile_all do
    %w{javascripts stylesheets}.each do |asset|
      Rake::Task["assets:compile_#{asset}"].invoke
    end
    puts "Finished asset precompilation"
  end

  task :compile_javascripts do
    compile_asset('build', 'bordeaux.js', :development)
  end

  task :compile_stylesheets do
    compile_asset('build', 'bordeaux.css', :development)
  end
end

def compile_asset(parent_dir, filename, environment)
  sprockets = SprocketsEnvironmentBuilder.build(environment)
  FileUtils.mkdir_p(parent_dir)
  sprockets.find_asset(filename).write_to(File.join(parent_dir, filename))
  puts "Compiled: #{filename}"
end
