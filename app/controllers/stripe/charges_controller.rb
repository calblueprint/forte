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

end
