<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Tools extends CI_Controller {

  public function __construct(){
    parent::__construct();
  }
  
	public function settings(){
    $data = 'Settings';
    $icons = 'pe-7s-config icon-gradient bg-grow-early';
		$this->load->view('common/header',[
			'title' => $data,
      'icon' => $icons,
		]);
		$this->load->view('dynamicContent/tools/settings');
    $this->load->view('common/footer');
	}

  public function help(){
    $data = 'Help';
    $icons = 'pe-7s-help2 icon-gradient bg-night-fade';
		$this->load->view('common/header',[
			'title' => $data,
      'icon' => $icons,
		]);
		$this->load->view('dynamicContent/tools/help');
    $this->load->view('common/footer');
	}

  public function aboutus(){
    $data = 'About Us';
    $icons = 'pe-7s-magic-wand icon-gradient bg-malibu-beach';
		$this->load->view('common/header',[
			'title' => $data,
      'icon' => $icons,
		]);
		$this->load->view('dynamicContent/tools/aboutus');
    $this->load->view('common/footer');
	}

  public function usermanual(){
    $data = 'User Manual';
    $icons = 'pe-7s-bookmarks icon-gradient bg-arielle-smile';
		$this->load->view('common/header',[
			'title' => $data,
      'icon' => $icons,
		]);
		$this->load->view('dynamicContent/tools/usermanual');
    $this->load->view('common/footer');
	}

}
