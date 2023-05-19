document.getElementById('btnSugerir').onclick = function () {
    const url = "http://localhost:8000/sample"

    $(document).ready(function () {

        $.ajax({
            url: url,
            type: "GET",
            dataType: "json",
            contentType: 'application/json',
            crossDomain: true
        }).done(function (response) {
            let rows = JSON.parse(response);

            if (rows.hasOwnProperty("Unnamed: 0")) {
                delete rows["Unnamed: 0"];
            }
            for (const key in rows) {
                if (Object.hasOwnProperty.call(rows, key)) {
                    const element = rows[key];
                    let val = Object.entries(element)[0][1]
                    domElement = document.getElementById(key);

                    if (domElement.nodeName === 'SELECT') {

                        let opts = domElement.options;
                        for (let opt, j = 0; opt = opts[j]; j++) {
                            if (opt.value == val) {
                                domElement.selectedIndex = j;
                                $("#" + domElement.id).niceSelect('update');
                                break;
                            }
                        }
                    } else {
                        domElement.value = val;
                    }
                }
            }
        });
    });
}

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