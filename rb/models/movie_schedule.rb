class MovieSchedule
  attr_reader :title, :schedules, :date, :theater

  def initialize(theater, title, schedules, date)
    @theater = theater
    @title = title
    @schedules = schedules.sort_by { |a| a[0] }.freeze
    @date = date
  end
end
