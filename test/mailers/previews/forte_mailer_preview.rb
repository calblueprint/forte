class ForteMailerPreview < ActionMailer::Preview
  def send_contact_email
    ForteMailer.send_contact_email("Happy Birthday", "Eric", "Liang", "test@email.com", "YAAAAy")
  end
end
