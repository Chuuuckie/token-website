class Post < ApplicationRecord
  def thumbnail
    image = if self.images[0]['link'] =~ /\.mp4$/
      self.images[0]['link'].gsub(/\.mp4$/, '-thumb.jpg')
    else
      self.images[0]['link']
    end
    "https://steemitimages.com/300x300/#{image}"
  end
end
