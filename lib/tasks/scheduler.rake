namespace :scheduler do

  desc "This task checks to see if there are four upcoming lessons per matching. If not, add additional lessons"
  task :verify_or_add => :environment do
    puts "Verifying there exists four upcoming lesson for given matching..."

    num_upcoming_lessons = 4

    Matching.all.each do |matching|
      upcoming_lessons = matching.lessons.where(["start_time >= ?", DateTime.now])
      while upcoming_lessons.count < num_upcoming_lessons
        last_lesson = upcoming_lessons.order("end_time DESC").first
        create_single_lesson(matching, last_lesson)
      end
    end
    puts "Done."
  end

  def create_single_lesson(matching, last_lesson)
    day = matching.lesson_time[0] / 96
    hour = (matching.lesson_time[0] % 96) / 4
    minute = (matching.lesson_time[0] % 4) * 15
    len = matching.lesson_time.count
    if last_lesson == nil
      last_lesson_time = DateTime.now.utc
    else
      last_lesson_time = last_lesson.start_time
    end
    if last_lesson_time.wday == day
      start_time = last_lesson_time + 7.day
    else
      start_time = last_lesson_time + ((day - last_lesson_time.wday) % 7).day
    end
    start_time = start_time.change({hour: hour, min: minute})
    lesson = Lesson.create(
      start_time: start_time,
      end_time: start_time + (len * 15).minutes,
      price: matching.default_price,
      is_paid: false,
      feedback: nil,
      matching_id: matching.id,
    )
    lesson.save
  end
end

