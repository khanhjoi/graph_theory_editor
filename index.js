var cy =   cytoscape({
  container: document.getElementById('cy'),
  elements: {
    nodes: [
      {
        data: { id: '1' }
      },

      {
        data: { id: '2' }
      },
    ],
    edges: [
      {
        data: { id: 'ab', source: '1', target: '2' }
      },
     
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



var numberNodes = 2;

var btnAdd = document.getElementById('add'); 
console.log(cy._private)
// ======================== Thêm Cung ======================
btnAdd.onclick = function(e) {
  
  let editContainer = document.getElementById('edit');

  if(btnAdd.checked) {
    editContainer.innerHTML = `
    <button id="delete">xoa</button>
    <label for="nodes1">Choose nodes 1:</label>
    <select name="nodes1" id="nodes1">

    </select>
    <label for="nodes2">Choose nodes 2:</label>
    <select name="nodes2" id="nodes2">
 
    </select>
    <button id="addEdge">them cung</button>
    `
  }else {
    editContainer.innerHTML = `
    `
  }

  // danh sách đỉnh 
  var ListOpt1 = document.getElementById('nodes1');
  var ListOpt2 = document.getElementById('nodes2');
  
  // thêm đỉnh vào danh sách chọn 1
  ListOpt1.onclick = function(e) {
    if(ListOpt1.children.length === numberNodes) {
      // bỏ qua trường hợp đã thêm vào rồi 
    }else {
      // xóa đỉnh đã bấm trước đó
      ListOpt1.innerHTML = ``;
      // thêm đỉnh vào danh sách chọn
      for(var i = 0; i < numberNodes; i++) {
        var ListNodes = document.createElement('option');
        ListNodes.innerHTML = `${i+1}`
        ListOpt1.appendChild(ListNodes);
      }
    }
  }
  // thêm đỉnh vào danh sách chọn 2
  ListOpt2.onclick = function(e) {
    if(ListOpt2.children.length === numberNodes) {
      // bỏ qua trường hợp đã thêm vào rồi 
    }else {
      // xóa đỉnh đã bấm trước đó
      ListOpt2.innerHTML = ``;
      // thêm đỉnh vào danh sách chọn
      for(var i = 0; i < numberNodes; i++) {
        var ListNodes = document.createElement('option');
        ListNodes.innerHTML = `${i+1}`
        ListOpt2.appendChild(ListNodes);
      }
    }
  }

  let btnAddEdge = document.getElementById('addEdge');
  // thêm cung vào độ thị
  
  btnAddEdge.onclick = function(){
    console.log(ListOpt1.value, ListOpt2.value)
    
    cy.add([
      { group: 'edges', data: { id: `${ListOpt1.value}${ListOpt2.value}`, source: `${ListOpt1.value}`, target: `${ListOpt2.value}` } }
    ])
  }
}
// ========================================================


// chon va xoa 
cy.on('click', function(e){
  // bien su kien
  var clicked = e.target;

  // ================== thêm đỉnh ====================
  if(btnAdd.checked) {
    numberNodes++;
    if(clicked._private.group === "nodes" || clicked._private.group === "edges" ){
      // bỏ qua nhũng vị trí không phải nút và cung
    }else {
      cy.add([
        { group: 'nodes', data: { id: `${numberNodes}` }, position: { x: 300, y: 300 } },
      ]);  
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
  
  const btnDlt = document.getElementById('delete');
  if(btnDlt) {
    btnDlt.onclick = function() {
      if(flag){
        cy.remove(clicked);
      }
    }
  }
  // =========================================
});



