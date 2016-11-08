# == Schema Information
#
# Table name: students
#
#  id                     :integer          not null, primary key
#  city                   :string
#  first_name             :string
#  instrument             :string
#  last_name              :string
#  created_at             :datetime         not null
#  updated_at             :datetime         not null
#  email                  :string           default(""), not null
#  encrypted_password     :string           default(""), not null
#  reset_password_token   :string
#  reset_password_sent_at :datetime
#  remember_created_at    :datetime
#  sign_in_count          :integer          default(0), not null
#  current_sign_in_at     :datetime
#  last_sign_in_at        :datetime
#  current_sign_in_ip     :inet
#  last_sign_in_ip        :inet
#  availability           :integer          default([]), is an Array
#  gender                 :integer
#  birthday               :datetime
#  school                 :string
#  school_level           :integer
#  guardian_first_name    :string
#  guardian_last_name     :string
#  guardian_phone         :string
#  guardian_email         :string
#  introduction           :text
#  lesson_experience      :text
#  performance_experience :text
#  student_phone          :string
#  address                :string
#  address_apt            :string
#  state                  :integer
#  zipcode                :integer
#  location_preference    :boolean
#  travel_distance        :integer
#  income_range           :integer
#  household_number       :integer
#  disciplinary_action    :boolean
#  criminal_charges       :boolean
#  criminal_explanation   :text
#  waiver_signature       :string
#  waiver_date            :datetime
#

FactoryGirl.define do
  factory :student do
    
  end
end
