class StaticPagesController < ApplicationController

  def home
  end

  def involvement
  end

  def program
  end

  def about
  end

  def contact
  end

  def terms
  end

  def send_contact_email
  	ForteMailer.send_contact_email(params[:subject], params[:first_name], params[:last_name], params[:email], params[:message]).deliver_now
  	redirect_to contact_url
  end

  def donation_notify_admin
    ForteMailer.donation_notify_admin(params[:full_name], params[:email], params[:phone_number], params[:message]).deliver_now
    render json: params
  end
end
