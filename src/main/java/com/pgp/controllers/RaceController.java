package com.pgp.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import com.pgp.models.Race;
import com.pgp.services.IRaceService;

@RestController
public class RaceController {
	
	@Autowired
	private IRaceService raceService;
	
	@GetMapping("/races")
	public List<Race> races(){
		return raceService.findAll();
	}
	
}
