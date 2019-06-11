class CreateInvoices < ActiveRecord::Migration[5.2]
  def change
    create_table :invoices do |t|
      t.string :invoice_code
      t.integer :price
      t.datetime :deleted_at
      t.datetime :created_at
      t.datetime :updated_at
      t.integer :tax_price
      t.integer :company_id

      t.timestamps
    end
  end
end
