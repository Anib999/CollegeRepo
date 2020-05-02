document.getElementById('foo').addEventListener('click',function(){
  html2canvas(document.querySelector("#flowDiv")).then(canvas => {
    var anchorDownload = document.createElement('a');
    anchorDownload.href = canvas.toDataURL('image/png');
    anchorDownload.download = 'flowchart.png';
    anchorDownload.click();
  });
},false)
