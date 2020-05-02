<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class User extends CI_Controller {

	public function __construct(){
    parent::__construct();
		$this->load->model('FileModel','fmodel');
  }

	public function index(){
    $data = 'Home';
		$this->load->view('defuser/index',[
			'title'=>$data
		]);
	}

	public function viewrepo(){
    $data = 'View Repo';
		$datae = array();
		$datae = $this->fmodel->getRows();
		$this->load->view('defuser/viewrepo',[
			'title'=>$data,
			'files'=>$datae
		]);
	}

	public function download($id){
		if(!empty($id)){
			$this->load->helper('download');
			$fileInfo = $this->fmodel->getRows(array('id' => $id));
			$file = 'assets/uploads/'.$fileInfo['pic_file'];
			force_download($file, NULL);
		}
	}
}
