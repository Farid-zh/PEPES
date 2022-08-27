<script>
    var session = sessionStorage.length;
    var akses = sessionStorage.getItem("akses");
    if (session !== null) {
        switch (akses) {
            case "admin":
                location.href = "/Admin";
                break;
            case "user":
                location.href = "/dashboard-user";
                break;
        }
    } else if (session == null) {
        location.href = login;
    }
</script>
<?php include(app_path() . '/includes/auth-login.php');
