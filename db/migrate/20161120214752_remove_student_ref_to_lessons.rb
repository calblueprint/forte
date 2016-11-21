class RemoveStudentRefToLessons < ActiveRecord::Migration
  def change
    remove_reference :lessons, :student, index: true, foreign_key: true
  end
end
