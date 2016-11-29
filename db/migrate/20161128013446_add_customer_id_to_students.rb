class AddCustomerIdToStudents < ActiveRecord::Migration
  def change
    add_column :students, :customer_id, :string
  end
end
