<?php
namespace shgysk8zer0;
use  const \Consts\{USERNAME, PASSWD, DBNAME, DBTYPE};

class PDO extends \PDO
{
	const CONFIG = [
		self::ATTR_ERRMODE            => self::ERRMODE_EXCEPTION,
		self::ATTR_ORACLE_NULLS       => self::NULL_EMPTY_STRING,
		self::ATTR_DEFAULT_FETCH_MODE => self::FETCH_OBJ,
		self::ATTR_STATEMENT_CLASS    => [
			'\\shgysk8zer0\\PDOStatement',
		],
	];

	private $_instance = null;

	public static function init(): PDO
	{
		if (is_null(static::$_instance)) {
			static::$_instance = new self();
		}
		return static::$_instance;
	}

	public function __construct(
		String $user   = USERNAME,
		String $pass   = PASSWD,
		String $dbname = DBNAME,
		String $type   = DBTYPE
	)
	{
		$dsn = $this->_dsn($type, $dbname);
		parent::__construct($dsn, $user, $pass, self::CONFIG);
	}

	public function __invoke(String $statement): Int
	{
		return $this->exec($statement);
	}

	private function _dsn(String $type = DBTYPE, String $name = DBNAME): String
	{
		return \sprintf('%s:dbname=%s', $type, $name);
	}
}
