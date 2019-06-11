
var removeOrder = {
  constructor: {
    trigger: "#fn-remove-button",
    displayLoadingImageWhenUpdateStatus: ".js-diplay-loading-image-status-update"
  },
  init: function (data) {
    var self = this;
    self.change();
  },
  change: function() {
    var self = this;
    var constructor = self.constructor;
    $(constructor.trigger).on("click", function(e) {
      self.popup();
    });
  },
  popup: function() {
    var self = this;
    var constructor = self.constructor;
    $.magnificPopup.open({
      items: {
        type: "inline",
        closeOnBgClick: false,
        closeBtnInside: true,
        src: "#fn-confirm-remove"
      },
      callbacks: {
        open: function() {
        },
        close: function(){
        }
      }
    });
    $("span#confirm_no").on("click", function(e) {
      window.parent.$.magnificPopup.close();
    });
    $("span#confirm_yes").on("click", function(e) {
      window.parent.$.magnificPopup.close();
      $(constructor.displayLoadingImageWhenUpdateStatus).addClass("-click-update-status");
    });
  }
}

$(document).on("ready page:load", function(){
  removeOrder.init();
});
