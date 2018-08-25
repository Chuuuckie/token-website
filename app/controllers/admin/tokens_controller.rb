class Admin::TokensController < ApplicationController
  layout 'admin'

  def index
    @transactions = ErcTransaction.includes(:user)
    unless params[:status].blank?
      @transactions = @transactions.where(status: params[:status])
    end
    @transactions = @transactions.order(updated_at: :desc).page(params[:page]).per_page(100)

    @count = ErcTransaction.group(:status).count
  end
end
