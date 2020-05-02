<div class="main-card mb-3 card">
    <div class="card-body"><h5 class="card-title">Add Teachers</h5>

      <form class="" method="post" action="<?= base_url('Users/insertTeacher') ?>">
        <div class="form-row">
          <div class="col-md-6">
            <div class="position-relative form-group">
              <label for="username" class="">Username</label>
              <input name="username" id="username" placeholder="Username" type="text" class="form-control" required>
              <?= form_error('username'); ?>
            </div>
          </div>
          <div class="col-md-6">
            <div class="position-relative form-group">
              <label for="password" class="">Password</label>
              <input name="password" id="password" placeholder="Password" type="password" class="form-control" required>
              <?= form_error('password'); ?>
            </div>
          </div>
        </div>
        <input class="mt-2 btn btn-primary pull-right" type="submit" name="" value="Register Teacher">
      </form>

    </div>
  </div>
