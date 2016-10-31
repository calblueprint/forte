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
