class ConfirmationsController < ApplicationController
  def create
    user = User.find_by(email: params[:user][:email])
    if user.nil?
      render json: { error: "User not found" }, status: :unprocessable_entity
    elsif user.present? and user.unconfirmed?
      user.send_confirmation_email!
      render json: { message: "Confirmation email sent" }, status: :ok
    else
      render json: {error: "User is already confirmed"}, status: :unprocessable_content
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
