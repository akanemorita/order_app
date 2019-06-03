class CreateOrderDetails < ActiveRecord::Migration[5.2]
  def change
    create_table :order_details do |t|
      t.integer :order_id
      t.string :product_name
      t.integer :unit_price
      t.integer :quantity
      t.integer :postage

      t.timestamps
    end
  end
end
