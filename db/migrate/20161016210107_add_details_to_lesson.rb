class AddDetailsToLesson < ActiveRecord::Migration
  def change
    add_column :lessons, :start_time, :datetime
    add_column :lessons, :end_time, :datetime
    add_column :lessons, :price, :decimal
  end
end
