class StudentController < ApplicationController
  before_action :authenticate_student!

  def lessons
    @student_id = current_student.id
  end

  def settings
    @student = current_student
    @instruments = current_student.instruments
  end

end
