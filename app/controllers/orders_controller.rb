class OrdersController < ApplicationController

  def index
    @orders = Order.paginate(page: params[:page], per_page: 20)
  end

  def show
    @order = Order.find(params[:id])
  end

  def new
  	@order =  Order.new
  end

  # 発注書作成
  def create
  	# input data
  	@order = Order.new(order_params)
  	# 保存
  	if @order.save
  		#success
      flash[:success] = "発注書を作成したよ！注文一覧を確認してみてね！"
  		redirect_to new_order_path
  	else
  		#falied
  		render :new
  	end
  end

  # 配送状況の更新
  #def update
  #  @order = Order.find_by id: params[:id]
  #  respond_to do |format|
  #    if @order.update params[:orders][:order_status]
  #    #if @order.public_send params[:orders][:order_status]
  #      format.json do
  #        render json: {id: @order.id, order_status: @order.order_status, selectbox: @order.select_order_status}
  #      end
  #    else
  #      format.json{render json: {errors: @order.errors.full_messages}}
  #    end
  #  end
  #end

  private

    def order_params
      params.require(:order).permit(Order::ORDER_HISTORY_PARAMS).merge order_status: "not_deliver", is_public: true
    end

    def status_params
      params.require(:order).permit(Order::UPDATE_ORDER_STATUS)
    end

end
