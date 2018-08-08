class HomeController < ApplicationController
  def index
    @posts = Post.all.order(hunt_score: :desc).limit(200)
    @products_count = 12314
    @products_value = 76855.79
    @products_days = 150
  end
end
