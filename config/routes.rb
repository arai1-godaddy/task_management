Rails.application.routes.draw do
  namespace :api do
    resources :tasks, only: [:index, :show, :create, :update, :destroy]
  end
  # get "tasks/index"
  # get "tasks/show"
  # get "tasks/create"
  # get "tasks/update"
  # get "tasks/destroy"
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Reveal health status on /up that returns 200 if the app boots with no exceptions, otherwise 500.
  # Can be used by load balancers and uptime monitors to verify that the app is live.
  get "up" => "rails/health#show", as: :rails_health_check

  # Defines the root path route ("/")
  # root "posts#index"
  post "sign_up", to: "users#create"
  resources :confirmations, only: [:create, :edit, :new], param: :confirmation_token
  post "login", to: "sessions#create"
  delete "logout", to: "sessions#destroy"

  get 'tasks/filtering', to: 'task_filtering#index'
  get 'tasks/options', to: 'task_filtering#options'

end
