class AddDefaultPriceToMatchings < ActiveRecord::Migration
  def change
  	add_column :matchings, :default_price, :decimal
  end
end
