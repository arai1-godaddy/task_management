class UserMailer < ApplicationMailer
  default from: User::MAILER_FROM_EMAIL

  def confirmation(user, confirmation_token)
    user = user
    confirmation_token = confirmation_token

    mail(
      to: user.email,
      subject: "Confirmation Instructions",
      body: "Hello #{user.name},\n\n" \
            "You can confirm your account by clicking the link below:\n\n" \
            "#{edit_confirmation_url(confirmation_token)}\n\n" \
            "If you did not create an account, please ignore this email.\n\n" \
        "Thanks,\nThe Task Management Team"
    )
  end
end
