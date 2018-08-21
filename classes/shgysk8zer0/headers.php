<?php
namespace shgysk8zer0;
use \shgysk8zer0\Abstracts\{HTTPStatusCodes};

final class Headers extends HTTPStatusCodes
{
	private static $_headers = [];

	public static function set(String $name, String $value): void
	{
		header(sprintf('%s: %s', $name, $value));
	}

	public static function setStatus(Int $status): Int
	{
		return http_response_code($status);
	}

	public function getRequestMethod(): String
	{
		return $_SERVER['REQUEST_METHOD'];
	}

	public static function has(String $name): Bool
	{
		return array_key_exists(strtolower($name), static::getAllHeaders());
	}

	public static function get(String $name): String
	{
		if (static::has($name)) {
			return static::getAllHeaders()[strtolower($name)];
		} else {
			return '';
		}
	}

	public static function getAllHeaders(): Array
	{
		if (empty(static::$_headers)) {
			$headers = getallheaders();
			$keys = array_map('strtolower', array_keys($headers));
			$values = array_values($headers);
			static::$_headers = array_combine($keys, $values);
		}
		return static::$_headers;
	}
}
