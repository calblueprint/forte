class RemoveColumnTeachersInstruments < ActiveRecord::Migration
  def change
    remove_column :teachers, :instruments
  end
end
