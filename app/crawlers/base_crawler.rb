class BaseCrawler
  include Wombat::Crawler

  def prepare_for_crawl(base_url, path, params = {})
    self.path path
    self.base_url base_url
    yield
    Config.logger.info('Scraped from page.', base_url: base_url, path: path, source: self.class.name)
    Config.logger.debug('Raw result for page', result: raw_result, base_url: base_url, path: path, source: self.class.name)
    raw_result = crawl.deep_symbolize_keys
    transform_result(raw_result, params)
  end
end
