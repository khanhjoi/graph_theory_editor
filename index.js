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


// chon va xoa 
cy.on('click', function(e){
  // bien su kien
  var clicked = e.target;

  let btnAdd = document.getElementById('add');
  if(btnAdd.checked) {
    numberNodes++;
    cy.add([
      { group: 'nodes', data: { id: `${numberNodes}` }, position: { x: 300, y: 300 } },
    ]);
    
    let btnAddEdg = document.getElementById('addEdge');
    if(btnAddEdg.value) {
      cy.add([
        { group: 'edges', data: { id: `${btnAddEdg.value}`, source: '3', target: '4' } }
      ]);
    }
  }
  
  console.log();


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
  btnDlt.onclick = function() {
    if(flag){
      cy.remove(clicked);
    }
  }
// =========================================
});



