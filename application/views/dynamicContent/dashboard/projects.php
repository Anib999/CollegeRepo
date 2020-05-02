<link rel="stylesheet" href="https://cdn.datatables.net/1.10.20/css/jquery.dataTables.min.css">

<ul class="body-tabs body-tabs-layout tabs-animated body-tabs-animated nav">
  <li class="nav-item">
    <a role="tab" class="nav-link active" id="tab-0" data-toggle="tab" href="#flowTab">
      <span>FlowCharts</span>
    </a>
  </li>
  <li class="nav-item">
    <a role="tab" class="nav-link" id="tab-1" data-toggle="tab" href="#kanbanTab">
      <span>Kanban Boards</span>
    </a>
  </li>
</ul>

<div class="tab-content">
  <div class="tab-pane tabs-animation fade active show" id="flowTab" role="tabpanel">
    <div class="row">
      <div class="col-md-12">
        <div class="main-card mb-3 card">
          <div class="card-header">FlowCharts</div>
          <div class="card-body">

            <a href="<?= base_url('FlowChart/flowCreateUpdate') ?>">
              <button type="button" class="btn btn-primary">
                Create New FlowChart
              </button>
            </a>
            <br>
            <br>
            <table class="table table-striped table-bordered table-hover" id='flowList'>
              <thead>
                <th>Id</th>
                <th>Created Date</th>
                <th>Modified Date</th>
                <th>Options</th>
              </thead>
            </table>
          </div>
        </div>
      </div>
    </div>
  </div>

  <div class="tab-pane tabs-animation fade" id="kanbanTab" role="tabpanel">
    <div class="row">
      <div class="col-md-12">
        <div class="main-card mb-3 card">
          <div class="card-header">Kanban List</div>
          <div class="card-body">

            <a href="#">
              <button type="button" class="btn btn-primary">
                Create New Kanban Boards
              </button>
            </a>
            <br>
            <br>
            <table class="table table-striped table-bordered table-hover" id='kanbanList'>
              <thead>
                <th>Id</th>
                <th>Created Date</th>
                <th>Modified Date</th>
                <th>Options</th>
              </thead>
            </table>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>

<script src="https://cdn.datatables.net/1.10.20/js/jquery.dataTables.min.js" charset="utf-8"></script>
<script src="<?= base_url('assets/js/flowchart/viewFlowDatatable.js') ?>" charset="utf-8"></script>
