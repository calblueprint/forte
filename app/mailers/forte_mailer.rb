class ForteMailer < ApplicationMailer

  def send_contact_email(subject, first_name, last_name, email, message)
    @first_name = first_name
    @last_name = last_name
    @email = email
    @message = message
    mail(to: "fortemailer@gmail.com", subject: subject)
  end

  def student_signup_notify_student(student)
    @student = student
    name = student.full_name
    if !(student.student_email.to_s.lstrip.empty?)
      mail subject: "Forte Student Registration Confirmation | #{name}",
         to: student.student_email
    end
  end

  def student_signup_notify_parent(student)
    @student = student
    name = student.full_name
    mail subject: "Forte Student Registration Confirmation | #{name}",
         to: student.email
  end

  def student_signup_notify_admin(student)
    @student = student
    name = student.full_name
    mail subject: "Forte Student Registration Confirmation | #{name}",
         to: "fortemailer@gmail.com"
  end

  def teacher_signup_notify_teacher(teacher)
    @teacher = teacher
    name = teacher.full_name
    mail subject: "Forte Teacher Registration Confirmation | #{name}",
         to: teacher.email
  end

  def teacher_signup_notify_admin(teacher)
    @teacher = teacher
    name = teacher.full_name
    mail subject: "Forte Teacher Registration Confirmation | #{name}",
         to: "fortemailer@gmail.com"
  end

end
