<html xmlns="http://www.w3.org/1999/xhtml" xml:lang="pt-br" lang="pt-br">
 <head>
    <title>Guia Braille</title>
	<link type='text/css' rel='stylesheet' href='css/dvgame.css'><!-- css da pagina -->
	<meta http-equiv='Content-Type' content='text/html; charset=UTF-8'><!-- Caracteres especiais -->
	<script type='text/javascript' src='js/jquery.js'></script><!-- Chama jquery -->
	<script type='text/javascript' src='js/jquery.cycle.all.js'></script><!-- Chama jquery usado para transicao de slides -->
	<script type='text/javascript' src='js/slideshow.js'></script><!-- Configura o slideshow -->
	<script language="JavaScript" src="js/functions.js"></script><!-- Arquivo de funcoes-->
</head>
  
  <body onkeyup="e(event);">
  <div id='BodyHeader' class='headerfixedHeight'><!-- Div que contem todo menu -->
	<div id='CentroMenu'><!-- Para centralizar o menu -->
	<div id='LogoArea' onkeyup="emiteSomInfo('Menu/audio1')"><!-- Logo -->
		<a href='index.html'>
			<img id='Logo' src='img/logo.png'></img>
		</a>
	</div>
	<div id='NavigationArea'><!-- Botoes menu -->
		<ul class='navigationElements'>
			<li><a href="projeto.html" onkeyup="emiteSomInfo('Menu/audio2')">Projeto</a></li>
			<li><a href="braille.html" onkeyup="emiteSomInfo('Menu/audio3')">Braille</a></li>
			<li><a href="jogo.html" onkeyup="emiteSomInfo('Menu/audio4')">Jogo</a></li>
			<li><a href="teclado.html" onkeyup="emiteSomInfo('Menu/audio5')">Faça seu teclado</a></li>
		<ul>
	</div>
	</div>
