class ApplicationMailer < ActionMailer::Base

  layout 'mailer'

  default from: ENV['smtp_username']

end
