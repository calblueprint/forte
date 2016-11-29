# == Schema Information
#
# Table name: lessons
#
#  id          :integer          not null, primary key
#  is_paid     :boolean          default(FALSE), not null
#  feedback    :text
#  created_at  :datetime         not null
#  updated_at  :datetime         not null
#  start_time  :datetime
#  end_time    :datetime
#  price       :decimal(, )
#  matching_id :integer
#

class Lesson < ActiveRecord::Base
  after_initialize :init

  scope :upcoming, -> { where("start_time >= ?", Date.today) }
  scope :recent, -> { where("start_time < ?", Date.today) }

  validates :start_time, presence: true, date: true
  validates :end_time, presence: true, date: { after: :start_time }
  validates :is_paid, :inclusion => { :in => [true, false] }
  validates :matching_id, presence: true

  belongs_to :matching
  has_one :student, through: :matching
  has_one :teacher, through: :matching

  def init
    self.location = self.matching.location || 'Location has not been set'
  end

end
