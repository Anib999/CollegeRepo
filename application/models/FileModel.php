<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class FileModel extends CI_Model{

  public function __construct(){
    parent::__construct();
  }

  public function getAllFiles(){
    $all_pics = $this->db->get('pictures');
		return $all_pics->result();
  }

  function get_all_pics(){
		$all_pics = $this->db->get('pictures');
		return $all_pics->result();
	}

  public function store_pic_data($data){
	$this->db->insert('pictures', $data);
	}

  /*
     * get rows from the files table
     */
    function getRows($params = array()){
        $this->db->select('*');
        $this->db->from('pictures');

        if(array_key_exists('id',$params) && !empty($params['id'])){
            $this->db->where('pic_id',$params['id']);
            //get records
            $query = $this->db->get();
            $result = ($query->num_rows() > 0)?$query->row_array():FALSE;
        }else{
            //set start and limit
            if(array_key_exists("start",$params) && array_key_exists("limit",$params)){
                $this->db->limit($params['limit'],$params['start']);
            }elseif(!array_key_exists("start",$params) && array_key_exists("limit",$params)){
                $this->db->limit($params['limit']);
            }
            //get records
            $query = $this->db->get();
            $result = ($query->num_rows() > 0)?$query->result_array():FALSE;
        }
        //return fetched data
        return $result;
    }

}
