let tokenSession = sessionStorage.getItem("token");
let token = "Bearer" + " " + tokenSession;
let today = new Date();
let resch = new Date();
let datebaru = today.setDate(today.getDate() + 3);
let datereschedule = today.setDate(resch.getDate() + 3);

$("#Tanggal_angkut").datetimepicker({
    timepicker: false,
    format: "Y/m/d",
    minDate: datebaru,
});

$("#jam_angkut").datetimepicker({
    datepicker: false,
    format: "H:i:s",
    minTime: "08:00",
    maxTime: "13:00",
});

$("#Tanggal_angkut_baru").datetimepicker({
    timepicker: false,
    format: "Y/m/d",
    minDate: datereschedule,
});

$("#jam_angkut_baru").datetimepicker({
    datepicker: false,
    format: "H:i:s",
    minTime: "08:00",
    maxTime: "13:00",
});

function login() {
    var inputEmail = document.getElementById("login_email").value;
    var inputPassword = document.getElementById("login_password").value;
    var validP, validE
    let regexEmail = new RegExp('[a-z0-9]+@[a-z]+\.[a-z]{2,3}');

    if (regexEmail.test(inputEmail)) {
        validE = true
        document.getElementById("invalidEmail").style.display="none";
        document.getElementById("login_email").style.borderColor="#e4e6fc";
    } else {
        validE = false
        document.getElementById("invalidEmail").style.display="block";
        document.getElementById("login_email").style.borderColor="red";
    };

    if (inputPassword.length>7) {
        validP= true
        document.getElementById("invalidPass").style.display="none";
        document.getElementById("login_password").style.borderColor="#e4e6fc";
    } else {
        validP = false
        document.getElementById("invalidPass").style.display="block";
        document.getElementById("login_password").style.border="solid red 1px";
    }

    if (validP == true && validE == true){
        var formdata = new FormData();
        formdata.append("email", document.getElementById("login_email").value);
        formdata.append(
            "password",
            document.getElementById("login_password").value
        );

        var requestOptions = {
            method: "POST",
            body: formdata,
            redirect: "follow",
        };

        fetch("https://pepeseal.klubaderai.com/api/login", requestOptions)
            .then((response) => response.text())
            .then((result) => {
                var data = JSON.parse(result);
                var user_data = data.data_user;
                var token = data.token;

                var alamat = user_data.alamat;
                var kode_alamat = user_data.kode_alamat;
                var akses = user_data.akses;
                var email = user_data.email;
                var id = user_data.id;
                var name = user_data.name;
                var no_telp = user_data.no_telp;

                sessionStorage.setItem("token", token);
                sessionStorage.setItem("alamat", alamat);
                sessionStorage.setItem("kode_alamat", kode_alamat);
                sessionStorage.setItem("akses", akses);
                sessionStorage.setItem("email", email);
                sessionStorage.setItem("id", id);
                sessionStorage.setItem("name", name);
                sessionStorage.setItem("no_telp", no_telp);

                switch (akses) {
                    case "admin":
                        location.href = "/Admin";
                        break;
                    case "user":
                        location.href = "/dashboard-user";
                        break;
                }
            })
            .catch((error) => console.log("error", error));
    }
}

function logout() {
    var myHeaders = new Headers();
    myHeaders.append("Authorization", token);

    var formdata = new FormData();

    var requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: formdata,
        redirect: "follow",
    };

    fetch("https://pepeseal.klubaderai.com/api/logout", requestOptions)
        .then((response) => response.text())
        .then((result) => {
            sessionStorage.clear();
            location.href = "/";
        })
        .catch((error) => console.log("error", error));
}

function tablePengangkutanUser() {
    const url =
        "https://pepeseal.klubaderai.com/api/viewriwayatpengangkutanuser";
    $(document).ready(function () {
        $.ajax({
            method: "GET",
            url: url,
            headers: {
                Authorization: token,
            },
            success: function (response) {
                dataAPI = response.pengangkutan;
                document.getElementById("banyakBerhasil").innerHTML =
                    response.selesai;
                document.getElementById("banyakBatal").innerHTML =
                    response.gagal;
                $("#table-pengangkutanuser").DataTable({
                    data: dataAPI,
                    responsive: true,
                    pageLength: 10,
                    autoWidth: false,
                    order: [[0, "desc"]],
                    columnDefs: [
                        {
                            targets: [7],
                            render: function (data) {
                                if (data.status == "Selesai") {
                                    return '<div class="badge badge-success">Selesai</div>';
                                } else {
                                    return '<div class="badge badge-danger">Gagal</div>';
                                }
                            },
                        },
                    ],
                    columns: [
                        {
                            data: "id",
                        },
                        {
                            data: "user.name",
                            orderable: false,
                        },
                        {
                            data: "user.no_telp",
                            orderable: false,
                        },
                        {
                            data: "user.kodealamat.Kelurahan",
                            orderable: false,
                        },
                        {
                            data: "user.Alamat",
                            orderable: false,
                        },
                        {
                            data: "Tanggal_angkut",
                            orderable: false,
                        },
                        {
                            data: "jam_angkut",
                            orderable: false,
                        },
                        {
                            data: "status",
                            orderable: false,
                        },
                    ],
                });
            },
            error: function (response) {
                hasil = response.responseJSON.message;
                alert(hasil);
            },
        });
    });
}

