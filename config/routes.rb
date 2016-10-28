Rails.application.routes.draw do

  get 'admin' => redirect('admin/matched')
  get 'admin/matched'
  get 'admin/lessons'
  get 'admin/roster'
  get 'admin/unmatched'

  get 'form/student'
  get 'form/teacher'

  root "static_pages#home"

  controller :static_pages do
    get :home
    get :involvement
    get :program
    get :contact
    get :about
  end

  resources :student, only: [] do
    member do
      get "my_lessons"
    end
  end

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

  namespace :api do
    get '/students/unmatched', to: 'students#unmatched'
    get '/teachers/possible_teachers/:id', to: 'teachers#possible_teachers'
    resources :students, only: [:index, :destroy, :show, :update]
    resources :teachers, only: [:index, :destroy, :show, :update]
    resources :lessons, only: [:index, :create, :destroy, :show, :update]
    resources :matchings, only: [:index, :create, :destroy, :show, :update]
  end

  # devise_scope :student do
  #   get "students/login" => "students/sessions#new"
  #   post "students/login" => "students/sessions#create"
  # end
  # The priority is based upon order of creation: first created -> highest priority.
  # See how all your routes lay out with "rake routes".

  # You can have the root of your site routed with "root"
  # root 'welcome#index'

  # Example of regular route:
  #   get 'products/:id' => 'catalog#view'

  # Example of named route that can be invoked with purchase_url(id: product.id)
  #   get 'products/:id/purchase' => 'catalog#purchase', as: :purchase

  # Example resource route (maps HTTP verbs to controller actions automatically):
  #   resources :products

  # Example resource route with options:
  #   resources :products do
  #     member do
  #       get 'short'
  #       post 'toggle'
  #     end
  #
  #     collection do
  #       get 'sold'
  #     end
  #   end

  # Example resource route with sub-resources:
  #   resources :products do
  #     resources :comments, :sales
  #     resource :seller
  #   end

  # Example resource route with more complex sub-resources:
  #   resources :products do
  #     resources :comments
  #     resources :sales do
  #       get 'recent', on: :collection
  #     end
  #   end

  # Example resource route with concerns:
  #   concern :toggleable do
  #     post 'toggle'
  #   end
  #   resources :posts, concerns: :toggleable
  #   resources :photos, concerns: :toggleable

  # Example resource route within a namespace:
  #   namespace :admin do
  #     # Directs /admin/products/* to Admin::ProductsController
  #     # (app/controllers/admin/products_controller.rb)
  #     resources :products
  #   end
end
