class Api::StudentsController < Api::BaseController
  def index
    students = Student.all
    render json: students
  end

  def update
    student = Student.find params[:id]
    if student.update_attributes student_params
      render json: student
    end
  end

  def destroy
    student = Student.find params[:id]
    student.destroy
    render json: student
  end

  def show
    student = Student.find params[:id]
    render json: student
  end

  def lessons
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
