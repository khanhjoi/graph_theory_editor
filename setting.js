
var matrix = new Array(arrayNodes.length);

// Tạo ma trận
function initGraph() {
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

var mark = [];


// duyệt theo chiều sâu
function Depth_first_search(node) {
    // khoi tao danh sach
    let stack = new Stack();

    // khởi tạo đánh dấu
    for (let i = 0; i < matrix.length; i++) {
        mark[i] = 0;
    }
    console.log("vao duyet");

    // thêm nút đầu tiên vào stack
    stack.push(node);

    //duyệt
    while(!stack.isEmpty()) {
        let x = stack.peek();
        stack.pop();

        if(mark[x] != 0) {
            continue;
        }

        console.log(x);
        mark[x] = 1;

        let list = neighbor(x);

        for (let i = 0; i < list.length; i++) {
            let y = list[i];
            stack.push(y);
        }
    }
}

const duyet = document.getElementById('duyet');

duyet.addEventListener('click', () => {
    Depth_first_search(0);
    console.log(arrayNodes)
})