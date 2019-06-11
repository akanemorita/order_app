class Invoice < ActiveRecord::Base

  has_many :orders, ->{where type: Order::PUBLIC_TYPE}
  has_many :order_details, through: :orders
  has_many :invoice_details, dependent: :destroy

  before_validation :generate_invoice_code, on: :create

  acts_as_paranoid

  private
  def generate_invoice_code
    record = true
    while record
      random = Array.new(9){rand(9)}.join
      record = Invoice.where(invoice_code: random).exists?
    end
    self.invoice_code = random if invoice_code.blank?
  end
end
