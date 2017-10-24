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
