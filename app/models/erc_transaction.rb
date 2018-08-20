class ErcTransaction < ApplicationRecord
  belongs_to :user

  def url
    "https://ropsten.etherscan.io/tx/#{tx_hash}"
  end
end