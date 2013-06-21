namespace :assets do
  desc 'compile sprockets to static files for testing purposes'
  require './lib/sprockets_environment_builder'

  task :compile_all do
    %w{javascripts export stylesheets}.each do |asset|
      Rake::Task["assets:compile_#{asset}"].invoke
    end
    puts "Finished asset precompilation"
  end

  task :compile_javascripts do
    compile_asset('build', 'bordeaux.js', :development)
    `terminal-notifier-success -message "Compiled bordeaux.js"`
  end

  task :compile_export do
    compile_asset('build', 'export.js', :development)
    `terminal-notifier-success -message "Compiled export.js"`
  end

  task :compile_stylesheets do
    compile_asset('build', 'bordeaux.css', :development)
    `terminal-notifier-success -message "Compiled bordeaux.css"`
  end
end

def compile_asset(parent_dir, filename, environment)
  sprockets = SprocketsEnvironmentBuilder.build(environment)
  FileUtils.mkdir_p(parent_dir)
  sprockets.find_asset(filename).write_to(File.join(parent_dir, filename))
  puts "Compiled: #{filename}"
end
