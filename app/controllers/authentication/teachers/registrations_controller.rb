class Authentication::Teachers::RegistrationsController < Devise::RegistrationsController
before_filter :configure_sign_up_params, only: [:create]
# before_filter :configure_account_update_params, only: [:update]

  # GET /resource/sign_up
  # def new
  #   super
  # end

  # POST /resource
  def create
    # Modified the super class to allow for ip address on sign_up
    build_resource(sign_up_params)
    resource.sign_up_ip = request.env['REMOTE_ADDR']
    resource.save
    yield resource if block_given?
    if resource.persisted?
      if resource.active_for_authentication?
        set_flash_message! :notice, :signed_up
        sign_up(resource_name, resource)
        respond_with resource, location: after_sign_up_path_for(resource)
      else
        set_flash_message! :notice, :"signed_up_but_#{resource.inactive_message}"
        expire_data_after_sign_in!
        respond_with resource, location: after_inactive_sign_up_path_for(resource)
      end
    else
      clean_up_passwords resource
      set_minimum_password_length
      respond_with resource
    end

    if @teacher.persisted?
      @teacher.submit_signup
    end
    cookies[:is_signed_in] = teacher_signed_in?
    cookies[:signed_in_type] = 'teacher'
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
        :phone,
        :email,
        :introduction,
        :teaching_experience,
        :training_experience,
        :performance_experience,
        :address,
        :address_apt,
        :state,
        :zipcode,
        :city,
        :location_preference,
        :travel_distance,
        :background_check,
        :reference1_first_name,
        :reference1_last_name,
        :reference1_relation,
        :reference1_email,
        :reference1_phone,
        :reference2_first_name,
        :reference2_last_name,
        :reference2_relation,
        :reference2_email,
        :reference2_phone,
        :youth_participation,
        :criminal_charges,
        :criminal_explanation,
        :waiver_signature,
        :waiver_date,
        :account_id,
        :bank_id,
        :instruments_attributes => [:id, :name, :years_played, :proficiency, :is_primary]
      ],
    )
  end


  # If you have extra params to permit, append them to the sanitizer.
  # def configure_sign_up_params
  #   devise_parameter_sanitizer.for(:sign_up) << :attribute
  # end

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
