class TeacherController < ApplicationController
  before_action :authenticate_teacher!

  def lessons
    @teacher_id = current_teacher.id
  end
end
