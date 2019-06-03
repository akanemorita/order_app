class OrdersController < ApplicationController
  before_action :set_order, only: [:edit, :update]

  def index

  end

  # 注文書一覧
  def list
    @orders = Order.paginate(page: params[:page], per_page: 20)
  end

  def show
    @order = Order.find(params[:id])
  end

  def new
  	@order =  Order.new
  end

  # 注文書：編集する
  def edit
    @order = Order.find(params[:id])
  end

  # 発注書作成
  def create
  	# input data
  	@order = Order.new(order_params)
  	# 保存
  	if @order.save
  		#success
      flash[:info] = "発注書を作成したよ！"
  		redirect to orders_path
  	else
  		#falied
  		render 'new'
  	end
  end


  # 注文書：更新する
  def update
    if @order.update_attributes(order_params)
      redirect_to orders_path, notice: "受注 #{@order.name} を更新しました。"
    else
      render :edit
    end
  end

  # 注文書：削除する
  def destroy
    Order.find(params[:id]).destroy
    redirect_to orders_url, notice: '受注を削除しました。'
  end


  private

    def set_order
      @order = Form::Order.find(params[:id])
    end

    def order_params
      params.require(:order).permit(:product_name,:unit_price,:quantity)
    end

end
