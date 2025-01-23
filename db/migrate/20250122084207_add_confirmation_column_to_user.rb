class AddConfirmationColumnToUser < ActiveRecord::Migration[8.0]
  def change
    unless column_exists?(:users, :confirmed_at)
      add_column :users, :confirmed_at, :datetime
    end
  end
end
