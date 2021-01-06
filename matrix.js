class Matrix{
    constructor(rows, cols){
        this.rows = rows;
        this.cols = cols;

        this.data = [];
        for (let i=0; i<rows;i++){
            let array = [];
            for(let j=0;j<cols;j++){
                array.push(Math.floor(Math.random()*10));
            }
            this.data.push(array);
        }
    }

    static map(A, func){
        let matrix = new Matrix(A.rows,A.cols);
        matrix.data = A.data.map((arr,i) => {
            return arr.map((num,j) => {
                return func(num,i,j);
            })
        });
        return matrix;
    }

    map(func){
        this.data = this.data.map((arr,i) => {
            return arr.map((num,j) => {
                return func(num,i,j);
            })
        });
        return this;
    }

    static transpor(A){
        var matrix = new Matrix(A.cols, A.rows);
        matrix.map((elem,i,j) => { return A.data[j][i]});
        return matrix;
    }

    static add(A,B){
        var matrix = new Matrix(A.rows, A.cols);
        matrix.map((elm,i,j)=>{return A.data[i][j] + B.data[i][j];});
        return matrix;
    }

    static sub(A,B){
        var matrix = new Matrix(A.rows, A.cols);
        matrix.map((elm,i,j)=>{return A.data[i][j] - B.data[i][j];});
        return matrix;
    }

    static hadamard(A,B){
        var matrix = new Matrix(A.rows, A.cols);
        matrix.map((elm,i,j)=>{return A.data[i][j] * B.data[i][j];});
        return matrix;
    }

    static escalar_multiply(A,x){
        var matrix = new Matrix(A.rows, A.cols);
        matrix.map((elm,i,j)=>{return A.data[i][j] * x;});
        return matrix;
    }

    static multiply(A,B){
        var matrix = new Matrix(A.rows, B.cols);

        matrix.map((num,i,j)=>{
            let sum = 0;
            for(let k=0;k<A.cols;k++){
                let elem1 = A.data[i][k];
                let elem2 = B.data[k][j];
                sum += elem1*elem2;
            }
            return sum;
        });

        return matrix;
    }
    randomize(){
        this.map((elem,i,j)=>{
            return Math.random()*2 - 1;
        })
    }
    print(){
        console.table(this.data);
    }

    static arrayToMatrix(array){
        let mat = new Matrix(array.length,1);
        mat.map((elem,i,j)=>{return array[i];});
        return mat;
    }

    
    static matrixToArray(o){
        let array = [];
        o.map((elem, i,j)=>{
            array.push(elem);
        })
        return array;
    }



}
