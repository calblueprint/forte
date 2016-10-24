require 'rails_helper'

RSpec.describe FormController, type: :controller do

  describe "GET #student" do
    it "returns http success" do
      get :student
      expect(response).to have_http_status(:success)
    end
  end

  describe "GET #teacher" do
    it "returns http success" do
      get :teacher
      expect(response).to have_http_status(:success)
    end
  end

end
