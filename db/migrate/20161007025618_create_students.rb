class CreateStudents < ActiveRecord::Migration
  def change
    create_table :students do |t|
      t.text    :availability, array: true, default:[]
      t.string  :city
      t.string  :first_name
      t.string  :instrument
      t.string  :last_name

      t.timestamps null: false
    end
  end
end
