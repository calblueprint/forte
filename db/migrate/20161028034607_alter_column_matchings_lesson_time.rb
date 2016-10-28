class AlterColumnMatchingsLessonTime < ActiveRecord::Migration
  def change
    remove_column :matchings, :lesson_time
    add_column :matchings, :lesson_time, :integer, array: true, default: [], null: false
  end
end
