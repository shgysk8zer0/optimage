<?php
namespace Functions;
use const \Consts\{ALLOWED_METHODS, ACCEPTABLE};
use \shgysk8zer0\{Headers, HTTPException};

/**
 * [array_some description]
 * @param  Array    $arr      [description]
 * @param  Callable $callback [description]
 * @return Bool               [description]
 */
function array_some(Array $arr, Callable $callback): Bool
{
	$some = false;
	foreach ($arr as $key => $value) {
		if (\call_user_func($callback, $value, $key)) {
			$some = true;
			break;
		}
	}
	return $some;
}

/**
 * [array_every description]
 * @param  Array    $arr      [description]
 * @param  Callable $callback [description]
 * @return Bool               [description]
 */
function array_every(Array $arr, Callable $callback): Bool
{
	$every = true;
	foreach ($arr as $key => $value) {
		if (! call_user_func($callback, $value, $key)) {
			$every = false;
			break;
		}
	}
	return $every;
}

/**
 * [array_keys_exist description]
 * @param  Array  $arr  [description]
 * @param  String $keys [description]
 * @return Bool         [description]
 */
function array_keys_exist(Array $arr, String ...$keys): Bool
{
	$ks = [];
	$exists = array_every($keys, function(String $key) use ($arr): Bool
	{
		$ks[$key] = array_key_exists($key, $arr);
		return array_key_exists($key, $arr);
	});
	return $exists;
}

/**
 * [check_request description]
 * @param  Array  $request         [description]
 * @param  Array  $required_inputs [description]
 * @param  Array $allowed_methods [description]
 * @param  Array $acceptable      [description]
 * @return Bool                    [description]
 */
function check_request(
	Array $request,
	Array $required_inputs = [],
	Array $allowed_methods = ALLOWED_METHODS,
	Array $acceptable      = ACCEPTABLE
): Bool
{
	$method = Headers::getRequestMethod();
	if (! in_array($method, $allowed_methods)) {
		Headers::set('Allow', join(', ', $allowed_methods));
		throw new HTTPException(
			sprintf('Method "%s" not supported', $method),
			Headers::METHOD_NOT_ALLOWED
		);
	}
	switch ($method) {
		case 'HEAD':
			exit();
		case 'OPTIONS':
			Headers::set('Allow', join(', ', $allowed_methods));
			exit();
		case 'POST':
		case 'GET':
			if (Headers::has('Accept') && Headers::get('Accept') !== 'application/json') {
				throw new HTTPException('Unsupported "Accept": ' . Headers::get('Accept') , Headers::NOT_ACCEPTABLE);
			} elseif (! empty($required_inputs) and ! array_keys_exist($request, ...$required_inputs)) {
				throw new HTTPException('Required input missing', Headers::BAD_REQUEST);
			}
			return true;
	}
}
