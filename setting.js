
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
    console.log("vao duyet");

    // thêm nút đầu tiên vào stack
    stack.push(node);

    //duyệt
    while(!stack.isEmpty()) {
        let x = stack.peek();
        stack.pop();

        if(visit[x] != 0) {
            continue;
        }

        // console.log(x);
        visit[x] = 1;

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

const duyet = document.getElementById('duyet');

duyet.addEventListener('click', () => {
    let cnt = ConnectedComponent();
    const show = document.querySelector(".show_ConnectCpn");
    if(cnt > 0) {
        show.innerHTML  = `${cnt}`;
    }else {
        show.innerHTML  = ``;

    }
    console.log(cnt)
})


// Tìm chu trình hamilton
const findBtn= document.getElementById('find');
findBtn.addEventListener('click', () => {
    refreshListNodes();
    addEdge();

    console.log(matrix)
    var hamiltonian = new HamiltonianCycle();
    hamiltonian.hamCycle(matrix);
})



class HamiltonianCycle {
    constructor() {
        this.V = arrayNodes.length;
        this.path = [];
    }
 
    /* A utility function to check
    if the vertex v can be added at
    index 'pos'in the Hamiltonian Cycle
    constructed so far (stored in 'path[]') */
    isSafe(v, graph, path, pos) {
        /* Check if this vertex is
        an adjacent vertex of the
        previously added vertex. */
        if ( graph[path[pos - 1]][v] == 0) return false;
 
        /* Check if the vertex has already
        been included. This step can be
        optimized by creating an array
        of size V */
        for (var i = 0; i < pos; i++) if (path[i] == v) return false;
        
        return true;
    }
 
    /* A recursive utility function
    to solve hamiltonian cycle problem */
    hamCycleUtil(graph, path, pos) {
        /* base case: If all vertices
        are included in Hamiltonian Cycle */
        if (pos == this.V) {
            // And if there is an edge from the last included
            // vertex to the first vertex
            if (graph[path[pos - 1]][path[0]] == 1) return true;
            else return false;
        }
 
        // Try different vertices as a next candidate in
        // Hamiltonian Cycle. We don't try for 0 as we
        // included 0 as starting point in hamCycle()
        for (var v = 1; v < this.V; v++) {
            /* Check if this vertex can be
            added to Hamiltonian Cycle */
            if (this.isSafe(v, graph, path, pos)) {
              path[pos] = v;
 
              /* recur to construct rest of the path */
              if (this.hamCycleUtil(graph, path, pos + 1) == true) return true;
 
              /* If adding vertex v doesn't
                lead to a solution, then remove it */
              path[pos] = -1;
            }
        }
 
          /* If no vertex can be added to Hamiltonian Cycle
        constructed so far, then return false */
          return false;
    }
 
        /* This function solves the Hamiltonian
    Cycle problem using Backtracking. It
    mainly uses hamCycleUtil() to solve the
    problem. It returns false if there
    is no Hamiltonian Cycle possible,
    otherwise return true and prints the path.
    Please note that there may be more than
    one solutions, this function prints one
    of the feasible solutions. */
    hamCycle(graph) {
        this.path = new Array(this.V).fill(0);
        for (var i = 0; i < this.V; i++) this.path[i] = -1;
 
        /* Let us put vertex 0 as the first
        vertex in the path. If there is a
        Hamiltonian Cycle, then the path can be
        started from any point of the cycle
        as the graph is undirected */
        this.path[0] = 0;
        if (this.hamCycleUtil(graph, this.path, 1) == false) {
            let show = document.getElementById("showSolution");
            show.innerHTML = "Không tồn tại chu trình Hamilton"
            return 0;
        }
 
          this.printSolution(this.path);
          return 1;
        }
 
        /* A utility function to print solution */
    printSolution(path) {
        let show = document.getElementById("showSolution");
        show.innerText = "Chu trình hamilton: "
        for (var i = 0; i < this.V; i++) show.innerText  += `  ${arrayNodes[path[i]]}`;
 
        // Let us print the first vertex again
        // to show the complete cycle
        show.innerText += ` ${arrayNodes[path[0]]}`;
    }
}

