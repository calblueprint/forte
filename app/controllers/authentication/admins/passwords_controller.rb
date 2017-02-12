class Authentication::Admins::PasswordsController < Devise::PasswordsController
  # GET /resource/password/new
  # def new
  #   super
  # end

  # POST /resource/password
  # def create
  #   super
  # end

  # GET /resource/password/edit?reset_password_token=abcdef
  # def edit
  #   super
  # end

  # PUT /resource/password
  # def update
  #   super
  # end

  # protected

  # def after_resetting_password_path_for(resource)
  #   super(resource)
  # end

  # The path used after sending reset password instructions
  # def after_sending_reset_password_instructions_path_for(resource_name)
  #   super(resource_name)
  # end

  def reset_password
    admin_user = Admin.find_by_email(params[:email])
    # resource = Admin.reset_password_by_token reset_params

    if admin_user.present?
      admin_user.send_reset_password_instructions
      render_json_message(:ok)
    else
      render_json_message(:forbidden, errors: ["Your entered email address cannot be found."])
  end


  # def request_reset_params
  #   params.permit(:email)
  # end

  # def reset_params
  #   params.permit(:password, :password_confirmation, :reset_password_token)
  # end


  # def reset
  #   password_errors = accumulate_password_errors
  #   unless password_errors.blank?
  #     render_json_message(:forbidden, errors: password_errors)
  #     return
  #   end

  #   resource = User.reset_password_by_token reset_params

  #   if !resource.errors.messages.blank?
  #     errors = resource.errors.messages[:reset_password_token].map do |error|
  #       "Reset token " + error
  #     end
  #     render_json_message(:forbidden, errors: errors)
  #   else
  #     render_json_message(:ok, message: "Password successfully reset.", to: root_path)
  #   end
  # end

end
