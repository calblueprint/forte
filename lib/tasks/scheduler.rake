namespace :upcoming_lessons do

  desc "This task checks to see if there are four upcoming lessons per matching. If not, add additional lessons"
  task :verify_or_add => :environment do
    puts "Verifying there exists four upcoming lesson for given matching..."

    num_upcoming_lessons = 4
    midnight =  Date.current.tomorrow.midnight

    Matching.all.each do |matching|
      upcoming_lessons = matching.lessons.where(["is_paid = ? AND end_time <= ?", false, Time.now])
      if upcoming_lessons.count < num_upcoming_lessons
        create_single_lesson(matching)
      end
    end
    puts "Done."
  end

  def create_single_lesson(matching)
    start_time = num_to_datetime(matching.lesson_time)
    lesson = Lesson.create(
      start_time: start_time,
      end_time: end_time,
      price: previous_lesson.price,
      is_paid: false,
      feedback: nil,
      matching_id: matching.id,
    )
    lesson.save
  end

  def num_to_datetime(lesson_time)
    day = lesson_time / 96
    hour = (lesson_time % 96) / 4
    minute = (lesson_time % 4) * 15
    puts day, hour, minute
  end
end
