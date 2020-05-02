<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class FileManager extends CI_Controller {

	public function __construct(){
		parent::__construct();
		$this->load->model('FileModel','fmodel');
		$this->load->library('form_validation');
	}

	public function uploadfile(){
		$title = 'File Upload';
		$classer = 'mm-active';
		$icons = 'pe-7s-cloud-upload icon-gradient bg-premium-dark';
		$this->load->view('common/header',[
			'title' => $title,
			'icon' => $icons,
		]);
		$this->load->view('dynamicContent/filemanager/uploadfile');
		$this->load->view('common/footer');
	}

	public function file_data(){
		$this->form_validation->set_rules('pic_title', 'Picture Title', 'required');
		if ($this->form_validation->run() == FALSE){
			redirect('FileManager/uploadfile');
		}else{
			$config['upload_path'] = FCPATH.'assets/uploads/';
			$config['allowed_types'] = 'gif|jpg|png|pdf|doc|docx';
			$config['max_size'] = 5000;

			$this->load->library('upload', $config);

			if ( ! $this->upload->do_upload('pic_file')){
				$error = array('error' => $this->upload->display_errors());
				//$this->uploadfile('dynamicContent/filemanager/uploadfile', $error);
			}else{
				$upload_data = $this->upload->data();
				$fileName = $upload_data['file_name'];
				$data = array(
					'pic_title' => $this->input->post('pic_title', TRUE),
					'pic_file' => $fileName,
					'pic_desc' => $this->input->post('pic_desc', TRUE),
				);
				$this->fmodel->store_pic_data($data);
				redirect('FileManager/managefile');
			}
		}
	}

	public function downloadfile(){
		//get files from database
		$datae = array();
		$datae['files'] = $this->fmodel->getRows();

		$data = 'Download File';
		$classer = 'mm-active';
		$icons = 'pe-7s-cloud-download icon-gradient bg-premium-dark';
		$this->load->view('common/header',[
			'title' => $data,
			'icon' => $icons,
		]);
		$this->load->view('dynamicContent/filemanager/downloadfile',$datae);
		$this->load->view('common/footer');

	}

	public function download($id){
		if(!empty($id)){
			$this->load->helper('download');
			$fileInfo = $this->fmodel->getRows(array('id' => $id));
			$file = 'assets/uploads/'.$fileInfo['pic_file'];
			force_download($file, NULL);
		}
	}

	public function managefile(){
		$data = 'Manage File';
		$classer = 'mm-active';
		$icons = 'pe-7s-copy-file icon-gradient bg-premium-dark';
		$this->load->view('common/header',[
			'title' => $data,
			'icon' => $icons,
		]);
		$this->load->view('dynamicContent/filemanager/managefile');
		$this->load->view('common/footer');
	}

	public function getAllFiles(){
		$getAllFiles = $this->fmodel->getAllFiles();
		echo json_encode($getAllFiles);
	}

}
