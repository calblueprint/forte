# == Schema Information
#
# Table name: lessons
#
#  id         :integer          not null, primary key
#  time       :datetime         not null
#  is_paid    :boolean          default(FALSE), not null
#  feedback   :text
#  created_at :datetime         not null
#  updated_at :datetime         not null
#  student_id :integer
#  teacher_id :integer
#

FactoryGirl.define do
  factory :lesson do
    
  end
end
