class CreateEggs < ActiveRecord::Migration[5.2]
  def change
    create_table :eggs do |t|
      t.string :preparation_style
      t.timestamps
    end
  end
end
