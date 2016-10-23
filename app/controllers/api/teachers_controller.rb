class Api::TeachersController < Api::BaseController
  def index
    teachers = Teacher.all
    render json: teachers
  end

  def update
    teacher = Teacher.find params[:id]
    if teacher.update_attributes teacher_params
      render json: teacher
    end
  end


  def destroy
    teacher = Teacher.find params[:id]
    teacher.destroy
    render json: teacher
  end

  def show
    teacher = Teacher.find params[:id]
    render json: teacher
  end

  def possible_teachers
    student = Student.find params[:id]
    teachers = Teacher.all? { |teacher| is_valid_matching(teacher, student) }
    render json: teachers
  end

  def is_valid_matching(teacher, student)
    time_overlap = teacher.availability.intersect? student.availability
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
