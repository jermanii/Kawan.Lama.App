$(document).ready(function () {
    $('.onCheck').change(function () {
        var isChecked = $(this).is(':checked');
        var id = $(this).data('id');
        $.ajax({
            url: param.check,
            type: 'POST',
            data: {
                guid: id,
                isCheck: isChecked
            },
            success: function (response) {
                if (response.redirectUrl) {
                    window.location.href = response.redirectUrl; // Redirect manual via JS
                } else {
                    console.log('Status updated successfully');
                }
            },
            error: function (xhr, status, error) {
                console.error('Error updating status:', error);
                alert('Gagal update status To-Do.');
            }
        });
    });

    $('#submitBtn').click(function (e) {
        var inputVal = $('#todoInput').val();
        if (!inputVal) {
            alert("Input tidak boleh kosong!");
            return;
        }
        else {
            $.ajax({
                url: param.submit,
                type: 'POST',
                data: {
                    description: inputVal
                },
                success: function (response) {
                    if (response.redirectUrl) {
                        window.location.href = response.redirectUrl; // Redirect manual via JS
                    } else {
                        console.log('Submit successfully');
                    }
                },
                error: function (xhr, status, error) {
                    console.error('Error Submit:', error);
                    alert('Gagal Submit To-Do.');
                }
            });
        }
    });

    $('.deleteClick').click(function (e) {
        var id = $(this).data('id');
        Swal.fire({
            text: "Are you sure want to deleted this data ?",
            icon: "info",
            buttonsStyling: false,
            showCancelButton: true,
            confirmButtonText: "Yes, deleted it!",
            cancelButtonText: 'Nope, cancel it',
            customClass: {
                confirmButton: "btn btn-primary",
                cancelButton: 'btn btn-danger'
            }
        }).then((result) => {
            if (result.isConfirmed) {
                $.ajax({
                    url: param.deleted,
                    type: 'POST',
                    data: {
                        guid: id
                    },
                    success: function (response) {
                        if (response.redirectUrl) {
                            window.location.href = response.redirectUrl; // Redirect manual via JS
                        } else {
                            console.log('Deleted successfully');
                        }
                    },
                    error: function (xhr, status, error) {
                        console.error('Error Deleted:', error);
                        alert('Gagal deleted To-Do.');
                    }
                });
            };
        });
    });
});