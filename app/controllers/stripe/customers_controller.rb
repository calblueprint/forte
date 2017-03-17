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

  def update_customer
    token = params[:stripe_token]
    email = params[:email]
    customer = Stripe::Customer.retrieve(params[:customer_id])
    customer.source = token
    customer.email = email
    customer.description = 'Update Student Stripe Account'
    puts customer
    customer.save

    render json: customer, status: 201
  end

end
