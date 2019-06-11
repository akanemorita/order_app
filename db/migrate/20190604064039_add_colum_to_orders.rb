class AddColumToOrders < ActiveRecord::Migration[5.2]
  def change
    add_column :orders, :deleted_at, :string
    add_column :orders, :datetime, :string
  end
end
