class Api::MatchingsController < Api::BaseController
  def index
    matchings = Matching.all
    render json: matchings
  end

  def create
    matching = Matching.new matching_params
    if matching.save
      4.times do |n|
        start_time = Date.today.monday + (n+1).weeks + (matching_params[:lesson_time][0]*15).minutes
        lesson = Lesson.create(
          start_time: start_time,
          end_time: start_time + 45.minutes,
          price: 15.0,
          is_paid: false,
          matching_id: matching.id,
        )
        lesson.save
      end
      student = Student.find matching_params[:student_id]
      teacher = Teacher.find matching_params[:teacher_id]
      student.update_attribute(:availability, student.availability - matching_params[:lesson_time])
      teacher.update_attribute(:availability, teacher.availability - matching_params[:lesson_time])

      render json: matching, status: 201
    else
      unprocessable_response matching
    end
  end

  def update
    matching = Matching.find params[:id]
    if matching.update_attributes matching_params
      render json: matching
    else
      unprocessable_response matching
    end
  end

  def destroy
    matching = Matching.find params[:id]
    if matching.destroy
      render json: matching
    else
      unprocessable_response matching
    end
  end

  def show
    matching = Matching.find params[:id]
    render json: matching
  end

  def matching_params
    params.require(:matching).permit(
      :instrument,
      {:lesson_time => []},
      :student_id,
      :teacher_id,
      :location
    )
  end
end
