package com.pgp.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import com.pgp.models.Bovine;
import com.pgp.services.IBovineService;

@RestController
public class BovineController {
	@Autowired
	private IBovineService bovineService;
	
	@GetMapping("/bovines")
	public List<Bovine> bovines(){
		return bovineService.getAll();
	}
}
