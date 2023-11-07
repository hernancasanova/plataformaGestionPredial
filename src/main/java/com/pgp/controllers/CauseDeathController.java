package com.pgp.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import com.pgp.models.CauseDeath;
import com.pgp.services.ICauseDeathService;

@RestController
public class CauseDeathController {
	
	@Autowired
	private ICauseDeathService cause_death;
	
	@GetMapping("/causes_death")
	//public List<Collection> bovines(){
	public List<CauseDeath> causesDeath(){
		return cause_death.findAll();
	}

}
