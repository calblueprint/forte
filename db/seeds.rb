# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
require 'active_support/core_ext/numeric/time.rb'

$instruments_array = ["piano", "clarinet", "violin"]

def create_single_teacher(is_searching, n)
  label = is_searching ? "searching" : "matched"

  teacher = Teacher.create(
    is_searching: is_searching,
    instruments: [$instruments_array[n%3]],
    email: "#{label}_teacher_#{n}@gmail.com",
    first_name: Faker::Name.first_name,
    last_name: Faker::Name.first_name,
    city: Faker::Address.city,
    password: "password",     
    availability: ["#{n}", "#{n+1}", "#{n+2}", "#{n+4}", "#{n+5}", "#{n+6}", "#{n+7}", "#{n+8}", "#{n+9}", "#{n+10}"],
  )
  teacher
end

def create_unmatched_teachers
  puts  "Creating unmatched teachers"
  10.times do |n|
    create_single_teacher(true, n)
  end
end

def create_single_student(is_searching, n)
  label = is_searching ? "searching" : "matched"

  student = Student.create(
    availability: ["#{n}", "#{n+1}", "#{n+2}", "#{n+4}", "#{n+5}", "#{n+6}", "#{n+7}", "#{n+8}", "#{n+9}", "#{n+10}"],
    city: Faker::Address.city,
    first_name: Faker::Name.first_name,
    last_name: Faker::Name.first_name,
    email: "#{label}_student_#{n}@gmail.com",
    instrument: $instruments_array[n%3],
    password: "password",
  )
  student
end

def create_unmatched_students
  puts  "Creating unmatched students"
  10.times do |n|
    create_single_student(true, n)
  end
end

def create_single_matching(teacher, student)
  matching = Matching.create(
    instrument: student.instrument,
    lesson_time: [student.availability[0], student.availability[1], student.availability[2]],
    student_id: student.id,
    teacher_id: teacher.id,
  )
  matching
end

def create_single_lesson(teacher, student, n)
  start_time = (7*n).days.ago + (15 * student.availability[0].to_i).minutes
  lesson = Lesson.create(
    start_time: start_time,
    end_time: start_time + 45.minutes,
    price: 15.0,
    is_paid: true,
    feedback: Faker::Lorem.paragraph,
    student_id: student.id,
    teacher_id: teacher.id,
  )
  lesson
end

def create_lessons_and_matchings_with_matched_teachers_and_students
  puts "creating matchings and lessons"
  10.times do |n|
    teacher = create_single_teacher(false, n)
    student = create_single_student(false, n)
    create_single_matching(teacher, student)

    15.times do |k|
      create_single_lesson(teacher, student, k)
    end
  end
end
          
create_unmatched_teachers
create_unmatched_students
create_lessons_and_matchings_with_matched_teachers_and_students
