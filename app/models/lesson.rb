# == Schema Information
#
# Table name: lessons
#
#  id               :integer          not null, primary key
#  is_paid          :boolean          default(FALSE), not null
#  created_at       :datetime         not null
#  updated_at       :datetime         not null
#  start_time       :datetime
#  end_time         :datetime
#  price            :decimal(8, 2)
#  matching_id      :integer
#  location         :string
#  student_feedback :text
#  teacher_feedback :text
#

class Lesson < ActiveRecord::Base
  after_initialize :init

  scope :upcoming, -> { where("start_time >= ?", DateTime.now).order(:start_time) }
  scope :recent, -> { where("start_time < ?", DateTime.now).order(start_time: :desc) }

  validates :start_time, presence: true, date: true
  validates :end_time, presence: true, date: { after: :start_time }
  validates :is_paid, :inclusion => { :in => [true, false] }
  validates :matching_id, presence: true

  belongs_to :matching
  has_one :student, through: :matching
  has_one :teacher, through: :matching

  def send_cancel_emails
    LessonMailer.cancel_notify_teacher(self).deliver_now
    LessonMailer.cancel_notify_student(self).deliver_now
    LessonMailer.cancel_notify_parent(self).deliver_now
  end

  def send_reschedule_emails
    LessonMailer.reschedule_notify_teacher(self).deliver_now
    LessonMailer.reschedule_notify_student(self).deliver_now
    LessonMailer.reschedule_notify_parent(self).deliver_now
  end

  def init
    self.location = self.matching.location || 'Location has not been set'
  end

end
