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

FactoryGirl.define do
  factory :lesson do
    
  end
end
