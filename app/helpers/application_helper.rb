module ApplicationHelper
	# ページごとの完全なタイトルを返します。
	def full_title(page_title = '')
	    base_title = "簡易注文システム_(:3」∠)_"
	    if page_title.empty?
	      base_title
	    else
	      page_title + " | " + base_title
	    end
	end

	# 商品削除機能（ゴミ箱アイコン）
	def link_to_remove_fields name, f, class_name
	    f.hidden_field(:_destroy, value: 0) + link_to(name, "javascript:void(0)",
	      class: "delete delete_order_detail #{class_name}")
	end
end
