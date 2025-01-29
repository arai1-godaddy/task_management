require 'rails_helper'

RSpec.describe UsersController, type: :controller do
  describe 'POST #create' do
    let(:user) { build(:user, password: 'password', password_confirmation: 'password') }
    let(:valid_params) do
      {
        user: {
          name: 'Vikash Sharma',
          email: 'vikash12@gmail.com',
          password: 'password',
          password_confirmation: 'password'
        }
      }
    end

    context 'with valid parameters' do
      it 'creates a new user and sends a confirmation email' do
        # Use a spy to track method calls on a User instance
        user_double = instance_double(User, save: true, send_confirmation_email!: true)
        allow(User).to receive(:new).and_return(user_double)

        post :create, params: valid_params

        expect(response).to have_http_status(:ok)
        expect(User).to have_received(:new).with(hash_including(valid_params[:user]))
        expect(user_double).to have_received(:save)
        expect(user_double).to have_received(:send_confirmation_email!)
      end
    end

    context 'with invalid parameters' do
      let(:invalid_params) do
        {
          user: {
            name: '',
            email: 'invalid',
            password: 'short',
            password_confirmation: 'mismatch'
          }
        }
      end

      it 'does not create a user and returns errors' do
        post :create, params: invalid_params

        expect(response).to have_http_status(:unprocessable_entity)
        expect(User.count).to eq(0)
        body = JSON.parse(response.body)
        expect(body['errors']).to include("Email is invalid")
        expect(body['errors']).to include("Password confirmation doesn't match Password")
      end
    end

    context 'with duplicate email' do
      let!(:existing_user) { create(:user, email: 'vikash12@gmail.com', password: 'password', password_confirmation: 'password') }

      let(:duplicate_email_params) do
        {
          user: {
            name: 'Duplicate User',
            email: 'vikash12@gmail.com',
            password: 'password',
            password_confirmation: 'password'
          }
        }
      end

      it 'does not create a user and returns an error for duplicate email' do
        post :create, params: duplicate_email_params

        expect(response).to have_http_status(:unprocessable_entity)
        body = JSON.parse(response.body)
        expect(body['errors']).to include('Email has already been taken')
      end
    end

    context 'with empty parameters' do
      it 'does not create a user and returns error messages' do
        post :create, params: { user: { name: '', email: '', password: '', password_confirmation: '' } }
  
        expect(response).to have_http_status(:unprocessable_entity)
        expect(JSON.parse(response.body)['errors']).to include("Name can't be blank", "Email can't be blank", "Password can't be blank")
      end
    end
  end
end
