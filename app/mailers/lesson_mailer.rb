class LessonMailer < ApplicationMailer

  def cancel_notify_teacher(lesson)
    @lesson = lesson
    @time = @lesson.start_time.strftime("%a, %B %d at %I:%M %p")
    @matching = lesson.matching
    @student = lesson.student
    @teacher = lesson.teacher
    instrument = @matching.instrument
    mail subject: "Forte Lesson Cancellation | #{instrument}",
         to: @teacher.email
  end

  def cancel_notify_student(lesson)
    @lesson = lesson
    @time = @lesson.start_time.strftime("%a, %B %d at %I:%M %p")
    @matching = lesson.matching
    @student = lesson.student
    @teacher = lesson.teacher
    instrument = @matching.instrument
    mail subject: "Forte Lesson Cancellation | #{instrument}",
         to: @student.student_email
  end

   def cancel_notify_parent(lesson)
    @lesson = lesson
    @time = @lesson.start_time.strftime("%a, %B %d at %I:%M %p")
    @matching = lesson.matching
    @student = lesson.student
    @teacher = lesson.teacher
    instrument = @matching.instrument
    mail subject: "Forte Lesson Cancellation | #{instrument}",
         to: @student.email
  end

  def reschedule_notify_teacher(lesson)
    @lesson = lesson
    @time = @lesson.start_time.strftime("%a, %B %d at %I:%M %p")
    @matching = lesson.matching
    @student = lesson.student
    @teacher = lesson.teacher
    instrument = @matching.instrument
    mail subject: "Forte Lesson Reschedule | #{instrument}",
         to: @teacher.email
  end

  def reschedule_notify_student(lesson)
    @lesson = lesson
    @time = @lesson.start_time.strftime("%a, %B %d at %I:%M %p")
    @matching = lesson.matching
    @student = lesson.student
    @teacher = lesson.teacher
    instrument = @matching.instrument
    mail subject: "Forte Lesson Reschedule | #{instrument}",
         to: @teacher.email
  end

  def reschedule_notify_parent(lesson)
    @lesson = lesson
    @time = @lesson.start_time.strftime("%a, %B %d at %I:%M %p")
    @matching = lesson.matching
    @student = lesson.student
    @teacher = lesson.teacher
    instrument = @matching.instrument
    mail subject: "Forte Lesson Reschedule | #{instrument}",
         to: @teacher.email
  end

end

