$(document).ready(function(){
  let base_url = $('#base_url').val();
  let flowchart = $('#flowDiv');
  let url = new URL(window.location.href);
  let urlId = url.searchParams.get('id');
  let $container = flowchart;
  let operatorTitleId = $('#tiIdChange');
  let operatorTitle = $("#tiChange");

  if(urlId != null){
    $.ajax({
      url:base_url+"FlowChart/getFlowById?id="+urlId,
      data: '',
      dataType: 'json',
      success: function(res){
        let parsedRes = JSON.parse(res);
        flowchart.flowchart({
          data: parsedRes,
          linkWidth: 3,
          defaultLinkColor: '#c0c0c0',
          defaultSelectedLinkColor: '#000000',
          onOperatorUnselect: function(){
            $('#after-click').css('width','0');
            return true;
          },
          onLinkSelect: function(){
            $('#after-click').css('width','250px');
            return true;
          },
          onLinkUnselect: function(){
            $('#after-click').css('width','0');
            return true;
          }
        });
      },
      error: function(res){
        console.log('error');
      }
    });
  }else{
    flowchart.flowchart({
      data: '',
      linkWidth: 3,
      defaultLinkColor: '#c0c0c0',
      defaultSelectedLinkColor: '#000000',
      onOperatorUnselect: function(){
        $('#after-click').css('width','0');
        return true;
      },
    })
  }

  $('#saveFlow').click(function(e){
    let data = flowchart.flowchart('getData');
    $('#savedDa').val(JSON.stringify(data));
    let getFlowData = $('#savedDa').val();
    let parsedData = JSON.parse(getFlowData);
  })
  //for deletion of selected operator
  $('.delete_selected_button').click(function() {
    flowchart.flowchart('deleteSelected');
  });
  //for whole chart get
  $('#get_data').click(function() {
    let data = flowchart.flowchart('getData');
    $('#flowchart_data').val(JSON.stringify(data, null, 2));
  });
  //for set chart data
  var flowChartUpdatedByCode = false;
  $('#set_data').on('click',function(e) {
    let data = JSON.parse($('#flowchart_data').val());
    flowchart.flowchart('setData', data);
    if(e.originalEvent != undefined){
      flowChartUpdatedByCode = true;
    }
  });

  $('a[href="#diagramView"]').on('click',function(){
    if(flowChartUpdatedByCode == true){
      setTimeout(function(){
        $('#set_data').trigger('click');
        flowChartUpdatedByCode = false;
      },200);
    }
  })

  //change operator title
  operatorTitle.keyup(function(){
    let selectedOperatorId = flowchart.flowchart('getSelectedOperatorId');
    if(selectedOperatorId != null){
      flowchart.flowchart('setOperatorTitle',selectedOperatorId,operatorTitle.val());
    }
  });

  $('body').on('click','.flowchart-operator.selected',function(operatorId){
    $('#after-click').css('width','250px');
    let opId = flowchart.flowchart('getSelectedOperatorId');
    if(opId != null){
      let opTitle = flowchart.flowchart('getOperatorTitle',opId);
      let opData = flowchart.flowchart('getOperatorData',opId);
      operatorTitleId.val(opId);
      operatorTitle.val(opTitle);
    }
  })

  $('#closeB').on('click',function(){
    $('#after-click').css('width','0');
  })

  //for draggable operators
  let $draggableOperators = $('.draggable_operator');

  function getOperatorData($element) {
    let nbInputs = parseInt($element.data('nb-inputs'));
    let nbOutputs = parseInt($element.data('nb-outputs'));
    let title = $element.data('title');
    let data = {
      properties: {
        title: title,
        inputs: {},
        outputs: {}
      }
    };

    let i = 0;
    for (i = 0; i < nbInputs; i++) {
      data.properties.inputs['input_' + i] = {
        label: 'Input ' + (i + 1)
      };
    }
    for (i = 0; i < nbOutputs; i++) {
      data.properties.outputs['output_' + i] = {
        label: 'Output ' + (i + 1)
      };
    }

    return data;
  }

  //draggable

  $draggableOperators.draggable({
    cursor: "move",
    opacity: 0.7,
    helper: 'clone',
    appendTo: 'body',
    zIndex: 1000,

    helper: function(e) {
      let $this = $(this);
      let data = getOperatorData($this);
      return flowchart.flowchart('getOperatorElement', data);
    },
    stop: function(e, ui) {
      let $this = $(this);
      let elOffset = ui.offset;
      let containerOffset = $container.offset();
      if (elOffset.left > containerOffset.left &&
        elOffset.top > containerOffset.top &&
        elOffset.left < containerOffset.left + $container.width() &&
        elOffset.top < containerOffset.top + $container.height()) {

          let flowchartOffset = flowchart.offset();

          let relativeLeft = elOffset.left - flowchartOffset.left;
          let relativeTop = elOffset.top - flowchartOffset.top;

          let positionRatio = flowchart.flowchart('getPositionRatio');
          relativeLeft /= positionRatio;
          relativeTop /= positionRatio;

          let data = getOperatorData($this);
          data.left = relativeLeft;
          data.top = relativeTop;
          if(flowchart.flowchart('doesOperatorExists',$this.data('nb-id'))){
            let operatorId = 0;
            flowchart.flowchart('addOperator', data);
          }else{
            flowchart.flowchart('createOperator',$this.data('nb-id'), data)
          }
        }
      }
    });
  })
