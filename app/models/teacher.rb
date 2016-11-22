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

  has_many :matchings
  has_many :lessons, through: :matchings
  has_many :students, through: :matchings
  has_many :instruments, as: :instrumentable, dependent: :destroy

  accepts_nested_attributes_for :instruments
end
