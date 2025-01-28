class Task < ApplicationRecord
  belongs_to :user

  #Enums for status and priority
  enum :status, { pending: 0, in_progress: 1, completed: 2 }
  enum :priority, { low: 0, medium: 1, high: 2 }

  #Validations
  validates :title, presence: true
  validates :status, inclusion: { in: statuses.keys }
  validates :priority, inclusion: { in: priorities.keys }
  validate :due_date_is_not_in_the_past

  def due_date_is_not_in_the_past
    if due_date.present? && due_date < Date.today
      errors.add(:due_date, "can't be in the past")
    end
  end

end
