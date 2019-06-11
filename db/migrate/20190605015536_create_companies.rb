class CreateCompanies < ActiveRecord::Migration[5.2]
  def change
    create_table :companies do |t|
      t.string :name
      t.string :zipcode1
      t.string :zipcode2
      t.string :state
      t.string :city
      t.string :address
      t.string :address2
      t.string :tel

      t.timestamps
    end
  end
end
