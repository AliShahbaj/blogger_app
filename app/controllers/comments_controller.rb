class CommentsController < ApplicationController
  before_action :set_comment, only: %i[ show edit update destroy ]
  before_action :set_post, only: %i[ new create edit update destroy ]

  # GET /posts/post_id/comments/new
  def new
    @comment = Comment.new
  end

  # GET /posts/post_id/comments/1/edit
  def edit
  end

  # POST /posts/post_id/comments
  def create
    @comment = @post.comments.new(comment_params)

    respond_to do |format|
      if @comment.save
        format.html { redirect_to root_path }
        format.js
      else
        format.html { render :new, status: :unprocessable_entity }
        format.json { render json: @comment.errors, status: :unprocessable_entity }
      end
    end

  end

  private
    # Use callbacks to share common setup or constraints between actions.    
    def set_post
      @post = Post.find(params[:post_id])
    end
    
    def set_comment
      @comment = @post.comments.find(params[:id])
    end

    # Only allow a list of trusted parameters through.
    def comment_params
      params.permit(:post_id, :user_id, :body)
    end
end
