<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta content="width=device-width, initial-scale=1, maximum-scale=1, shrink-to-fit=no" name="viewport">
  <title>Pepes &mdash; Admin</title>

  <!-- General CSS Files -->
  <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css" integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous">
  <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.7.2/css/all.css" integrity="sha384-fnmOCqbTlWIlj8LyTjo7mOUStjsKC4pOpQbqyi7RrhN7udi9RwhKkMHpvLbHG9Sr" crossorigin="anonymous">

  <!-- CSS Libraries -->
  <link rel="stylesheet" href="https://cdn.datatables.net/1.12.1/css/dataTables.bootstrap4.min.css" />
  <link rel="stylesheet" href="https://cdn.datatables.net/select/1.3.3/css/select.bootstrap4.min.css" />

  <!-- Template CSS -->
  <link rel="stylesheet" href="../assets/css/style.css">
  <link rel="stylesheet" href="../assets/css/components.css">
  <style>
        .btnTable{
            margin: auto!important;
            flex: 0 0 48%;
            font-size: 15px;
            font-style: bold;
            padding: 0.55rem 1.5rem;
        }
    </style>
</head>

<body onload="tablePelaporanMasalah()">
  <div id="app">
    <div class="main-wrapper">
      <div class="navbar-bg"></div>
      <nav class="navbar navbar-expand-lg main-navbar">
        <form class="form-inline mr-auto my-auto">
          <ul class="navbar-nav mr-3">
            <li><a href="#" data-toggle="sidebar" class="nav-link nav-link-lg"><i class="fas fa-bars"></i></a></li>
          </ul>
        </form>
      </nav>
      <?php include "sidebar-admin.php" ?>

      <!-- Main Content -->
      <div class="main-content">
        <section class="section">
          <div class="section-header">
            <h1>Laporan Masalah</h1>
          </div>
          <div class="section-body">
            
          <div class="mb-4 col-12">
            <div class="row">
              <a href="#cardPelaporanMasalah" class="btn btn-success btnTable">Laporan Baru</a>
              <a href="#cardPelaporanMasalahSelesai" class="btn btn-info btnTable">Laporan Selesai</a>
            </div>
          </div>
          <div class="card" id="cardPelaporanMasalah">
            <div class="card-header">
              <div class="card-header-action">
                <h4 class="text-success">Laporan Baru</h4>
              </div>
            </div>
            <div class="card-body">
              <div class="table-responsive">
                <table class="table table-striped" id="tablePelaporanMasalah">
                  <thead>
                    <tr>
                      <th class="text-center">
                        #
                      </th>
                      <th>ID</th>
                      <th>Tanggal</th>
                      <th>Nama</th>
                      <th>No. Telp</th>
                      <th>Kelurahan</th>
                      <th>Alamat</th>
                      <th>Masalah</th>
                      <th>Aksi</th>
                    </tr>
                  </thead>
                </table>
              </div>
            </div>
          </div>
          <div class="card" id="cardPelaporanMasalahSelesai">
            <div class="card-header">
              <div class="card-header-action">
                <h4 class="text-info">Laporan Selesai</h4>
              </div>
            </div>
            <div class="card-body">
              <div class="table-responsive">
                <table class="table table-striped" id="tablePelaporanMasalahSelesai">
                  <thead>
                    <tr>
                      <th class="text-center">
                        #
                      </th>
                      <th>ID</th>
                      <th>Tanggal</th>
                      <th>Nama</th>
                      <th>No. Telp</th>
                      <th>Kelurahan</th>
                      <th>Alamat</th>
                      <th>Masalah</th>
                      <th>Aksi</th>
                    </tr>
                  </thead>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>

    </div>
    <footer class="main-footer">
      <div class="footer-left">
        Copyright &copy; 2022
        <div class="bullet"></div>
        All Rights Reserved
      </div>
      <div class="footer-right">
        2.3.0
      </div>
    </footer>
  </div>
  </div>

  <!-- General JS Scripts -->
  <script src="https://cdn.jsdelivr.net/npm/jquery@3.6.0/dist/jquery.min.js"></script>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.7/umd/popper.min.js" integrity="sha384-UO2eT0CpHqdSJQ6hJty5KVphtPhzWj9WO1clHTMGa3JDZwrnQq4sF86dIHNDz0W1" crossorigin="anonymous"></script>
  <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/js/bootstrap.min.js" integrity="sha384-JjSmVgyd0p3pXB1rRibZUAYoIIy6OrQ6VrjIEaFf/nJGzIxFDsf4x0xIM+B07jRM" crossorigin="anonymous"></script>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery.nicescroll/3.7.6/jquery.nicescroll.min.js"></script>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/moment.js/2.24.0/moment.min.js"></script>
  <script src="../assets/js/stisla.js"></script>

  <!-- JS Libraies -->
  <script src="https://cdn.datatables.net/1.12.1/js/jquery.dataTables.min.js"></script>
  <script src="https://cdn.datatables.net/1.12.1/js/dataTables.bootstrap4.min.js"></script>
  <script src="https:////cdn.datatables.net/select/1.3.3/js/select.bootstrap4.js"></script>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/sweetalert/2.1.2/sweetalert.min.js"></script>"


  <!-- Template JS File -->
  <script src="../assets/js/scripts.js"></script>
  <script src="../assets/js/custom.js"></script>

  <!-- Page Specific JS File -->
  <script src="../assets/js/api-dito/admin-pelaporan-masalah.js"></script>
</body>

</html>