class Stripe::AccountsController < Stripe::BaseController 
  def create_account

    token = params[:stripe_token]
    email = params[:email]
    country = params[:country]

    account = Stripe::Account.create(
      :managed => true,
      :country => country,
      :email => email
    )

    bank_account = account.external_accounts.create(
      :external_account => token,
    )

    render json: { account: account, bank_account: bank_account }, status: 201

  end
end
