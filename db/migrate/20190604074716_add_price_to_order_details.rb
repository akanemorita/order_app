class AddPriceToOrderDetails < ActiveRecord::Migration[5.2]
  def change
    add_column :order_details, :price, :intege
  end
end
