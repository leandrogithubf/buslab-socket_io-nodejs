<?php
$path = __DIR__;
$arquivo = fopen($path."/renova/log",'r');
if ($arquivo == false) die('Não foi possível abrir o arquivo.');
$chave = fgets($arquivo);

if ($arquivo  !== false) {
    while (($data = fgets($arquivo)) !== false) {

        $arrayData = explode('/', $data);
        if (in_array('acme-challenge', $arrayData)) {
            $file = end($arrayData);
            $registro = fopen('/var/www/certbot-server/.well-known/acme-challenge/'.$file, 'w');
            fwrite($registro, $chave);
            fclose($registro);
            break;
        }
    }
}

fclose($arquivo);