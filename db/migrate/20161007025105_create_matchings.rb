class CreateMatchings < ActiveRecord::Migration
  def change
    create_table :matchings do |t|
      t.integer :instrument, null: false
      t.text    :lesson_time, array: true, default: [], null: false

      t.timestamps null: false
    end
  end
end
