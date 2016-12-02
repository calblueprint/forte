class Stripe::ChargesController < Stripe::BaseController 
  def charge_customer
    student = student.find params[:student_id]
    teacher = student.find params[:teacher_id]
    amount = params[:amount]
    begin
    
    Stripe::Charge.create(
      :amount => amount, # in cents
      :currency => "usd",
      :customer => student.customer_id,
      :destination => teacher.account_id
    )
    rescue Stripe::CardError => e
      unprocessable_response student      
    end
  end

end
