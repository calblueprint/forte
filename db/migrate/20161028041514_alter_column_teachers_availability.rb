class AlterColumnTeachersAvailability < ActiveRecord::Migration
  def change
    remove_column :teachers, :availability
    add_column :teachers, :availability, :integer, array: true, default: []
  end
end
