class Stripe::CustomersController < Stripe::BaseController 
  def create_customer

    token = params[:stripe_token]
    customer = Stripe::Customer.create(
      :source => token,
      :description => 'New Student Stripe Account'
    )

    render json: customer, status: 201

  end
end
