class LessonShowSerializer < LessonBaseSerializer
  has_one :student, serializer: StudentBaseSerializer
  has_one :teacher, serializer: TeacherBaseSerializer
end
