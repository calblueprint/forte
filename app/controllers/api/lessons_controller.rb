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
    if lesson.update_attributes lesson_params
      # TODO: If the update only changes price and not time, then we shouldnt' send a reschedule email, but a Lesson Price Changed email.
      if lesson_params[:start_time] or lesson_params[:end_time]
        # Send rescheduled lesson email
        lesson.send_reschedule_emails
      elsif params[:is_paid]
        # Send payment email
      end
      render json: lesson
    else
      unprocessable_response lesson
    end

  end

  def destroy
    lesson = Lesson.find params[:id]
    if lesson.destroy
      lesson.send_cancel_emails
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
      :student_feedback,
      :teacher_feedback,
      :matching_id,
      :start_time,
      :end_time,
      :price,
    )
  end
end
