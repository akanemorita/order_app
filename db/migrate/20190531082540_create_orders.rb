class CreateOrders < ActiveRecord::Migration[5.2]
  def change
    create_table :orders do |t|
      t.integer :is_public
      t.string :order_status

      t.timestamps
    end
  end
end
