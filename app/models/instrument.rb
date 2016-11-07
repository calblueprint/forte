# == Schema Information
#
# Table name: instruments
#
#  id                     :integer          not null, primary key
#  name                   :string
#  years_played           :integer
#  experience_level       :string
#  is_primary             :boolean          not null, default(FALSE)
#  person_id              :integer
#  person_type             :string
#  created_at             :datetime         not null
#  updated_at             :datetime         not null

class Instrument < ActiveRecord::Base

  belongs_to :instrumentable, polymorphic: true

end
