require 'set'

class Api::StudentsController < Api::BaseController
  def index
    students = Student.all
    render json: students
  end

  def update
    student = Student.find params[:id]
    if student.update_attributes student_params
      render json: student
    else
      unprocessable_response student
    end
  end

  def destroy
    student = Student.find params[:id]
    if student.destroy
      render json: student
    else
      unprocessable_response student
    end
  end

  def show
    student = Student.find params[:id]
    render json: student, serializer: StudentShowSerializer
  end

  def upcoming_lessons
    if current_student
      # TODO(shimmy): To make this endpoint accessible to admins, we should
      # check if the user is simply logged in, not if they're a student.
      # Also, for more validations, if the user is a student, we should check if params[:id] == current_user.id
      student = Student.find params[:id]
      lessons = student.lessons.upcoming
      render json: lessons,
             each_serializer: LessonIndexSerializer,
             root: "lessons"
    else
      redirect_to new_student_session_path
    end
  end

  def recent_lessons
    if current_student
      student = Student.find params[:id]
      lessons = student.lessons.recent
      render json: lessons,
             each_serializer: LessonIndexSerializer,
             root: "lessons"
    else
      redirect_to new_student_session_path
    end
  end

  def unmatched
    students = Student.all.select do |student|
      student_instruments = student.instruments.map &:name
      matched_instruments = student.matchings.map &:instrument
      !(student_instruments - matched_instruments).empty?
    end
    render json: students,
           each_serializer: StudentShowSerializer,
           root: "students",
  end

  def student_params
    params.require(:student).permit(
      :availability,
      :city,
      :first_name,
      :instrument,
      :last_name,
      :email,
    )
  end
end
