<?php

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 * Description of Employee
 *
 * @author Smart Plumbing
 */
class Employee {
    public $id;
    public $name;
    public $codemp;
    public $dob;
    public $phone;
    public $image;
    public $show;
    public function __construct($id, $codemp, $name, $dob, $phone, $image) {
        $this->id = $id;
        $this->name = $name;
        $this->codemp = $codemp;
        $this->dob = $dob;
        $this->phone = $phone;
        $this->image = $image;
        $this->show = false;
    }
}