function tableLaporanUser() {
    var myArray = [];
    const url = "https://pepeseal.klubaderai.com/api/getlaporanmasalahuser";
    $(document).ready(function () {
        $.ajax({
            method: "GET",
            url: url,
            headers: {
                Authorization: token,
            },
            success: function (response) {
                dataAPI = response.laporan;
                $("#table-laporanmasalahuser").DataTable({
                    data: dataAPI,
                    responsive: true,
                    pageLength: 10,
                    autoWidth: false,
                    order: [[0, "desc"]],
                    columnDefs: [
                        {
                            targets: [3],
                            render: function (data) {
                                if (data.status == "Selesai") {
                                    return '<div class="badge badge-success">Selesai</div>';
                                } else if (data.status == "Terima") {
                                    return '<div class="badge badge-warning">Pending</div>';
                                } else if (data.status == "Ditolak") {
                                    return '<div class="badge badge-warning">Ditolak</div>';
                                }
                            },
                        },
                    ],
                    columns: [
                        {
                            data: "id",
                            orderable: false,
                        },
                        {
                            data: null,
                            orderable: false,
                            render: function (data) {
                                var date = new Date(
                                    data.created_at
                                ).toLocaleDateString();

                                return date;
                            },
                        },
                        {
                            data: "laporan",
                            orderable: false,
                        },
                        {
                            data: "status",
                            orderable: false,
                        },
                    ],
                });
            },
            error: function (response) {
                hasil = response.responseJSON.message;
                alert(hasil);
            },
        });
    });
}

function newPengangkutan() {
    swal({
        title: "Apakah anda yakin?",
        icon: "warning",
        buttons: true,
    }).then((postData) => {
        if (postData) {
            var myHeaders = new Headers();
            myHeaders.append("Authorization", token);
            var formdata = new FormData();
            formdata.append(
                "Tanggal_angkut",
                document.getElementById("Tanggal_angkut").value
            );
            formdata.append(
                "jam_angkut",
                document.getElementById("jam_angkut").value
            );
            var requestOptions = {
                method: "POST",
                headers: myHeaders,
                body: formdata,
                redirect: "follow",
            };
            fetch(
                "https://pepeseal.klubaderai.com/api/newpengangkutan",
                requestOptions
            )
                .then((response) => response.text())
                .then((result) => {
                    var data = JSON.parse(result);
                    swal('Permintaan terkirim', {
                        icon: 'success',
                    })
                })
                .catch((error) => console.log("error", error));
        } else {
            swal("Proses dibatalkan");
        }
    });
}

function newLaporan() {
    swal({
        title: "Apakah anda yakin?",
        icon: "warning",
        buttons: true,
    }).then((postLaporan) => {
        if (postLaporan) {
            var myHeaders = new Headers();
            myHeaders.append("Authorization", token);

            var formdata = new FormData();
            formdata.append(
                "laporan",
                document.getElementById("laporan").value
            );
            var requestOptions = {
                method: "POST",
                headers: myHeaders,
                body: formdata,
                redirect: "follow",
            };

            fetch(
                "https://pepeseal.klubaderai.com/api/newlaporan",
                requestOptions
            )
                .then((response) => response.text())
                .then((result) => {
                    var data = JSON.parse(result);
                    swal('Pelaporan terkirim', {
                        icon: 'success',
                    })
                })
                .catch((error) => console.log("error", error));
        } else {
            swal("Proses dibatalkan");
        }
    });
}

function tablePengguna() {
    var myArray = [];
    const url = "https://pepeseal.klubaderai.com/api/users";
    $(document).ready(function () {
        $.ajax({
            method: "GET",
            url: url,
            headers: {
                Authorization: token,
            },
            success: function (response) {
                dataAPI = response.data;
                $("#table-pengguna").DataTable({
                    data: dataAPI,
                    responsive: true,
                    pageLength: 10,
                    autoWidth: false,
                    order: [[0, "asc"]],
                    columns: [
                        {
                            data: "id",
                            orderable: false,
                        },
                        {
                            data: "name",
                            orderable: false,
                        },
                        {
                            data: "email",
                            orderable: false,
                        },
                        {
                            data: "no_telp",
                            orderable: false,
                        },
                    ],
                });
            },
            error: function (response) {
                hasil = response.responseJSON.message;
                alert(hasil);
            },
        });
    });
}

