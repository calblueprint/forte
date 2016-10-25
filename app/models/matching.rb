# == Schema Information
#
# Table name: matchings
#
#  id          :integer          not null, primary key
#  instrument  :integer          not null
#  lesson_time :text             default([]), not null, is an Array
#  created_at  :datetime         not null
#  updated_at  :datetime         not null
#  student_id  :integer
#  teacher_id  :integer
#

class Matching < ActiveRecord::Base
  belongs_to :student, :inverse_of => :matchings
  belongs_to :teacher, :inverse_of => :matchings
end
