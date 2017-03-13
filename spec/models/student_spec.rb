# == Schema Information
#
# Table name: students
#
#  id                     :integer          not null, primary key
#  city                   :string
#  first_name             :string
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
#  introduction           :text
#  lesson_experience      :text
#  performance_experience :text
#  student_email          :string
#  student_phone          :string
#  address                :string
#  address2               :string
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
#  customer_id            :string
#  lat                    :decimal(, )
#  lng                    :decimal(, )
#  timezone               :string
#

require 'rails_helper'

RSpec.describe Student, type: :model do
  pending "add some examples to (or delete) #{__FILE__}"
end
