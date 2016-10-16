class Matching < ActiveRecord::Base
  belongs_to :student
  belongs_to :teacher
end
