class CreateTeachers < ActiveRecord::Migration
  def change
    create_table :teachers do |t|
      t.boolean  :is_searching, default: false
      t.text     :instruments, array: true, default: []

      t.timestamps null: false
    end
  end
end
