class AddMatchingToLessons < ActiveRecord::Migration
  def change
    add_reference :lessons, :matching, index: true, foreign_key: true
  end
end
