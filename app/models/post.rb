class Post < ApplicationRecord
  TEAM = [
    {name: "Sebastian Kim", role: "Founder, Developer", steemit: "tabris"},
    {name: "YoungWhi Cho", role: "Founder, Designer", steemit: "project7"},
    {name: "Astro Lee", role: "Developer", steemit: "astrocket"}
  ]
  MODERATOR_ACCOUNTS = [
    'teamhumble', 'urbangladiator', 'chronocrypto', 'dayleeo', 'fknmayhem', 'jayplayco', 'bitrocker2020', 'joannewong',
    'geekgirl', 'playitforward'
  ].map {|person| {name: person, role: "Moderator", steemit: person} }
  INFLUENCER_ACCOUNTS = [
    'dontstopmenow', 'sambillingham', 'ogochukwu', 'theversatileguy', 'guyfawkes4-20', 'pialejoana', 'tobias-g', 'superoo7',
    'themanualbot', 'redtravels', 'elleok', 'joythewanderer', 'ady-was-here', 'raulmz', 'chuuuckie', 'shaphir', 'mobi72'
  ].map {|person| {name: person, role: "Influencer", steemit: person} }

  def thumbnail
    "https://steemitimages.com/300x300/#{self.images[0]["link"]}"
  end
end
