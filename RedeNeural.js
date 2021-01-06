function sigmoid(x) {return 1/(1+Math.exp(-x)); }
function dsigmoid(x) {return x*(1-x); }
class RedeNeural{
    constructor(i_nodes, h_nodes, o_nodes){
        this.i_nodes = i_nodes;
        this.h_nodes = h_nodes;
        this.o_nodes = o_nodes;

        this.bias_ih = new Matrix(this.h_nodes,1);
        this.bias_ih.randomize();
        this.bias_ho = new Matrix(this.o_nodes,1);
        this.bias_ho.randomize();

        this.pesos_ih = new Matrix(this.h_nodes,this.i_nodes);
        this.pesos_ih.randomize();

        this.pesos_ho = new Matrix(this.o_nodes,this.h_nodes);
        this.pesos_ho.randomize();

        this.learning_rate = 0.1;
    }
    
    

    treino(input, esperado){

        // feedforward//////////////////////////////////////////
        // Entrada para a Oculta
        let inp = Matrix.arrayToMatrix(input);
        let oculta = Matrix.multiply(this.pesos_ih, inp);
        oculta = Matrix.add(oculta, this.bias_ih);
        oculta.map(sigmoid);
        //////
        //Oculta para Saida
        let output = Matrix.multiply(this.pesos_ho, oculta);
        output = Matrix.add(output, this.bias_ho);
        output.map(sigmoid);
        ///////
        ////////////////////////////////////////////////////////

        //Backpropagation
        //Correção camada oculta
        let esp = Matrix.arrayToMatrix(esperado);
        let erro_saida = Matrix.sub(esp,output);

        //d(sigmoid) = saida*(1-saida)
        let d_Saida = Matrix.map(output, dsigmoid);

        let gradiente = Matrix.hadamard(erro_saida,d_Saida);
        gradiente = Matrix.escalar_multiply(gradiente, this.learning_rate);
 
        // ajuste do Bia ho
        this.bias_ho = Matrix.add(this.bias_ho, gradiente);
        

        let oculta_T = Matrix.transpor(oculta);

        let pesos_ho_deltas = Matrix.multiply(gradiente,oculta_T);
        this.pesos_ho = Matrix.add(this.pesos_ho, pesos_ho_deltas);

        let pesos_ho_T = Matrix.transpor(this.pesos_ho);
        let erro_oculto = Matrix.multiply(pesos_ho_T, erro_saida);

        let d_oculto = Matrix.map(oculta,dsigmoid);
        let entrada_T = Matrix.transpor(inp);

        let gradiente_oculta = Matrix.hadamard(erro_oculto, d_oculto);
        gradiente_oculta = Matrix.escalar_multiply(gradiente_oculta, this.learning_rate);
        // Ajuste do Bias ih
        this.bias_ih = Matrix.add(this.bias_ih, gradiente_oculta);

        let pesos_ih_deltas =  Matrix.multiply(gradiente_oculta, entrada_T);
        this.pesos_ih = Matrix.add(this.pesos_ih, pesos_ih_deltas);

    }
    predict(input){
        // feedforward//////////////////////////////////////////
        // Entrada para a Oculta
        let inp = Matrix.arrayToMatrix(input);
        let oculta = Matrix.multiply(this.pesos_ih, inp);
        oculta = Matrix.add(oculta, this.bias_ih);
        oculta.map(sigmoid);
        //////
        //Oculta para Saida
        let output = Matrix.multiply(this.pesos_ho, oculta);
        output = Matrix.add(output, this.bias_ho);
        output.map(sigmoid);
        ///////
        ////////////////////////////////////////////////////////
        return Matrix.matrixToArray(output);
    }
}