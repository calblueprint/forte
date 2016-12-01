class StudentShowSerializer < StudentBaseSerializer
  attributes :unmatched_instruments

  def unmatched_instruments
    student_instruments = object.instruments.map &:name
    matched_instruments = object.matchings.map &:instrument
    unmatched_names = student_instruments - matched_instruments
    unmatched_instruments = object.instruments.select do |instrument|
      unmatched_names.include? instrument.name
    end
    return unmatched_instruments
  end
end
