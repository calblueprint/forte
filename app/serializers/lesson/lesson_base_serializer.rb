class LessonBaseSerializer < BaseSerializer
  attributes :id,
             :is_paid,
             :price,
             :student_feedback,
             :teacher_feedback,
             :matching_id,
             :start_time,
             :end_time,
             :location
end
