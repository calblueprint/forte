# encoding: UTF-8
# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 20170406050053) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "admins", force: :cascade do |t|
    t.datetime "created_at",                          null: false
    t.datetime "updated_at",                          null: false
    t.string   "email",                  default: "", null: false
    t.string   "encrypted_password",     default: "", null: false
    t.string   "reset_password_token"
    t.datetime "reset_password_sent_at"
    t.datetime "remember_created_at"
    t.integer  "sign_in_count",          default: 0,  null: false
    t.datetime "current_sign_in_at"
    t.datetime "last_sign_in_at"
    t.inet     "current_sign_in_ip"
    t.inet     "last_sign_in_ip"
  end

  add_index "admins", ["email"], name: "index_admins_on_email", unique: true, using: :btree
  add_index "admins", ["reset_password_token"], name: "index_admins_on_reset_password_token", unique: true, using: :btree

  create_table "instruments", force: :cascade do |t|
    t.string   "name"
    t.integer  "years_played"
    t.boolean  "is_primary",          default: false, null: false
    t.integer  "instrumentable_id"
    t.string   "instrumentable_type"
    t.datetime "created_at",                          null: false
    t.datetime "updated_at",                          null: false
    t.integer  "proficiency"
  end

  add_index "instruments", ["instrumentable_type", "instrumentable_id"], name: "index_instruments_on_instrumentable_type_and_instrumentable_id", using: :btree

  create_table "lessons", force: :cascade do |t|
    t.boolean  "is_paid",                                  default: false, null: false
    t.datetime "created_at",                                               null: false
    t.datetime "updated_at",                                               null: false
    t.datetime "start_time"
    t.datetime "end_time"
    t.decimal  "price",            precision: 8, scale: 2
    t.integer  "matching_id"
    t.string   "location"
    t.text     "student_feedback"
    t.text     "teacher_feedback"
  end

  add_index "lessons", ["matching_id"], name: "index_lessons_on_matching_id", using: :btree

  create_table "matchings", force: :cascade do |t|
    t.string   "instrument",                 null: false
    t.datetime "created_at",                 null: false
    t.datetime "updated_at",                 null: false
    t.integer  "student_id"
    t.integer  "teacher_id"
    t.integer  "lesson_time",   default: [], null: false, array: true
    t.string   "location"
    t.decimal  "default_price"
  end

  add_index "matchings", ["student_id"], name: "index_matchings_on_student_id", using: :btree
  add_index "matchings", ["teacher_id"], name: "index_matchings_on_teacher_id", using: :btree

  create_table "pg_search_documents", force: :cascade do |t|
    t.text     "content"
    t.integer  "searchable_id"
    t.string   "searchable_type"
    t.datetime "created_at",      null: false
    t.datetime "updated_at",      null: false
  end

  add_index "pg_search_documents", ["searchable_type", "searchable_id"], name: "index_pg_search_documents_on_searchable_type_and_searchable_id", using: :btree

  create_table "students", force: :cascade do |t|
    t.string   "city"
    t.string   "first_name"
    t.string   "last_name"
    t.datetime "created_at",                          null: false
    t.datetime "updated_at",                          null: false
    t.string   "email",                  default: "", null: false
    t.string   "encrypted_password",     default: "", null: false
    t.string   "reset_password_token"
    t.datetime "reset_password_sent_at"
    t.datetime "remember_created_at"
    t.integer  "sign_in_count",          default: 0,  null: false
    t.datetime "current_sign_in_at"
    t.datetime "last_sign_in_at"
    t.inet     "current_sign_in_ip"
    t.inet     "last_sign_in_ip"
    t.integer  "availability",           default: [],              array: true
    t.integer  "gender"
    t.datetime "birthday"
    t.string   "school"
    t.integer  "school_level"
    t.string   "guardian_first_name"
    t.string   "guardian_last_name"
    t.string   "guardian_phone"
    t.text     "introduction"
    t.text     "lesson_experience"
    t.text     "performance_experience"
    t.string   "student_email"
    t.string   "student_phone"
    t.string   "address"
    t.string   "address2"
    t.integer  "state"
    t.integer  "zipcode"
    t.boolean  "location_preference"
    t.integer  "travel_distance"
    t.integer  "income_range"
    t.integer  "household_number"
    t.boolean  "disciplinary_action"
    t.boolean  "criminal_charges"
    t.string   "waiver_signature"
    t.datetime "waiver_date"
    t.string   "customer_id"
    t.decimal  "lat"
    t.decimal  "lng"
    t.string   "timezone"
  end

  add_index "students", ["email"], name: "index_students_on_email", unique: true, using: :btree
  add_index "students", ["reset_password_token"], name: "index_students_on_reset_password_token", unique: true, using: :btree

  create_table "teachers", force: :cascade do |t|
    t.boolean  "is_searching",           default: true
    t.datetime "created_at",                             null: false
    t.datetime "updated_at",                             null: false
    t.string   "email",                  default: "",    null: false
    t.string   "encrypted_password",     default: "",    null: false
    t.string   "reset_password_token"
    t.datetime "reset_password_sent_at"
    t.datetime "remember_created_at"
    t.integer  "sign_in_count",          default: 0,     null: false
    t.datetime "current_sign_in_at"
    t.datetime "last_sign_in_at"
    t.inet     "current_sign_in_ip"
    t.inet     "last_sign_in_ip"
    t.string   "city"
    t.string   "first_name"
    t.string   "last_name"
    t.integer  "availability",           default: [],                 array: true
    t.integer  "gender"
    t.datetime "birthday"
    t.string   "school"
    t.string   "phone"
    t.text     "introduction"
    t.text     "teaching_experience"
    t.text     "training_experience"
    t.text     "performance_experience"
    t.string   "address"
    t.string   "address2"
    t.integer  "state"
    t.integer  "zipcode"
    t.boolean  "location_preference"
    t.integer  "travel_distance"
    t.boolean  "background_check"
    t.string   "reference1_first_name"
    t.string   "reference1_last_name"
    t.string   "reference1_relation"
    t.string   "reference1_email"
    t.string   "reference1_phone"
    t.boolean  "criminal_charges"
    t.boolean  "youth_participation"
    t.text     "criminal_explanation"
    t.string   "waiver_signature"
    t.datetime "waiver_date"
    t.integer  "school_level"
    t.string   "account_id"
    t.string   "bank_id"
    t.string   "sign_up_ip"
    t.decimal  "lat"
    t.decimal  "lng"
    t.string   "timezone"
    t.boolean  "teach_for_free",         default: false
  end

  add_index "teachers", ["email"], name: "index_teachers_on_email", unique: true, using: :btree
  add_index "teachers", ["reset_password_token"], name: "index_teachers_on_reset_password_token", unique: true, using: :btree

  add_foreign_key "lessons", "matchings"
  add_foreign_key "matchings", "students"
  add_foreign_key "matchings", "teachers"
end
