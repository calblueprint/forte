# == Schema Information
#
# Table name: teachers
#
#  id                     :integer          not null, primary key
#  is_searching           :boolean          default(TRUE)
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
#  city                   :string
#  first_name             :string
#  last_name              :string
#  availability           :integer          default([]), is an Array
#  gender                 :integer
#  birthday               :datetime
#  school                 :string
#  phone                  :string
#  introduction           :text
#  teaching_experience    :text
#  training_experience    :text
#  performance_experience :text
#  address                :string
#  address2               :string
#  state                  :integer
#  zipcode                :integer
#  location_preference    :boolean
#  travel_distance        :integer
#  background_check       :boolean
#  reference1_first_name  :string
#  reference1_last_name   :string
#  reference1_relation    :string
#  reference1_email       :string
#  reference1_phone       :string
#  reference2_first_name  :string
#  reference2_last_name   :string
#  reference2_relation    :string
#  reference2_email       :string
#  reference2_phone       :string
#  criminal_charges       :boolean
#  youth_participation    :boolean
#  criminal_explanation   :text
#  waiver_signature       :string
#  waiver_date            :datetime
#  school_level           :integer
#  account_id             :string
#  bank_id                :string
#  sign_up_ip             :string
#  lat                    :decimal(, )
#  lng                    :decimal(, )
#  timezone               :string
#  teach_for_free         :boolean          default(FALSE)
#

require 'rails_helper'

RSpec.describe Teacher, type: :model do
  pending "add some examples to (or delete) #{__FILE__}"
end
