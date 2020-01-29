<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Users extends CI_Controller {

  public function __construct(){
    parent::__construct();
  }
  
	public function students(){
    $data = 'Students';
    $icons = 'pe-7s-users icon-gradient bg-mean-fruit';
		$this->load->view('common/header',[
			'title' => $data,
      'icon' => $icons,
		]);
		$this->load->view('dynamicContent/users/students');
    $this->load->view('common/footer');
	}

	public function teachers(){
    $data = 'Teachers';
    $icons = 'fa fa-users icon-gradient bg-heavy-rain';
		$this->load->view('common/header',[
			'title' => $data,
      'icon' => $icons,
		]);
		$this->load->view('dynamicContent/users/teachers');
    $this->load->view('common/footer');
	}

}
