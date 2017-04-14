require 'set'

class Api::StudentsController < Api::BaseController
  def index
    students = Student.all
    render json: students
  end

  def instruments
    student = Student.find params[:id]
    instruments = student.instruments
    render json: instruments,
           each_serializer: InstrumentIndexSerializer,
           root: "instruments"
  end

  def matchings
    student = Student.find params[:id]
    matchings = student.matchings
    render json: matchings,
           root: "matchings"           
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
    elsif !student.present?
      error_message("This account has already been deleted.", status: :forbidden)
    else
      error_message("There was an error removing this account.", status: :forbidden)
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
           root: "students"
  end

  def validate
    student = Student.new(student_params)
    if student.valid?
      render_json_message(:created)
    else
      render json: student.errors.messages
    end
  end

  private

  def student_params
    params.require(:student).permit(
      :city,
      :first_name,
      :last_name,
      :email,
      {:availability => []},
      :password,
      :password_confirmation,
      :gender,
      :birthday,
      :school,
      :school_level,
      :guardian_first_name,
      :guardian_last_name,
      :guardian_phone,
      :introduction,
      :lesson_experience,
      :performance_experience,
      :student_email,
      :student_phone,
      :address,
      :address_apt,
      :state,
      :zipcode,
      :location_preference,
      :travel_distance,
      :income_range,
      :household_number,
      :disciplinary_action,
      :criminal_charges,
      :waiver_signature,
      :waiver_date,
      :customer_id,
      :instruments_attributes => [:id, :name, :years_played, :proficiency, :is_primary]
    )
  end
end
