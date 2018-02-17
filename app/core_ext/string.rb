class String
  def strip_all
    strip.gsub("\t", '').gsub("\n", '')
  end
end
