class RemoveColumnTeachersReference2 < ActiveRecord::Migration
  def change
    remove_column :teachers, :reference2_first_name
    remove_column :teachers, :reference2_last_name
    remove_column :teachers, :reference2_relation
    remove_column :teachers, :reference2_email
    remove_column :teachers, :reference2_phone
  end
end
