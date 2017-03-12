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
  resources :admin do
    collection do
      get :matched
      get :unmatched
      get :lessons
      get :roster
      get 'roster/students/:id', to: 'admin#student'
      get 'roster/teachers/:id', to: 'admin#teacher'
    end
  end

  ##################################################
  # Student
  ##################################################
  get 'student', to: redirect('student/lessons')
  namespace :student do
    get :lessons
    get :settings
    get :profile
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
    get :terms
  end

  ##################################################
  #
  # Devise
  #
  ##################################################
  devise_for :students, controllers: {
    sessions: 'authentication/students/sessions',
    registrations: 'authentication/students/registrations',
    passwords: 'authentication/students/passwords'
  }

  devise_for :teachers, controllers: {
    sessions: 'authentication/teachers/sessions',
    registrations: 'authentication/teachers/registrations',
    passwords: 'authentication/teachers/passwords'

  }

  devise_for :admins, controllers: {
    sessions: 'authentication/admins/sessions',
    registrations: 'authentication/admins/registrations',
    passwords: 'authentication/admins/passwords'
  }

  ##################################################
  #
  # Change Passwords
  #
  ##################################################

  devise_scope :student do
    post 'passwords/students/reset_request', to: 'authentication/students/passwords#send_token'
    post 'passwords/students/reset_password', to: 'authentication/students/passwords#reset_password'
  end

  resource :student, only: [:edit] do
    collection do
      patch 'reset_password'
    end
  end

  devise_scope :teacher do
    post 'passwords/teachers/reset_request', to: 'authentication/teachers/passwords#send_token'
    post 'passwords/teachers/reset_password', to: 'authentication/teachers/passwords#reset_password'
  end

  resource :teacher, only: [:edit] do
    collection do
      patch 'reset_password'
    end
  end

  devise_scope :admin do
    post 'passwords/admins/reset_request', to: 'authentication/admins/passwords#send_token'
    post 'passwords/admins/reset_password', to: 'authentication/admins/passwords#reset_password'
  end

  resource :admin, only: [:edit] do
    collection do
      patch 'reset_password'
    end
  end

  ##################################################
  # Stripe
  ##################################################
  namespace :stripe do
    post '/customer', to: 'customers#create_customer'
    post '/update_customer', to: 'customers#update_customer'
    post '/charge', to: 'charges#charge_customer'
    post '/account', to: 'accounts#create_account'
    post '/verify_account', to: 'accounts#update_account'
  end

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
    get '/searchables/users', to: 'searchables#users'
    get '/searchables/roster', to: 'searchables#roster'

    ##################################################
    # Students
    ##################################################
    get '/students/recent_lessons/:id', to: 'students#recent_lessons'
    get '/students/upcoming_lessons/:id', to: 'students#upcoming_lessons'
    get '/students/unmatched', to: 'students#unmatched'
    get '/students/:id/instruments', to: 'students#instruments'
    post '/students/validate', to: 'students#validate'
    resources :students, only: [:index, :destroy, :show, :update]


    ##################################################
    # Teachers
    ##################################################
    get '/teachers/possible_teachers/:id', to: 'teachers#possible_teachers'
    get '/teachers/recent_lessons/:id', to: 'teachers#recent_lessons'
    get '/teachers/upcoming_lessons/:id', to: 'teachers#upcoming_lessons'
    get '/teachers/possible_teachers', to: 'teachers#possible_teachers'
    resources :teachers, only: [:index, :destroy, :show, :update]

  end
end
