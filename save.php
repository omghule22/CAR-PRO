<?php
$Server  ="localhost";
$username ="root";
$password ="";
$dbname ="records";

$con =mysqli_connect($server,$username,$password,$dbname);
if($con)
{
    echo "not connected";
}
 


$name = $_POST['name'];
$email = $_POST['email'];
$password = $_POST['password'];

$sql ="INSERT INTO `records`(`name`, `Email`, `password`) VALUES ('$name','$email','$password')";

$result = mysqli_query($con ,$sql);
if($result)
{
    echo "data submited";
}
else
{
    echo "query faild";
}