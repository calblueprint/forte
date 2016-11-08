class AddColumnsToStudent < ActiveRecord::Migration
  def change
    add_column :students, :gender, :integer
    add_column :students, :birthday, :datetime
    add_column :students, :school, :string
    add_column :students, :school_level, :integer
    add_column :students, :guardian_first_name, :string
    add_column :students, :guardian_last_name, :string
    add_column :students, :guardian_phone, :string
    add_column :students, :introduction, :text
    add_column :students, :lesson_experience, :text
    add_column :students, :performance_experience, :text
    add_column :students, :student_email, :string
    add_column :students, :student_phone, :string
    add_column :students, :address, :string
    add_column :students, :address_apt, :string
    add_column :students, :state, :integer
    add_column :students, :zipcode, :integer
    add_column :students, :location_preference, :boolean
    add_column :students, :travel_distance, :integer
    add_column :students, :income_range, :integer
    add_column :students, :household_number, :integer
    add_column :students, :disciplinary_action, :boolean
    add_column :students, :criminal_charges, :boolean
    add_column :students, :criminal_explanation, :text
    add_column :students, :waiver_signature, :string
    add_column :students, :waiver_date, :datetime
  end
end
