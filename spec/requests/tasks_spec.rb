# require 'rails_helper'

# RSpec.describe Api::TasksController, type: :controller do
#   let(:user) { create(:user) }
#   let!(:tasks) do
#     [
#       create(:task, title: "Task 1", priority: :high, status: :pending, user: user),
#       create(:task, title: "Task 2", priority: :medium, status: :in_progress, user: user),
#       create(:task, title: "Task 3", priority: :low, status: :completed, user: user)
#     ]
#   end

#   before do
#     allow(controller).to receive(:current_user).and_return(user)
#     session[:user_id] = user.id
#   end

#   describe "GET #index" do
#     context "when user is authenticated" do
#       it "returns all tasks for the user" do
#         get :index
#         expect(response).to have_http_status(:ok)

#         json_response = JSON.parse(response.body)
#         expect(json_response.length).to eq(3)
#         expect(json_response.first).to include(
#           'title' => "Task 1",
#           'priority' => "high",
#           'status' => "pending"
#         )
#       end

#       it "filters tasks by status" do
#         get :index, params: { status: 0 } # todo
#         json_response = JSON.parse(response.body)
#         expect(json_response.length).to eq(1)
#         expect(json_response.first['status']).to eq('pending')
#       end

#       it "filters tasks by priority" do
#         get :index, params: { priority: 2 } # high
#         json_response = JSON.parse(response.body)
#         expect(json_response.length).to eq(1)
#         expect(json_response.first['priority']).to eq('high')
#       end
#     end

#     context "when user is not authenticated" do
#       before do
#         allow(controller).to receive(:current_user).and_return(nil)
#       end

#       it "returns unauthorized status" do
#         get :index
#         expect(response).to have_http_status(:unauthorized)
#         expect(response.body).to include("Unauthorized")
#       end
#     end
#   end
# end