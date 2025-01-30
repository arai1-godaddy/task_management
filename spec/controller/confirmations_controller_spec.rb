require 'rails_helper'

RSpec.describe ConfirmationsController, type: :controller do
  let(:user) { create(:user, confirmed_at: nil)}
  describe "GET #edit" do
    context "with a valid token" do
      let(:token) { user.signed_id(purpose: :confirm_email) }

      it "confirms the user and logs them in" do
        get :edit, params: { confirmation_token: token }
        expect(response).to have_http_status(:ok)
        expect(user.reload.confirmed_at).not_to be_nil
        expect(session[:current_user_id]).to eq(user.id)
      end
    end

    context "with an invalid token" do
      it "doesn't login the user and returns an unprocessable entity status" do
        get :edit, params: { confirmation_token: "invalid_token"}
        expect(response).to have_http_status(:unprocessable_entity)
        expect(JSON.parse(response.body)['error']).to include("Invalid or expired token")
      end
    end
  end

  describe "POST #create" do
    context "when the user exists and is unconfirmed" do
      it "sends a confirmation email" do
        allow_any_instance_of(User).to receive(:send_confirmation_email!).and_return(true)
        
        post :create, params: { user: { email: user.email } }
        
        expect(response).to have_http_status(:ok)
        expect(JSON.parse(response.body)['message']).to eq("Confirmation email sent")
      end
    end

    context "when the user does not exist" do
      it "returns an error message" do
        post :create, params: { user: { email: "nonexistent@example.com" } }

        expect(response).to have_http_status(:unprocessable_entity)
        expect(JSON.parse(response.body)['error']).to eq("User not found")
      end
    end

    context "when the user is already confirmed" do
      let(:confirmed_user) { create(:user, confirmed_at: Time.current) }

      it "returns an error message" do
        post :create, params: { user: { email: confirmed_user.email } }

        expect(response).to have_http_status(:unprocessable_entity)
        expect(JSON.parse(response.body)['error']).to eq("User is already confirmed")
      end
    end
  end
end