require 'set'

class Api::TeachersController < Api::BaseController
  def index
    teachers = Teacher.all
    render json: teachers
  end

  def update
    teacher = Teacher.find params[:id]
    if teacher.update_attributes teacher_params
      render json: teacher
    else
      unprocessable_response teacher
    end
  end

  def destroy
    teacher = Teacher.find params[:id]
    if teacher.destroy
      render json: teacher
    else
      unprocessable_response teacher
    end
  end

  def show
    teacher = Teacher.find params[:id]
    render json: teacher
  end

  def upcoming_lessons
    if current_teacher
      # TODO(shimmy): To make this endpoint accessible to admins, we should
      # check if the user is simply logged in, not if they're a teacher.
      # Also, for more validations, if the user is a teacher, we should check if params[:id] == current_user.id
      lessons = Lesson.upcoming.where(teacher_id: params[:id])
      render json: lessons,
             each_serializer: LessonIndexSerializer,
             root: "lessons"
    else
      redirect_to new_teacher_session_path
    end
  end

  def recent_lessons
    if current_teacher
      lessons = Lesson.recent.where(teacher_id: params[:id])
      render json: lessons,
             each_serializer: LessonIndexSerializer,
             root: "lessons"
    else
      redirect_to new_teacher_session_path
    end
  end

  def possible_teachers
    student = Student.find params[:id]
    all_teachers = Teacher.all
    teachers = []
    all_teachers.each do |teacher|
      if (is_valid_matching(teacher, student) && teacher.is_searching)
        teachers.push(teacher)
      end
    end
    render json: teachers
  end

  def is_valid_matching(teacher, student)
    time_overlap = (teacher.availability & student.availability).length != 0
    same_instrument = (teacher.instruments.include? student.instrument)
    return (time_overlap and same_instrument)
  end

  def teacher_params
    params.require(:teacher).permit(
      :is_searching,
      :instruments,
      :email,
      :city,
      :first_name,
      :last_name,
      :availability,
    )
  end
end
