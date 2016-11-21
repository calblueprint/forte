class RemoveTeacherRefToLessons < ActiveRecord::Migration
  def change
    remove_reference :lessons, :teacher, index: true, foreign_key: true
  end
end
