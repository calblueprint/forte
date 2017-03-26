class TeacherController < ApplicationController
  before_action :authenticate_teacher!

  def lessons
    @teacher_id = current_teacher.id
  end

  def settings
    @teacher = current_teacher
  end

  def profile
    @user_id = current_teacher.id
  end
end
