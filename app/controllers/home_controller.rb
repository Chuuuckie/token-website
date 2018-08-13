class HomeController < ApplicationController
  include ActionView::Helpers::NumberHelper
  include ApplicationHelper
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
    @delegators = JSON.parse(File.read('delegators.json')).map { |del|
      { name: del["delegator"], role: "delegated #{dollar((del["sp"] * steem_price).round(2))}", steemit: del["delegator"] }
    }
  end

  private

  def steem_price
    steem_usd = Rails.cache.fetch('steem_price', expires_in: 1.seconds) do
      res = Net::HTTP.get(URI("https://api.coinmarketcap.com/v2/ticker/1230/"))
      JSON.parse(res)["data"]["quotes"]["USD"]["price"]
    end
  end
end