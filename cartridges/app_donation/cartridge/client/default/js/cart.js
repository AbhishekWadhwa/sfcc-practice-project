'use strict';
var baseProduct = require('base/product/base');

function getAddToCartUrl() {
    return $('#add-to-cart-donation').val(); 
}

function hideDonationWidget() {
    $('.donation-widget').show();
    $('.card.product-info button.remove-product').each(function() {
        if($(this).data('pid') === 'donationProduct') {
            $('.donation-widget').hide();
            $(this).parents('.card.product-info').find('.quantity-form > select').attr('disabled', true);
            $(this).parents('.card.product-info').find('.product-edit').remove();
        }
    });
}

hideDonationWidget();

$(document).on('click', 'button.cart-delete-confirmation-btn, .modal-footer .update-cart-product-global', function () {
    location.reload();
});

$(document).on('change', '.quantity-form select.quantity.custom-select', function () {
    location.reload();
});

$(document).on('click', 'button.add-to-cart', function () {
    var addToCartUrl;
    var pid;

    $('body').trigger('product:beforeAddToCart', this);

    pid = $('#donation-product-id').val();

    addToCartUrl = getAddToCartUrl();

    var form = {
        pid: pid,
        quantity: 1
    };

    $(this).trigger('updateAddToCartFormData', form);
    if (addToCartUrl) {
        $.ajax({
            url: addToCartUrl,
            method: 'POST',
            data: form,
            success: function (data) {
                $('.donation-widget').hide();
                //baseProduct.handlePostCartAdd(data);
                $('body').trigger('product:afterAddToCart', data);
                $.spinner().stop();
                baseProduct.miniCartReportingUrl(data.reportingURL);
                location.reload();
            },
            error: function () {
                $.spinner().stop(); 
            }
        });
    }
});