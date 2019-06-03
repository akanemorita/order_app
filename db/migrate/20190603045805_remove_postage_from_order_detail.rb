class RemovePostageFromOrderDetail < ActiveRecord::Migration[5.2]
  def change
    remove_column :order_details, :postage, :integer
  end
end
