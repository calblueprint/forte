class Stripe::ChargesController < Stripe::BaseController
  def charge_customer
    student = Student.find params[:student_id]
    teacher = Teacher.find params[:teacher_id]
    amount = params[:amount]
    begin

    charge = Stripe::Charge.create(
      :amount => amount, # in cents
      :currency => "usd",
      :customer => student.customer_id,
      :destination => teacher.account_id
    )
    render json: charge, status: 201

    rescue Stripe::CardError => e
      unprocessable_response student
    end
  end

  def donation_charge
    Stripe.api_key = "sk_test_oh7F8cfhKpQ4nyhc6zSuSn5M"
    amount = params[:amount]
    token = params[:stripe_token]
    puts amount
    customer = Stripe::Customer.create(
      :source => token,
    )
    charge = Stripe::Charge.create(
      :amount => amount*100,
      :currency => "usd",
      :description => "Forte Donation Charge",
      :customer => customer.id,
    )
    render json: charge, status: 201
  end

end
