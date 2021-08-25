class Post < ApplicationRecord
  belongs_to :user
  has_many :comments
  # the like associations
  has_many :likes
  has_many :liking_users, :through => :likes, :source => :user
  has_one_attached :image
end
