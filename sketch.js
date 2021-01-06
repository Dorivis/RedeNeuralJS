var train = true;

function setup() {
    createCanvas(500, 500);
    background(0);

    rn = new RedeNeural(2,3,1);
    console.log("OI")
    // AND teste
    dados = {
        inputs:
            [[1,1],
             [1,0],
             [0,1],
             [0,0]],
        output:
            [[1],
             [0],
             [0],
             [1]]
    }
  }
  
  function draw() {
    if(train){
        for(var i=0; i<10000;i++){
            var index = floor(random(4));
            rn.treino(dados.inputs[index], dados.output[index]);
        }
        if (rn.predict([0,0])[0] > 0.98 && rn.predict([1,0])[0] < 0.04){
            train = false;
            console.log(rn.predict([1,1]));
            console.log("terminou");
        }
    }
  }