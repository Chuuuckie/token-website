class ApplicationRecord < ActiveRecord::Base
  after_initialize :readonly! # Read only on this repo

  self.abstract_class = true
end
