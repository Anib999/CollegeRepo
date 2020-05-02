<div class="main-card mb-3 card">
  <div class="card-body"><h5 class="card-title">Download Files</h5>

    <div class="row">
    <?php if(!empty($files)){ foreach($files as $frow){ ?>
        <div class="col-md-4">
          <div class="card-shadow-primary border mb-3 card card-body border-primary">
            <h5 class="card-title"><?php echo $frow['pic_title']; ?></h5>
            <embed src="<?php echo base_url().'assets/uploads/'.$frow['pic_file']; ?>" style="height:160px;width:265px;">
              <br />
            <a href="<?php echo base_url().'FileManager/download/'.$frow['pic_id']; ?>" class="dwn"> <button type="button" class="btn btn-success" name="button"><i class="pe-7s-cloud-download"></i> Download</button></a>
          </div>
        </div>
      <?php } } ?>
      </div>

    </div>
  </div>
