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

  validates :name, presence: true
  validates :years_played, presence: true
  validates :experience_level, presence: true
  validates :is_primary, :inclusion => { :in => [true, false] }
  validates :instrumentable_id, presence: true
  validates :instrumentable_type, presence: true

  belongs_to :instrumentable, polymorphic: true

end
