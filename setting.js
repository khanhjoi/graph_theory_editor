

// tao danh sach nut dau tien

var cy = cytoscape({
  container: document.getElementById('cy'),

  elements: {
    nodes: [
    
    ],
    edges: [
     
    ]
  },

  layout: {
    name: 'grid',
    rows: 1
  },

  // so we can see the ids
  style: [
    {
      selector: 'node',
      style: {
        'label': 'data(id)'
      }
    }
  ],
  panningEnabled: false,
});

var eh = cy.edgehandles();


var arrayNodes = [];
var arrayEdges = [];
var numberNodes = 0;
var btnDlt = document.getElementById('delete');


const checkbox = document.getElementById('checkbox');
checkbox.addEventListener('click', function(){
  if(checkbox.checked){
    eh.enableDrawMode();
  }else {
    eh.disableDrawMode();
  }
});
cy.on('ehcomplete', (event, sourceNode, targetNode, addedEdge) => {

  
  const obj = Object.fromEntries(addedEdge._private.lazyMap);
  // xóa đi cung mà framework tự thêm vào
  for (var key in obj) {
    var edges = cy.$(`#${key}`);
    cy.remove(edges);
  }
	
  cy.add([
    { group: 'edges', data: { id: `${sourceNode._private.data.id}${targetNode._private.data.id}`, source: `${sourceNode._private.data.id}`, target: `${targetNode._private.data.id}` } },   
  ]);

  // lam moi lai danh sach cung va danh sach dinh
  refreshListNodes();
  // // them cung vao ma tran
  addEdge();
  
});



// ========================================================

// chon va xoa 
cy.on('click', function(e){
  // bien su kien
  var clicked = e.target;
  let addNav = document.querySelector('.draw'); 

  // ================== thêm đỉnh ====================
  if(addNav.classList.contains('active')) {
    if(clicked._private.group === "nodes" || clicked._private.group === "edges" ){
      
    }else {
      numberNodes++;
      cy.add([
        { group: 'nodes', data: { id: `${numberNodes}` }, position: { x: e.position.x, y: e.position.y } },
      ]);
      refreshListNodes();
    }
  }

  
  // ===============================================

  // =============== xóa đỉnh =================
  // cờ
  var flag = false;
  // kiểm tra có phải là đỉnh hoặt cung => xóa
  if(clicked._private.group === "nodes" || clicked._private.group === "edges" ){
    flag = true;
  }else{
    // reset lại cờ
    flag = false;
  }
  
  // kiem tra va xoa nut
  btnDlt.onclick = function() {
    deleteNode(flag, clicked);
  }

});

// =========================================
// trường hợp người dùng nhấn vào nút xóa
btnDlt.onclick = function() {
  deleteNode();
}



function deleteNode(flag, clicked) {
  if(arrayNodes.length == 0) {
    alert('Chưa vẽ đồ thị');
    return;
  }
  
  if(flag){
    console.log(clicked);
    cy.remove(clicked);
  }else{
    alert('Chưa chọn đối tượng xóa');
  }
  refreshListNodes();
}


// reset ds đỉnh và ds cung
function refreshListNodes() {
  // Chuyển mảng obj sang thành array
  var arrayElement = Object.entries(cy._private.elements);
  // console.log(arrayElement)
  // reset lai mảng
  arrayNodes = [];
  arrayEdges = [];
  
  for (let i = 0; i < arrayElement.length - 2; i++) {
    //kiem tra co phai la nut moi cho vao danh sach nut
    if(arrayElement[i][1] && (arrayElement[i][1]._private.data.id.length <= 2)) {
      if(arrayElement[i][1]._private.group === 'nodes') {
        arrayNodes.push(arrayElement[i][1]._private.data.id);
        arrayNodes.sort();
      }
      if(arrayElement[i][1]._private.group === 'edges') {
        arrayEdges.push(arrayElement[i][1]._private.data.id)
      }
    }
   }
}

// select tab 
function openFunction(func) {
  var i;
  var tab = document.getElementsByClassName("w3-button");
  var tabContent = document.getElementsByClassName("function");

  // reset style
  cy.nodes().unselect();
  cy.edges().unselect();

  // ẩn nội dung điều hướng và xóa atr của tab
  for (i = 0; i < tabContent.length; i++) {
    tabContent[i].style.display = "none";
    tab[i].classList.remove('active');
  }
  // gán lại atr cho tab vừa chọn
  for (i = 0; i < tabContent.length; i++) {
    if(tab[i].innerText === func) {
      tab[i].classList.add('active');
    }
  }
  // chỉnh lại nội dung cho tab
  document.getElementById(func).style.display = "block";
}