class Order < ActiveRecord::Base
	after_initialize { order_details.build unless self.persisted? || order_details.present? }
	before_create :calculate_order_price
	before_create :set_tax_price
	before_create :set_total_price

	#after_create :update_price

	before_update :calculate_order_price
	#after_update :update_price, :update_postage_price, :update_tax_price, on: :update
	# 削除する時の合計金額の計算が怪しい！！！！
	after_update :update_price, :update_postage_price, :update_tax_price, :update_total_price, on: :update

	belongs_to :company
	has_many :order_details, dependent: :destroy
	accepts_nested_attributes_for :order_details, allow_destroy: true
	accepts_nested_attributes_for :company


	ORDER_HISTORY_PARAMS = [:name, :postage, :company_id, :invoice_id, order_details_attributes: [:id, :order_id, :product_name, :quantity, :_destroy, :unit_price]]

	SUPPLIER_UPDATE_PARAMS = [:is_public, :postage, :created_at, :company_id, :price, :tax_price, :delivery_at, order_details_attributes: [:id, :product_name, :_destroy, :unit_price, :quantity]]

    UPDATE_ORDER_STATUS = [:order_status,:updated_at]

	validates :name, presence: true
	validates :company_id, presence: true

	acts_as_paranoid


	def select_order_status
	    case order_status
	    when "not_deliver"
	      [translate("not_deliver"), translate("in_progress"), translate("already_deliver")]
	    when "in_progress"
	      [translate("not_deliver"), translate("in_progress"), translate("already_deliver")]
	    when "already_deliver"
	      [translate("in_progress"), translate("already_deliver"), translate("recieved_products")]
	    when "recieved_products"
	      [translate("recieved_products"), translate("already_deliver")]
	    end
	end

	def translate order_status
    	[I18n.t("activerecord.order.order_status.#{order_status}"), order_status]
  	end


	private

	def calculate_order_price
	   order_details.each(&:calculate_order_detail_price)
	   self.price = order_details.map(&:price).sum
	end


	def set_tax_price
		if self.postage.blank?
			self.postage = 0
		end
		tmp_total_price = self.price + self.postage

	    self.tax_price = (tmp_total_price * 0.08)
	end

	def set_total_price
	    self.total_price = self.price + self.tax_price + self.postage
	end


	def update_price
	    #price = order_details.sum(:price)
	    update_columns price: self.price
	end

	def update_postage_price
	    update_columns postage: postage
	end

	def update_tax_price
		tmp_total_price = price + postage
	    update_columns tax_price: (tmp_total_price * 0.08)
	end

	def update_total_price
		tmp_total_price = price + postage + tax_price
	    update_columns total_price: tmp_total_price
	end


	def generate_invoice_code
	    random = Random.new
		random.rand(1..6)
	end
end
