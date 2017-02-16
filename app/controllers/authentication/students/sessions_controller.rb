class Authentication::Students::SessionsController < Devise::SessionsController
  respond_to :json
  skip_filter :verify_signed_out_user, only: :destroy
# before_filter :configure_sign_in_params, only: [:create]
  
  # GET /resource/sign_in
  # def new
  #   super
  # end

  # POST /resource/sign_in
  def create
    super
    cookies[:is_signed_in] = student_signed_in?
    cookies[:signed_in_type] = 'student'
    if student_signed_in?
      cookies[:name] = current_student.first_name
    end
  end

  # DELETE /resource/sign_out
  def destroy
    super
    cookies[:is_signed_in] = student_signed_in?
    cookies.delete :signed_in_type
    cookies.delete :name
  end

  # protected

  # If you have extra params to permit, append them to the sanitizer.
  # def configure_sign_in_params
  #   devise_parameter_sanitizer.for(:sign_in) << :attribute
  # end
end
