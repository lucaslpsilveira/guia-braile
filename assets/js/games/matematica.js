/* Lógica original do jogo (2014). Única mudança: os sons passam por tocarSom(), no lugar do <embed>. */
function tocarSom(nome) { GB.audio.efeito('letras/' + nome); }
     
	
      //nivel = 1; // Nível padrão
      max = 10;  // Escolha máxima padrão do usuário
	  cont = 1;
      //Pensar();  // O PC "pensa" em um número dentro do intervalo solicitado  
	
	function e(event){
	 //document.form.editor.value = ""; 
	 tocarSom(event.keyCode);
	var verifica;
	verifica=event.keyCode;
	switch (verifica) {
	case 113:
	Pensar();
	break;
	}
	}
	
      function Pensar() {
	  
	  document.getElementById("letraSorteada").innerHTML = "";
	  document.form.chute.value = "";   // Limpa o campo p/ facilitar a vida do usuário
        document.form.chute.focus();  
	   //alert(cont++);
        numeroSecreto = Math.round(Math.random()* 4 +1);
		numeroSecreto2 = Math.round(Math.random()* 4 +1);// Fórmula que o PC usa para "pensar" num número
        sorteia = Math.round(Math.random()* 1+1);
		contador = 0;      		// Zera o contador
		if(numeroSecreto > numeroSecreto2){
		switch (sorteia) {
			case 1:    //LETRAS
				result = (parseFloat(numeroSecreto) + parseFloat(numeroSecreto2));
				ind = '+';
			break;
			case 2:
				result = numeroSecreto - numeroSecreto2;
				ind = '-';
			break;
	  }
	  }else{
	  Pensar();
	  }
	  //document.getElementById("DivSomInfo").innerHTML= "<embed src='audio/letras/"+numeroSecreto+".mp3' hidden=true autostart=true loop=false>";
	  setTimeout("num(numeroSecreto, numeroSecreto2, ind);", 2000);
	  //setTimeout("num2(numeroSecreto2);", 2000);
	  document.getElementById("condicao").innerHTML = numeroSecreto + ind + numeroSecreto2;
	  
	}
	
	function num(num1, num2, ind){
		switch(num1){
		case 1: 
		novo = 49;
		break;
	
		case 2: 
		novo = 50;
		break;
	
		case 3: 
		novo = 51;
		break;
	
		case 4: 
		novo = 52;
		break;
	
		case 5: 
		novo = 53;
		break;
		}
		switch(num2){
		case 1: 
		novo2 = 49;
		break;
	
		case 2: 
		novo2 = 50;
		break;
	
		case 3: 
		novo2 = 51;
		break;
	
		case 4: 
		novo2 = 52;
		break;
	
		case 5: 
		novo2 = 53;
		break;
		}
		 tocarSom(novo);
		 setTimeout("num2(ind, novo2);", 2000);
	}
	
		function num2(ind ,novo2){
		if(ind == '-'){
			tocarSom('menos');
		}else{
		 tocarSom('mais');
		 }
		 setTimeout("num3(novo2);", 2000);
	}
	function num3(novo2){
		
		 tocarSom(novo2);
		 
	}
	
	
	function finaliza(){
	document.getElementById("condicao").innerHTML = "Para continuar presione F2";
	};
	
      function Testar() {
        valorUsuario = document.form.chute.value;  // A escolha do usuário
		
        if (result != valorUsuario) {
          contador++; // Incrementa o contador
          tocarSom('errou');
        }
        else {
          contador++;
          //alert('Aee campeaooo, acertou em: ' +contador+ ' tentativa(s)');
		  tocarSom('acertou2');
          finaliza();
        }
        document.form.chute.value = "";   // Limpa o campo p/ facilitar a vida do usuário
        document.form.chute.focus();   
        return false                     // Retorna falso, isto é, não submete o formulário
      }



      //-->
    