class LessonMailer < ApplicationMailer

  def cancel_notify_teacher(lesson)
    @lesson = lesson
    @matching = lesson.matching
    @student = lesson.student
    @teacher = lesson.teacher
    instrument = matching.instrument
    mail subject: "Forte Lesson Cancelation | (#{instrument})",
         to: @teacher.email
  end

  def cancel_notify_student(lesson)
    @lesson = lesson
    @matching = lesson.matching
    @student = lesson.student
    @teacher = lesson.teacher
    instrument = matching.instrument
    mail subject: "Forte Lesson Cancelation | #{instrument}",
         to: @student.student_email
  end

   def cancel_notify_parent(lesson)
    @lesson = lesson
    @matching = lesson.matching
    @student = lesson.student
    @teacher = lesson.teacher
    instrument = matching.instrument
    mail subject: "Forte Lesson Cancelation | #{instrument}",
         to: @student.email
  end

end

