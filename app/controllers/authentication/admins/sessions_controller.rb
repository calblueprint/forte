class Authentication::Admins::SessionsController < Devise::SessionsController
  respond_to :json
# before_filter :configure_sign_in_params, only: [:create]

   # GET /resource/sign_in
  # def new
  #   super
  # end

  # POST /resource/sign_in
  def create
    super
    cookies[:is_signed_in] = admin_signed_in?
    cookies[:signed_in_type] = 'admin'
  end

  # DELETE /resource/sign_out
  def destroy
    super
    cookies[:is_signed_in] = admin_signed_in?
    cookies.delete :signed_in_type
  end
  # protected

  # If you have extra params to permit, append them to the sanitizer.
  # def configure_sign_in_params
  #   devise_parameter_sanitizer.for(:sign_in) << :attribute
  # end
end
