class User < ApplicationRecord
  has_secure_password
  has_many :tasks, dependent: :destroy
  
  MAILER_FROM_EMAIL = "no-reply@example.com"
  CONFIRMATION_TOKEN_EXPIRATION = 10.minutes
  
  has_secure_password
  before_save :downcase_email
  has_many :tasks

  validates :name, presence: true
  validates :email, format: { with: URI::MailTo::EMAIL_REGEXP }, presence: true, uniqueness: true

  def confirm!
    update_columns(confirmed_at: Time.current)
  end

  def confirmed?
    confirmed_at.present?
  end

  def unconfirmed?
    !confirmed?
  end

  def generate_confirmation_token
    signed_id expires_in: CONFIRMATION_TOKEN_EXPIRATION, purpose: :confirm_email
  end

  def send_confirmation_email!
    confirmation_token = generate_confirmation_token
    UserMailer.confirmation(self, confirmation_token).deliver_now
  end

  private

  def downcase_email
    self.email = email.downcase
  end
end
