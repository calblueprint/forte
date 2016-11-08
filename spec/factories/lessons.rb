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

FactoryGirl.define do
  factory :lesson do
    
  end
end
