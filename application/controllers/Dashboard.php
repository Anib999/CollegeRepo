<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Dashboard extends CI_Controller {

	public function __construct(){
    parent::__construct();
  }

	public function index(){
    $data = 'Dashboard';
    $classer = 'mm-active';
		$icons = 'pe-7s-home icon-gradient bg-premium-dark';
		$this->load->view('common/header',[
			'title' => $data,
			'activeclass' => $classer,
			'icon' => $icons,
		]);
		$this->load->view('dynamicContent/dashboard/dashboard');
    $this->load->view('common/footer');
	}

	public function projects(){
		$data = 'Projects';
		$icons = 'pe-7s-graph1 icon-gradient bg-premium-dark';
		$this->load->view('common/header',[
			'title' => $data,
			'icon' => $icons,
		]);
		$this->load->view('dynamicContent/dashboard/projects');
    $this->load->view('common/footer');
	}

	public function userprofile(){
    $data = 'Profile';
		$icons = 'pe-7s-user icon-gradient bg-premium-dark';
		$this->load->view('common/header',[
			'title' => $data,
			'icon' => $icons,
		]);
		$this->load->view('dynamicContent/dashboard/userprofile');
    $this->load->view('common/footer');
	}

}
