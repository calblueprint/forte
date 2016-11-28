class Stripe::CustomerController < Stripe::BaseController 
  def create_customer

    token = params[:stripe_token]

    customer = Stripe::Customer.create(
      :source => token
      :description  => 'New Student Stripe Account',
    )

    student = Student.find params[:id].to_i
    student.customer_id = customer.id

    if student.save
      render json: student
    else
      unprocessable_response student
    end

  end
end
