<?php

if(!array_key_exists(1, $argv))
    throw new Exception("Temporary file not defined");

$tmp = $argv[1];
$options = json_decode(file_get_contents($tmp));
$result = array();

$is_error = null;

ob_start();

// require file if there's requires order
if(property_exists($options, 'requires')){
    foreach($options->requires as $file)
        require $file;
}

// let see if we\'ve something to evaluate
if(property_exists($options, 'source'))
    $result['returned'] = eval($options->source);

// let see if we've some function to call
if(property_exists($options, 'function')){
    $func = $options->function;
    $args = array();
    if(property_exists($options, 'args'))
        $args = $options->args;
    
    $result['returned'] = call_user_func_array($func, $args);
}
    
$result['printed'] = ob_get_contents();
ob_end_clean();

$f = fopen($tmp, 'w');
fwrite($f, json_encode($result));
fclose($f);