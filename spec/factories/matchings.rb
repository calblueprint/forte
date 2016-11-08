# == Schema Information
#
# Table name: matchings
#
#  id          :integer          not null, primary key
#  instrument  :string           not null
#  created_at  :datetime         not null
#  updated_at  :datetime         not null
#  student_id  :integer
#  teacher_id  :integer
#  lesson_time :integer          default([]), not null, is an Array
#

FactoryGirl.define do
  factory :matching do
    
  end
end
