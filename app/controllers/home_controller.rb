class HomeController < ApplicationController
  require 'net/http'

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
    @team = Post::TEAM
    @moderators = Post::MODERATOR_ACCOUNTS
    @influencers = Post::INFLUENCER_ACCOUNTS
    @delegators = JSON.parse(File.read('delegators.json')).map {|del| {name: del["delegator"], role: "delegated #{del["sp"].round(2)} SP", steemit: del["delegator"]} }
  end
end
