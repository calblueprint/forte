class Authentication::Students::RegistrationsController < Devise::RegistrationsController
before_filter :configure_sign_up_params, only: [:create]
# before_filter :configure_account_update_params, only: [:update]

  # GET /resource/sign_up
  # def new
  #   super
  # end

  # POST /resource
  def create
    super
    cookies[:is_signed_in] = student_signed_in?
    cookies[:signed_in_type] = 'student'
  end

  # GET /resource/edit
  # def edit
  #   super
  # end

  # PUT /resource
  # def update
  #   super
  # end

  # DELETE /resource
  # def destroy
  #   super
  # end

  # GET /resource/cancel
  # Forces the session data which is usually expired after sign
  # in to be expired now. This is useful if the user wants to
  # cancel oauth signing in/up in the middle of the process,
  # removing all OAuth session data.
  # def cancel
  #   super
  # end

  # protected

  # If you have extra params to permit, append them to the sanitizer.
  def configure_sign_up_params
    devise_parameter_sanitizer.permit(:sign_up, 
      keys: [
        :city, 
        :first_name,
        :last_name,
        :email, 
        {:availability => []},
        :gender,
        :birthday,
        :school,
        :school_level,
        :guardian_first_name,
        :guardian_last_name,
        :guardian_phone,
        :email, 
        :introduction,
        :lesson_experience, 
        :performance_experience,
        :student_email,
        :student_phone,
        :address,
        :address_apt,
        :state,
        :zipcode,
        :location_preference,
        :travel_distance,
        :income_range,
        :household_number,
        :disciplinary_action,
        :criminal_charges,
        :criminal_explanation, 
        :waiver_signature,
        :waiver_date
      ]
    )
  end

  # If you have extra params to permit, append them to the sanitizer.
  # def configure_account_update_params
  #   devise_parameter_sanitizer.for(:account_update) << :attribute
  # end

  # The path used after sign up.
  # def after_sign_up_path_for(resource)
  #   super(resource)
  # end

  # The path used after sign up for inactive accounts.
  # def after_inactive_sign_up_path_for(resource)
  #   super(resource)
  # end
end
