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

require 'rails_helper'

RSpec.describe Matching, type: :model do
  pending "add some examples to (or delete) #{__FILE__}"
end
