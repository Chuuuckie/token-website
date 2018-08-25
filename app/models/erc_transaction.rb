class ErcTransaction < ApplicationRecord
  belongs_to :user

  scope :running, -> { where(status: 'running') }

  def url
    "https://ropsten.etherscan.io/tx/#{tx_hash}"
  end
end