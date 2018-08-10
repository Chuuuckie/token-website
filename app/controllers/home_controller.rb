class HomeController < ApplicationController
  def index
    @thumbnails = Rails.cache.fetch('thumbnails', expires_in: 30.minutes) do
      Post.all.order(hunt_score: :desc).limit(200).map(&:thumbnail).reject {|thumbnail| thumbnail =~ /.*\.gif$/ }
    end
    @stats = Rails.cache.fetch('stats', expires_in: 1.minute) do
      {
        count: Post.all.count,
        value: Post.all.sum(:payout_value).round(2)
      }
    end
    @products_days = (Time.now.to_i - 1518784559) / 86400
  end
end
