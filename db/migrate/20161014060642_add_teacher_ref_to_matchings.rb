class AddTeacherRefToMatchings < ActiveRecord::Migration
  def change
    add_reference :matchings, :teacher, index: true, foreign_key: true
  end
end
