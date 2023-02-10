
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

// them cung
function addEdge() {
    for (let i = 0; i < arrayEdges.length; i++) {
        let index1 = arrayNodes.indexOf(`${arrayEdges[i][0]}`)
        let index2 = arrayNodes.indexOf(`${arrayEdges[i][1]}`)
        matrix[index1][index2] = matrix[index2][index1] = 1
        // console.log(arrayEdges[i][0], arrayEdges[i][1], index1, index2, arrayNodes)
    }
    
}




// for (var i = 0; i < numberNodes; i++) {
//     for (var j = 0; j < numberNodes; j++)    {
//         console.log(matrix[i][j] + " ");
//     }
// } 