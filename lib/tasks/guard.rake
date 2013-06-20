task :guard do
  require 'guard'
  Rake::Task["assets:compile_all"].invoke
  exec("bundle exec guard")
end
