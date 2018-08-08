class Post < ApplicationRecord
  def thumbnail
    "https://steemitimages.com/100x100/#{self.images[0]["link"]}"
  end
end
