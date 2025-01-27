require 'rails_helper'

RSpec.describe User, type: :model do
  subject { described_class.new(name: "Saideep Kilaru", email: "deeps2657@gmail.com", password: "password", password_confirmation: "password")}

  describe "Validations" do

    # tests whether the instance satisfies all the validations defined in the model
    it "is valid with valid attributes" do
      expect(subject).to be_valid
    end

    # tests whether the instance is not valid without a name
    it "is not valid without a name" do
      subject.name = nil
      expect(subject).to_not be_valid
    end

    it "is not valid with an empty name" do
      subject.name = ""
      expect(subject).not_to be_valid
    end

    it "is not valid with a name consisting only of whitespace" do
      subject.name = "   "
      expect(subject).not_to be_valid
    end


    # tests whether the instance is not valid without an email
    it "is not valid without an email" do
      subject.email = nil
      expect(subject).not_to be_valid
    end

    # tests whether the instance is not valid without a proper email format
    it "is not valid with an invalid email format" do
      subject.email = "invalid_email.com"
      expect(subject).not_to be_valid
    end

    it "is not valid with an email missing the domain" do
      subject.email = "user@"
      expect(subject).not_to be_valid
    end

    it "is not valid with a duplicate email regardless of case" do
      described_class.create!(name: "Saideep Kilaru", email: "DEEPS2657@gmail.com", password: "password", password_confirmation: "password")
      expect(subject).not_to be_valid
    end

    # tests whether the instance conflicts with the same record in the database by checking uniqueness of email
    it "is not valid without a unique email" do
      described_class.create!(name: "Saideep Kilaru", email: "deeps2657@gmail.com", password: "password", password_confirmation: "password")
      expect(subject).not_to be_valid
    end

    # tests whether the instance is not valid without a password
    it "is not valid without a password" do
      subject.password = nil
      expect(subject).not_to be_valid
    end

    it "is not valid if password and password_confirmation do not match" do
      subject.password_confirmation = "different_password"
      expect(subject).not_to be_valid
    end
  end

  describe "Associations" do
    it { should have_many(:tasks).dependent(:destroy) }
  end

  describe "Custom Methods" do
    let(:user) { create(:user) }

    describe "#confirm!" do
      it "confirms the user" do
        user.confirm!
        expect(user.confirmed?).to be true
      end
    end

    describe "#uncormfirmed?" do
      it "return true if the user is not confirmed" do
        expect(user.unconfirmed?).to be true
      end
    end

    describe "#generate_confirmation_token" do
      it "generates a confirmation token" do
        token = user.generate_confirmation_token
        expect(token).not_to be_nil
      end
    end

    describe "#send_confirmation_email!" do
      it "sends a confirmation email" do
        expect{ user.send_confirmation_email! }.to change { ActionMailer::Base.deliveries.count }.by(1)
      end
    end

  end
end
