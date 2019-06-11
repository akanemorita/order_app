class PurchaseOrdersController < ApplicationController

	# 注文書一覧
	def index
	    @purchase_orders = Order.order(created_at: :desc).paginate(page: params[:page], per_page: 10).includes(:company).to_a
	end

	def show
		@order_history = Order.find(params[:id])
		company = @order_history.company
	end

	# 注文書：更新する
	def update
	    @restaurant_order = Order.find_by id: params[:id]
	    respond_to do |format|
	      if @restaurant_order.update purchase_params

	        format.html{redirect_to purchase_order_path(@restaurant_order)}
	      else
	        format.html{redirect_to purchase_order_path(@restaurant_order)}
	      end
	      #format.js{render layout: false}
	      format.html { render :nothing => true }
	    end
	end

	# 注文書：削除
	def destroy
	    @order = Order.find_by(id: params[:id])
	    @order.destroy
	    redirect_to purchase_orders_path
	end

	private
	def purchase_params
	    params.require(:order).permit(Order::SUPPLIER_UPDATE_PARAMS)
	end

end
