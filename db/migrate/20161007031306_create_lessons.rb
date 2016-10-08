class CreateLessons < ActiveRecord::Migration
  def change
    create_table :lessons do |t|
      t.datetime :time, null: false
      t.boolean  :is_paid, default: false, null: false
      t.text     :feedback
      
      t.timestamps null: false
    end
  end
end