function tableAlamat() {
    var myArray = [];
    const url = "https://pepeseal.klubaderai.com/api/alamat";
    $(document).ready(function () {
        $.ajax({
            method: "GET",
            url: url,
            headers: {
                Authorization: token,
            },
            success: function (response) {
                dataAPI = response.alamat;
                console.log(dataAPI);
                $("#table-alamat").DataTable({
                    data: dataAPI,
                    responsive: true,
                    pageLength: 10,
                    autoWidth: false,
                    order: [[0, "asc"]],
                    columns: [
                        {
                            data: "id",
                            orderable: false,
                        },
                        {
                            data: "user.name",
                            orderable: false,
                            render: function (data) {
                                if (!data) {
                                    return "-";
                                } else {
                                    return data;
                                }
                            },
                        },
                        {
                            data: "Kecamatan",
                            orderable: false,
                        },
                        {
                            data: "Kelurahan",
                            orderable: false,
                        },
                        {
                            data: "RW",
                            orderable: false,
                        },
                        {
                            data: "RT",
                            orderable: false,
                        },
                    ],
                });
            },
            error: function (response) {
                hasil = response.responseJSON.message;
                alert(hasil);
            },
        });
    });
}

function getKelurahan() {
    var dropKelurahan = document.getElementById("Kelurahan");
    var myArray = [];
    $(document).ready(function () {
        $.ajax({
            method: "GET",
            url: "https://pepeseal.klubaderai.com/api/kelurahan",
            headers: {
                Authorization: token,
            },
            success: function (response) {
                data = response;

                var select = $(
                    '<select id="selectKelurahan" onchange="getRW()" name="kelurahan" class="form-control selectric" ><option>-</option</select>'
                );
                // const select = document.querySelector('#Kelurahan')
                $.each(data.kelurahan, function (i, kelurahan) {
                    var option = $("<option></option>");
                    option.attr("kelurahan.kelurahan", kelurahan.kelurahan);
                    option.text(kelurahan.kelurahan);
                    select.append(option);
                });
                $("#kelurahan").empty().append(select);
            },
        });
    });
}
function getRW() {
    var form = new FormData();
    form.append("Kelurahan", document.getElementById("selectKelurahan").value);
    var settings = {
        url: "https://pepeseal.klubaderai.com/api/RW",
        method: "POST",
        timeout: 0,
        headers: {
            Authorization: token,
        },
        processData: false,
        mimeType: "multipart/form-data",
        contentType: false,
        data: form,
    };
    $.ajax(settings).done(function (response) {
        var data = JSON.parse(response);
        console.log(data);
    });
}
function getRT() {}

// function editPengguna() {
//     $("#table-pengguna").on("click", "#btnEditPengguna", function () {
//         var id = $(this).closest("tr").find("td:eq(0)").text();
//         sessionStorage.setItem("id-pengguna", id);
//         location.href = "/Admin/Edit-User";
//     });
// }

// function showEditPengguna() {
//     var id = sessionStorage.getItem("id-pengguna");
//     var myHeaders = new Headers();
//     myHeaders.append("Authorization", token);

//     var requestOptions = {
//         method: "GET",
//         headers: myHeaders,
//         redirect: "follow",
//     };

//     fetch("https://pepeseal.klubaderai.com/api/users/" + id, requestOptions)
//         .then((response) => response.text())
//         .then((result) => {
//             var du = "data user"
//             var data = JSON.parse(result);
//             console.log(data);

//              var nama = document.getElementById("nama");
//              var notelp = document.getElementById("no_telp");
//              var pass = document.getElementById("password");
//              var repass = document.getElementById("repassword");

//              nama.value = data.name;
//              notelp.value = data.no_telp;
//              pass.value = data.password;
//              repass.value = data.re;
//         })
//         .catch((error) => console.log("error", error));
// }

// function showPengguna() {
//     sessionStorage.getItem("id-pengguna");

//     var myHeaders = new Headers();
//     myHeaders.append("Authorization", token);

//     var requestOptions = {
//         method: "GET",
//         headers: myHeaders,
//         redirect: "follow",
//     };

//     fetch("https://pepeseal.klubaderai.com/api/users/89", requestOptions)
//         .then((response) => response.text())
//         .then((result) => {
//             var data = JSON.parse(result);
//         })
//         .catch((error) => console.log("error", error));
// }

