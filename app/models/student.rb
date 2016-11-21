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

class Student < ActiveRecord::Base
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable and :omniauthable
  include PgSearch
  multisearchable :against => [:last_name, :first_name, :email]

  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :trackable, :validatable
  
  has_many :matchings
  has_many :lessons, through: :matchings 
  has_many :teachers, through: :matchings
  has_many :instruments, as: :instrumentable

  # If any of the enums here change, make sure to change constants.es6.jsx file
  # too
  enum school_level: [ :kindergarten, :'1st grade', :'2nd grade', :'3rd grade',
                      :'4th grade', :'5th grade', :'6th grade', :'7th grade',
                      :'8th grade', :'9th grade', :'10th grade', :'11th grade',
                      :'12th grade' ]
  enum state: [ :AL, :AK, :AZ, :AR, :CA, :CO, :CT, :DE, :FL, :GA,
                :HI, :ID, :IL, :IN, :IA, :KS, :KY, :LA, :ME, :MD,
                :MA, :MI, :MN, :MS, :MO, :MT, :NE, :NV, :NH, :NJ,
                :NM, :NY, :NC, :ND, :OH, :OK, :OR, :PA, :RI, :SC,
                :SD, :TN, :TX, :UT, :VT, :VA, :WA, :WV, :WI, :WY ]
  enum gender: [ :female, :male, :other ]
  enum travel_distance: [ :'I am not willing to travel', :'Up to 5 miles', 
                          :'Up to 10 miles', :'Up to 20 miles', 
                          :'20 miles or more']
  enum income_range: [:'$0 - $10,000', :'$10,001 - $20,000', :'$20,001 - 30,000', :'$30,001 - 40,000', :'$40,001 - $50,000']

end
