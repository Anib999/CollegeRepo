var base_url = $("#base_url").val();
//for calendar
document.addEventListener('DOMContentLoaded', function() {
  var calendarEl = document.getElementById('dashCalendar');
  var today = new Date();
  today.setHours(0,0,0,0);

  var calendar = new FullCalendar.Calendar(calendarEl, {
    plugins: [ 'interaction', 'dayGrid', 'timeGrid', 'list' ],
    header: {
      left: 'prev,next today',
      center: 'title',
      right: 'dayGridMonth,timeGridWeek,timeGridDay,listDay'
    },
    defaultDate: new Date(),
    navLinks: true, // can click day/week names to navigate views
    selectable: true,
    selectMirror: true,
    eventOverlap: true,
    eventLimit: 1, // allow "more" link when too many events
    loading: function(isLoading){
      if(isLoading){
        console.log("loading");
      }else{
        console.log("done");
      }
    },
    dateClick: function(info){
      var clickedDat = info.date.getTime();
      if( today.getTime() <= clickedDat){
        swal({
          text: "Do you want to add Appointment to this date?",
          buttons: ["Cancel", "Confirm"],
        })
        .then((yes) => {
          if (yes) {
            $('#eventAdd').modal('show');
          }
        });
        calendar.unselect();
      }else{
        swal({
          text: "Cannot add Appointment to this date",
          buttons: "Okay",
        })
      }
    },
    eventClick: function(info){
      $("#showEvent").modal("show");
      $(".app_PatientName").html(info.event.title);
      alert(info.event.title);
    },
    events:{
      url: base_url+"Pro/getAllAppointment",
      dataType:'JSON',
      error: function(res){
        console.log("error");
      }
    },
    eventDataTransform:function(e){
      let et = JSON.parse(e.title);
      let divi = "<em> By: "+et.UserName+"</em><br/>"+
      "<em> Doctor: "+et.DoctorName+"</em><br/>"+
      "<em> Name: "+et.PatientName+"</em>";
      e.title = divi;
      return e;
    },
  });

  calendar.render();
});
