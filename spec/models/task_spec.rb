require 'rails_helper'

RSpec.describe Task, type: :model do
  subject(:task) { Task.new(title: "Sample Task", status: :pending, priority: :medium, user_id: 1) }

  describe 'validations' do
    it 'is valid with valid attributes' do
      expect(task).to be_valid
    end

    it 'is invalid without a title' do
      task.title = nil
      expect(task).to_not be_valid
      expect(task.errors[:title]).to include("can't be blank")
    end

    it 'is invalid with an invalid status' do
      task.status = "invalid_status"
      expect(task).to_not be_valid
      expect(task.errors[:status]).to include("is not included in the list")
    end

    it 'is invalid with an invalid priority' do
      task.priority = "invalid_priority"
      expect(task).to_not be_valid
      expect(task.errors[:priority]).to include("is not included in the list")
    end
  end

  describe 'associations' do
    it 'belongs to a user' do
      assoc = described_class.reflect_on_association(:user)
      expect(assoc.macro).to eq :belongs_to
    end
  end

  # describe 'enums' do
  #   it 'defines statuses enum correctly' do
  #     expect(Task.statuses.keys).to contain_exactly('pending', 'in_progress', 'completed')
  #   end

  #   it 'defines priorities enum correctly' do
  #     expect(Task.priorities.keys).to contain_exactly('low', 'medium', 'high')
  #   end
  # end
end