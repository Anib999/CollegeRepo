$(document).ready(function(){
  let base_url = $("#base_url").val();
  let fileTable = $('#fileTable').DataTable({
    columns:[
      {'data':'pic_id'},
      {'data':'pic_title'},
      {'data':'pic_desc'},
      {'data':'pic_file'},
      {'data':'pic_id',render:function(data, meta, row){
        return "<button class='btn btn-primary btn-sm'>Edit</button>"
      }}
    ],
  });
  $.ajax({
    url: base_url+'FileManager/getAllFiles',
    method: 'post',
    dataType: 'json',
    success: function(res){
      fileTable.clear();
      fileTable.rows.add(res).draw();
    },
    error: function(xhr){
      console.log('error');
    }
  })
})
