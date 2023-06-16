package com.pgp.controllers;

import java.util.Collection;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import com.pgp.dto.BovineDto;
import com.pgp.models.Bovine;
import com.pgp.services.IBovineService;

@RestController
public class BovineController {
	@Autowired
	private IBovineService bovineService;
	
	@GetMapping("/bovines")
	//public List<Collection> bovines(){
	public List<BovineDto> bovines(){
		return bovineService.getAll();
	}
	
	@GetMapping("/bovines/{id}")
	//public List<Collection> bovines(){
	public BovineDto bovine(@PathVariable int id){
		return bovineService.get(id);
	}
	
}
