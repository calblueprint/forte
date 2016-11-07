class LessonBaseSerializer < BaseSerializer
  attributes :id,
             :is_paid,
             :price,
             :feedback,
             :student_id,
             :teacher_id,
             :start_time,
             :end_time
end
