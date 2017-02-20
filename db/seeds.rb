# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
require 'active_support/core_ext/numeric/time.rb'

$instruments_array = ["Piano", "Clarinet", "Violin"]

def create_single_admin(n)
  admin = Admin.create(
    email: "admin_#{n}@gmail.com",
    password: "password"
  )
  admin
end

def get_address
  addresses = [
      {
        address: "2520 Regent Street",
        city: "Berkeley",
        address_2: "Apartment #5",
        state: 4,
        zip_code: "94704"
      },
      {
        address: "1596 Bellemead Street",
        city: "San Jose",
        address_2: "",
        state: 4,
        zip_code: "95131"
      },
      {
        address: "10225 Orange Avenue",
        city: "Cupertino",
        address_2: "",
        state: 4,
        zip_code: "95014"
      },
      {
        address: "2220 Dwight Way",
        city: "Berkeley",
        address_2: "Apartment #101",
        state: 4,
        zip_code: "94704"
      },
      {
        address: "2400 Durant Avenue",
        city: "Berkeley",
        address_2: "",
        state: 4,
        zip_code: "94704"
      },
      {
        address: "225 Bush Street",
        city: "San Francisco",
        address_2: "",
        state: 4,
        zip_code: "94104"
      },
      {
        address: "450 Serra Mall",
        city: "Palo Alto",
        address_2: "",
        state: 4,
        zip_code: "94305"
      },
      {
        address: "21840 McClellan Road",
        city: "Cupertino",
        address_2: "",
        state: 4,
        zip_code: "95014"
      },
      {
        address: "99 Grove Street",
        city: "San Francisco",
        address_2: "",
        state: 4,
        zip_code: "94102"
      },
      {
        address: "1807 Telegraph Ave",
        city: "Oakland",
        address_2: "",
        state: 4,
        zip_code: "94612"
      },
    ]
    return addresses.sample
end

def create_single_teacher(is_searching, n)
  address = get_address
  teacher = Teacher.create(
    is_searching: is_searching,
    email: Faker::Internet.email,
    first_name: Faker::Name.first_name,
    last_name: Faker::Name.last_name,
    city: address[:city],
    phone: Faker::Base.numerify('###-###-####'),
    password: "password",
    availability: [35, 36, 37, 38, 39, 42, 43, 44],
    gender: Faker::Number.between(0, 2),
    birthday: Faker::Date.between(35.years.ago, 15.years.ago),
    school: "#{Faker::Name.first_name} College",
    school_level: Faker::Number.between(0, 1),
    introduction: Faker::Lorem.paragraph(4),
    teaching_experience: Faker::Lorem.paragraph(4),
    training_experience: Faker::Lorem.paragraph(4),
    performance_experience: Faker::Lorem.paragraph(4),
    address: address[:address],
    address_apt: address[:address_2],
    state: address[:state],
    zipcode: address[:zip_code],
    location_preference: Faker::Boolean.boolean,
    travel_distance: Faker::Number.between(0, 4),
    background_check: Faker::Boolean.boolean,
    reference1_first_name: Faker::Name.first_name,
    reference1_last_name: Faker::Name.last_name,
    reference1_relation: 'Former Student',
    reference1_email: Faker::Internet.email,
    reference1_phone: Faker::Base.numerify('###-###-####'),
    reference2_first_name: Faker::Name.first_name,
    reference2_last_name: Faker::Name.last_name,
    reference2_relation: 'Former Boss',
    reference2_email: Faker::Internet.email,
    reference2_phone: Faker::Base.numerify('###-###-####'),
    criminal_charges: Faker::Boolean.boolean,
    youth_participation: Faker::Boolean.boolean,
    criminal_explanation: Faker::Lorem.paragraph(4),
    waiver_signature: Faker::Name.first_name,
    waiver_date: Faker::Date.between(2.days.ago, Date.today),
    account_id: 'acct_19MVqrLZTzaZNknc',
    bank_id: 'ba_19MVqrLZTzaZNknc3j6nq743',
  )
  teacher
end

def create_unmatched_teachers
  puts  "Creating unmatched teachers"
  10.times do |n|
    teacher = create_single_teacher(true, n)
    teacher.instruments.build(
      name: $instruments_array[n%3],
      years_played: n % 6,
      proficiency: n % 5,
      is_primary: true,
    ).save
  end
end

