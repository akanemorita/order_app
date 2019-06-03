class AddPostageToOrder < ActiveRecord::Migration[5.2]
  def change
    add_column :orders, :postage, :integer
  end
end
