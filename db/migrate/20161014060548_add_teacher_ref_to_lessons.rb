class AddTeacherRefToLessons < ActiveRecord::Migration
  def change
    add_reference :lessons, :teacher, index: true, foreign_key: true
  end
end
