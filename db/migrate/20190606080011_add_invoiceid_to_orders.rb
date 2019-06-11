class AddInvoiceidToOrders < ActiveRecord::Migration[5.2]
  def change
    add_column :orders, :invoice_id, :integer
  end
end
