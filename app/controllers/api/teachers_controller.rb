require 'set'

class Api::TeachersController < Api::BaseController
  def index
    teachers = Teacher.all
    render json: teachers
  end

  def instruments
    teacher = Teacher.find params[:id]
    instruments = teacher.instruments
    render json: instruments,
           each_serializer: InstrumentIndexSerializer,
           root: "instruments"
  end

  def matchings
    teacher = Teacher.find params[:id]
    matchings = teacher.matchings
    render json: matchings,
           root: "matchings"           
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
    elsif !teacher.present?
      error_message("This account has already been deleted.", status: :forbidden)
    else
      error_message("There was an error removing this account.", status: :forbidden)
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
      lessons = teacher.lessons.recent
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

  def validate
    teacher = Teacher.new(teacher_params)
    if teacher.valid?
      render_json_message(:created)
    else
      render json: teacher.errors.messages
    end
  end

  private

  def teacher_params
    params.require(:teacher).permit(
      :first_name,
      :last_name,
      :email,
      {:availability => []},
      :gender,
      :birthday,
      :school,
      :school_level,
      :phone,
      :email,
      :password,
      :password_confirmation,
      :introduction,
      :teaching_experience,
      :training_experience,
      :performance_experience,
      :address,
      :address2,
      :state,
      :zipcode,
      :city,
      :location_preference,
      :travel_distance,
      :background_check,
      :reference1_first_name,
      :reference1_last_name,
      :reference1_relation,
      :reference1_email,
      :reference1_phone,
      :youth_participation,
      :criminal_charges,
      :criminal_explanation,
      :waiver_signature,
      :waiver_date,
      :teach_for_free,
      :instruments_attributes => [:id, :name, :years_played, :proficiency, :is_primary]
    )
  end
end
