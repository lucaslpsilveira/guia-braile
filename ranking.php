<?php
$ponto = $_GET["ponto"];
if (!empty($_POST['nome'])){
$arq = fopen("arquivo.txt","a");

$nome = $_POST['nome'];
$conteudo = $nome."/".$ponto."\n\r";
fwrite($arq, $conteudo);

fclose($arq);



/*$arq2 = fopen("arquivo.txt","r");

$dadosArq = fread($arq2,1024);
echo $dadosArq;
fclose($arq2);


//ABRE O ARQUIVO TXT
$ponteiro = fopen ("arquivo.txt","r");

//LÊ O ARQUIVO ATÉ

while (!feof ($ponteiro)) {
  //LÊ UMA

  $linha = fgets($ponteiro,
4096);
  //IMPRIME NA TELA

  echo $linha."<br>";
}//FECHA WHILE

//FECHA
fclose ($ponteiro);

*/


// Lê um arquivo em um array.  Nesse exemplo nós obteremos o código fonte de
// uma URL via HTTP
$lines = file ('arquivo.txt');

// Percorre o array, mostrando o fonte HTML com numeração de linhas.
foreach ($lines as $line_num => $line) {
    echo "Linha #<b>{$line_num}</b> : " . htmlspecialchars($line) . "<br>\n";
}

// Outro exemplo, onde obtemos a página web inteira como uma string. Veja também file_get_contents().
$html = implode ('', file ('arquivo.txt'));

// Usando o parâmetro de flags opcionais disponíveis desde o PHP 5
$trimmed = file('arquivo.txt', FILE_IGNORE_NEW_LINES | FILE_SKIP_EMPTY_LINES);


}



else{
?>

				<form name="form" method="post" action="#">
				Informe seu nome: <input type="text" size="6"  name="nome" />&nbsp;&nbsp;
				<!--<textarea class="DivSomInfo" name= "editor" id="editor"  onkeydown="e(event);" onkeyup="aprendendoJS();"></textarea> -->
				<input type="submit" name="Enviar" value="Enviar!" onmouseover="style.color = '#FF0000'" onmouseout="style.color = ''" />&nbsp;&nbsp;
				<!--<input type="button" value="Desistir!" onclick="alert('O número que eu escolhi foi: ' + numeroSecreto + '. Pena que você desistiu! Tente novamente, eu vou pensar em outro número, OK?'); Pensar()" /><br /><br />
				-->
				</form>
<?php
}
?>