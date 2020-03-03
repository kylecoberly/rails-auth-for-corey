Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  resources :users, only: [:create]
  resources :eggs, only: [:index, :create]
  post "login", to: "authentication#login"
end
