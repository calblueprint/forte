class RemoveColumnStudentsCriminalExplanation < ActiveRecord::Migration
  def change
    remove_column :students, :criminal_explanation
  end
end
