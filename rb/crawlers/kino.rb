class Kino < BaseCrawler
  BASE_URL = 'http://www.theaterkino.net/'

  PAGES = {
    a: 'ttA.html',
    b: 'ttB.html',
  }

  def fetch(page)
    prepare_for_crawl(BASE_URL, PAGES[page]) do
      days 'css=#days > h2'
      titles 'css=.ttl', :list
      schedules 'css=table[width="100%"]', :iterator do
        starts 'css=tr:first-child td', :list
        ends 'css=tr:last-child td', :list
      end
    end
  end

  def transform_result(raw_result, params = {})
    days = raw_result[:days].split('〜')
      .map { |s| /(\d+\/\d+)/.match(s).to_a[1] }
      .map { |s| Date.parse(s) }

    (days[0]..days[1]).flat_map do |date|
      raw_result[:titles].map.with_index do |title, idx|
        raw_schedules = raw_result[:schedules][idx]

        starts = raw_schedules[:starts].map { |s| /(\d+:\d+)/.match(s).to_a[1] }.compact
        ends = raw_schedules[:ends].map { |s| /(\d+:\d+)/.match(s).to_a[1] }.compact
        hours = starts.zip(ends)

        MovieSchedule.new(:kino, title.gsub('■', ''), hours, date)
      end
    end
  end

  def self.fetch_all
    kino = new
    %i[a b].flat_map { |page| kino.fetch(page) }.select { |cinema| !cinema.schedules.empty? }
  end
end
