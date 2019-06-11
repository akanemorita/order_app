class AddColumToOrderDetails < ActiveRecord::Migration[5.2]
  def change
    add_column :order_details, :deleted_at, :datetime
  end
end
