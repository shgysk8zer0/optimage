<?php
namespace shgysk8zer0;

final class PDOStatement extends \PDOStatement
{
		public function __set(String $param, $value): Bool
		{
			return $this->bindValue(":{$param}", $value);
		}

		public function __invoke(Array $input_paramaters = []): Bool
		{
			return empty($input_paramaters) ? $this->execute() : $this->execute($input_paramaters);
		}
}
