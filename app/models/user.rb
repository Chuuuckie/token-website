class User < ApplicationRecord
  has_many :transactions

  def url
    "https://steemhunt.com/@#{username}"
  end
end