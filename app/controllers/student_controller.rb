class StudentController < ApplicationController
  before_action :authenticate_student!

  def lessons
    @student_id = current_student.id
  end

  def settings
    @student = current_student
  end

  def profile
    @user_id = current_student.id
  end

end
