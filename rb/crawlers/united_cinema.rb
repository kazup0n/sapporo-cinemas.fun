class UnitedCinema < BaseCrawler
  BASE_URL = 'https://www.unitedcinemas.jp'

  def fetch(date)
    page_path = "/sapporo/daily.php?date=#{date.strftime('%Y-%m-%d')}"
    prepare_for_crawl(BASE_URL, page_path, date: date) do
      movies 'css=#dailyList > li', :iterator do
        title 'css=.movieTitle'
        schedules 'css=ul.tl > li > ol > li', :list
      end
    end
  end

  def transform_result(raw_result, params = {})
    raw_result[:movies].map do |movie|
      schedules = movie[:schedules].map(&:strip_all).map { |s| s.split('〜') }
      title = movie[:title].strip_all
      MovieSchedule.new(:uc, title, schedules, params[:date])
    end
  end

  def self.fetch_all
    uc = new
    (Date.today...Date.today.next_week(:thursday)).flat_map do |day|
      uc.fetch(day)
    end
  end
end
