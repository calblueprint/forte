class ChangePrecisionOfLessonPrice < ActiveRecord::Migration
  def change
       change_column :lessons, :price, :decimal, precision: 8, scale: 2
  end
end
