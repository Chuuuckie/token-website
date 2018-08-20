class Admin::TokensController < ApplicationController
  layout 'admin'

  def index
    @transactions = ErcTransaction.includes(:user).order(updated_at: :desc).page(params[:page]).per_page(100)
  end
end
