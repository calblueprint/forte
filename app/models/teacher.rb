# == Schema Information
#
# Table name: teachers
#
#  id                     :integer          not null, primary key
#  is_searching           :boolean          default(FALSE)
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
#  address_apt            :string
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
#

class Teacher < ActiveRecord::Base
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable and :omniauthable

  include PgSearch
  multisearchable :against => [:last_name, :first_name, :email]

  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :trackable, :validatable

  validates :email, presence: true, uniqueness: true
  validates :city, presence: true
  validates :first_name, presence: true
  validates :last_name, presence: true
  validates :is_searching, :inclusion => { :in => [true, false] }
  validates :availability, presence: true
  validates :gender, presence: true
  validates :birthday, presence: true
  validates :school, presence: true
  validates :school_level, presence: true
  validates :phone, presence: true
  validates :introduction, presence: true
  validates :teaching_experience, presence: true
  validates :training_experience, presence: true
  validates :performance_experience, presence: true
  validates :address, presence: true
  validates :state, presence: true
  validates :zipcode, presence: true
  validates :location_preference, :inclusion => { :in => [true, false] }
  validates :travel_distance, presence: true
  validates :background_check, :inclusion => { :in => [true, false] }
  validates :reference1_first_name, presence: true
  validates :reference1_last_name, presence: true
  validates :reference1_relation, presence: true
  validates :reference1_email, presence: true
  validates :reference1_phone, presence: true
  validates :reference2_first_name, presence: true
  validates :reference2_last_name, presence: true
  validates :reference2_relation, presence: true
  validates :reference2_email, presence: true
  validates :reference2_phone, presence: true
  validates :criminal_charges, :inclusion => { :in => [true, false] }
  validates :youth_participation, :inclusion => { :in => [true, false] }
  validates :waiver_signature, presence: true
  validates :waiver_date, presence: true

  has_many :matchings
  has_many :lessons, through: :matchings
  has_many :students, through: :matchings
  has_many :instruments, as: :instrumentable, dependent: :destroy

  accepts_nested_attributes_for :instruments

  enum school_level: [ :high_school, :college ]
  enum state: [ :AL, :AK, :AZ, :AR, :CA, :CO, :CT, :DE, :FL, :GA,
                :HI, :ID, :IL, :IN, :IA, :KS, :KY, :LA, :ME, :MD,
                :MA, :MI, :MN, :MS, :MO, :MT, :NE, :NV, :NH, :NJ,
                :NM, :NY, :NC, :ND, :OH, :OK, :OR, :PA, :RI, :SC,
                :SD, :TN, :TX, :UT, :VT, :VA, :WA, :WV, :WI, :WY ]
  enum gender: [ :female, :male, :other ]
  enum travel_distance: [ :'I am not willing to travel', :'Up to 5 miles',
                          :'Up to 10 miles', :'Up to 20 miles',
                          :'20 miles or more']
                          
  def full_name
    "#{first_name} #{last_name}"
  end

  def full_address
    "#{address} #{address_apt}, #{state} #{zipcode}"
  end
  
  def submit_signup
    ForteMailer.teacher_signup_notify_admin(self).deliver_now
    ForteMailer.teacher_signup_notify_teacher(self).deliver_now
  end

end
