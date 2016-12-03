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
    render json: teacher, serializer: TeacherShowSerializer
  end

  def upcoming_lessons
    if current_teacher
      # TODO(shimmy): To make this endpoint accessible to admins, we should
      # check if the user is simply logged in, not if they're a teacher.
      # Also, for more validations, if the user is a teacher, we should check if params[:id] == current_user.id
      teacher = Teacher.find params[:id]
      lessons = teacher.lessons.upcoming
      render json: lessons,
             each_serializer: LessonIndexSerializer,
             root: "lessons"
    else
      redirect_to new_teacher_session_path
    end
  end

  def recent_lessons
    if current_teacher
      teacher = Teacher.find params[:id]
      lessons = teacher.lessons.upcoming
      render json: lessons,
             each_serializer: LessonIndexSerializer,
             root: "lessons"
    else
      redirect_to new_teacher_session_path
    end
  end

  def possible_teachers
    student = Student.find params[:id]
    instrument = params[:instrument]
    all_teachers = Teacher.all.includes(:instruments)
    teachers = []
    all_teachers.each do |teacher|
      if (is_valid_matching(teacher, student, instrument) && teacher.is_searching)
        teachers.push(teacher)
      end
    end
    render json: teachers,
           each_serializer: TeacherShowSerializer,
           root: "teachers"
  end

  def is_valid_matching(teacher, student, instrument)
    time_overlap = (teacher.availability & student.availability).length != 0
    teacher_instrument_valid = false
    teacher.instruments.each do |teacher_instrument|
      if teacher_instrument.name == instrument
        teacher_instrument_valid = true
      end
    end
    travel_compatibility = (teacher.travel_distance != :'I am not willing to travel') or (student.travel_distance != :'I am not willing to travel')
    return (time_overlap and teacher_instrument_valid and travel_compatibility)
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
