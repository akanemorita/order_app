// 合計金額計算

/*$(function() {

    $(this).on('change', '.unit-price, .quantity', function() {
          var quantity, total, unit_price;
          unit_price = $(this).parents('.nested-fields').find('.unit-price').first().val();
          quantity = $(this).parents('.nested-fields').find('.quantity').first().val();
          total = parseInt(unit_price) * parseInt(quantity);
          if (total) {
            return $(this).parents('.nested-fields').find('.subtotal').val("" + total).change();
          }
    });

    return $(this).on('change', '.subtotal', function() {
      var subtotals, total;
      total = 0;
      subtotals = $(this).parents().find('.subtotal').each(function() {
        return total += parseInt($(this).val());
      });
      return $('.total').val(total + "円");
    });

});*/