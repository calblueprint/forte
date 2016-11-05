class AlterColumnStudentsAvailability < ActiveRecord::Migration
  def change
    remove_column :students, :availability
    add_column :students, :availability, :integer, array: true, default: []
  end
end
