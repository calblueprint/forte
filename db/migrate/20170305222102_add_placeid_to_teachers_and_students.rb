class AddPlaceidToTeachersAndStudents < ActiveRecord::Migration
  def change
  	add_column :students, :place_id, :string
  	add_column :teachers, :place_id, :string
  end
end
