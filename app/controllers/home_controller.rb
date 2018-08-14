class HomeController < ApplicationController
  include ActionView::Helpers::NumberHelper
  require 'net/http'

  def index
    @thumbnails = Rails.cache.fetch('thumbnails', expires_in: 30.minutes) do
      Post.select(:images).order(hunt_score: :desc).limit(200).map(&:thumbnail).reject { |t| invalid_thumbnail?(t) }
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
      { name: del['delegator'], role: "delegated #{number_to_currency((del["sp"] * steem_price).round(2))}", steemit: del['delegator'] }
    }
  end

  private
    IMG_EXCLUSION_LIST = [
      'https://steemitimages.com/128x128/https://story.kakao.com/_aHOsY/CYcWjI8mdo8',
      'https://steemitimages.com/128x128/https://steemitimages.com/DQmNe7vBwUjDNCsjaqvnBBZkitX5vn9i76EHifiiDxQtmxC/Image002.jpg',
    ]

    def steem_price
      steem_usd = Rails.cache.fetch('steem_price', expires_in: 1.seconds) do
        res = Net::HTTP.get(URI("https://api.coinmarketcap.com/v2/ticker/1230/"))
        JSON.parse(res)["data"]["quotes"]["USD"]["price"]
      end
    end

    def invalid_thumbnail?(thumbnail)
      IMG_EXCLUSION_LIST.include?(thumbnail) || thumbnail =~ /.*\.gif$/
    end
end