class AddSchoolLevelToTeacher < ActiveRecord::Migration
  def change
    add_column :teachers, :school_level, :integer
  end
end
