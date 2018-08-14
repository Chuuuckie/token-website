class HomeController < ApplicationController
  include ActionView::Helpers::NumberHelper
  require 'net/http'

  TEAM = [
    { name: "Sebastian Kim", role: "Founder, Developer", steemit: "tabris" },
    { name: "YoungWhi Cho", role: "Founder, Designer", steemit: "project7" },
    { name: "Astro Lee", role: "Developer", steemit: "astrocket" }
  ]
  MODERATOR_ACCOUNTS = [
    'teamhumble', 'urbangladiator', 'chronocrypto', 'dayleeo', 'fknmayhem', 'jayplayco', 'bitrocker2020', 'joannewong',
    'geekgirl', 'playitforward'
  ].map {|person| { name: person, role: "Moderator", steemit: person} }
  INFLUENCER_ACCOUNTS = [
    'dontstopmenow', 'sambillingham', 'ogochukwu', 'theversatileguy', 'guyfawkes4-20', 'pialejoana', 'tobias-g', 'superoo7',
    'themanualbot', 'redtravels', 'elleok', 'joythewanderer', 'ady-was-here', 'raulmz', 'chuuuckie', 'shaphir', 'mobi72'
  ].map {|person| { name: person, role: "Influencer", steemit: person} }

  def index
    @thumbnails = Rails.cache.fetch('thumbnails', expires_in: 30.minutes) do
      Post.select(:images).order(hunt_score: :desc).limit(200).map(&:thumbnail).reject { |t| t =~ /.*\.gif$/ }
    end
    @stats = Rails.cache.fetch('stats', expires_in: 1.minute) do
      {
        count: Post.all.count,
        value: Post.all.sum(:payout_value).round(2)
      }
    end
    @products_days = (Time.now.to_i - 1518784559) / 86400
    @team = TEAM
    @moderators = MODERATOR_ACCOUNTS
    @influencers = INFLUENCER_ACCOUNTS
    @delegators = JSON.parse(File.read('delegators.json')).map { |del|
      {
        name: del['delegator'],
        role: "delegated #{number_to_currency((del["sp"] * steem_price).round(2))}",
        steemit: del['delegator']
      }
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