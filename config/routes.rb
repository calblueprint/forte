Rails.application.routes.draw do

  ##################################################
  #
  # Pages
  #
  ##################################################
  root "static_pages#home"

  ##################################################
  # Admin
  ##################################################
  get 'admin', to: redirect('admin/matched')
  namespace :admin do
    get :matched
    get :unmatched
    get :lessons
    get :roster
  end

  ##################################################
  # Student
  ##################################################
  get 'student', to: redirect('student/lessons')
  namespace :student do
    get :lessons
  end

  ##################################################
  # Teacher
  ##################################################
  get 'teacher', to: redirect('teacher/lessons')
  namespace :teacher do
    get :lessons
  end

  ##################################################
  # Form
  ##################################################
  namespace :form do
    get :student
    get :teacher
  end

  ##################################################
  # Home
  ##################################################
  controller :static_pages do
    get :home
    get :involvement
    get :program
    get :contact
    post :send_contact_email
    get :about
  end

  ##################################################
  #
  # Devise
  #
  ##################################################
  devise_for :students, controllers: {
    sessions: 'authentication/students/sessions',
    registrations: 'authentication/students/registrations'
  }

  devise_for :teachers, controllers: {
    sessions: 'authentication/teachers/sessions',
    registrations: 'authentication/teachers/registrations'
  }

  devise_for :admins, controllers: {
    sessions: 'authentication/admins/sessions',
    registrations: 'authentication/admins/registrations'
  }

  ##################################################
  #
  # API
  #
  ##################################################
  namespace :api do

    ##################################################
    # Instruments
    ##################################################
    resources :instruments, only: [:index, :create, :destroy, :show, :update]

    ##################################################
    # Lessons
    ##################################################
    resources :lessons, only: [:index, :create, :destroy, :show, :update]

    ##################################################
    # Matchings
    ##################################################
    resources :matchings, only: [:index, :create, :destroy, :show, :update]

    ##################################################
    # Search
    ##################################################
    get '/searchables/users/:prefix', to: 'searchables#users'
    get '/searchables/roster', to: 'searchables#roster'

    ##################################################
    # Students
    ##################################################
    resources :students, only: [:index, :destroy, :show, :update]
    get '/students/recent_lessons/:id', to: 'students#recent_lessons'
    get '/students/upcoming_lessons/:id', to: 'students#upcoming_lessons'
    get '/students/unmatched', to: 'students#unmatched'

    ##################################################
    # Teachers
    ##################################################
    resources :teachers, only: [:index, :destroy, :show, :update]
    get '/teachers/possible_teachers/:id', to: 'teachers#possible_teachers'
    get '/teachers/recent_lessons/:id', to: 'teachers#recent_lessons'
    get '/teachers/upcoming_lessons/:id', to: 'teachers#upcoming_lessons'

  end
end
