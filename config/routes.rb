Rails.application.routes.draw do
  root 'orders#index'

  resources :orders, only: %i(new create update) do
    put :update_shipment_status, on: :collection
  end

  resources :purchase_orders, only: %i(index show update destroy)
  resources :invoices, only: %i(index show)
end
