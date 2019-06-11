var update_orders_checked_status = {
  constructor: {
    trigger: "",
    currentOrderStatus: "",
    newOrderStatus: "",
    orderCode: [],
    check_all: 0,
    month: "",
    company_name: "",
    day: "",
    // noticeText: "#js-orderNotPaymentNotice-text",
    // notPaymentOrder: ".js-orderNotPaid",
    errorsFailTransaction: "#js-orderErrorFailTransaction-text",
    orderConfirmText: "#js-orderConfirmUpdate-text",
    displayLoadingImageWhenUpdateStatus: ".js-diplay-loading-image-status-update"
  },
  init: function() {
    var self = this;
    self.action();
  },
  action: function() {
    var self = this;
    var constructor = self.constructor;
    $(document).on("click", "#fn-update-orders, #fn-rollback-status", function(e) {
      constructor.trigger = $(this).attr("id");
      self.set();
      if (constructor.orderCode.length > 0)
        self.popup();
    });
  },
  set: function() {
    var self = this;
    var constructor = self.constructor;
    constructor.orderCode = [];
    constructor.currentOrderStatus = "";
    constructor.newOrderStatus = "";
    uncheck_codes = []
    constructor.currentOrderStatus = $("#order_histories_list").attr("data-order-status");
    constructor.month = $(".resources_data_list").attr("data-of-month");
    constructor.day = $(".resources_data_list").attr("data-of-day");
    constructor.company_name = $("input[name='q[company_name_cont]']").val();
    $("#order_checkbox .ex-checkbox:checked").closest("li").each(function(index) {
      constructor.orderCode[index] = $(this).attr("data-order-code");
    });
    $("#order_checkbox .ex-checkbox:not(:checked)").closest("li").each(function(index) {
      uncheck_codes[index] = $(this).attr("data-order-code");
    });
    if ($(".fn-allcheck-trigger.-check").length && uncheck_codes.length == 0) {
      constructor.check_all = 1;
    }
  },
  popup: function() {
    var self = this;
    var constructor = self.constructor;
    $.magnificPopup.open({
      items: {
        type: "inline",
        closeOnBgClick: false,
        closeBtnInside: true,
        src: "#md-confirm-update-status"
      },
      callbacks: {
        open: function() {
          if (constructor.trigger === "fn-rollback-status"){
            if (constructor.currentOrderStatus == "in_progress"){
              $("p.md-popuptitle#popup_text").html("確認中に戻しますか？");
            }
            else{
              if (constructor.currentOrderStatus == "already_deliver"){
                $("p.md-popuptitle#popup_text").html("準備中に戻しますか？");
              }
            }
          }
          else{
            if (constructor.currentOrderStatus == "in_progress"){
              $("p.md-popuptitle#popup_text").html("発送済に変更しますか？");
            }
            else{
              if (constructor.currentOrderStatus == "already_deliver"){
                $("p.md-popuptitle#popup_text").html("納品完了に変更しますか？");
              }
            }
          }
          // if ($("#order_checkbox .ex-checkbox:checked").parents(constructor.notPaymentOrder).length > 0){
          //   $(constructor.noticeText).show();
          // }else{
          //   $(constructor.noticeText).hide();
          // }
        },
        close: function(){
          $("#order_checkbox .ex-checkbox:checked").prop("checked", false).trigger("change");
          constructor.orderCode = [];
          constructor.currentOrderStatus = "";
          constructor.newOrderStatus = "";
          if ($("#fn-all-check").length > 0) {
            $("#fn-all-check").removeClass("-active");
          }
          // $(constructor.noticeText).hide();
          $(constructor.errorsFailTransaction).empty().hide();
          $(constructor.orderConfirmText).show();
        }
      }
    });
    $("span#confirm_no").on("click", function(e) {
      window.parent.$.magnificPopup.close();
    });
    $("form.update_order_status").unbind().on("click", function(e) {
      e.preventDefault();
      if (constructor.orderCode.length > 0) {
        if (constructor.trigger === "fn-update-orders") {
          self.ajax();
        }
        else {
          if (constructor.trigger === "fn-rollback-status"){
            self.ajax_rollback();
          }
        }
      }
    });
  },
  ajax: function() {
    var self = this;
    var constructor = self.constructor;
    if (constructor.currentOrderStatus == "not_deliver") {
      constructor.newOrderStatus = "in_progress";
    } else {
      if (constructor.currentOrderStatus == "in_progress"){
        constructor.newOrderStatus = "already_deliver";
      } else {
        constructor.newOrderStatus = "recieved_products";
      }
    }
    var url = "/orders/update_shipment_status";
    $.ajax({
      url: url,
      type: "put",
      dataType: "json",
      data: {
        order_status: constructor.newOrderStatus,
        order_codes: constructor.orderCode,
        is_check_all: constructor.check_all,
        q: {order_status_eq: constructor.currentOrderStatus,
          of_month: constructor.month,
          company_name_cont: constructor.company_name,
          of_day: constructor.day
        }
      },
      beforeSend: function() {
        window.parent.$.magnificPopup.close();
        $(constructor.displayLoadingImageWhenUpdateStatus).addClass("-click-update-status");
      },
      success: function(data){
        if (data.errors){
          var message = "更新に失敗しました。もう一度お試しください。\n" + data.errors.join("\n");
          alert(message)
          $(constructor.displayLoadingImageWhenUpdateStatus).removeClass("-click-update-status");
        } else {
          self.update(data);
          window.parent.$.magnificPopup.close();
          location.reload();
        }
      }
    });
    $("input#input_order_status").remove();
  },
  ajax_rollback: function(){
    var self = this;
    var constructor = self.constructor;
    if (constructor.currentOrderStatus == "in_progress") {
      constructor.newOrderStatus = "not_deliver";
    } else {
      if (constructor.currentOrderStatus == "already_deliver"){
        constructor.newOrderStatus = "in_progress";
      } else {
        constructor.newOrderStatus = "already_deliver";
      }
    }
    var url = "/orders/update_shipment_status";
    $.ajax({
      url: url,
      type: "put",
      dataType: "json",
      data: {
        order_status: constructor.newOrderStatus,
        order_codes: constructor.orderCode,
        is_check_all: constructor.check_all,
        q: {order_status_eq: constructor.currentOrderStatus,
          of_month: constructor.month,
          company_name_cont: constructor.company_name,
          of_day: constructor.day
        }
      },
      beforeSend: function() {
        window.parent.$.magnificPopup.close();
        $(constructor.displayLoadingImageWhenUpdateStatus).addClass("-click-update-status");
      },
      success: function(data){
        if (data.errors) {
          var message = "更新に失敗しました。もう一度お試しください。\n" + data.errors.join("\n");
          alert(message)
          $(constructor.displayLoadingImageWhenUpdateStatus).removeClass("-click-update-status");
        } else {
          self.update_rollback(data);
          window.parent.$.magnificPopup.close();
          location.reload();
        }
      }
    });
    $("input#input_order_status").remove();
  },
  show_message_error: function(data){
    var self = this;
    var constructor = self.constructor;
    $(constructor.orderConfirmText).hide();
    $(constructor.errorsFailTransaction).empty().show();
    for (var i in data.errors){
      $(constructor.errorsFailTransaction).append("<li>"+ data.errors[i] + "</li>");
    }
  },
  update: function(data) {
    if (data){
      for (var i in data.order_ids){
        $(".resources_data_list").find("[data-order-id="+data.order_ids[i]+"]").remove();
        $(window).data("ajaxready", true).trigger("scroll");
      }
      var order_deliverings = parseInt($("span.order_delivering_orders").html());
      var order_not_delivers = parseInt($("span.order_not_delivers").html());
      var order_in_progress = Number($("span.order_in_progress").html());
      if (data.order_status === "already_deliver"){
        $("span.order_delivering_orders").html(order_deliverings + data.number_orders);
        if (order_in_progress > 0)
          $("span.order_in_progress").html(order_in_progress - data.number_orders);
      }
      else{
        if (data.order_status === "in_progress"){
          $("span.order_in_progress").html(order_in_progress + data.number_orders);
          if (order_not_delivers > 0)
            $("span.order_not_delivers").html(order_not_delivers - data.number_orders);
        }
        else{
          if (order_deliverings > 0)
            $("span.order_delivering_orders").html(order_deliverings - data.number_orders) ;
        }
      }
    }
  },
  update_rollback: function(data){
    if (data){
      for (var i in data.order_ids){
        $(".resources_data_list").find("[data-order-id="+data.order_ids[i]+"]").remove();
        $(window).data("ajaxready", true).trigger("scroll");
      }
      var order_deliverings = parseInt($("span.order_delivering_orders").html());
      var order_not_delivers = parseInt($("span.order_not_delivers").html());
      var order_in_progress = Number($("span.order_in_progress").html());
      var number_orders = Number($("span.number_order_histories").html());
      if (data.order_status === "not_deliver"){
        $("span.order_not_delivers").html(order_not_delivers + data.number_orders);
        if (order_in_progress > 0)
          $("span.order_in_progress").html(order_in_progress - data.number_orders);
      }
      else{
        if (data.order_status === "in_progress"){
          $("span.order_in_progress").html(order_in_progress + data.number_orders);
          if (order_deliverings > 0)
            $("span.order_delivering_orders").html(order_deliverings - data.number_orders);
        }
        else{
          if (number_orders > 0)
            $("span.number_order_histories").html(number_orders - data.number_orders) ;
        }
      }
    }
  }
}

