# Table name: order_details # 注文明細
#
#  id           :integer          not null, primary key
#  order_id     :integer          not null              # 注文ID
#  product_name :string           not null              # 商品名
#  unit_price   :integer          not null              # 単価
#  quantity     :integer          not null              # 数量
#  created_at   :datetime         not null
#  updated_at   :datetime         not null

class OrderDetail < ActiveRecord::Base

	belongs_to :order

	validates :product_name, presence: true
	validates :unit_price, presence: true, numericality: {only_integer: true}, length: {maximum: 10}
	validates :quantity, presence: true, length: {maximum: 10}
	validates :quantity, numericality: {greater_than_or_eq: 0}
	validates :quantity, numericality: {greater_than: 0}

	acts_as_paranoid

	# 合計金額を計算する
	def calculate_order_detail_price
	   	self.price = unit_price * quantity
	rescue
	    self.price = 0
	end
end
