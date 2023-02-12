var cy =   cytoscape({
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

// tao danh sach nut dau tien
var arrayNodes = [];
var arrayEdges = [];
var numberNodes = 0;
var btnAdd = document.getElementById('add'); 

// ======================== Thêm Cung ======================
btnAdd.onclick = function(e) {
  
  let editContainer = document.getElementById('edit');

  if(btnAdd.checked) {
    editContainer.innerHTML = `
    <button id="delete">xoa</button>
    <label for="nodes1">Choose nodes 1:</label>
    <select name="nodes1" id="nodes1"></select>
    <label for="nodes2">Choose nodes 2:</label>
    <select name="nodes2" id="nodes2"></select>
    <button id="addEdge">them cung</button>
    `
  }else {
    editContainer.innerHTML = ``;
  }


  
  // danh sách đỉnh 
  var ListOpt1 = document.getElementById('nodes1');
  var ListOpt2 = document.getElementById('nodes2');
  

  // thêm đỉnh vào danh sách chọn 1
  if(ListOpt1) {
    ListOpt1.onmouseover = function(e) {
      if(ListOpt1.children.length === numberNodes) {
        // bỏ qua trường hợp đã thêm vào rồi 
      }else {
        // xóa đỉnh đã bấm trước đó
        ListOpt1.innerHTML = "";
        // goi lai tao danh sach nut
        refreshListNodes();    
        // thêm đỉnh vào danh sách chọn
        for(var i = 0; i < arrayNodes.length; i++) {
          var option = document.createElement('option');
          var optionText = document.createTextNode(`${arrayNodes[i]}`);
          option.appendChild(optionText);
          option.setAttribute('value', arrayNodes[i]);
          ListOpt1.appendChild(option);
        }
      }
    }
  }
  // thêm đỉnh vào danh sách chọn 2
  if(ListOpt2) {
    ListOpt2.onmouseover = function(e) {
      if(ListOpt2.children.length === numberNodes) {
        // bỏ qua trường hợp đã thêm vào rồi 
      }else {
        // xóa đỉnh đã bấm trước đó
        ListOpt2.innerHTML = ``;
        // goi lai tao danh sach nut
        refreshListNodes();    
        // thêm đỉnh vào danh sách chọn
        for(var i = 0; i < arrayNodes.length; i++) {
          var ListNodes = document.createElement('option');
          ListNodes.innerHTML = `${arrayNodes[i]}`
          ListOpt2.appendChild(ListNodes);
        }
      }
    }
  }

  let btnAddEdge = document.getElementById('addEdge');
  // thêm cung vào độ thị
  if(btnAddEdge) {
    btnAddEdge.onclick = function(){
      cy.add([
        { group: 'edges', data: { id: `${ListOpt1.value}${ListOpt2.value}`, source: `${ListOpt1.value}`, target: `${ListOpt2.value}` } },   
      ]);
      // lam moi lai danh sach cung va danh sach dinh
      refreshListNodes();
      // them cung vao ma tran
      addEdge();
    }
  }
}
// ========================================================

// chon va xoa 
cy.on('click', function(e){
  // bien su kien
  var clicked = e.target;

  // ================== thêm đỉnh ====================
  if(btnAdd.checked) {
    if(clicked._private.group === "nodes" || clicked._private.group === "edges" ){
      // bỏ qua nhũng vị trí không phải nút và cung
    }else {
      numberNodes++;
      cy.add([
        { group: 'nodes', data: { id: `${numberNodes}` }, position: { x: 300, y: 300 } },
      ]);
      refreshListNodes();
      initGraph();
      
    }
  }
  
  // ===============================================

  // =============== xóa đỉnh =================
  // cờ
  var flag = false;
  // kiểm tra có phải là đỉnh hoặt cung => xóa
  if(clicked._private.group === "nodes" || clicked._private.group === "edges" ){
    flag = true
  }else {
    // reset lại cờ
    flag = false;
  }
  
  // kiem tra va xoa nut
  const btnDlt = document.getElementById('delete');
  if(btnDlt) {
    btnDlt.onclick = function() {
      if(flag){
        cy.remove(clicked);
        refreshListNodes();
      }
    }
  }
  // =========================================
});

function refreshListNodes() {
  var arrayElement = Object.entries(cy._private.elements);
  // reset lai mảng
  arrayNodes = [];
  arrayEdges = [];
  for (let i = 0; i < arrayElement.length - 2; i++) {
    //kiem tra co phai la nut moi cho vao danh sach nut
    if(arrayElement[i][1]) {
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

