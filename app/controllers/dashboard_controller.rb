# frozen_string_literal: true

class DashboardController < ApplicationController
  before_action :authenticate_user!

  def index
    @posts = Post.all.order("created_at DESC")
  end
end
