require 'rails_helper'

RSpec.describe AdminController, type: :controller do

  describe "GET #matching" do
    it "returns http success" do
      get :matching
      expect(response).to have_http_status(:success)
    end
  end

  describe "GET #lessons" do
    it "returns http success" do
      get :lessons
      expect(response).to have_http_status(:success)
    end
  end

  describe "GET #roster" do
    it "returns http success" do
      get :roster
      expect(response).to have_http_status(:success)
    end
  end

end
