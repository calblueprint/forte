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

class Instrument < ActiveRecord::Base

  validates :name, presence: true
  validates :years_played, presence: true
  validates :proficiency, presence: true
  validates :is_primary, :inclusion => { :in => [true, false] }

  belongs_to :instrumentable, polymorphic: true

  enum years_played: [ :'0', :'1', :'2', :'3', :'4', :'5', :'6+']
  enum proficiency: [ :'No Experience', :'Beginner', :'Intermediate',
                       :'Advanced', :'Professional' ]

end
