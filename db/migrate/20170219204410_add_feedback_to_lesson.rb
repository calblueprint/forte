class AddFeedbackToLesson < ActiveRecord::Migration
  def change
    remove_column :lessons, :feedback
    add_column :lessons, :student_feedback, :text
    add_column :lessons, :teacher_feedback, :text
  end
end
