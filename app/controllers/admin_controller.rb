class AdminController < ApplicationController
 before_action :authenticate_admin!
 
  def matched
    matchings = Matching.all.includes(:student, :teacher)
    @matching_info = []
    for matching in matchings do
      @matching_info.push({"matching": matching, "teacher": matching.teacher, "student": matching.student})
    end
  end

  def lessons
    @lessons = Lesson.all.sort_by &:start_time
  end

  def roster
    students = Student.all
    teachers = Teacher.all
    @people = (students + teachers).sort_by &:first_name
  end
end
