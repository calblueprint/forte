class AddLocationToMatchingsAndLessons < ActiveRecord::Migration
  def change
    add_column :matchings, :location, :string
    add_column :lessons, :location, :string
  end
end
