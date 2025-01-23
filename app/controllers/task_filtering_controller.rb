class TaskFilteringController < ApplicationController
  def index
    tasks = Task.where(user: Current.user) #filter tasks by user

    tasks=tasks.where(status: params[:status]) if params[:status].present?
    tasks=tasks.where(priority: params[:priority]) if params[:priority].present?
    tasks=tasks.where("due_date >= ?", params[:due_date]) if params[:due_date].present?

    render json: tasks, status: :ok
  end

  #options to return enum values
  def options
    render json: {
      statuses: Task.statuses.keys,
      priorities: Task.priorities.keys
    }, status: :ok
  end
  
end
