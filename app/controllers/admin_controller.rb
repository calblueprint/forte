class AdminController < ApplicationController
 before_action :authenticate_admin!

  def matched
    matchings = Matching.all
    @matching_info = []
    matchings.each do |matching|
      @matching_info.push({"matching": matching, "teacher": matching.teacher, "student": matching.student})
    end
  end

  def lessons
    lessons = Lesson.all
    @lessons_info = []
    lessons.each do |lesson|
      matching = Matching.find(lesson.matching_id)
      @lessons_info.push({"lesson": lesson, "teacher": matching.teacher, "student": matching.student})
    end
  end

  def roster
  end

  def student
    student = Student.find(1)
  end

  def unmatched
  end
end
