class Authentication::Students::PasswordsController < Devise::PasswordsController

  def send_token
    user = Student.find_by_email(params[:email])
    if user.present?
      @reset_password_token = user.send_reset_password_instructions
      render_json_message(:ok)
    elsif user.nil?
      error_response(message: "The entered email address cannot be found.", status: :forbidden)
    else
      error_response(message: "An unknown error occurred.", status: :internal_server_error)
    end
  end

  # Resetting password with token
  def reset_password
    resource = Student.reset_password_by_token(reset_password_params)

    if resource.errors.messages.blank?
      redirect_to root_path
    else
      error_response(message: "An error occurred while changing your password.")
    end
  end


  private

  def send_token_params
    params.permit(:email)
  end

  def reset_password_params
    params.require(:student).permit(:password, :password_confirmation, :reset_password_token)
  end

end
