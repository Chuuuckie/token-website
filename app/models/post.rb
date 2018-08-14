class Post < ApplicationRecord
  def thumbnail
    "https://steemitimages.com/300x300/#{self.images[0]["link"]}"
  end
end
