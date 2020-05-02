<!DOCTYPE html>
<html lang="en">

<head>

  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
  <meta name="description" content="">
  <meta name="author" content="">

  <title>CollegeRepo | <?= $title ?></title>

  <link href="<?= base_url('assets/vendor/fontawesome-free/css/all.min.css') ?>" rel="stylesheet" type="text/css">
  <link rel="icon" href="<?= base_url('assets/images/sma.png') ?>">
  <link href="https://fonts.googleapis.com/css?family=Merriweather+Sans:400,700" rel="stylesheet">
  <link href='https://fonts.googleapis.com/css?family=Merriweather:400,300,300italic,400italic,700,700italic' rel='stylesheet' type='text/css'>
  <link href="<?= base_url('assets/') ?>vendor/magnific-popup/magnific-popup.css" rel="stylesheet">
  <link href="<?= base_url('assets/css/defuser/creative.min.css') ?>" rel="stylesheet">

</head>

<body id="page-top">

  <nav class="navbar navbar-expand-lg navbar-light fixed-top py-3" id="mainNav">
    <div class="container">
      <a class="navbar-brand js-scroll-trigger" href="<?= base_url('User/index') ?>"><img src="<?= base_url('assets/images/sma.png') ?>" alt=""></a>
      <button class="navbar-toggler navbar-toggler-right" type="button" data-toggle="collapse" data-target="#navbarResponsive" aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
    </div>
  </nav>

  <section class="page-section" id="services">
    <div class="container">
      <h2 class="text-center mt-0">View All Repo Files</h2>
      <hr class="divider my-4">
      <div class="row">
        <?php if(!empty($files)){ foreach($files as $frow){ ?>
          <div class="col-md-3">
            <div class="card-shadow-primary border mb-3 card card-body">
              <h5 class="card-title"><?php echo $frow['pic_title']; ?></h5>
              <embed src="<?php echo base_url().'assets/uploads/'.$frow['pic_file']; ?>" style="height:150px;width:200px;">
                <br />
                <!-- <a href="<?php echo base_url().'FileManager/download/'.$frow['pic_id']; ?>" class="dwn"> <button type="button" class="btn btn-success" name="button"><i class="fa fa-eye"></i> View</button></a> -->
                <a href="<?php echo base_url().'FileManager/download/'.$frow['pic_id']; ?>" class="dwn"> <button type="button" class="btn btn-success" name="button"><i class="fa fa-download"></i> Download</button></a>
              </div>
            </div>
          <?php } } ?>
        </div>

      </div>
    </section>

    <footer class="bg-light py-5">
      <div class="container">
        <div class="small text-center text-muted">Copyright &copy; 2020 - CollegeRepo</div>
      </div>
    </footer>

    <script src="<?= base_url('assets/vendor/jquery/jquery.min.js') ?>"></script>
    <script src="<?= base_url('assets/vendor/bootstrap/js/bootstrap.bundle.min.js') ?>"></script>
    <script src="<?= base_url('assets/vendor/jquery-easing/jquery.easing.min.js') ?>"></script>
    <script src="<?= base_url('assets/')?>vendor/magnific-popup/jquery.magnific-popup.min.js"></script>
    <script src="<?= base_url('assets/js/defuser/creative.min.js') ?>"></script>
  </body>
  </html>
