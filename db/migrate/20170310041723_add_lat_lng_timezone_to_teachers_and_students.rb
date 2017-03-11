class AddLatLngTimezoneToTeachersAndStudents < ActiveRecord::Migration
  def change
  	remove_column :teachers, :place_id
	add_column :teachers, :lat, :decimal
  	add_column :teachers, :lng, :decimal
  	add_column :teachers, :timezone, :string
  	remove_column :students, :place_id
  	add_column :students, :lat, :decimal
  	add_column :students, :lng, :decimal
  	add_column :students, :timezone, :string
  	
  end
end
