class AddSignUpIpToTeachers < ActiveRecord::Migration
  def change
    add_column :teachers, :sign_up_ip, :string
  end
end
