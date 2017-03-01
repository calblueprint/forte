class ChangeAddressAptColumnName < ActiveRecord::Migration
  def change
  	rename_column :students, :address_apt, :address2
  	rename_column :teachers, :address_apt, :address2
  end
end
