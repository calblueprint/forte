class CreateInstruments < ActiveRecord::Migration
  def change
    create_table :instruments do |t|
      t.string :name
      t.integer :years_played
      t.integer :experience_level
      t.boolean :is_primary, default: false, null: false
      t.references :instrumentable, polymorphic: true, index: true

      t.timestamps null: false
    end
  end
end
