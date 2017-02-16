class RemoveColumnTeachersLessonExperience < ActiveRecord::Migration
  def change
    remove_column :teachers, :lesson_experience
  end
end