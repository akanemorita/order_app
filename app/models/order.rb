# Table name: orders # 注文
#
#  id             :integer          not null, primary key
#  is_public      :integer          not null              # 発注書、注文書が確定しているか
#  order_status   :string           not null              # 発注状況
#  price          :integer          not null              # 合計金額
#  created_at     :datetime         not null
#  updated_at     :datetime         not null

class Order < ActiveRecord::Base
	after_initialize { order_details.build unless self.persisted? || order_details.present? }
	before_validation :calculate_order_price

	has_many :order_details, dependent: :destroy, inverse_of: :order
	accepts_nested_attributes_for :order_details, allow_destroy: true

	private

		def calculate_order_price
		   order_details.each(&:calculate_order_detail_price)
		   self.price = order_details.map(&:price).sum
		end
end
