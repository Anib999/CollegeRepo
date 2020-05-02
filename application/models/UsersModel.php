<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class UsersModel extends CI_Model{

  function __construct(){
    parent::__construct();
  }

  public function insertUser($data){
    $this->db->insert('usertab',$data);
  }

  public function getAllUser(){
    $this->db->select('id,username,role_id');
    $query = $this->db->get('usertab');
    $result = $query->result();
    return $result;
  }

  public function getUserById($id){
    $this->db->where('id',$id);
    $this->db->select('id,username,role_id');
    $query = $this->db->get('usertab')->row();
    return $query;
  }
}
