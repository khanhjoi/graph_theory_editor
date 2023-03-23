var cy =  cytoscape({
  container: document.getElementById('cy'),
  elements: {
    nodes: [
    
    ],
    edges: [
      
    ]
    },

  layout: {
    name: 'breadthfirst',
    directed: true,
    roots: ``,
    padding: 10
  },

  style: cytoscape.stylesheet()
  .selector('node')
    .style({
      'content': 'data(id)'
    })
  .selector('edge')
    .style({
      'curve-style': 'bezier',
      'width': 4,
    })
  .selector('.highlighted')
    .style({
      'background-color': '#61bffc',
      'line-color': '#61bffc',
      'target-arrow-color': '#61bffc',
      'transition-property': 'background-color, line-color, target-arrow-color',
      'transition-duration': '0.5s'
    }),
  motionBlur : true,
  panningEnabled: false,
  boxSelectionEnabled: false,
  autounselectify: true,
});

// tao danh sach nut dau tien
var arrayNodes = [];
var arrayEdges = [];
var numberNodes = 0;
var btnAddEdge = document.getElementById('addEdge');
var btnDlt = document.getElementById('delete');


// ======================== Thêm Cung ======================
 
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
// thêm cung vào độ thị  
if(btnAddEdge) {
    btnAddEdge.onclick = function(){
      if(ListOpt1.innerText != "" &&  ListOpt2.innerText != ""){
        cy.add([
          { group: 'edges', data: { id: `${ListOpt1.value}${ListOpt2.value}`, source: `${ListOpt1.value}`, target: `${ListOpt2.value}` } },   
        ]);
        // lam moi lai danh sach cung va danh sach dinh
        refreshListNodes();
        // them cung vao ma tran
        addEdge();
      }else {
        alert('Chon dinh de them cung'); 
      }
    }
}

// ========================================================

// chon va xoa 
cy.on('click', function(e){
  // bien su kien
  var clicked = e.target;
  let addNav = document.querySelector('.draw'); 

  // xóa class khi thêm được đỉnh 
  cy.nodes().classes([]);
  cy.edges().classes([]);
  
  
  // ================== thêm đỉnh ====================
  if(addNav.classList.contains('active')) {
    if(clicked._private.group === "nodes" || clicked._private.group === "edges" ){
      cy.$(`#${clicked._private.data.id}`).addClass('highlighted');
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
  
  // =========================================
});
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

// select tab 
function openFunction(func) {
  var i;
  var tab = document.getElementsByClassName("w3-button");
  var tabContent = document.getElementsByClassName("function");

  // reset style
  cy.nodes().classes([]);
  cy.edges().classes([]);

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