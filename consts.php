<?php
namespace Consts;
const DBNAME   = 'optimage';
const DBTYPE   = 'mysql';
const USERNAME = 'optimage';
const PASSWD   = 'password';

const BASE = __DIR__  . DIRECTORY_SEPARATOR;
const ALLOWED_METHODS = [
	'POST',
	'HEAD',
	'OPTIONS',
];
const ACCEPTABLE = [
	'application/json',
];
define(__NAMESPACE__ . '\\PATH', [
	BASE . 'classes',
	get_include_path(),
]);
