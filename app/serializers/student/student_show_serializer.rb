class StudentShowSerializer < StudentBaseSerializer
  attributes  :availability,
              :gender,
              :birthday,
              :school,
              :school_level,
              :guardian_first_name,
              :guardian_last_name,
              :guardian_phone,
              :introduction,
              :is_student,
              :lesson_experience,
              :performance_experience,
              :student_email,
              :student_phone,
              :address,
              :address2,
              :state,
              :city,
              :zipcode,
              :location_preference,
              :travel_distance,
              :income_range,
              :household_number,
              :disciplinary_action,
              :criminal_charges,
              :criminal_explanation,
              :waiver_signature,
              :waiver_date,
              :full_address,
              :full_name,
              :unmatched_instruments

  def is_student
    true
  end

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
