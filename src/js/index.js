$(document).ready(function () {
    const url = 'https://evasaofastapi1-georgecarvalho.b4a.run/predict'

    var names = $(".form-control").map(function () { return $(this).attr('name'); }).get();
    var values = $(".form-control").map(function () { return $(this).val(); }).get();

    var formData = {};
    names.forEach((names, i) => formData[names] = values[i]);

    $("form").submit(function (event) {

        $.ajax({
            type: "POST",
            url: url,
            data: JSON.stringify(formData),
            dataType: "json",
            contentType: "application/json"
        }).done(function (data) {
            let msg = ""
            if (data['prediction'] === 0) {
                msg = "Evasão pouco provável"
            } else if (data['prediction'] === 1) {
                msg = "Alta propabilidade de evasão"
            }
            $("form").prepend(
                `<div class="alert alert-success alert-dismissible fade show" role="alert">
                    ${msg}
                    <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>`
            );

        }).fail(function (xhr) {
            $("form").prepend(
                `<div class="alert alert-danger alert-dismissible fade show" role="alert">
                    Erro ${xhr.status} ${xhr.statusText}
                    <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>`
            );
            console.log(xhr.responseText)
        });

        event.preventDefault();
    });
});