<?php 

// include configuration
require_once(dirname(__FILE__) . '/conf/config.php');


$con = @mysqli_connect('localhost', 'root', 'root', 'timesheet');

if (!$con) {
    echo "Error: " . mysqli_connect_error();
	exit();
}

$name = filter_input(INPUT_GET, 'name', FILTER_SANITIZE_SPECIAL_CHARS);
$id = filter_input(INPUT_GET, 'id', FILTER_SANITIZE_SPECIAL_CHARS);

if (!is_null($name)) {
    $sql = sprintf("select id, codemp, name, dob, phone, image from employee where name like '%s%%' order by name",$name);
     
 } else {
     if (!is_null($id)) {
         $sql = "select id, codemp, name, dob, phone, image from employee where id = " . $id;
     }else{
         $sql = "select id, codemp, name, dob, phone, image from employee order by name";
     }
     
 } 

// Some Query

$query 	= mysqli_query($con, $sql);

$resul = array();

while ($row = mysqli_fetch_array($query))
{
    if (is_null($row['image'])) {
        $image = 'http://via.placeholder.com/200?text=No%20Image';
    }else{
        $image = 'data:image/jpeg;base64,' . base64_encode( $row['image'] );
    }
    
    
    
    
    $myOjb = new Employee($row['id'], $row['codemp'], $row['name'], $row['dob'], $row['phone'], $image);
    array_push($resul, $myOjb);	    
}


echo json_encode($resul);


// Close connection
mysqli_close ($con);


/*
// array of makes to check
$makes = array('Ford','Chevy','Honda');
 
// cycle through the makes
foreach ($makes as $make){
  $results = $dal->get_models_by_make_name($make);
  echo "<h1>Models by $make</h1>";
   
  // check if there were any results
  if ($results){
    echo "<ul>";
     
    // cycle through results
    foreach ($results as $model){
        echo "<li>$model->make $model->name (Database ID: $model->id)</li>";
    }
    echo "</ul>";
  }
  else{
    // Display a message concerning lack of data
    echo "<p>Sorry, we have no information regarding that manufacturer.</p>";
  }
}
?>
*/