</div>
<div id='BodyContent'><!-- Corpo -->
	<div id='Conteudo_1' class="conteudo direita cor3">
		<div class="titulo">
		    <h2 id="titulo">Adivinhe a Letra</h2><br />
		<p>Procure a simbologia correspondente a letra sorteada. </p> 
		<script type="text/javascript">  
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
				document.getElementById("DivSomDasLetras").innerHTML= "<embed src='audio/letras/"+numletra+".mp3' hidden=true autostart=true loop=false>";
			break;
			case 66:
				letra = 'b';
				numletra = 66;
				document.getElementById("DivSomDasLetras").innerHTML= "<embed src='audio/letras/"+numletra+".mp3' hidden=true autostart=true loop=false>";
			break;
			case 67:
				letra = 'c';
				numletra = 67;
				document.getElementById("DivSomDasLetras").innerHTML= "<embed src='audio/letras/"+numletra+".mp3' hidden=true autostart=true loop=false>";
			break;
			case 68:
				letra = 'd';
				numletra = 68;
				document.getElementById("DivSomDasLetras").innerHTML= "<embed src='audio/letras/"+numletra+".mp3' hidden=true autostart=true loop=false>";
			break;
			case 69:
				letra = 'e';
				numletra = 69;
				document.getElementById("DivSomDasLetras").innerHTML= "<embed src='audio/letras/"+numletra+".mp3' hidden=true autostart=true loop=false>";
			break;
			case 70:
				letra = 'f';	
				numletra = 70;	
				document.getElementById("DivSomDasLetras").innerHTML= "<embed src='audio/letras/"+numletra+".mp3' hidden=true autostart=true loop=false>";				
			break;
			case 71:
				letra = 'g';
				numletra = 71;
				document.getElementById("DivSomDasLetras").innerHTML= "<embed src='audio/letras/"+numletra+".mp3' hidden=true autostart=true loop=false>";
			break;
			case 72:
				letra = 'h';
				numletra = 72;
				document.getElementById("DivSomDasLetras").innerHTML= "<embed src='audio/letras/"+numletra+".mp3' hidden=true autostart=true loop=false>";
			break;
			case 73:
				letra = 'i';
				numletra = 73;
				document.getElementById("DivSomDasLetras").innerHTML= "<embed src='audio/letras/"+numletra+".mp3' hidden=true autostart=true loop=false>";
			break;
			case 74:
				letra = 'j';
				numletra = 74;
				document.getElementById("DivSomDasLetras").innerHTML= "<embed src='audio/letras/"+numletra+".mp3' hidden=true autostart=true loop=false>";
			break;
			case 75:
				letra = 'k';
				numletra = 75;
				document.getElementById("DivSomDasLetras").innerHTML= "<embed src='audio/letras/"+numletra+".mp3' hidden=true autostart=true loop=false>";
			break;
			case 76:
				letra = 'l';
				numletra = 76;
				document.getElementById("DivSomDasLetras").innerHTML= "<embed src='audio/letras/"+numletra+".mp3' hidden=true autostart=true loop=false>";
			break;
			case 77:
				letra = 'm';
				numletra = 77;
				document.getElementById("DivSomDasLetras").innerHTML= "<embed src='audio/letras/"+numletra+".mp3' hidden=true autostart=true loop=false>";
			break;
			case 78:
				letra = 'n';
				numletra = 78;
				document.getElementById("DivSomDasLetras").innerHTML= "<embed src='audio/letras/"+numletra+".mp3' hidden=true autostart=true loop=false>";
			break;
			case 79:
				letra = 'o';
				numletra = 79;
				document.getElementById("DivSomDasLetras").innerHTML= "<embed src='audio/letras/"+numletra+".mp3' hidden=true autostart=true loop=false>";
			break;
			case 80:
				letra = 'p';
				numletra = 80;
				document.getElementById("DivSomDasLetras").innerHTML= "<embed src='audio/letras/"+numletra+".mp3' hidden=true autostart=true loop=false>";
			break;
			case 81:
				letra = 'q';
				numletra = 81;
				document.getElementById("DivSomDasLetras").innerHTML= "<embed src='audio/letras/"+numletra+".mp3' hidden=true autostart=true loop=false>";
			break;
			case 82:
				letra = 'r';
				numletra = 82;
				document.getElementById("DivSomDasLetras").innerHTML= "<embed src='audio/letras/"+numletra+".mp3' hidden=true autostart=true loop=false>";
			break;
			case 83:
				letra = 's';
				numletra = 83;
				document.getElementById("DivSomDasLetras").innerHTML= "<embed src='audio/letras/"+numletra+".mp3' hidden=true autostart=true loop=false>";
			break;
			case 84:
				letra = 't';
				numletra = 84;
				document.getElementById("DivSomDasLetras").innerHTML= "<embed src='audio/letras/"+numletra+".mp3' hidden=true autostart=true loop=false>";
			break;
			case 85:
				letra = 'u';
				numletra = 85;
				document.getElementById("DivSomDasLetras").innerHTML= "<embed src='audio/letras/"+numletra+".mp3' hidden=true autostart=true loop=false>";
			break;
			case 86:
				letra = 'v';
				numletra = 86;
				document.getElementById("DivSomDasLetras").innerHTML= "<embed src='audio/letras/"+numletra+".mp3' hidden=true autostart=true loop=false>";
			break;
			case 87:
				letra = 'w';
				numletra = 87;
				document.getElementById("DivSomDasLetras").innerHTML= "<embed src='audio/letras/"+numletra+".mp3' hidden=true autostart=true loop=false>";
			break;
			case 88:
				letra = 'x';
				numletra = 88;
				document.getElementById("DivSomDasLetras").innerHTML= "<embed src='audio/letras/"+numletra+".mp3' hidden=true autostart=true loop=false>";
			break;
			case 89:
				letra = 'y';
				numletra = 89;
				document.getElementById("DivSomDasLetras").innerHTML= "<embed src='audio/letras/"+numletra+".mp3' hidden=true autostart=true loop=false>";
			break;
			case 90:
				letra = 'z';
				numletra = 90;
				document.getElementById("DivSomDasLetras").innerHTML= "<embed src='audio/letras/"+numletra+".mp3' hidden=true autostart=true loop=false>";
			break;
	  }
	  document.getElementById("letraSorteada").innerHTML = letra;
	 //document.form.editor.value = "";   // Limpa o campo p/ facilitar a vida do usuário
     //document.form.editor.focus();                       // Retorna falso, isto é, não submete o formulário
	 return false;
	}
	
	
	function finaliza(cont){
		var ponto = cont;
		location.href="ranking.php?ponto="+ponto;
		 //document.getElementById("condicao").innerHTML = "Você acertou: "+cont+" de 10 letras";
		 //document.getElementById("letraSorteada").innerHTML = '';
	}
	
		
      function Testar(num) {
       // A escolha do usuário
		if (contador==10){
		if (numletra != num) {
          contador++; // Incrementa o contador
		  
          //alert('Errou mane!');
		  document.getElementById("DivSomDasLetras").innerHTML= "<embed src='audio/letras/arroba.mp3' hidden=true autostart=true loop=false>";
		document.getElementById("condicao").innerHTML = 'Errou';
		
        }
        else {
          contador++;
		  cont++;
           document.getElementById("DivSomDasLetras").innerHTML= "<embed src='audio/letras/asterisco.mp3' hidden=true autostart=true loop=false>";
		  document.getElementById("condicao").innerHTML = 'Acertou';
		  }
		
		setTimeout("finaliza(cont);", 2000);
		}
		else{
        if (numletra != num) {
          contador++; // Incrementa o contador
		  
          //alert('Errou mane!');
		  document.getElementById("DivSomDasLetras").innerHTML= "<embed src='audio/letras/arroba.mp3' hidden=true autostart=true loop=false>";
		document.getElementById("condicao").innerHTML = 'Errou';
		
        }
        else {
          contador++;
		  cont++;
           document.getElementById("DivSomDasLetras").innerHTML= "<embed src='audio/letras/asterisco.mp3' hidden=true autostart=true loop=false>";
		  document.getElementById("condicao").innerHTML = 'Acertou';
          setTimeout("Pensar();", 2000);
		  //setInterval("Pensar();", 2000);
        }
		}
		
        //document.form.editor.value = "";   // Limpa o campo p/ facilitar a vida do usuário
        //document.form.editor.focus();   
        return false                     // Retorna falso, isto é, não submete o formulário
		
      }//-->
    </script>
		<!-- Inicio div menu jogos-->
			<div id='adivinhaLetra' class='advLetra' >
		
			<h2 align='center' id='condicao'></h2>
			
			<h1 align='center' id='letraSorteada'></h1>
				<form name="form" onsubmit="return finaliza()" method="post" action="#">
				<!--Informe seu nome: <input type="text" size="6"  name="nome" />&nbsp;&nbsp;-->
				<!--<textarea class="DivSomInfo" name= "editor" id="editor"  onkeydown="e(event);" onkeyup="aprendendoJS();"></textarea> -->
				<!--<input type="submit" name="Enviar" value="Enviar!" onmouseover="style.color = '#FF0000'" onmouseout="style.color = ''" />&nbsp;&nbsp;-->
				<!--<input type="button" value="Desistir!" onclick="alert('O número que eu escolhi foi: ' + numeroSecreto + '. Pena que você desistiu! Tente novamente, eu vou pensar em outro número, OK?'); Pensar()" /><br /><br />
				-->
				</form>
				</div>
				<!-- Fim -->
		</div>		
	</div>
