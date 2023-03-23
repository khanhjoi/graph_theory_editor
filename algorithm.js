
var matrix = [];

// Tạo ma trận
function initGraph() {
    matrix = new Array(arrayNodes.length);

    for (let i = 0; i < arrayNodes.length; i++) {
        matrix[i] = new Array(arrayNodes.length);
    };
    
    for (let i = 0; i < arrayNodes.length; i++) {
        for (var j = 0; j < arrayNodes.length; j++) {
            matrix[i][j] = 0;
        }
    };
}


// thêm cung
function addEdge() {
    initGraph();
    for (let i = 0; i < arrayEdges.length; i++) {
        let index1 = arrayNodes.indexOf(`${arrayEdges[i][0]}`)
        let index2 = arrayNodes.indexOf(`${arrayEdges[i][1]}`)
        matrix[index1][index2] = 1
        matrix[index2][index1] = 1
        // console.log(arrayEdges[i][0], arrayEdges[i][1], index1, index2, arrayNodes)
    }
}

// hàng sớm
function neighbor(node) {
    let arr = [];
    for (let i = 0; i < matrix.length; i++) {
        if(matrix[node][i] === 1) {
            arr.push(i);
        }
    }
    return arr;
}

// ==================== khời tạo ngăn xếp ===========================
class Stack {
    // hàm khởi tạo
    constructor(){
        this.items = [];
    }

    // thêm vào stack
    push(item){
        this.items.push(item);
    }

    // xóa phần tử khỏi stack
    pop() {
        if(this.items.length == 0){
            return "underflow";
        }
        return this.items.pop();
    }

    // hiển thị phần tử
    peek() {
        return this.items[this.items.length - 1];
    }

    // kiểm tra stack empty
    isEmpty() {
        return this.items.length == 0;
    }
}


// ==================== Kiểm tra miền liên thông ===========================

var visit = [];
function initVisit() {
     for (let i = 0; i < matrix.length; i++) {
        visit[i] = 0;
    }
}


// duyệt theo chiều sâu
function Depth_first_search(node) {
    // khoi tao danh sach
    let stack = new Stack();
    // thêm nút đầu tiên vào stack
    stack.push(node);

    //duyệt
    while(!stack.isEmpty()) {
        let x = stack.peek();
        stack.pop();

        if(visit[x] != 0) {
            continue;
        }

        visit[x] = 1;
        

        showElement(x);     
        let list = neighbor(x);

        for (let i = 0; i < list.length; i++) {
            let y = list[i];
            stack.push(y);
        }
    }
}

// kiểm tra miền liên thông
function ConnectedComponent() {
    // làm mới lại danh sách nút
    refreshListNodes();
    // khởi tạo lại đồ thị
    initGraph();
    // thêm cung vào đồ thị
    addEdge();
    // khởi tạo lại danh sách thăm
    initVisit();
    let cnt = 0;
    for( let i = 0; i < matrix.length; i++) {
        if(visit[i] == 0) {
            cnt ++;
            Depth_first_search(i);
        }
    }
    return cnt;
}

const Connect = document.getElementById('Connect');

Connect.addEventListener('click', () => {
    let cnt = ConnectedComponent();

    const show = document.querySelector(".show_ConnectCpn");
    if(cnt > 0) {
        show.innerHTML  = `${cnt}`;
    }else {
        show.innerHTML  = `Không có miền liên thông nào`;
    }
    
})

// định nghĩa lớp + phước thức để tìm hamilton
class HamiltonianCycle {
    constructor() {
        this.V = arrayNodes.length;
        this.path = [];
    }
 
    /* kiểm tra coi đỉnh v có thể thêm vào chu trình Hamilton hay không*/
    isSafe(v, graph, path, pos) {
        /* kiểm tra coi đỉnh hiện tại có kề với đỉnh ở phía trước hay kh */
        if ( graph[path[pos - 1]][v] == 0) return false;
 
        /* coi đỉnh có ở trong đường đi phía trước hay không */
        for (var i = 0; i < pos; i++) if (path[i] == v) return false;
        
        return true;
    }
 
