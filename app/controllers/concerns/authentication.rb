module Authentication
  extend ActiveSupport::Concern

  included do
    before_action :set_current_user
    # helper_method :current_user, :user_signed_in?
  end

  def login(user)
    reset_session # Clear previous session data
    session[:current_user_id] = user.id # Store the user ID in the session
  end

  def logout
    reset_session # Clear session data
  end

  def redirect_if_authenticated
    render json: { error: "You are already logged in." }, status: :forbidden if user_signed_in?
  end

  private

  def set_current_user
    Current.user ||= session[:current_user_id] && User.find_by(id: session[:current_user_id])
  end

  def current_user
    Current.user
  end

  def user_signed_in?
    Current.user.present?
  end
end
