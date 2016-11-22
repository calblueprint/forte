class LessonBaseSerializer < BaseSerializer
  attributes :id,
             :is_paid,
             :price,
             :feedback,
             :matching_id,
             :start_time,
             :end_time
end
