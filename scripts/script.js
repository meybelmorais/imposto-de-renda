const submit = document.querySelector("#calcular");

submit.addEventListener("click", (evento)=>{
    evento.preventDefault();

    const nome = document.querySelector("#nome").value;
    const salario = Number(document.querySelector("#salario").value);
    const tabela = document.querySelector("#resultado");

    let porcentagemINSS = 0;
    let porcentagemIRPF = 0;

    if(nome.value == "" || salario == 0){
        alert("Preencha todos os campos!");
        return;
    }

    if(salario<=1045)
        porcentagemINSS = 0.075;
    else if(salario>=1045.01 && salario<= 2089.60)
        porcentagemINSS = 0.09;
    else if(salario>=2089.61 && salario<= 3134.40)
        porcentagemINSS = 0.12;
    else if(salario>=3134.41 && salario<= 6101.06)
        porcentagemINSS = 0.12;

    if(salario-(salario*porcentagemINSS)<=1903.98){
        porcentagemIRPF = 0;
        parcelaDedutivel = 0;
    }
    else if(salario-(salario*porcentagemINSS)>=1903.99 && salario-(salario*porcentagemINSS)<= 2826.65){
        porcentagemIRPF = 0.075;
        parcelaDedutivel = 142.80;
    }
    else if(salario-(salario*porcentagemINSS)>=2826.66 && salario-(salario*porcentagemINSS)<= 3751.05){
        porcentagemIRPF = 0.15;
        parcelaDedutivel = 354.80;
    }
    else if(salario-(salario*porcentagemINSS)>=3751.06 && salario-(salario*porcentagemINSS)<= 4664.68){
        porcentagemIRPF = 0.225;
        parcelaDedutivel = 636.13;
    }
    else if(salario-(salario*porcentagemINSS)>=4664.69){
        porcentagemIRPF = 0.275;
        parcelaDedutivel = 869.36;
    }

    const tr = document.createElement("tr");
    const nomeTd = document.createElement("td");
    const salarioTd = document.createElement("td");
    const inssPTd = document.createElement("td");
    const inssValor = document.createElement("td");
    const irpfPTd = document.createElement("td");
    const irpfValor = document.createElement("td");
    const salarioFinalTd = document.createElement("td");

    nomeTd.appendChild(document.createTextNode(nome));
    salarioTd.appendChild(document.createTextNode(salario));
    inssPTd.appendChild(document.createTextNode((porcentagemINSS*100).toFixed(1)+'%'));
    inssValor.appendChild(document.createTextNode((salario*porcentagemINSS).toFixed(2)));
    irpfPTd.appendChild(document.createTextNode((porcentagemIRPF*100).toFixed(1)+'%'));
    irpfValor.appendChild(document.createTextNode((((salario-(salario*porcentagemINSS))*porcentagemIRPF) - parcelaDedutivel).toFixed(2)));
    salarioFinalTd.appendChild(document.createTextNode(salario - (salario*porcentagemINSS)-((salario-(salario*porcentagemINSS))*porcentagemIRPF) + parcelaDedutivel));

    tr.appendChild(nomeTd);
    tr.appendChild(salarioTd);
    tr.appendChild(inssPTd);
    tr.appendChild(inssValor);
    tr.appendChild(irpfPTd);
    tr.appendChild(irpfValor);
    tr.appendChild(salarioFinalTd);

    tabela.appendChild(tr);

    document.querySelector("#nome").value = "";
    document.querySelector("#salario").value  = "";

});