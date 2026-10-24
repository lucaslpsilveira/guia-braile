/* Lógica original do jogo (2014). Única mudança: os sons passam por tocarSom(), no lugar do <embed>. */
function tocarSom(nome) { GB.audio.efeito('letras/' + nome); }
  
		var i = 15; // segundos

      //nivel = 1; // Nível padrão
      max = 10;  // Escolha máxima padrão do usuário
	  cont = 0;
	  contador = 1;
      //Pensar();  // O PC "pensa" em um número dentro do intervalo solicitado 
	  
	function e(event){
	 //document.form.editor.value = ""; 
	var verifica;
	verifica=event.keyCode;
	switch (verifica) {
			case 65:    //LETRAS
				Testar(65);
			break;
			case 66:
				Testar(66);
			break;
			case 67:
				Testar(67);
			break;
			case 68:
				Testar(68);
			break;
			case 69:
				Testar(69);
			break;
			case 70:
				Testar(70);			
			break;
			case 71:
				Testar(71);
			break;
			case 72:
				Testar(72);
			break;
			case 73:
				Testar(73);
			break;
			case 74:
				Testar(74);
			break;
			case 75:
				Testar(75);
			break;
			case 76:
				Testar(76);
			break;
			case 77:
				Testar(77);
			break;
			case 78:
				Testar(78);
			break;
			case 79:
				Testar(79);
			break;
			case 80:
				Testar(80);
			break;
			case 81:
				Testar(81);
			break;
			case 82:
				Testar(82);
			break;
			case 83:
				Testar(83);
			break;
			case 84:
				Testar(84);
			break;
			case 85:
				Testar(85);
			break;
			case 86:
				Testar(86);
			break;
			case 87:
				Testar(87);
			break;
			case 88:
				Testar(88);
			break;
			case 89:
				Testar(89);
			break;
			case 90:
				Testar(90);			
			break;
			case 13:
				Pensar();
				break;
			}
		}
	
		
      function Pensar() {
	   //alert(cont++);
        numeroSecreto = Math.round(Math.random()* 25+64); // Fórmula que o PC usa para "pensar" num número
		switch (numeroSecreto) {
			case 65:    //LETRAS
				letra = 'a';
				numletra = 65;
				tocarSom(numletra);
			break;
			case 66:
				letra = 'b';
				numletra = 66;
				tocarSom(numletra);
			break;
			case 67:
				letra = 'c';
				numletra = 67;
				tocarSom(numletra);
			break;
			case 68:
				letra = 'd';
				numletra = 68;
				tocarSom(numletra);
			break;
			case 69:
				letra = 'e';
				numletra = 69;
				tocarSom(numletra);
			break;
			case 70:
				letra = 'f';	
				numletra = 70;	
				tocarSom(numletra);				
			break;
			case 71:
				letra = 'g';
				numletra = 71;
				tocarSom(numletra);
			break;
			case 72:
				letra = 'h';
				numletra = 72;
				tocarSom(numletra);
			break;
			case 73:
				letra = 'i';
				numletra = 73;
				tocarSom(numletra);
			break;
			case 74:
				letra = 'j';
				numletra = 74;
				tocarSom(numletra);
			break;
			case 75:
				letra = 'k';
				numletra = 75;
				tocarSom(numletra);
			break;
			case 76:
				letra = 'l';
				numletra = 76;
				tocarSom(numletra);
			break;
			case 77:
				letra = 'm';
				numletra = 77;
				tocarSom(numletra);
			break;
			case 78:
				letra = 'n';
				numletra = 78;
				tocarSom(numletra);
			break;
			case 79:
				letra = 'o';
				numletra = 79;
				tocarSom(numletra);
			break;
			case 80:
				letra = 'p';
				numletra = 80;
				tocarSom(numletra);
			break;
			case 81:
				letra = 'q';
				numletra = 81;
				tocarSom(numletra);
			break;
			case 82:
				letra = 'r';
				numletra = 82;
				tocarSom(numletra);
			break;
			case 83:
				letra = 's';
				numletra = 83;
				tocarSom(numletra);
			break;
			case 84:
				letra = 't';
				numletra = 84;
				tocarSom(numletra);
			break;
			case 85:
				letra = 'u';
				numletra = 85;
				tocarSom(numletra);
			break;
			case 86:
				letra = 'v';
				numletra = 86;
				tocarSom(numletra);
			break;
			case 87:
				letra = 'w';
				numletra = 87;
				tocarSom(numletra);
			break;
			case 88:
				letra = 'x';
				numletra = 88;
				tocarSom(numletra);
			break;
			case 89:
				letra = 'y';
				numletra = 89;
				tocarSom(numletra);
			break;
			case 90:
				letra = 'z';
				numletra = 90;
				tocarSom(numletra);
			break;
	  }
	  document.getElementById("letraSorteada").innerHTML = letra;
	 //document.form.editor.value = "";   // Limpa o campo p/ facilitar a vida do usuário
     //document.form.editor.focus();                       // Retorna falso, isto é, não submete o formulário
	 return false;
	}
	
	
	function finaliza(cont){
		var ponto = cont;
		//location.href="ranking.php?ponto="+ponto;
		if(cont == 1){
		tocarSom('acerto'+cont);
		}
		if(cont == 2){
		tocarSom('acerto'+cont);
		}
		if(cont == 3){
		tocarSom('acerto'+cont);
		}
		if(cont == 4){
		tocarSom('acerto'+cont);
		}
		if(cont == 5){
		tocarSom('acerto'+cont);
		}
		if(cont == 6){
		tocarSom('acerto'+cont);
		}
		if(cont == 7){
		tocarSom('acerto'+cont);
		}
		if(cont == 8){
		tocarSom('acerto'+cont);
		}
		if(cont == 9){
		tocarSom('acerto'+cont);
		}
		if(cont == 10){
		tocarSom('acerto'+cont);
		}
		else{
		tocarSom('acerto'+cont);
		}
		document.getElementById("condicao").innerHTML = "Você acertou: "+cont+" de 10 letras";
		 //document.getElementById("letraSorteada").innerHTML = '';
		return false;
	}
	
		
      function Testar(num) {
       // A escolha do usuário
		if (contador==10){
		if (numletra != num) {
          contador++; // Incrementa o contador
		  
          //alert('Errou mane!');
		  tocarSom('errou');
		document.getElementById("condicao").innerHTML = 'Errou !';
		
        }
        else {
          contador++;
		  cont++;
           tocarSom('acertou');
		  document.getElementById("condicao").innerHTML = 'Acertou !';
		  }
		
		setTimeout("finaliza(cont);", 2000);
		}
		else{
        if (numletra != num) {
          contador++; // Incrementa o contador
		  
          //alert('Errou mane!');
		  tocarSom('errou');
		document.getElementById("condicao").innerHTML = 'Errou !';
		
        }
        else {
          contador++;
		  cont++;
           tocarSom('acertou');
		  document.getElementById("condicao").innerHTML = 'Acertou !';
          setTimeout("Pensar();", 2000);
		  //setInterval("Pensar();", 2000);
        }
		}
		
        //document.form.editor.value = "";   // Limpa o campo p/ facilitar a vida do usuário
        //document.form.editor.focus();   
        return false                     // Retorna falso, isto é, não submete o formulário
		
      }//-->
    