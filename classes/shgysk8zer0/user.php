<?php
namespace shgysk8zer0;

use \shgysk8zer0\{PDO};

final class User implements \JSONSerializable
{
	private $_pdo         = null;
	private $_email       = '';
	private $_group       = null;
	private $_permissions = [];
	private $_logged_in   = false;

	public function __construct(PDO $pdo, String $email = null, String $password = null)
	{
		$this->_data = new \StdClass();
		$this->_pdo = $pdo;
		if (is_string($email) and \is_string($password)) {
			$this->login($email, $password);
		}
	}

	public function jsonSerialize(): Array
	{
		return [
			'email' => $this->getEmail(),
			'group' => [
				$this->getGroup() => [
					'permissions' => $this->getPermissions()
				]
			]
		];
	}

	public function isLoggedIn(): Bool
	{
		return $this->_logged_in;
	}

	public function getEmail(): String
	{
		return $this->_email;
	}

	public function getGroup(): String
	{
		return $this->_group;
	}

	public function getPermissions(): Array
	{
		return $this->_permissions;
	}

	public function hasPermission(String $permission): Bool
	{
		return \in_array($permission, $this->_permissions);
	}

	public function login(String $email, String $password): Bool
	{
		$stm = $this->_prepare(
				'SELECT  `password` AS `hash`,
					`groups`.`name` AS `group`,
					`groups`.`upload`,
					`groups`.`create`,
					`groups`.`delete`,
					`groups`.`modify`,
					`groups`.`admin`
				FROM `users`
				JOIN `groups` ON `role` = `groups`.`id`
				WHERE `email` = :email
				LIMIT 1;'
		);
		$stm->email = $email;
		$stm();
		$user = $stm->fetchObject();

		$this->_logged_in = password_verify($password, $user->hash);
		if ($this->_logged_in) {
			$this->_email = $email;
			$permissions = [];
			$this->_group = $user->group;
			if ($user->upload === '1') {
				$permissions[] = 'upload';
			}
			if ($user->create === '1') {
				$permissions[] = 'create';
			}
			if ($user->delete === '1') {
				$permissions[] = 'delete';
			}
			if ($user->modify === '1') {
				$permissions[] = 'modify';
			}
			if ($user->owner === '1') {
				$permissions[] = 'owner';
			}
			if ($user->admin === '1') {
				$permissions[] = 'admin';
			}
			$this->_permissions = $permissions;
			return true;
		} else {
			$this->_permissions = [];
			$this->_group = '';
			$this->_email = '';
			return false;
		}
	}

	public function register(String $email, String $password): Int
	{
		$stm = $this->_prepare('INSERT INTO `users` (
				`email`,
				`password`
			) VALUES (
				:email,
				:password
			);'
		);
		$stm->email = $email;
		$stm->password = password_hash($password, PASSWORD_DEFAULT);
		$stm();
		$this->login($email, $password);
		return $this->_pdo->lastInsertId();
	}

	protected function _prepare(String $sql): \PDOStatement
	{
		return $this->_pdo->prepare($sql);
	}
}
