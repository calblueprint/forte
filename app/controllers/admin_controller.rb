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

  def unmatched
  end

  def student
    @student = Student.find params[:id]
  end

  def teacher
    @teacher = Teacher.find params[:id]
  end

  def add_admin
    email = params[:email]
    admin = Admin.find_by_email(email)
    if admin.present?
      error_response(message: "This account already exists as an admin.", status: :forbidden)
    elsif email.nil? or !email.include? "@" or !email.include? "."
      error_response(message: "Please enter a valid email.", status: :forbidden)
    else 
      Admin.create(
        email: email,
        password: "password"
      )
      render_json_message(:created)
    end
  end 
end
