<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Users extends CI_Controller {

  public function __construct(){
    parent::__construct();
    $this->load->model('UsersModel','umodel');
    $this->load->library('form_validation');
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

  public function viewAllUsers(){
    $data = 'View All Users';
    $icons = 'fa fa-users icon-gradient bg-heavy-rain';
    $this->load->view('common/header',[
      'title' => $data,
      'icon' => $icons,
    ]);
    $this->load->view('dynamicContent/users/viewAllUsers');
    $this->load->view('common/footer');
  }

  public function insertStudent(){
    $rules = array(
      array(
        'field'=>'username',
        'label'=>'Username',
        'rules'=>'required|is_unique[usertab.username]',
        'errors'=>array(
          'required'=>'%s is required',
          'is_unique'=>'%s already exists'
        )
      ),
      array(
        'field'=>'password',
        'label'=>'Password',
        'rules'=>'required',
        'errors'=>array(
          'required'=>'%s is required'
        )
      )
    );
    $this->form_validation->set_rules($rules);
    $this->form_validation->set_error_delimiters("<div class='error'> </div>");
    $this->form_validation->set_message('required','Enter %s');
    $options =[
      'cost'=>10,
    ];
    if($this->form_validation->run() === FALSE){
      $this->insertUser();
    }else{
      $data = array(
        'username'=>$this->input->post('username'),
        'password'=>password_hash(($this->input->post('password')), PASSWORD_BCRYPT, $options),
        'role_id'=>3
      );
      $this->umodel->insertUser($data);
      redirect('');
    }
  }

  public function insertTeacher(){
    $rules = array(
      array(
        'field'=>'username',
        'label'=>'Username',
        'rules'=>'required|is_unique[usertab.username]',
        'errors'=>array(
          'required'=>'%s is required',
          'is_unique'=>'%s already exists'
        )
      ),
      array(
        'field'=>'password',
        'label'=>'Password',
        'rules'=>'required',
        'errors'=>array(
          'required'=>'%s is required'
        )
      )
    );
    $this->form_validation->set_rules($rules);
    $this->form_validation->set_error_delimiters("<div class='error'> </div>");
    $this->form_validation->set_message('required','Enter %s');
    $options =[
      'cost'=>10,
    ];
    if($this->form_validation->run() === FALSE){
      $this->insertUser();
    }else{
      $data = array(
        'username'=>$this->input->post('username'),
        'password'=>password_hash(($this->input->post('password')), PASSWORD_BCRYPT, $options),
        'role_id'=>10
      );
      $this->umodel->insertUser($data);
      redirect('');
    }
  }

  public function getAllUser(){
    $getUser = $this->umodel->getAllUser();
    echo json_encode($getUser);
  }
}
