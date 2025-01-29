require 'rails_helper'

RSpec.describe TaskFilteringController, type: :controller do
  let(:user) { create(:user) }

  let!(:task1) { create(:task, user: user, status: 'in_progress', priority: 'high', due_date: '2025-02-01') }
  let!(:task2) { create(:task, user: user, status: 'completed', priority: 'medium', due_date: '2025-02-05') }
  let!(:task3) { create(:task, user: user, status: 'in_progress', priority: 'low', due_date: '2025-01-30') }
  let!(:task4) { create(:task, user: user, status: 'pending', priority: 'high', due_date: nil) }
  let!(:other_user_task) { create(:task, user: create(:user), status: 'in_progress', priority: 'high', due_date: '2025-02-01') }


  before do
    allow(Current).to receive(:user).and_return(user)
  end

  describe "GET #index" do
    context "without filters" do
      it "returns all tasks for the current user" do
        get :index
        expect(JSON.parse(response.body).size).to eq(4)
      end
    end

    context "with a valid status filter" do
      it "filters tasks by status" do
        get :index, params: { status: 'in_progress' }
        expect(JSON.parse(response.body).size).to eq(2)
        expect(JSON.parse(response.body).map { |task| task['status'] }).to all(eq('in_progress'))
      end
    end

    context "with an invalid status filter" do
      it "returns no tasks for invalid status" do
        get :index, params: { status: 'invalid_status' }
        expect(JSON.parse(response.body).size).to eq(0)
      end
    end

    context "with a due_date filter" do
      it "filters tasks with due_date greater than or equal to the given date" do
        get :index, params: { due_date: '2025-02-01' }
        expect(JSON.parse(response.body).size).to eq(2)
        expect(JSON.parse(response.body).map { |task| task['due_date'] }).to all(be >= '2025-02-01')
      end
    end

    context "with multiple filters" do
      it "filters tasks by status and priority" do
        get :index, params: { status: 'in_progress', priority: 'high' }
        expect(JSON.parse(response.body).size).to eq(1)
        expect(JSON.parse(response.body).first['status']).to eq('in_progress')
        expect(JSON.parse(response.body).first['priority']).to eq('high')
      end

      it "filters tasks by status, priority, and due_date" do
        get :index, params: { status: 'in_progress', priority: 'low', due_date: '2025-01-30' }
        expect(JSON.parse(response.body).size).to eq(1)
        expect(Date.parse(JSON.parse(response.body).first['due_date'])).to eq(Date.parse('2025-01-30'))
      end
    end
  end

  describe "GET #options" do
    it "returns available statuses and priorities" do
      get :options
      json = JSON.parse(response.body)

      expect(json['statuses']).to eq(Task.statuses.keys)
      expect(json['priorities']).to eq(Task.priorities.keys)
      expect(response).to have_http_status(:ok)
    end
  end
end
