<?php 
 
class DALQueryResult {
     
  private $_results = array();
 
  public function __construct(){}
 
  public function __set($var,$val){
    $this->_results[$var] = $val;
  }
 
  public function __get($var){  
    if (isset($this->_results[$var])){
      return $this->_results[$var];
    }
    else{
      return null;
    }
  }
}
 
class DAL {
 
  public function __construct(){}
   
  public function get_employees($name = null){    
      if (!is_null($name)) {
          //$sql = sprintf("select id, codemp, name from employee where name like '%s%%' order by name",$name);
          $sql = "SELECT id, codemp, name from employee order by name";
      } else {
          $sql = "select id, codemp, name from employee order by name";
      } 
    
    return $this->query($sql);
  }
   
  private function dbconnect() {
    $con = @mysqli_connect('localhost', 'root', 'root', 'timesheet');

    if (!$con) {
        echo "Error: " . mysqli_connect_error();
            exit();
    }
     
    return $con;
  }
   
  private function query($sql){
 
      
    $conn = $this->dbconnect();
    
    
    $res = mysqli_query($conn, $sql);
 
 
    $results = array();
 
    while ($row = mysqli_fetch_array($res)){

      $result = new DALQueryResult();
 
      foreach ($row as $k=>$v){
        $result->$k = $v;
      }
 
      $results[] = $result;
    }
    return $results;        
  }  
}
 
?>