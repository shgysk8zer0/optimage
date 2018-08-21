<?php
namespace API\V1\Upload;
use \shgysk8zer0\{User, PDO, Headers, HTTPException};
const ALLOWED_METHODS = [
	'POST',
	'HEAD',
	'OPTIONS',
];

require_once dirname(__DIR__, 3) . DIRECTORY_SEPARATOR . 'init.php';

try {
	Headers::set('Content-Type', 'application/json');
	$method = Headers::getRequestMethod();
	switch ($method) {
		case 'HEAD':
			exit();
		case 'OPTIONS':
			Headers::set('Allow', join(', ', ALLOWED_METHODS));
			exit();
		case 'POST':
			if (Headers::has('Accept') && Headers::get('Accept') !== 'application/json') {
				throw new HTTPException('Unsupported "Accept": ' . Headers::get('Accept') , Headers::NOT_ACCEPTABLE);
			} elseif (empty($_FILES)) {
				throw new HTTPException('Bad request', Headers::BAD_REQUEST);
			} else {
				echo json_encode([
					'$_POST'  => $_POST,
					'$_FILES' => $_FILES,
					'raw' => print_r($_FILES, true),
				]);
			}
			break;
		default:
			Headers::set('Allow', join(', ', ALLOWED_METHODS));
			throw new HTTPException(
				sprintf('Method "%s" not supported', $method),
				Headers::METHOD_NOT_ALLOWED
			);
	}
} catch (HTTPException $err) {
	Headers::setStatus($err->getCode());
	Headers::set('Content-Type', 'application/json');
	exit(json_encode($err));
} catch (\Throwable $e) {
	Headers::setStatus(Headers::INTERNAL_SERVER_ERROR);
	Headers::set('X-Error', $e->getMessage());
}