def create_single_student(n)
  address = get_address
  student = Student.create(
    city: address[:city],
    first_name: Faker::Name.first_name,
    last_name: Faker::Name.first_name,
    email: Faker::Internet.email,
    password: "password",
    availability: [35, 36, 37, 38, 39, 42, 43, 44],
    gender: Faker::Number.between(0, 2),
    birthday: Faker::Date.between(15.years.ago, 5.years.ago),
    school: "#{Faker::Name.first_name} Middle School",
    school_level: Faker::Number.between(0, 12),
    guardian_first_name: Faker::Name.first_name,
    guardian_last_name: Faker::Name.last_name,
    guardian_phone: Faker::Base.numerify('###-###-####'),
    introduction: Faker::Lorem.paragraph(4),
    lesson_experience: Faker::Lorem.paragraph(4),
    performance_experience: Faker::Lorem.paragraph(4),
    student_email: Faker::Internet.email,
    student_phone: Faker::Base.numerify('###-###-####'),
    address: address[:address],
    address_apt: address[:address_2],
    state: address[:state],
    zipcode: address[:zip_code],
    location_preference: Faker::Boolean.boolean,
    travel_distance: Faker::Number.between(0, 4),
    income_range: Faker::Number.between(0, 4),
    household_number: Faker::Number.between(0, 10),
    disciplinary_action: Faker::Boolean.boolean,
    criminal_charges: Faker::Boolean.boolean,
    criminal_explanation: Faker::Lorem.paragraph(4),
    waiver_signature: Faker::Name.first_name,
    waiver_date: Faker::Date.between(2.days.ago, Date.today),
    customer_id: 'cus_9frHntw1ew0W9H', #TODO: point id to Stripe user id
  )
  student
end

def create_unmatched_students
  puts  "Creating unmatched students"
  10.times do |n|
    student = create_single_student(n)
    student.instruments.build(
      name: $instruments_array[n%3],
      years_played: n % 6,
      proficiency: n % 5,
      is_primary: true,
    ).save
  end
end

def create_single_matching(teacher, student, instrument_name)
  matching = Matching.create(
    instrument: instrument_name,
    lesson_time: [student.availability[0], student.availability[1], student.availability[2]],
    student_id: student.id,
    teacher_id: teacher.id,
    location: teacher.address,
    default_price: 15.00,
  )
  matching
end

def create_single_lesson(matching, upcoming=true, month_offset)
  start_time = upcoming ?
      (Date.today + (month_offset + 1).month + 9.hours + (15 * matching.student.availability[0].to_i).minutes) :
      (Date.today.months_ago(month_offset) + 9.hours + (15 * matching.student.availability[0].to_i).minutes)
  paid = upcoming || month_offset==0 ? false : true;
  lesson = Lesson.create(
    start_time: start_time,
    end_time: start_time + 45.minutes,
    price: 15.00,
    is_paid: paid,
    matching_id: matching.id,
  )
  lesson.save
end

def create_lessons_and_matchings_with_matched_teachers_and_students
  puts "creating matchings and lessons"
  10.times do |n|
    teacher = create_single_teacher(false, n)
    instrument_name = $instruments_array[n%3]
    teacher.instruments.build(
      name: instrument_name,
      years_played: n % 6,
      proficiency: n % 5,
      is_primary: true,
    ).save

    student = create_single_student(n)
    student.instruments.build(
      name: instrument_name,
      years_played: n % 6,
      proficiency: n % 5,
      is_primary: true,
    ).save
    puts 'Student Email:' + student.email
    puts 'Teacher Email:' + teacher.email
    matching = create_single_matching(teacher, student, instrument_name)
    7.times do |offset|
      create_single_lesson(matching, upcoming=true, offset)
      create_single_lesson(matching, upcoming=false, offset)
    end
  end
end

# def create_multiple_student_lessons_and_matchings_for_teachers
#   matched_teachers = Teacher.where(is_searching: false)
#   matched_students = Student.limit(10)
#   instrument_name = $instruments_array[0] # Instrument doesn't matter for now

#   # Create a matching between every student and teacher

#   matched_students.each do |student|
#     matched_teachers.each do |teacher|
#       matching = create_single_matching(teacher, student, instrument_name)
#       create_single_lesson(matching, upcoming=true, offset=1) # Arbitrary offset
#       create_single_lesson(matching, upcoming=false, offset=1)
#     end
#   end
# end

def create_admin_accounts
  puts "creating admin accounts"
  1.times do |n|
    create_single_admin(n)
  end
end

if Admin.count == 0
  create_admin_accounts
end

if Teacher.count == 0
  create_unmatched_teachers
end

if Student.count == 0
  create_unmatched_students
end

if Lesson.count == 0 && Matching.count == 0
  create_lessons_and_matchings_with_matched_teachers_and_students
  # create_multiple_student_lessons_and_matchings_for_teachers
end
