# == Schema Information
#
# Table name: lessons
#
#  id         :integer          not null, primary key
#  is_paid    :boolean          default(FALSE), not null
#  feedback   :text
#  created_at :datetime         not null
#  updated_at :datetime         not null
#  student_id :integer
#  teacher_id :integer
#  start_time :datetime
#  end_time   :datetime
#  price      :decimal(, )
#

class Lesson < ActiveRecord::Base

  scope :upcoming, -> { where("start_time >= ?", Date.today) }
  scope :recent, -> { where("start_time < ?", Date.today) }

  validates :start_time, presence: true, date: true
  validates :end_time, presence: true, date: { after: :start_time }
  validates :is_paid, :inclusion => { :in => [true, false] }
  validates :student_id, presence: true
  validates :teacher_id, presence: true

  belongs_to :student
  belongs_to :teacher

end
