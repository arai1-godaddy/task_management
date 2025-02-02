module Api
  class TasksController < ApplicationController
    before_action :authenticate_user

    # GET /api/tasks
    def index
      tasks = Task.where(user_id: session[:current_user_id])
      render json: tasks
    end

    # GET /api/tasks/:id
    def show
      puts session[:current_user_id]
      task = Task.find_by(params[:id], user_id: session[:current_user_id])
      render json: task
    end

    # POST /api/tasks
    def create
      task = Task.new(task_params)
      puts session[:current_user_id]
      task.user_id = session[:current_user_id]
      puts task_params
      if task.save
        render json: task, status: :created
      else
        render json: task.errors, status: :unprocessable_entity
      end
    end

    # PUT /api/tasks/:id
    def update
      task = Task.find_by(id: params[:id], user_id: session[:current_user_id])
      puts task_params
      if task.update(task_params)
        render json: task
      else
        render json: task.errors, status: :unprocessable_entity
      end
    end

    # DELETE /api/tasks/:id
    def destroy
      task = Task.find_by(id: params[:id], user_id: session[:current_user_id])
      task.destroy
      head :no_content
    end

    private

    def authenticate_user
      unless session[:current_user_id] && User.exists?(id: session[:current_user_id])
        render json: { error: 'Unauthorized' }, status: :unauthorized
      end
    end

    def task_params
      params.require(:task).permit(:title, :priority, :status, :due_date, :user_id)
    end
  end
end