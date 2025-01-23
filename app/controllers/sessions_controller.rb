class SessionsController < ApplicationController

  # Log in a user
  def create
    user = User.find_by(email: params[:user][:email].downcase)

    if user
      if user.unconfirmed?
        render json: { error: "Your account is not confirmed. Please check your email." }, status: :forbidden
      elsif user.authenticate(params[:user][:password])
        login(user) # Set session with the user's ID
        render json: { message: "Login successful.", user: user }, status: :ok
      else
        render json: { error: "Invalid email or password." }, status: :unauthorized
      end
    else
      render json: { error: "Invalid email or password." }, status: :unauthorized
    end
  end

  # Log out a user
  def destroy
    logout # Clear the session
    render json: { message: "Logged out successfully." }, status: :ok
  end
end
