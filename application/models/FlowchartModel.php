<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class FlowchartModel extends CI_Model {

  function __construct(){
    parent::__construct();
    $this->load->database();
  }

  public function insertFlow($data){
    $this->db->insert('flowtable',$data);
  }

  public function updateFlow($id, $data){
    $this->db->where('id',$id);
    $this->db->update('flowtable',$data);
  }

  public function getAllFlow(){
    $query = $this->db->get('flowtable');
    $result = $query->result();
    return $result;
  }

  public function getFlowById($id){
    $this->db->where('id',$id);
    $query = $this->db->get('flowtable')->row();
    return $query;
  }

  public function getFlowByLastId(){
    $query = $this->db->query('SELECT id, json_data  from flowtable order by id desc limit 1');
    $result = $query->result();
    return $result[0];
  }
}