var update_status_show_view = {
  constructor: {
    trigger: "#fn-supplier-select-order-status",
    currentOrderStatus: "",
    newOrderStatus:"",
    src: "#fn-confirm-update-status-show-page",
    currentStatusIndex: 0,
    newStatusIndex: 0,
    errorsFailTransaction: "#js-orderErrorFailTransaction-text",
    displayLoadingImageWhenUpdateStatus: ".js-diplay-loading-image-status-update",
    prevValue: ""
  },
  init: function(){
    var self = this;
    self.set();
  },
  set: function(){
    var self = this;
    var constructor = self.constructor;

    $(document).on("click", constructor.trigger, function (prevValue) {
      constructor.prevValue = $(constructor.trigger).val();
    });

    $(document).on("change", constructor.trigger, function (prevValue) {
      constructor.currentOrderStatus = $("#fn-supplier-edit-order").attr("data-status");
      constructor.newOrderStatus = $(this).val();
      self.popup();
    });
  },
  popup: function() {
    var self = this;
    var constructor = self.constructor;
    $("#fn-confirm").show();
    $("#fn-success").hide();
    $.magnificPopup.open({
      items: {
        type: "inline",
        closeOnBgClick: false,
        closeBtnInside: true,
        src: constructor.src
      },
      callbacks: {
        open: function () {

          if (constructor.newOrderStatus == "already_deliver") {
            if (constructor.prevValue == "in_progress") {
              $("#popup_text").html("発送済に変更しますか？");
            } else if(constructor.prevValue == "not_deliver") {
              $("#popup_text").html("発送済に変更しますか？");
            } else {
              $("#popup_text").html("発送済に戻しますか？");
            }
          } else if (constructor.newOrderStatus == "in_progress") {
            if (constructor.prevValue == "not_deliver") {
              $("#popup_text").html("準備中に変更しますか？");
            } else {
              $("#popup_text").html("準備中に戻しますか？");
            }
          } else if (constructor.newOrderStatus == "recieved_products") {
            if (constructor.prevValue == "already_deliver") {
              $("#popup_text").html("納品完了に変更しますか？");
            } else {
              $("#popup_text").html("納品完了に戻しますか？");
            }
          } else if (constructor.newOrderStatus == "not_deliver") {
            $("#popup_text").html("確認中に戻しますか？");
          }
        },
        close: function(){
          $("#fn-confirm").show();
          $("#fn-success").hide();
          $(constructor.errorsFailTransaction).empty().hide();
          if ($("#fn-supplier-edit-order").attr("data-status") == constructor.currentOrderStatus){
            $(constructor.trigger).val(constructor.currentOrderStatus);
          }
        }
      }
    });
    // NO
    $("span#confirm_no").unbind().on("click", function(e) {
      $(constructor.trigger).val(constructor.currentOrderStatus);
      window.parent.$.magnificPopup.close();
    });
    // Yes
    $("form.fn-update-order-status").unbind().on("click", function(e) {
      e.preventDefault();
      self.ajax();
    });
  },
  ajax: function() {
    var self = this;
    var constructor = self.constructor;
    var url = $("form.fn-update-order-status").attr("action");
    $.ajax({
      url: url,
      type: "put",
      dataType: "json",
      data: {
        orders: {order_status: constructor.newOrderStatus},
      },
      beforeSend: function() {
        window.parent.$.magnificPopup.close();
        $(constructor.displayLoadingImageWhenUpdateStatus).addClass("-click-update-status");
      },
      success: function(data){
        $(constructor.displayLoadingImageWhenUpdateStatus).removeClass("-click-update-status");
        if (data.errors){
          self.show_message_error(data);
        }else{
          $.magnificPopup.open({
            items: {
              type: "inline",
              closeOnBgClick: false,
              closeBtnInside: true,
              src: constructor.src
            }
          });
          self.update(data);
          $("#fn-confirm").hide();
          $("#fn-success").show();
          $(constructor.errorsFailTransaction).empty().hide();
        }
      }
    });
  },
  show_message_error: function(data){
    var self = this;
    var constructor = self.constructor;
    $("#fn-confirm").hide();
    $("#fn-success").hide();
    $(constructor.errorsFailTransaction).empty().show();
    for (var i in data.errors){
      $(constructor.errorsFailTransaction).append("<p>"+ data.errors[i] + "</p>");
    }
  },
  update: function(data){
    var self = this;
    var constructor = self.constructor;
    if (data){
      if(window.location.pathname.includes("/restaurant/purchase_order_histories")){
        $(constructor.trigger).parent().html("納品完了");
      }else{
        $("#fn-supplier-edit-order").attr("data-status", data.order_status);
        $(constructor.trigger).empty();
        for (var i in data.selectbox){
          $(constructor.trigger).append("<option value='"+ data.selectbox[i][1] + "'>" + data.selectbox[i][0] + "</option>");
        }
        $(constructor.trigger).val(data.order_status);
      }
    }
  }
}

$(document).on("ready page:load", function(){
  if ($("#fn-supplier-edit-order").length > 0){
    update_status_show_view.init();
  }
});

$(document).on("change", "#order_checkbox .ex-checkbox", function() {
  update_orders_checked_status.init();
  modal.init();
  display.init();
});
