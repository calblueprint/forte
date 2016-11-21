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

  def send_email
  	ForteMailer.contact_email(params[:subject], params[:first_name], params[:last_name], params[:email], params[:message]).deliver_now
  	redirect_to contact_url
  end
end
