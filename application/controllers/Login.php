<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Login extends CI_Controller {

  public function __construct(){
    parent::__construct();
    $this->load->model('LoginModel','loginmo');
  }

	public function login(){
    $data['title'] = 'Login';
    $this->load->view('dynamicContent/login/login',$data);
	}

  public function auth(){
    $data = 'Incorrect';
    $datat = 'Login';
    $username= $this->input->post('username',TRUE);
    $password= $this->input->post('password',TRUE);
    $validate = $this->loginmo->user_validation($username);
    if($validate->num_rows() > 0){
      $data = $validate->row_array();
      if(password_verify($password, $data['password'] )){
        $sesdata = array(
          'id'=>$data['id'],
          'username'=>$data['username'],
        );
        $this->session->set_userdata($sesdata);
        redirect('Dashboard/index');
      }else{
        $datae['error'] = 'Incorrect';
        $this->load->view('dynamicContent/login/login',[
          'error'=>$datae,
          'title'=>$datat
        ]);
      }
    }else{
      $this->load->view('dynamicContent/login/login',[
        'error'=>$data,
        'title'=>$datat
      ]);
    }
  }

  public function logout(){
    $this->session->sess_destroy();
    redirect('Login/login');
  }

}
