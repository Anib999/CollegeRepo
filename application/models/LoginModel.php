<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class LoginModel extends CI_Model {

  function __construct(){
    parent::__construct();
  }

  public function user_validation($username){
    $this->db->where('username',$username);
    $result = $this->db->get('usertab',1);
    return $result;
  }
}
