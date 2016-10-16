class AddStudentRefToMatchings < ActiveRecord::Migration
  def change
    add_reference :matchings, :student, index: true, foreign_key: true
  end
end
