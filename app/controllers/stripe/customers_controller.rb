class Stripe::CustomersController < Stripe::BaseController 
  def create_customer

    token = params[:stripe_token]
    email = params[:email]

    customer = Stripe::Customer.create(
      :source => token,
      :email => email,
      :description => 'New Student Stripe Account'
    )

    render json: customer, status: 201

  end
end
