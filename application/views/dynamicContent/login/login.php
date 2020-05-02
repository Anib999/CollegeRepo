<!DOCTYPE html>
<html lang="en" dir="ltr">
<head>
  <meta charset="utf-8">
  <title><?= $title ?></title>
  <link href="<?= base_url('assets/css/main.css') ?>" rel="stylesheet">
</head>
<body>

  <div class="app-main__outer">

    <div class="app-main__inner">

      <div class="row">
        <div class="col-md-4 offset-md-4">
          <div class="main-card mb-3 card">
            <div class="card-header">Login
            </div>
            <div class="card-body">
              <form action="<?= base_url('Login/auth') ?>" method="post">
                <div class="form-row">
                  <div class="col-md-12">
                    <div class="position-relative form-group">
                      <label for="username" class="">Username</label>
                      <input name="username" id="username" placeholder="Username" type="text" class="form-control" required autofocus>
                    </div>
                  </div>
                </div>
                <div class="form-row">
                  <div class="col-md-12">
                    <div class="position-relative form-group">
                      <label for="password" class="">Password</label>
                      <input name="password" id="password" placeholder="Password" type="password" class="form-control" required>
                    </div>
                  </div>
                </div>

                <div class="position-relative form-check form-check-inline">
                  <label style="margin-top:15px;" class="form-check-label">
                    <input type="checkbox" class="form-check-input"> Remember Me
                  </label>
                </div>
                <input class="mt-2 btn btn-primary pull-right" type="submit" name="" value="Login">
              </form>
              <?php if(isset($error)){ ?>
              <div style="margin-top:15px;" class="alert alert-danger fade show" role="alert">Either username or password is incorrect</div>
              <?php } ?>
            </div>
          </div>
        </div>
      </div>

    </div>
  </div>
  <script src="<?= base_url('assets/js/main.js') ?>"></script>
</body>
</html>
