<?php

function calculate($arr, $int){
    return count($arr) + $int;
}

function AnotherCalculate($arr, $int){
    return calculate($arr, $int);
}