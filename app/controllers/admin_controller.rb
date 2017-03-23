class AdminController < ApplicationController
 before_action :authenticate_admin!

  def lessons
    lessons = Lesson.all
    @lessons_info = []
    lessons.each do |lesson|
      matching = Matching.find(lesson.matching_id)
      @lessons_info.push({
        "lesson": lesson,
        "teacher": matching.teacher,
        "student": matching.student
      })
    end
  end

  def roster
  end

  def unmatched
  end

  def student
    @student = Student.find params[:id]
  end

  def teacher
    @teacher = Teacher.find params[:id]
  end
end
