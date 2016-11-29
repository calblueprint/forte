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

FactoryGirl.define do
  factory :lesson do
    
  end
end
