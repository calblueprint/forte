class Api::MatchingsController < Api::BaseController

  def index
    matchings = Matching.all
    render json: matchings
  end

  def matched_pairs
    matchings = Matching.all.order(:id)
    matching_info = []
    matchings.each do |matching|
      matching_info.push({
        "match_info": matching,
        "teacher": matching.teacher,
        "student": matching.student
      })
    end

    render json: matching_info,
           root: false

  end

  def past_lessons
    lessons = (Matching.find params[:id]).lessons
                .where('end_time <= ?', DateTime.now)
                .order(end_time: :desc)

    render json: lessons,
           each_serializer: MatchingLessonsSerializer,
           root: false
  end

  def upcoming_lessons
    lessons = (Matching.find params[:id]).lessons
                .where('end_time > ?', DateTime.now)
                .order(end_time: :asc)

    render json: lessons,
           each_serializer: MatchingLessonsSerializer,
           root: false
  end

  def create
    matching = Matching.new matching_params
    if matching.save
      timezone = Timezone[params[:timezone]]
      4.times do |n|
        start_time = Date.today.sunday + (n+1).weeks + (matching_params[:lesson_time][0]*15).minutes
        start_time = timezone.local_to_utc(start_time)
        lesson = Lesson.create(
          start_time: start_time,
          end_time: start_time + (matching_params[:lesson_time].length*15).minutes,
          price: matching_params[:default_price],
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
      :location,
      :default_price,
    )
  end
end
