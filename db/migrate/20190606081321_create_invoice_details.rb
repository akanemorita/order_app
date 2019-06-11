class CreateInvoiceDetails < ActiveRecord::Migration[5.2]
  def change
    create_table :invoice_details do |t|
      t.string :product_name
      t.integer :unit_price
      t.integer :quantity
      t.integer :price
      t.integer :tax_price
      t.integer :invoice_id
      t.datetime :deleted_at
      t.datetime :created_at
      t.datetime :updated_at

      t.timestamps
    end
  end
end
