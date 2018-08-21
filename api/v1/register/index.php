<?php
namespace API\V1\Register;
use \shgysk8zer0\{User, PDO, Headers, HTTPException};
use function \Functions\{check_request};

require_once dirname(__DIR__, 3) . DIRECTORY_SEPARATOR . 'init.php';

try {
	Headers::set('Content-Type', 'application/json');
	check_request($_POST, ['email', 'password']);
		$pdo = new PDO();
		$user = new User($pdo);
		try {
			$user->register($_POST['email'], $_POST['password']);
			exit(json_encode($user));
		} catch (\Throwable $e) {
			throw new HTTPException('Unable to register with that email', Headers::CONFLICT);
		}
} catch (HTTPException $err) {
	Headers::setStatus($err->getCode());
	Headers::set('Content-Type', 'application/json');
	exit(json_encode($err));
} catch (\Throwable $e) {
	Headers::setStatus(Headers::INTERNAL_SERVER_ERROR);
}
