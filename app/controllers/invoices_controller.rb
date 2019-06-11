class InvoicesController < ApplicationController

	# 請求書一覧
	def index
		# sum→合計金額、count→注文数
	    @invoices = Order.group(:company_id).select("*, sum(orders.total_price) as total_invoice_price,count(orders.id) as count").paginate(page: params[:page], per_page: 10).includes(:company).to_a
	end

	# 請求書詳細
	def show
    	@company = Company.find(params[:id])
    	@invoices = Order.where(company_id: params[:id]).to_a
    	@invoices_prices = Order.select("*, sum(orders.total_price) as invoice_all_price, sum(orders.postage) as total_invoice_postage,sum(orders.tax_price) as total_invoice_tax_price, sum(orders.price) as total_invoice_price").where(company_id: params[:id]).to_a
	end
end
