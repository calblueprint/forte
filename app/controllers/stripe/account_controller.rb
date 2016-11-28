class Stripe::AccountsController < Stripe::BaseController 
  def create_account

    token = params[:stripe_token]
    email = params[:email]

    account = Stripe::Account.create(
      :managed => false,
      :country => 'US',
      :email => email,
    )

    bank_account = account.external_accounts.create(
      :external_account => token,
    )

    teacher = Teacher.find params[:id]
    teacher.account_id = account.id
    teacher.bank_id = bank_account.id

    if teacher.save
      render json: teacher
    else
      unprocessable_response teacher
    end

  end
end
