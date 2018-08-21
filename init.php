<?php
namespace Init;
use const \Consts\{PATH};
require_once __DIR__ . DIRECTORY_SEPARATOR . 'consts.php';
require_once __DIR__ . DIRECTORY_SEPARATOR . 'functions.php';

spl_autoload_register('spl_autoload');
set_include_path(join(PATH, PATH_SEPARATOR) . PATH_SEPARATOR . get_include_path());
