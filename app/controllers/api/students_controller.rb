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
    render json: student
  end

  def upcoming_lessons
    if current_student
      # TODO(shimmy): To make this endpoint accessible to admins, we should
      # check if the user is simply logged in, not if they're a student.
      # Also, for more validations, if the user is a student, we should check if params[:id] == current_user.id
      lessons = Lesson.upcoming.where(student_id: params[:id])
      render json: lessons,
             each_serializer: LessonIndexSerializer,
             root: "lessons"
    else
      redirect_to new_student_session_path
    end
  end

  def recent_lessons
    if current_student
      lessons = Lesson.recent.where(student_id: params[:id])
      render json: lessons,
             each_serializer: LessonIndexSerializer,
             root: "lessons"
    else
      redirect_to new_student_session_path
    end
  end

  def unmatched
    matchings = Matching.all
    student_ids = Set.new
    for matching in matchings do
      student_ids.add matching.student_id
    end

    all_students = Student.all
    students = []
    all_students.each do |student|
      if (!(student_ids.include? student.id))
        students.push(student)
      end
    end
    render json: students
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
