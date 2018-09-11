/* override functions api.jquery.js */
Shopify.onItemAdded = function(line_item) {
  Shopify.getCart();
};

Shopify.onCartUpdate = function(cart) {
  Shopify.cartUpdateInfo(cart, '.cart-group-1 ul');
};

Shopify.onError = function(XMLHttpRequest, textStatus) {
  var data = eval('(' + XMLHttpRequest.responseText + ')');
  if (!!data.message) {
    var str = data.description;
  } else {
   	var str = 'Error : ' + Shopify.fullMessagesFromErrors(data).join('; ') + '.';
  }
  jQuery('#modalAddToCartError .error_message').text(str);
  jQuery('#modalAddToCartError').modal("toggle");
}

Shopify.addItem = function(variant_id, quantity, callback) {
  var quantity = quantity || 1;
  var params = {
    type: 'POST',
    url: '/cart/add.js',
    data: 'quantity=' + quantity + '&id=' + variant_id,
    dataType: 'json',
    success: function(line_item) {
      if ((typeof callback) === 'function') {
        callback(line_item);
      }
      else {
        Shopify.cartPopap(variant_id);
        Shopify.onItemAdded(line_item);
      }
    },
    error: function(XMLHttpRequest, textStatus) {
      Shopify.onError(XMLHttpRequest, textStatus);
    }
  };
  jQuery.ajax(params);
};

Shopify.addItemFromForm = function(form_id, variant_id,callback) {
    var params = {
      type: 'POST',
      url: '/cart/add.js',
      beforeSend: function(){
        if(form_id == "add-item-qv") {
          jQuery('#' + form_id).find(".addtocartqv").html(jQuery(".quickViewModal_info .button_wait").html());
        }
      },
      data: jQuery('#' + form_id).serialize(),
      dataType: 'json',
      success: function(line_item) {
        if ((typeof callback) === 'function') {
          callback(line_item);
        }
        else {
          if(form_id != "add-item-qv") {
            Shopify.cartPopapForm(variant_id);
          } else {
          	jQuery('#' + form_id).find(".addtocartqv").html(jQuery(".quickViewModal_info .button_added").html());
            jQuery('#' + form_id).find(".addtocartqv").addClass("added_in_cart");
            setTimeout(function(){
              	jQuery('#' + form_id).find(".addtocartqv").removeClass("added_in_cart");
            	jQuery('#' + form_id).find(".addtocartqv").html(jQuery(".quickViewModal_info .button").html());
            }, 2000);
          }
          Shopify.onItemAdded(line_item);
        }
      },
      error: function(XMLHttpRequest, textStatus) {
        if(form_id != "add-item-qv") {
          Shopify.onError(XMLHttpRequest, textStatus);
        } else {
          jQuery('#' + form_id).find(".addtocartqv").html(jQuery(".quickViewModal_info .button_error").html());
          jQuery('#' + form_id).find(".addtocartqv").addClass("error_in_cart");
          setTimeout(function(){
            jQuery('#' + form_id).find(".addtocartqv").removeClass("error_in_cart");
            jQuery('#' + form_id).find(".addtocartqv").html(jQuery(".quickViewModal_info .button").html());
          }, 2000);
        }
      }
    };
    jQuery.ajax(params);

};

/* user functions */

Shopify.addItemFromFormStart = function(form, product_id) {
  Shopify.addItemFromForm(form, product_id);
}

Shopify.cartPopap = function(variant_id) {
  	var title = jQuery('.'+variant_id+':first .product_title').text();
  	jQuery('.productmsg').text('');
  	jQuery('#modalAddToCart').modal("toggle");
}
Shopify.cartPopapForm = function(variant_id) {
  	var title = jQuery('.product-info__title:first h2').text();
	jQuery('.productmsg').text('');
	jQuery('#modalAddToCart').modal("toggle");
}

Shopify.updateCartAttribute = function(attributes){
  var params = {
      type: 'POST',
      url: '/cart/update.js',
      data: JSON.stringify({attributes: {advocate_id: 1, advocate_username: 'www'}}),
      dataType: 'json',
      success: function(cart) {
        if ((typeof callback) === 'function') {
          callback(cart);
        }
        else {

        }
      },
      error: function(XMLHttpRequest, textStatus) {
        Shopify.onError(XMLHttpRequest, textStatus);
      }
  };
  
  jQuery.ajax(params);
}

Shopify.cartUpdateInfo = function(cart, cart_cell_id) {
  
 cart = BOLD.common.cartDoctor.fix(cart);
  
  //Bold: Ensure the cart's line items have been updated with their option information
  if(typeof(BOLD) === 'object' && BOLD.helpers && typeof(BOLD.helpers.cleanCart) === 'function' )
    cart = BOLD.helpers.cleanCart(cart);

  var formatMoney = "<span class='money'>${{amount}}</span>";
  if ((typeof cart_cell_id) === 'string') {
    var cart_cell = jQuery(cart_cell_id);
    if (cart_cell.length) {

      cart_cell.empty();

      jQuery.each(cart, function(key, value) {
        
        if (key === 'items') {
			
          if (value.length) {
            jQuery('.cart_message').hide();
            
            var table = jQuery(cart_cell_id);
            jQuery.each(value, function(i, item) {

              if(item.formatted_recurring_desc == undefined){
                item.formatted_recurring_desc = '';
              }

              if(i > 19){
                  return false;
              }
              jQuery('<li class="cart__item"><div class="cart__item__image pull-left"><a href="' + item.url + '"><img src="' + item.image + '" alt=""/></a> </div><div class="cart__item__control"><div class="cart__item__delete"><a href="javascript:void(0);" onclick="BOLD.helpers.changeItem(' + item.key + ')" class="icon icon-delete"><span>'+jQuery(".cart_messages .delete").text()+'</span></a></div><div class="cart__item__edit"><a href="' + item.url + '" class="icon icon-edit"><span>'+jQuery(".cart_messages .edit").text()+'</span></a></div></div><div class="cart__item__info"><div class="cart__item__info__title"><h2><a href="' + item.url + '">' + item.title + '</a></h2>' + item.formatted_recurring_desc + '</div><div class="cart__item__info__price"><span class="info-label">'+jQuery(".cart_messages .price").text()+'</span><span>' + Shopify.formatMoney(item.price, formatMoney) + '</span></div><div class="cart__item__info__price" style="right: 35%;"><span class="info-label">'+jQuery(".cart_messages .qty").text()+'</span><span>' + item.quantity + '</span></div></div></li>').appendTo(table);
            });
          }
          else {
            jQuery('.cart_message').show();
          }
        }
      });
    }
  }

  changeHtmlValue(".shopping-cart__total", Shopify.formatMoney(cart.total_price, formatMoney));
  changeHtmlValue(".bigcounter", cart.item_count);

  jQuery('.currency .active').trigger('click');
}

//Utils
function changeHtmlValue (cell, value) {
  var $cartLinkText = jQuery(cell);
  $cartLinkText.html(value);
};