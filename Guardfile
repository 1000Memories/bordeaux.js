guard 'coffeescript', :input => 'spec/coffeescripts', :output => 'spec/javascripts', :all_on_start => true

guard :shell do
  watch /.*/ do |m|
    path = m[0]
    asset_type = if %r{^(javascripts)/.+coffee$}.match path
      "javascripts"
    elsif %r{^(stylesheets)/.+scss$}.match path
      "stylesheets"
    end
    `rake assets:compile_#{asset_type}`  unless asset_type.nil?
  end
end
