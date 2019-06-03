Rails.application.routes.draw do
  root 'orders#index'
  #get 'orders/new'

  resources :orders,     only: [:new, :create, :edit, :update]
  resources :purchase_orders
  resources :invoices
end