    /*đệ quy để tìm chu trình hamilton*/
    hamCycleUtil(graph, path, pos) {
        /* Trường hợp các đỉnh đã được thêm vào tru trình Hamilton */
        if (pos == this.V) {
            // nếu có đường đi từ đỉnh cuối đến đỉnh đầu => có chu trình hamilton
            if (graph[path[pos - 1]][path[0]] == 1) return true;
            else return false;
        }
 
        // kiểm tra các đỉnh khác trong đồ thị
        // không kiểm tra đỉnh 0, đỉnh không là đỉnh bắt đầu
        for (var v = 1; v < this.V; v++) {
            /* Nếu đỉnh có thể thêm vào chu trình */
            if (this.isSafe(v, graph, path, pos)) {
              path[pos] = v;
              /* đệ quy lại cho đến khi gặp đỉnh cuối */
              if (this.hamCycleUtil(graph, path, pos + 1) == true) return true;
 
              /* Nếu đỉnh không phải là đường đi hamilton thì trả về vị trí trước đó */
              path[pos] = -1;
            }
        }
 
          /* Nếu không có đỉnh nào thêm vào => không có chu trình hamilton*/
        return false;
    }
 
    
    hamCycle(graph) {
        this.path = new Array(this.V).fill(0);
        for (var i = 0; i < this.V; i++) this.path[i] = -1;
 
        // cho đỉnh đầu vào chu trình
        this.path[0] = 0;

        // trường hợp không có chu trình hamilton
        if (this.hamCycleUtil(graph, this.path, 1) == false) {
            let show = document.querySelector(".showSolution");
            show.innerHTML = "Không tồn tại chu trình Hamilton";

            // làm mới lại file
            hamiltonianPart = [];
            hamiltonianPart = "Không tồn tại chu trình Hamilton";
            return 0;
        }
 
        this.printSolution(this.path);
        return 1;
    }
 
    // in chu trình hamilton
    printSolution(path) {
        let show =  document.querySelector(".showSolution");
        show.innerText = "Chu trình hamilton: "
        // làm mới lại file
        hamiltonianPart = [];
        for (var i = 0; i < this.V; i++) {
            hamiltonianPart.push(arrayNodes[path[i]]);          
            show.innerText  += `  ${arrayNodes[path[i]]}`;
        }
        showHighlight(path);

        hamiltonianPart.push(arrayNodes[path[0]]);
        show.innerText += ` ${arrayNodes[path[0]]}`;
        
    }

    
}

//  ***** Tìm chu trình hamilton ****
const findBtn= document.getElementById('find');
findBtn.addEventListener('click', () => {
    // làm mới danh sách đỉnh cung
    refreshListNodes();
    // thêm lại các đỉnh vào ma trận
    addEdge();
    var hamiltonian = new HamiltonianCycle();
    hamiltonian.hamCycle(matrix);
})



var hamiltonianPart = [];
// export text
function saveFileText(){
    // làm mới danh sách đỉnh cung
    refreshListNodes();
    // thêm lại các đỉnh vào ma trận
    addEdge();
    var hamiltonian = new HamiltonianCycle();
    hamiltonian.hamCycle(matrix);   
    console.log(cy.json());
    var blob = new Blob([`${JSON.stringify(cy.json())}`],{ type: "text/plain;charset=utf-8" });
    saveAs(blob, "Graph.txt");
}

const exportBtn = document.getElementById('exportBtn');  
exportBtn.addEventListener('click', function(e) {
    if(arrayNodes.length === 0) {
        alert('Bạn chưa vẽ đồ thị !!!');
        return ;
    }
    saveFileText();
});


document.getElementById("OpenBtn").addEventListener("change", function () {
    var fr = new FileReader();
    fr.readAsText(this.files[0]);
    fr.onload = function () {
        const graphFile = JSON.parse(fr.result);
        
        let listEdge = graphFile.elements.nodes;
        let listNode = graphFile.elements.edges;
        let arrayGraph = listEdge.concat(listNode);
        
        // làm mới danh sách đỉnh danh sách cung
        refreshListNodes();
        // nếu không có đỉnh cung để xóa thì bỏ qua
        if(arrayNodes.length != "0") {
            // xóa các đỉnh và cung khi đã tồn tại trước
            arrayNodes.forEach(element => {
                var tmp = cy.$(`${element}`);
                cy.remove(tmp);
            });
        }
        
        // console.log(arrayNodes)
        cy.add(arrayGraph);
    };  
  });

// show element 
function showElement(element) {
    // var bfs = cy.elements().bfs(`${element}`, function(){}, true);
    var bfs = cy.elements().bfs(`${element}`, function(){}, true);
    var i = 0;
    var highlightNextEle = function(){
      if( i < bfs.path.length ){
        // thêm class vào trong nút
        bfs.path[i].addClass('highlighted');

        // thêm class vào cung nếu có cung => if ở đây tránh bị lỗi
        if(bfs.path[i]._private.edges[0]) {
            bfs.path[i]._private.edges[0].addClass('highlighted');
        }   
        i++;
        setTimeout(highlightNextEle, 1000);
      }
    };
    highlightNextEle();
}

function showHighlight(path) {  
    var i = 0;
    path.push(0)
    console.log(path);
    var showHighlight = function(){
      if( i <= path.length ){
        // thêm class vào trong nút
        
        cy.$(`#${arrayNodes[path[i]]}`).addClass('highlighted');
        // chọn cung
        cy.$(`#${arrayNodes[path[i]]}${arrayNodes[path[i+1]]}`).addClass('highlighted');
        cy.$(`#${arrayNodes[path[i+1]]}${arrayNodes[path[i]]}`).addClass('highlighted');
        i++;
        setTimeout(showHighlight, 1000);
      }
    };
    showHighlight();
}


