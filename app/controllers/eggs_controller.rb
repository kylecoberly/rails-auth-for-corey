class EggsController < ApplicationController
  before_action :authenticate, only: [:create, :index]

  def index
    @eggs = Egg.all

    render json: { eggs: @eggs }
  end

  def create
    @egg = Egg.create(
      preparation_style: params[:preparation_style]
    )

    render json: { egg: @egg }, status: :created
  end
end
