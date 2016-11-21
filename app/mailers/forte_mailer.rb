class ForteMailer < ApplicationMailer
  def contact_email(subject, first_name, last_name, email, message)
    @first_name = first_name
    @last_name = last_name
    @email = email
    @message = message
    mail(to: "fortemailer@gmail.com", subject: subject)
  end
end