function showDashboardStatusPengangkutan() {
    const url = "https://pepeseal.klubaderai.com/api/viewpengangkutanuser";
    $(document).ready(function () {
        $.ajax({
            method: "GET",
            url: url,
            headers: {
                Authorization: token,
            },
            success: function (response) {
                dataAPI = response.pengangkutan;
                var nama = sessionStorage.getItem("name");
                var alert = response.pengangkutantolak.length;
                document.getElementById("welc_name").innerHTML =
                    "Selamat Datang, " + nama;
                if (alert > 0) {
                    document.getElementById("alert_tolak").style.display =
                        "block";
                    document.getElementById("alert_tolaknum").innerHTML =
                        "Ada " +
                        response.pengangkutantolak.length +
                        " Permintaan Ditolak";
                }

                $("#table-statuspengangkutan").DataTable({
                    data: dataAPI,
                    orderable: false,
                    responsive: true,
                    pageLength: 10,
                    autoWidth: false,
                    order: [[0, "desc"]],
                    columnDefs: [
                        {
                            targets: [3],
                            render: function (data) {
                                if (data.status == "Terima") {
                                    return '<div class="badge badge-success">Terima</div>';
                                } else if (data.status == "Reschedule") {
                                    return '<div class="badge badge-success">Reschedule</div>';
                                } else if (data.status == "Pending") {
                                    return '<div class="badge badge-warning">Pending</div>';
                                } else if (
                                    data.status == "reschedule_pending"
                                ) {
                                    return '<div class="badge badge-warning">Reschedule Pending</div>';
                                }
                            },
                        },
                    ],
                    columns: [
                        {
                            data: "id",
                        },
                        {
                            data: "Tanggal_angkut",
                        },
                        {
                            data: "jam_angkut",
                        },
                        {
                            data: "status",
                        },
                    ],
                });
            },
            error: function (response) {
                hasil = response.responseJSON.message;
                alert(hasil);
            },
        });
    });

    $(document).ready(function () {
        $.ajax({
            method: "GET",
            url: url,
            headers: {
                Authorization: token,
            },
            success: function (response) {
                dataAPI = response.pengangkutantolak;

                $("#table-statustolak").DataTable({
                    data: dataAPI,
                    responsive: true,
                    pageLength: 10,
                    autoWidth: false,
                    order: [[0, "desc"]],
                    columns: [
                        {
                            data: "id",
                        },
                        {
                            data: "Tanggal_angkut",
                            orderable: false,
                        },
                        {
                            data: "jam_angkut",
                            orderable: false,
                        },

                        {
                            data: "user.name",
                            orderable: false,
                        },
                        {
                            render: function (id) {
                                return '<button class="btn btn-danger" id="btnEditPesanan" onclick="editPesanan()">Ajukan Reschedule</i></button>';
                            },
                            orderable: false,
                        },
                        {
                            data: "status.status",
                            visible: false,
                            orderable: false,
                        },
                    ],
                });
            },
            error: function (response) {
                hasil = response.responseJSON.message;
                alert(hasil);
            },
        });
    });
}

function editPesanan() {
    $("#table-statustolak").on("click", "#btnEditPesanan", function () {
        var id = $(this).closest("tr").find("td:eq(0)").text();
        sessionStorage.setItem("id-pesanan", id);
        location.href = "/penjadwalan-ulang-pengangkutan";
    });
}

function searchPesanan() {
    var id = sessionStorage.getItem("id-pesanan");
    var myHeaders = new Headers();
    myHeaders.append("Authorization", token);

    var requestOptions = {
        method: "GET",
        headers: myHeaders,
        redirect: "follow",
    };

    fetch(
        "https://pepeseal.klubaderai.com/api/viewpengangkutanuser/" + id,
        requestOptions
    )
        .then((response) => response.text())
        .then((result) => {
            var data = JSON.parse(result);

            var ta = document.getElementById("Tanggal_angkut");
            var ja = document.getElementById("jam_angkut");
            var s = document.getElementById("status");

            ta.value = data.pengangkutan.Tanggal_angkut;
            ja.value = data.pengangkutan.jam_angkut;
            s.value = data.pengangkutan.status.status;
        })
        .catch((error) => console.log("error", error));
}

function newReschedule() {
    var id = sessionStorage.getItem("id-pesanan");
    var myHeaders = new Headers();
    myHeaders.append("Authorization", token);
    myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

    var urlencoded = new URLSearchParams();

    urlencoded.append(
        "Tanggal_angkut",
        document.getElementById("Tanggal_angkut_baru").value
    );
    urlencoded.append(
        "jam_angkut",
        document.getElementById("jam_angkut_baru").value
    );

    var requestOptions = {
        method: "PUT",
        headers: myHeaders,
        body: urlencoded,
        redirect: "follow",
    };

    fetch(
        "https://pepeseal.klubaderai.com/api/updatepengangkutan/" + id,
        requestOptions
    )
        .then((response) => response.text())
        .then((result) => {
            sessionStorage.removeItem("id-pesanan");
            location.href = "/dashboard-user";
        })
        .catch((error) => console.log("error", error));
}
