class AddColumnsToTeacher < ActiveRecord::Migration
  def change
    add_column :teachers, :gender, :integer
    add_column :teachers, :birthday, :datetime
    add_column :teachers, :school, :string
    add_column :teachers, :phone, :string
    add_column :teachers, :introduction, :text
    add_column :teachers, :lesson_experience, :text
    add_column :teachers, :teaching_experience, :text
    add_column :teachers, :training_experience, :text
    add_column :teachers, :performance_experience, :text
    add_column :teachers, :address, :string
    add_column :teachers, :address_apt, :string
    add_column :teachers, :state, :integer
    add_column :teachers, :zipcode, :integer
    add_column :teachers, :location_preference, :boolean
    add_column :teachers, :travel_distance, :integer
    add_column :teachers, :background_check, :boolean
    add_column :teachers, :reference1_first_name, :string
    add_column :teachers, :reference1_last_name, :string
    add_column :teachers, :reference1_relation, :string
    add_column :teachers, :reference1_email, :string
    add_column :teachers, :reference1_phone, :string
    add_column :teachers, :reference2_first_name, :string
    add_column :teachers, :reference2_last_name, :string
    add_column :teachers, :reference2_relation, :string
    add_column :teachers, :reference2_email, :string
    add_column :teachers, :reference2_phone, :string
    add_column :teachers, :criminal_charges, :boolean
    add_column :teachers, :youth_participation, :boolean
    add_column :teachers, :criminal_explanation, :text
    add_column :teachers, :waiver_signature, :string
    add_column :teachers, :waiver_date, :datetime
  end
end
