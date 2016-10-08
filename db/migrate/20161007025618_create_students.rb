class CreateStudents < ActiveRecord::Migration
  def change
    create_table :students do |t|
      t.text    :availability, array: true, default:[]
      t.string  :city, null: false
      t.string  :first_name, null: false
      t.string  :instrument, null: false
      t.string  :last_name, null: false

      t.timestamps null: false
    end
  end
end
