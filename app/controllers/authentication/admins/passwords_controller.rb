class Authentication::Admins::PasswordsController < Devise::PasswordsController

  def send_token
    user = Admin.find_by_email(params[:email])
    if user.present?
      @reset_password_token = user.send_reset_password_instructions
      render_json_message(:created)
    elsif user.nil?
      error_response(message: "The entered email address cannot be found.", status: :forbidden)
    else
      error_response(message: "An unknown error occurred.", status: :internal_server_error)
    end
  end

  # Resetting password with token
  def reset_password
    resource = Admin.reset_password_by_token(reset_password_params)
    if resource.errors.messages.blank?
      redirect_to root_path
      flash[:success] = "You have successfully reset your password."
    elsif params[:admin][:password] != params[:admin][:password_confirmation]
      flash[:error] = "Please make sure your passwords match."
      redirect_to :back
    elsif params[:admin][:password].length < 8
      flash[:error] = "Please make sure your new password is at least 8 characters long."
      redirect_to :back
    else 
      flash[:error] = "An unknown error occurred when resetting your password."
      redirect_to :back
    end
  end


  private

  def send_token_params
    params.permit(:email)
  end

  def reset_password_params
    params.require(:admin).permit(:password, :password_confirmation, :reset_password_token)
  end

end
