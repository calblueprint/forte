class AddStudentRefToLessons < ActiveRecord::Migration
  def change
    add_reference :lessons, :student, index: true, foreign_key: true
  end
end
