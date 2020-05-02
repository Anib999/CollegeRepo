$(document).ready(function(){
  let base_url = $('#base_url').val();
  if(window.location.hash != ''){
    window.history.pushState('','',window.location.href.split('#')[0]);
  }
  $.ajax({
    url: base_url+'FlowChart/getFlowByLastId',
    data: '',
    dataType: 'JSON',
    success: function(res){
      let parsedData = JSON.parse(res);
      let parsedLink = parsedData.links;

      for (let val in parsedLink) {
        if(parsedLink[val].fromOperator == 0){
          $('.appendEle').empty().append("<p>You are at "+ parsedData.operators[0].properties.title +"</p>");
          $('.appendEle').append("<p>Click Here : <a id='linker' href='#appendEle2'>"+ parsedData.operators[0].properties.outputs.outH.label +"</a> </p>");
        }
        $('#linker').on('click',function(){
          if(parsedLink[val].fromOperator == 1 && parsedLink[val].toOperator == 2){
            $('.appendEle2').empty().append("<p>You are at "+ parsedData.operators[1].properties.title +"</p>");
            $('.appendEle2').append("<p>Click Here : <a id='linker1' href='#appendEle3-3'>"+ parsedData.operators[1].properties.outputs.outP.label +"</a> </p>");
          }else if(parsedLink[val].fromOperator == 1 && parsedLink[val].toOperator == 3){
            $('.appendEle2').append("<p>Click Here : <a id='linker1-1' href='#appendEle3'>"+ parsedData.operators[1].properties.outputs.out1P.label +"</a> </p>");
          }else if(parsedLink[val].fromOperator == 1){
            $('.appendEle2').append("<p>Click Here : <a id='linker1-1' href='#appendEle3'>"+ parsedLink[val].toOperator +"</a> </p>");
          }
        });

        $('body').on('click','#linker1',function(){
          if(parsedLink[val].toOperator == 2){
            $('.appendEle3-3').empty().append("<p>You are at "+ parsedData.operators[2].properties.title +"</p>");
          }
        });

        $('body').on('click','#linker1-1',function(){
          if(parsedLink[val].fromOperator == 3){
            $('.appendEle3').empty().append("<p>You are at "+ parsedData.operators[3].properties.title +"</p>");
            $('.appendEle3').append("<p>Click Here : <a id='linker2' href='#appendEle4'>"+ parsedData.operators[3].properties.outputs.outV.label +"</a> </p>");
          }
        });

        $('body').on('click','#linker2',function(){
          if(parsedLink[val].fromOperator == 4 && parsedLink[val].toOperator == 5){
            $('.appendEle4').empty().append("<p>You are at "+ parsedData.operators[4].properties.title +"</p>");
            $('.appendEle4').append("<p>Click Here : <a id='linker3' href='#appendEle5'>"+ parsedData.operators[4].properties.outputs.outS.label +"</a> </p>");
          }else if(parsedLink[val].fromOperator == 4 && parsedLink[val].toOperator == 7){
            $('.appendEle4').append("<p>Click Here : <a id='linker5' href='#appendEle7'>"+ parsedData.operators[4].properties.outputs.out1S.label +"</a> </p>");
          }else if(parsedLink[val].fromOperator == 4){
            $('.appendEle4').append("<p>Click Here : <a id='linker5' href='#appendEle7'>"+ parsedLink[val].toOperator +"</a> </p>");
          }
        });

        $('body').on('click','#linker3',function(){
          if(parsedLink[val].fromOperator == 5){
            $('.appendEle5').empty().append("<p>You are at "+ parsedData.operators[5].properties.title +"</p>");
            $('.appendEle5').append("<p>Click Here : <a id='linker4' href='#appendEle6'>"+ parsedData.operators[5].properties.outputs.outI.label +"</a> </p>");
          }
        });

        $('body').on('click','#linker4',function(){
          if(parsedLink[val].fromOperator == 6){
            $('.appendEle6').empty().append("<p>You are at "+ parsedData.operators[6].properties.title +"</p>");
            $('.appendEle6').append("<p>Click Here : <a id='linker5' href='#appendEle7'>"+ parsedData.operators[6].properties.outputs.outO.label +"</a> </p>");
          }
        });

        $('body').on('click','#linker5',function(){
          if(parsedLink[val].fromOperator == 7){
            $('.appendEle7').empty().append("<p>You are at "+ parsedData.operators[7].properties.title +"</p>");
            $('.appendEle7').append("<p>Click Here : <a id='linker6' href='#appendEle8'>"+ parsedData.operators[7].properties.outputs.outOL.label +"</a> </p>");
          }
        });

        $('body').on('click','#linker6',function(){
          if(parsedLink[val].toOperator == 8){
            $('.appendEle8').empty().append("<p>You are at "+ parsedData.operators[8].properties.title +"</p>");
          }
        })

      }

    },
    error: function(res){
      console.log('error');
    }
  })

  window.addEventListener('hashchange', function(e){
    if(location.hash == "#appendEle2"){
      $('.appendEle').css('display','none');
      $('.appendEle2').css('display','block');
      $('.appendEle3-3').css('display','none');
      $('.appendEle3').css('display','none');
      $('.appendEle4').css('display','none');
      $('.appendEle5').css('display','none');
      $('.appendEle6').css('display','none');
      $('.appendEle7').css('display','none');
      $('.appendEle8').css('display','none');
    }
    else if(location.hash == '#appendEle3-3'){
      $('.appendEle').css('display','none');
      $('.appendEle2').css('display','none');
      $('.appendEle3-3').css('display','block');
      $('.appendEle3').css('display','none');
      $('.appendEle4').css('display','none');
      $('.appendEle5').css('display','none');
      $('.appendEle6').css('display','none');
      $('.appendEle7').css('display','none');
      $('.appendEle8').css('display','none');
    }
    else if(location.hash == '#appendEle3'){
      $('.appendEle').css('display','none');
      $('.appendEle2').css('display','none');
      $('.appendEle3-3').css('display','none');
      $('.appendEle3').css('display','block');
      $('.appendEle4').css('display','none');
      $('.appendEle5').css('display','none');
      $('.appendEle6').css('display','none');
      $('.appendEle7').css('display','none');
      $('.appendEle8').css('display','none');
    }
    else if(location.hash == '#appendEle4'){
      $('.appendEle').css('display','none');
      $('.appendEle2').css('display','none');
      $('.appendEle3-3').css('display','none');
      $('.appendEle3').css('display','none');
      $('.appendEle4').css('display','block');
      $('.appendEle5').css('display','none');
      $('.appendEle6').css('display','none');
      $('.appendEle7').css('display','none');
      $('.appendEle8').css('display','none');
    }
    else if(location.hash == '#appendEle5'){
      $('.appendEle').css('display','none');
      $('.appendEle2').css('display','none');
      $('.appendEle3-3').css('display','none');
      $('.appendEle3').css('display','none');
      $('.appendEle4').css('display','none');
      $('.appendEle5').css('display','block');
      $('.appendEle6').css('display','none');
      $('.appendEle7').css('display','none');
      $('.appendEle8').css('display','none');
    }
    else if(location.hash == '#appendEle6'){
      $('.appendEle').css('display','none');
      $('.appendEle2').css('display','none');
      $('.appendEle3-3').css('display','none');
      $('.appendEle3').css('display','none');
      $('.appendEle4').css('display','none');
      $('.appendEle5').css('display','none');
      $('.appendEle6').css('display','block');
      $('.appendEle7').css('display','none');
      $('.appendEle8').css('display','none');
    }
    else if(location.hash == '#appendEle7'){
      $('.appendEle').css('display','none');
      $('.appendEle2').css('display','none');
      $('.appendEle3-3').css('display','none');
      $('.appendEle3').css('display','none');
      $('.appendEle4').css('display','none');
      $('.appendEle5').css('display','none');
      $('.appendEle6').css('display','none');
      $('.appendEle7').css('display','block');
      $('.appendEle8').css('display','none');
    }
    else if(location.hash == '#appendEle8'){
      $('.appendEle').css('display','none');
      $('.appendEle2').css('display','none');
      $('.appendEle3-3').css('display','none');
      $('.appendEle3').css('display','none');
      $('.appendEle4').css('display','none');
      $('.appendEle5').css('display','none');
      $('.appendEle6').css('display','none');
      $('.appendEle7').css('display','none');
      $('.appendEle8').css('display','block');
    }else{
      $('.appendEle').css('display','block');
      $('.appendEle2').css('display','none');
      $('.appendEle3-3').css('display','none');
      $('.appendEle3').css('display','none');
      $('.appendEle4').css('display','none');
      $('.appendEle5').css('display','none');
      $('.appendEle6').css('display','none');
      $('.appendEle7').css('display','none');
      $('.appendEle8').css('display','none');
    }

  });

})
