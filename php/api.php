<?php

$conn = new mysqli("localhost", "root", "", "vuephpcrud");
if($conn->connect_error){
	die("Não foi possível conectar a base de dados");
}

$res = array('error' => false);

$action = 'read';

if(isset($_GET['action'])){
	$action =  $_GET['action'];
}

if($action == 'read'){
	$result = $conn->query("SELECT * FROM user");
	$usuarios = array();

	while($row = $result->fetch_assoc()){
		array_push($usuarios, $row);
	}

	$res['user'] = $usuarios;
}

if($action == 'create'){

	$nome = $_POST['nome'];
	$email = $_POST['email'];
	$telefone = $_POST['telefone'];
	$result = $conn->query("INSERT INTO user(nome, email, telefone) VALUES ('$nome', '$email', '$telefone')");

	if($result){
		$res['message'] = "Usuário adicionado com sucesso";
	}else{
		$res['error'] = true;
		$res['message'] = "Erro ao adicionar usuário";
	}

	//$res['user'] = $usuarios;
}

if($action == 'update'){

	$id = $_POST['id'];
	$nome = $_POST['nome'];
	$email = $_POST['email'];
	$telefone = $_POST['telefone'];
	$result = $conn->query("UPDATE user SET nome = '$nome', email = '$email', telefone = '$telefone' WHERE id = '$id'");

	if($result){
		$res['message'] = "Usuário atualizado com sucesso";
	}else{
		$res['error'] = true;
		$res['message'] = "Erro ao atualizar usuário";
	}

	//$res['user'] = $usuarios;
}

if($action == 'delete'){

	$id = $_POST['id'];

	$result = $conn->query("DELETE FROM user WHERE id = '$id'");

	if($result){
		$res['message'] = "Usuário deletado com sucesso";
	}else{
		$res['error'] = true;
		$res['message'] = "Erro ao deletar usuário";
	}

	//$res['user'] = $usuarios;
}

$conn->close();

header("Context-type: application/json");
echo json_encode($res);
die();
?>