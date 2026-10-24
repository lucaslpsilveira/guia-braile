function emiteSom(event){	
    document.getElementById("DivSomDasLetras").innerHTML= "<embed src='audio/letras/"+event.keyCode+".mp3' hidden=true autostart=true loop=false>";
} // Verificar as ASCII do numpad...

function emiteSomInfo(nomeDoAudio){
	document.getElementById("DivSomInfo").innerHTML= "<embed src='audio/"+nomeDoAudio+".mp3' hidden=true autostart=true loop=false>";
}

