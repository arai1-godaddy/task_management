require 'rails_helper'

RSpec.describe SessionsController, type: :controller do
  let(:user) { create(:user, confirmed_at: Time.now) }
  let(:unconfirmed_user) { create(:user, confirmed_at: nil)}

  describe "POST #create" do
    context "with valid credentials" do
      it "logs in the user and returns a success message" do
        post :create, params: { user: { email: user.email, password: user.password}}
        expect(response).to have_http_status(:ok)
        expect(JSON.parse(response.body)['message']).to eq('Login successful.')
      end
    end

    context "with invalid credentials" do
      it "returns an unauthorized status with an error message" do
        post :create, params: { user: { email: user.email, password: 'wrongpassword'}}
        expect(response).to have_http_status(:unauthorized)
        expect(JSON.parse(response.body)['error']).to eq('Invalid email or password.')
      end
    end

    context "with an unconfirmed user" do
      it "returns an unauthorized status with an error message" do
        post :create, params: { user: { email: unconfirmed_user.email, password: unconfirmed_user.password}}
        expect(response).to have_http_status(:forbidden)
        expect(JSON.parse(response.body)['error']).to eq('Your account is not confirmed. Please check your email.')
      end
    end

    context "with an invalid user" do
      it "returns an unauthorized status with an error message" do
        post :create, params: { user: { email: "nonexistant@gmail.com", password: "password"}}
        expect(response).to have_http_status(:unauthorized)
        expect(JSON.parse(response.body)['error']).to eq('Invalid email or password.')
      end
    end
  end
end