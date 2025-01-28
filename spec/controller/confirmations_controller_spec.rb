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
end