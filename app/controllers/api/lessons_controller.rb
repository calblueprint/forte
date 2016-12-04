class Api::LessonsController < Api::BaseController
  def index
    lessons = Lesson.all
    render json: lessons
  end

  def create
    lesson = Lesson.new lesson_params
    if lesson.save
      render json: lesson
    else
      unprocessable_response lesson
    end
  end

  def update
    lesson = Lesson.find params[:id]
    # TODO: If the update only changes price and not time, then we shouldnt' send a reschedule email, but a Lesson Price Changed email.
    if params[:is_paid]
      # Send payment email
    else
      # Send rescheduled lesson email
      lesson.send_reschedule_emails
    end
    if lesson.update_attributes lesson_params
      render json: lesson
    else
      unprocessable_response lesson
    end
  end

  def destroy
    lesson = Lesson.find params[:id]
    lesson.send_cancel_emails
    if lesson.destroy
      render json: lesson
    else
      unprocessable_response lesson
    end
  end

  def show
    lesson = Lesson.find params[:id]
    render json: lesson
  end

  def lesson_params
    params.require(:lesson).permit(
      :time,
      :is_paid,
      :feedback,
      :matching_id,
      :start_time,
      :end_time,
      :price,
    )
  end
end
