# == Schema Information
#
# Table name: instruments
#
#  id                  :integer          not null, primary key
#  name                :string
#  years_played        :integer
#  is_primary          :boolean          default(FALSE), not null
#  instrumentable_id   :integer
#  instrumentable_type :string
#  created_at          :datetime         not null
#  updated_at          :datetime         not null
#  proficiency         :integer
#

require 'rails_helper'

RSpec.describe Instrument, type: :model do
  pending "add some examples to (or delete) #{__FILE__}"
end
