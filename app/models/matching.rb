class Matching < ActiveRecord::Base
  belongs_to :student, :inverse_of => :matchings
  belongs_to :teacher, :inverse_of => :matchings
end