</div>  
  <!--------------------------------------- Começa o Roda pé ---------------------------------------->
<div id='BodyFooter' class="container">
	<div id="DivSomDasLetras"></div> <!-- Div escondido que toca os audios da função emiteSom -->
	<div id="DivSomInfo">
		<embed src='audio/PaginaBraille/intro.mp3' hidden=true autostart=true loop=false>
	</div> <!-- Div escondido que toca os audios da emitoSomInfo -->
	<div id='CentroFooter'><!-- Para centralizar o footer -->
		<div class="PrimaryContent"><!-- Parte que fica sobre a linha -->
			<div id='FooterNavigation'><!-- Conteudo do roda pe deve ficar dentro desse elemento -->
				<a>Contato: GuiaBraille@gmail.com</a>
			</div>
		</div>
		<div class="SecondaryContent"><!-- Parte inferior a linha -->
			<div id='FooterNavigation'><!-- Conteudo do roda pe deve ficar dentro desse elemento -->
				<a>Brasil</a> |
				<a>Rio Grande do Sul</a> |
				<a>Instituto Federal Sul-Rio-Grandense Campus Charqueadas</a>
			</div>
			<div id="LogoAndCopyright"><!-- Logo e Copyright respectivamente -->
				<div id="CopyrightLogo"></div>
				<div id="CopyrightText">
                    © 2014 Guia Braille
                </div>
			</div>
		</div>
	</div>
</div>
  </body>
</html>