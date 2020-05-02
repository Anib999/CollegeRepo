$(document).ready(function(){
  let base_url = $('#base_url').val();
  let table3 = $('#flowList').DataTable({
    columns:[
      {'data':'id'},
      {'data':'created_date'},
      {'data':'modified_date'},
      {'data':'', render: function(data, meta, row){
        return '<a href="'+base_url+'FlowChart/viewFlowChart?id='+row.id+'"><button class="btn btn-primary btn-sm">View</button></a> <a href="'+base_url+'FlowChart/flowCreateUpdate?id='+row.id+'"><button class="btn btn-primary btn-sm">Update</button></a>';
      }}
    ],
    order: [[2, 'desc']]
  });

  $.ajax({
    url: base_url+"FlowChart/getAllFlows",
    dataType: 'json',
    method: 'post',
    success: function(res){
      table3.clear();
      table3.rows.add(res).draw();
    },
    error: function(res){
      console.log('error');
    }
  })

});
