
$(function () {
    //variable
    var $orders = $('#orders');
    var $name = $('#name');
    var $drink = $('#drink');

    var orderTemplate = $('#order-template').html();
    $.ajax({
        url: '../Content/Test.json',
        success: function (orders) {
            $.each(orders, function (i, order) {
                $orders.append(Mustache.render(orderTemplate, order));
            });
        },
        error: function () {
            console.log('error loading orders');
        }

    });

    $('#add-order').on('click', function () {

        var order = {
            name: $name.val(),
            drink: $drink.val()
        };
        $.ajax({
            type: 'POST',
            url: '../Content/Test.json',
            data: order,
            success: function (newOrder) {
                $orders.append('<li>name: ' + newOrder.name + ', drink: ' + newOrder.drink + '</li>');
            },
            error: function () {
                $orders.append(Mustache.render(orderTemplate, order));
            }
        });
    });


    $orders.delegate('.remove', 'click', function () {
        var $li = $(this).closest('li');
        $.ajax({
            type: 'DELETE',
            url: './orders.json',
            success: function () {
                console.log('success');
            },
            error: function () {
                console.log('error');
                $li.fadeOut(300, function () {
                    $(this).remove();
                });
            }

        })
    });


    $orders.delegate('.editOrder', 'click', function () {
        var $li = $(this).closest('li');
        $li.find('input.name').val($li.find('span.name').html());
        $li.find('input.drink').val($li.find('span.drink').html());
        $li.addClass('edit');
    });


    $orders.delegate('.cancelEdit', 'click', function () {
        $(this).closest('li').removeClass('edit');
    });

    $orders.delegate('.saveEdit', 'click', function () {
        var $li = $(this).closest('li');
        var order = {
            name: $li.find('input.name').val(),
            drink: $li.find('input.drink').val()
        };

        $.ajax({
            type: 'PUT',
            url: '../Content/Test.json',
            data: order,
            success: function (newOrder) {
                console.log('success');
            },
            error: function () {
                $li.find('span.name').html(order.name);
                $li.find('span.drink').html(order.drink);
                $li.removeClass('edit');
            }
        });
    });
})
