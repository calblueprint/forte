class ForteMailer < ApplicationMailer


  def send_contact_email(subject, first_name, last_name, email, message)
    @first_name = first_name
    @last_name = last_name
    @email = email
    @message = message
    mail(to: "fortemailer@gmail.com", subject: subject)
  end

  def submit_student(student)
    @student = student
    name = student.full_name
    mail subject: "Forte Student Registration Confirmation | #{name}",
         to: student.student_email
  end

  def submit_parent(student)
    @student = student
    name = student.full_name
    mail subject: "Forte Student Registration Confirmation | #{name}",
         to: student.email
  end

  def submit_admin(student)
    @student = student
    name = student.full_name
    mail subject: "Forte Student Registration Confirmation | #{name}",
         to: "fortemailer@gmail.com"
  end

end
