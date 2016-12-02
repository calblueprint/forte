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

  def update_account

    dob_day = params[:dob_day]
    dob_month = params[:dob_month]
    dob_year = params[:dob_year]
    first_name = params[:first_name]
    last_name = params[:last_name]
    type = params[:type]
    tos_acceptance_date = params[:tos_acceptance_date]
    tos_acceptance_ip = params[:tos_acceptance_ip]
    account_id = params[:account_id]
    
    account = Stripe::Account.retrieve(account_id)
    account.legal_entity.dob.day = dob_day
    account.legal_entity.dob.month = dob_month
    account.legal_entity.dob.year = dob_year
    account.legal_entity.first_name = first_name
    account.legal_entity.last_name = last_name
    account.legal_entity.type = type
    account.tos_acceptance.date = tos_acceptance_date
    account.tos_acceptance.ip = tos_acceptance_ip
    account.save

    render json: account, status: 201
  end
end
