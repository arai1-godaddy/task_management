require 'rails_helper'

RSpec.describe Api::TasksController, type: :controller do
  let(:user) { create(:user) }
  let(:task) { create(:task, user: user) }
  let(:valid_attributes) { { title: 'Test Task', priority: 0, status: 1 } }
  let(:invalid_attributes) { { title: nil } }

  before do
    allow(controller).to receive(:authenticate_user).and_return(true)
    session[:current_user_id] = user.id
  end

  describe 'GET #index' do
    it 'returns a success response' do
      get :index
      expect(response).to have_http_status(200)
    end
  end

  describe 'GET #show' do
    it 'returns a success response' do
      get :show, params: { id: task.id }
      expect(response).to be_successful
    end
  end

  describe 'POST #create' do
    context 'with valid params' do
      it 'creates a new Task' do
        expect do
          post :create, params: { task: attributes_for(:task) }
        end.to change(Task, :count).by(1)
      end

      it 'renders a JSON response with the new task' do
        post :create, params: { task: attributes_for(:task) }
        expect(response).to have_http_status(:created)
        expect(response.content_type).to include('application/json')
      end
    end
  end

  describe 'PUT #update' do
    context 'with valid params' do
      let(:new_attributes) { { title: 'Updated Task' } }

      it 'updates the requested task' do
        put :update, params: { id: task.id, task: new_attributes }
        task.reload
        expect(task.title).to eq('Updated Task')
      end

      it 'renders a JSON response with the task' do
        put :update, params: { id: task.id, task: new_attributes }
        expect(response).to have_http_status(:ok)
        expect(response.content_type).to include('application/json')
      end
    end

    describe 'DELETE #destroy' do
      it 'destroys the requested task' do
        # puts 'asfasdf',task.to_param
        puts task.inspect
        expect do
          delete :destroy, params: { id: task.id }
        end.to change(Task, :count).by(-1)
      end
    end
  end
end