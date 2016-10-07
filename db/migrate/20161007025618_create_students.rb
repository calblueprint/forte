class CreateStudents < ActiveRecord::Migration
  def change
    create_table :students do |t|
      t.text    :availability, array: true, default:[]
      t.integer :birth_day, null: false
      t.integer :birth_month, null: false
      t.integer :birth_year, null: false
      t.string  :city, null: false
      t.integer :distance_will_travel
      t.text    :explain_crime_discipline
      t.string  :first_name, null: false
      t.string  :gender, null: false
      t.integer :grade_level, null: false
      t.integer :graduation_year, null: false
      t.string  :home_address, null: false
      t.text    :hope_to_achieve, null: false
      t.integer :household_size, null: false
      t.string  :income_range, null: false
      t.string  :instrument, null: false
      t.string  :interest_rank, null: false
      t.string  :last_name, null: false
      t.integer :lesson_location, null: false
      t.text    :not_matched, array: true, default:[]
      t.string  :parent_first_name, null: false
      t.string  :parent_last_name, null: false
      t.string  :parent_email, null: false
      t.string  :parent_phone, null: false
      t.string  :password, null: false
      t.boolean :plead_to_crime, null: false
      t.text    :performance_experience, null: false
      t.text    :previous_training, null: false
      t.string  :proficiency, null: false
      t.string  :school, null: false
      t.string  :state, null: false
      t.string  :student_email
      t.string  :student_phone
      t.boolean :subject_to_discipline, null: false
      t.integer :years_played, null: false
      t.string  :zip_code, null: false

      t.timestamps null: false
    end
  end
end
