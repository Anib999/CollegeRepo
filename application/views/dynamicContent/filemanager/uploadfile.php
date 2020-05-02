<div class="main-card mb-3 card">
	<div class="card-body"><h5 class="card-title">Upload File</h5>

		<div style="color:red">
			<?php echo validation_errors(); ?>
			<?php if(isset($error)){print $error;}?>
		</div>
		<?php echo form_open_multipart('FileManager/file_data');?>
		<div class="form-group">
			<label for="pic_title">File Title*:</label>
			<input type="text" class="form-control" name="pic_title" value="<?= set_value('pic_title'); ?>" id="pic_title">
		</div>
		<div class="form-group">
			<label for="pic_desc">File Description:</label>
			<textarea name="pic_desc" class="form-control" id="pic_desc"><?= set_value('pic_desc'); ?></textarea>
		</div>
		<div class="form-group">
			<label for="pic_file">Select File*:</label>
			<input type="file" name="pic_file" id="pic_file">
		</div>
		<button type="submit" class="btn btn-info"><i class="pe-7s-cloud-upload"></i> Upload</button>
	</form>
</div>
</div>
