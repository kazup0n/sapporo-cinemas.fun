Bundler.require

require 'active_support'
require 'active_support/dependencies'
require 'active_support/core_ext'

# setup paths
relative_load_paths = %w[app/models app/crawlers app]
ActiveSupport::Dependencies.autoload_paths += relative_load_paths

# core_ext
require_relative 'app/core_ext/string'

# entry point
File.write('dist/cinema_schedules.json', [Kino, UnitedCinema].flat_map do |klass|
  begin
    results = klass.fetch_all
    Config.logger.info('fetch done', source: klass.name)
    results
  rescue => e
    Config.logger.error(e, source: klass.name)
  end
end.group_by(&:date).to_json)
