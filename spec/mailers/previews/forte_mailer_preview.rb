# Preview all emails at http://localhost:3000/rails/mailers/forte_mailer
class ForteMailerPreview < ActionMailer::Preview
  def student_signup_notify_parent_1
    student = OpenStruct.new(guardian_first_name: 'Bob')
    ForteMailer.student_signup_notify_parent(student)
  end

  def student_signup_notify_parent_2
    student = OpenStruct.new(guardian_first_name: 'Barbara')
    ForteMailer.student_signup_notify_parent(student)
  end
end
