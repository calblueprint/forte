class AddAccountIdBankIdToTeachers < ActiveRecord::Migration
  def change
    add_column :teachers, :account_id, :string
    add_column :teachers, :bank_id, :string
  end
end
