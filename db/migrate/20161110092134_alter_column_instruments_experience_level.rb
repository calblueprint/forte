class AlterColumnInstrumentsExperienceLevel < ActiveRecord::Migration
  def change
    remove_column :instruments, :experience_level
    add_column :instruments, :proficiency, :integer
  end
end
