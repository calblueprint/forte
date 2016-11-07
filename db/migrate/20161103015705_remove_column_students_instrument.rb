class RemoveColumnStudentsInstrument < ActiveRecord::Migration
  def change
    remove_column :students, :instrument
  end
end
