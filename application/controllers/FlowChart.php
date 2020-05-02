<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class FlowChart extends CI_Controller {

  function __construct(){
    parent::__construct();
    $this->load->model('FlowchartModel','flowmodel');
  }

  public function getAllFlows(){
    $getFlow = $this->flowmodel->getAllFlow();
    echo json_encode($getFlow);
  }

  public function viewFlowChart(){
    $data = 'View Flowchart';
		$icons = 'pe-7s-vector icon-gradient bg-warm-flame';
    $this->load->view('common/header',[
			'title' => $data,
			'icon' => $icons,
		]);
    $this->load->view('dynamicContent/flowchart/viewFlowChart');
    $this->load->view('common/footer');
  }

  public function getFlowById(){
    $getFlowId = $this->flowmodel->getFlowById($_GET["id"]);
    echo json_encode($getFlowId->json_data);
  }

  public function getFlowByLastId(){
    $getFlowLastId = $this->flowmodel->getFlowByLastId();
    echo json_encode($getFlowLastId->json_data);
  }

  public function flowCreateUpdate(){
		$data = 'Create FlowChart';
		$icons = 'pe-7s-cloud-download icon-gradient bg-premium-dark';
    $this->load->view('common/header',[
			'title' => $data,
			'icon' => $icons,
		]);
    $this->load->view('dynamicContent/flowchart/flowCreateUpdate',[
      'operators' => $this->operators(),
    ]);
    $this->load->view('common/footer');
  }

  public function insertFlow(){
    $newDate = new DateTime();
    $data = array(
      'json_data'=>$this->input->post('savedDa'),
      'created_date'=>$newDate->format('c'),
      'modified_date'=>$newDate->format('c')
    );
    $this->flowmodel->insertFlow($data);
    redirect('Dashboard/projects');
  }

  public function updateFlow(){
    $newDate = new DateTime();
    $id = $this->input->post('did');
    $data = array(
      'json_data'=>$this->input->post('savedDa'),
      'modified_date'=>$newDate->format('c')
    );
    $this->flowmodel->updateFlow($id,$data);
    redirect('Dashboard/projects');
  }

  private function operators(){
    return array(
      array(
        'title'=>'HR',
        'id'=>0,
        'inputs'=>0,
        'outputs'=>1,
        'label'=>'Human Resource',
        'icons'=>'fa-user'
      ),
      array(
        'title'=>'Post Job',
        'id'=>1,
        'inputs'=>1,
        'outputs'=>2,
        'label'=>'Post Job',
        'icons'=>'fa-id-badge'
      ),
      array(
        'title'=>'LinkedIn',
        'id'=>2,
        'inputs'=>1,
        'outputs'=>0,
        'label'=>'Job Portal',
        'icons'=>'fa-linkedin-square'
      ),
      array(
        'title'=>'View Candidates',
        'id'=>3,
        'inputs'=>1,
        'outputs'=>1,
        'label'=>'View Candidates',
        'icons'=>'fa-drivers-license'
      ),
      array(
        'title'=>'SortList',
        'id'=>4,
        'inputs'=>1,
        'outputs'=>2,
        'label'=>'SortList Candidate',
        'icons'=>'fa-edit'
      ),
      array(
        'title'=>'Interview',
        'id'=>5,
        'inputs'=>1,
        'outputs'=>1,
        'label'=>'Interview Candidate',
        'icons'=>'fa-users'
      ),
      array(
        'title'=>'Offer Candidate',
        'id'=>6,
        'inputs'=>1,
        'outputs'=>1,
        'label'=>'Offer Candidate',
        'icons'=>'fa-handshake-o'
      ),
      array(
        'title'=>'Offer Letter',
        'id'=>7,
        'inputs'=>2,
        'outputs'=>1,
        'label'=>'Offer Letter',
        'icons'=>'fa-envelope-open'
      ),
      array(
        'title'=>'Onboarding',
        'id'=>8,
        'inputs'=>1,
        'outputs'=>0,
        'label'=>'Onboarding',
        'icons'=>'fa-child'
      )
    );
  }
}
