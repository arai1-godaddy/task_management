class Task < ApplicationRecord
  belongs_to :user

  #Enums for status and priority
  enum :status, { pending: 0, in_progress: 1, completed: 2 }
  enum :priority, { low: 0, medium: 1, high: 2 }

  #Validations
  validates :title, presence: true
  validates :status, inclusion: { in: statuses.keys }
  validates :priority, inclusion: { in: priorities.keys }

end
