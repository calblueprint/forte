class Authentication::Students::PasswordsController < Devise::PasswordsController
  before_action :authenticate_student!, except: [:send_token, :reset_password]

  def send_token
    user = Student.find_by_email(params[:email])
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
    resource = Student.reset_password_by_token(reset_password_params)

    if resource.errors.messages.blank?
      redirect_to root_path
    else
      error_response(message: "An error occurred while changing your password.")
    end
  end

  def update_password
    @student = Student.find(params[:id])

    if params[:student][:password] != params[:student][:password_confirmation]
      error_response(message: "Please make sure the passwords match!", status: :forbidden)
    elsif (params[:student][:password]).nil? || (params[:student][:password_confirmation]).nil?
      error_response(message: "Please make sure you fill in the required fields!", status: :forbidden)
    elsif @student.update(student_params)
      # Sign in the user by passing validation in case their password changed
      sign_in @student, :bypass => true
      render_json_message(:created)
    else
      error_response(message: "Please make sure the passwords are at least 8 characters long!", status: :forbidden)
    end
  end

  private

  def send_token_params
    params.permit(:email)
  end

  def reset_password_params
    params.require(:student).permit(:password, :password_confirmation, :reset_password_token)
  end

  def student_params
    params.require(:student).permit(:password, :password_confirmation)
  end

end
