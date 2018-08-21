<?php
namespace shgysk8zer0;

use \shgysk8zer0\Abstracts\{HTTPStatusCodes};

class HTTPException extends \Exception implements \JSONSerializable
{
	public function __construct(
		String $message      = '',
		Int    $code         = HTTPStatusCodes::INTERNAL_SERVER_ERROR
	)
	{
		parent::__construct($message, $code);
	}

	public function jsonSerialize(): Array
	{
		return [
			'message' => $this->getMessage(),
			'code'    => $this->getCode(),
		];
	}
}
