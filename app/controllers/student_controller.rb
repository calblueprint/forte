class StudentController < ApplicationController
  before_action :authenticate_student!

  def lessons
    @student_id = current_student.id
  end
end
