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

require 'rails_helper'

RSpec.describe Matching, type: :model do
  pending "add some examples to (or delete) #{__FILE__}"
end
