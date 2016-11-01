class AlterColumnMatchingsInstrument < ActiveRecord::Migration
  def change
    change_column :matchings, :instrument, :string
  end
end
