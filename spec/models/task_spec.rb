require 'rails_helper'

RSpec.describe Task, type: :model do
  describe "Validations" do
    it { should validate_presence_of(:title)}
    it { should define_enum_for(:status).with_values([:pending, :in_progress, :completed])}
    it { should define_enum_for(:priority).with_values([:low, :medium, :high])}
  end

  describe "Associations" do
    it { should belong_to(:user)}
  end
end
