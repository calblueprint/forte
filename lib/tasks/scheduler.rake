namespace :scheduler do

  desc "This task checks to see if there are four upcoming lessons per matching. If not, add additional lessons"
  task :verify_or_add => :environment do
    puts "Verifying there exists four upcoming lesson for given matching..."
    # Want to ensure each matching has exactly 4 upcoming lessons
    num_upcoming_lessons = 4
    # For each matching, keep creating lessons until there are 4 upcoming lessons
    Matching.all.each do |matching|
      upcoming_lessons = matching.lessons.where(["start_time >= ?", DateTime.now])
      while upcoming_lessons.count < num_upcoming_lessons
        last_lesson = upcoming_lessons.order("end_time DESC").first
        create_single_lesson(matching, last_lesson)
      end
    end
    puts "Done."
  end

  # Creates a single lessons for this matching based on the matching time
  def create_single_lesson(matching, last_lesson)
    # Convert the lesson time into day, hour, and minutes
    day = matching.lesson_time[0] / 96
    hour = (matching.lesson_time[0] % 96) / 4
    minute = (matching.lesson_time[0] % 4) * 15
    len = matching.lesson_time.count
    # Get the new lesson time based on the last upcoming lesson's time
    # If there are no upcoming lessons, use the current time
    # Note that because this function depends on the last upcoming lesson, we must prevent users from editing 
    # or deleting their last upcoming lesson
    if last_lesson == nil
      last_lesson_time = DateTime.now.utc
    else
      last_lesson_time = last_lesson.start_time
    end
    # If the last upcoming lesson is on the same day as the matching time, just advance by a week
    if last_lesson_time.wday == day
      start_time = last_lesson_time + 7.day
    # Otherwise, get the next day that corresponds to the matching time but comes after the last upcoming lesson
    else
      start_time = last_lesson_time + ((day - last_lesson_time.wday) % 7).day
    end
    # Set the hour and minute
    start_time = start_time.change({hour: hour, min: minute})
    lesson = Lesson.create(
      start_time: start_time,
      end_time: start_time + (len * 15).minutes,
      price: matching.default_price,
      is_paid: false,
      student_feedback: nil,
      teacher_feedback: nil,
      matching_id: matching.id,
    )
    lesson.save
  end
end

