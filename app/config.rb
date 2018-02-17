module Config
  class << self
    def logger
      @logger ||= create_logger
      @logger
    end

    def create_logger
      logger = Ougai::Logger.new(STDOUT)
      logger.formatter = Ougai::Formatters::Readable.new
      logger.level = Logger::INFO
      logger
    end
  end
end
