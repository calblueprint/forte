class MatchingLessonsSerializer < BaseSerializer
  attributes :id,
             :is_paid,
             :start_time,
             :end_time,
             :price,
             :matching_id,
             :location,
             :student_feedback,
             :teacher_feedback,
             :student,
             :teacher

  def student
    object.student
  end

  def teacher
    object.teacher
  end
end
