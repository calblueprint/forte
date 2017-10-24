class Matching < ActiveRecord::Base
  validates :instrument, presence: true
  validates :student_id, presence: true
  validates :teacher_id, presence: true
  validates :lesson_time, presence: true, :length => { :minimum => 2 }
  validates :default_price, presence: true
  validates :location, presence: true
  # validate :valid_lesson_array

  has_many :lessons, dependent: :destroy
  belongs_to :student, :inverse_of => :matchings
  belongs_to :teacher, :inverse_of => :matchings

  def valid_lesson_array
    if lesson_time.length > 1
      lesson_time[0..-2].zip(lesson_time[1..-1]).each do |timestring1, timestring2|
        unless (timestring2.to_i - timestring1.to_i)%24 == 1
          errors.add(:lesson_time, "Times must be consecutive")
        end
      end
    end
  end
end
