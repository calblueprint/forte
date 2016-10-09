class Teacher < ActiveRecord::Base
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :trackable, :validatable
  # TODO(shimmy): Uncomment these when models have been created
  # has_many :matchings
  # has_many :lessons
  # has_many :students, through: :matchings
end
