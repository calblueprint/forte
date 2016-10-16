class AddDetailsToTeachers < ActiveRecord::Migration
  def change
    add_column :teachers, :city, :string
    add_column :teachers, :first_name, :string
    add_column :teachers, :last_name, :string
    add_column :teachers, :availability, :text, array: true, default:[]
  end
end
