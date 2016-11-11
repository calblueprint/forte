# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
require 'active_support/core_ext/numeric/time.rb'

$instruments_array = ["piano", "clarinet", "violin"]

def create_single_admin(n)
  admin = Admin.create(
    email: "admin_#{n}@gmail.com",
    password: "password"
  )
  admin
end

def create_single_teacher(is_searching, n)
  teacher = Teacher.create(
    is_searching: is_searching,
    email: Faker::Internet.email,
    first_name: Faker::Name.first_name,
    last_name: Faker::Name.first_name,
    city: Faker::Address.city,
    password: "password",
    availability: [n, n+1, n+2, n+4, n+5, n+6, n+7, n+8, n+9, n+10],
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

def create_single_student(is_searching, n)
  student = Student.create(
    availability: [n, n+1, n+2, n+4, n+5, n+6, n+7, n+8, n+9, n+10],
    city: Faker::Address.city,
    first_name: Faker::Name.first_name,
    last_name: Faker::Name.first_name,
    email: Faker::Internet.email,
    password: "password",
  )
  student
end

def create_unmatched_students
  puts  "Creating unmatched students"
  10.times do |n|
    student = create_single_student(true, n)
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
  )
  matching
end

def create_single_lesson(teacher, student, upcoming=true, month_offset)
  start_time = upcoming ?
      (Date.today + (15 * student.availability[0].to_i).minutes) :
      (Date.today.months_ago(month_offset) + (15 * student.availability[0].to_i).minutes)
  lesson = Lesson.create(
    start_time: start_time,
    end_time: start_time + 45.minutes,
    price: 15.0,
    is_paid: true,
    feedback: Faker::Lorem.paragraph,
    student_id: student.id,
    teacher_id: teacher.id,
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

    student = create_single_student(false, n)
    student.instruments.build(
      name: instrument_name,
      years_played: n % 6,
      proficiency: n % 5,
      is_primary: true,
    ).save
    puts student.email

    create_single_matching(teacher, student, instrument_name)

    7.times do |offset|
      create_single_lesson(teacher, student, upcoming=true, offset)
      create_single_lesson(teacher, student, upcoming=false, offset)
    end
  end
end

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
end
