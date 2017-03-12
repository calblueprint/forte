class AlterColumnIsSearchingToAddTeachForFreeToTeachers < ActiveRecord::Migration
  def change
    add_column :teachers, :teach_for_free, :boolean, default: false
    change_column :teachers, :is_searching, :boolean, default: true
  end
end
