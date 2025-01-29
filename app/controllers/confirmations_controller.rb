class ConfirmationsController < ApplicationController
  def create
    user = User.find_by(email: params[:user][:email])
    if user.present? and user.unconfirmed?
      user.send_confirmation_email!
    else
      render json: {error: user.errors.full_messages}, status: :unprocessable_content
    end
  end

  def edit
    user = User.find_signed(params[:confirmation_token], purpose: :confirm_email)
    if user.present?
      user.confirm!
      login user
      render json: {message: "User confirmed and logged in successfully."}, status: :ok
    else
      render json: { error: "Invalid or expired token" }, status: :unprocessable_content
    end
  end
end
