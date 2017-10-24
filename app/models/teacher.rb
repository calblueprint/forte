class Teacher < ActiveRecord::Base
  include PgSearch

  multisearchable :against => [:last_name, :first_name, :email]

  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :trackable, :validatable

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
  validates :teach_for_free, :inclusion => { :in => [true, false] }
  validates :travel_distance, presence: true
  validates :background_check, :inclusion => { :in => [true, false] }
  validates :reference1_first_name, presence: true
  validates :reference1_last_name, presence: true
  validates :reference1_relation, presence: true
  validates_format_of :reference1_email, :with => Devise::email_regexp
  validates :reference1_phone, presence: true
  validates :criminal_charges, :inclusion => { :in => [true, false] }
  validates :youth_participation, :inclusion => { :in => [true, false] }
  validates :waiver_signature, presence: true
  validates :waiver_date, presence: true

  has_many :matchings, dependent: :destroy
  has_many :lessons, through: :matchings, dependent: :destroy
  has_many :students, through: :matchings, dependent: :destroy
  has_many :instruments, as: :instrumentable, dependent: :destroy

  accepts_nested_attributes_for :instruments

  enum school_level: [ :high_school, :college, :other ]
  enum state: [ :AL, :AK, :AZ, :AR, :CA, :CO, :CT, :DE, :FL, :GA,
                :HI, :ID, :IL, :IN, :IA, :KS, :KY, :LA, :ME, :MD,
                :MA, :MI, :MN, :MS, :MO, :MT, :NE, :NV, :NH, :NJ,
                :NM, :NY, :NC, :ND, :OH, :OK, :OR, :PA, :RI, :SC,
                :SD, :TN, :TX, :UT, :VT, :VA, :WA, :WV, :WI, :WY ]
  enum gender: [ :Female, :Male ]
  enum travel_distance: [ :'I am not willing to travel', :'Up to 5 miles',
                          :'Up to 10 miles', :'Up to 20 miles',
                          :'20 miles or more']

  def full_name
    "#{first_name} #{last_name}"
  end

  def full_address
    "#{address} #{address2}, #{state} #{zipcode}"
  end

  def submit_signup
    self.timezone = Timezone.lookup(self.lat, self.lng)
    self.save()
    ForteMailer.teacher_signup_notify_admin(self).deliver_now
    ForteMailer.teacher_signup_notify_teacher(self).deliver_now
  end
end
