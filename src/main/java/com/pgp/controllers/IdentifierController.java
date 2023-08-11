package com.pgp.controllers;

import java.time.LocalDateTime;
import java.time.ZoneId;
import java.util.Date;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.pgp.models.Bovine;
import com.pgp.models.Identifier;
import com.pgp.services.IIdentifierService;
import com.pgp.services.ILoginService;

@RestController
public class IdentifierController {
	
	
	@Autowired
	private IIdentifierService identifierService ;
	
	@PostMapping("/identifiers/create")
	public int register(@RequestParam String diio, @RequestParam String date_placement,@RequestParam Long bovine ) {
	//public int register(@RequestParam String jsonidentifier) {
		int statusCode;
		//System.out.println("jsonidentifier.jsonidentifier: "+jsonidentifier.getClass().getSimpleName());
		//System.out.println("jsonidentifier.jsonidentifier: "+bovine);
		//return 500;
		try {
			//ObjectMapper objectMapper = new ObjectMapper();
			//Identifier identifier = objectMapper.readValue(jsonidentifier, Identifier.class);
			String dateString = "2020-03-04T00:00:00";
			System.out.println("date_placement: "+date_placement);
	        LocalDateTime localDateTime = LocalDateTime.parse(dateString);
	        //Date date = Date.from(localDateTime.atZone(ZoneId.systemDefault()).toInstant());
	        //System.out.println(date);
			identifierService.register(diio,date_placement,bovine);
			statusCode=200;
			return statusCode;
		}catch(Exception e) {
			System.out.println("Error al guardar diio: "+e);
			statusCode=500;
			return statusCode;
		}
	}
	
	//obtiene los diios segun el bovino consultado
	@GetMapping(value="/identifiers/bovine/{bovine}")
	public List<Identifier> diioBovine(@PathVariable Long bovine){
		return identifierService.diiosBovine(bovine);
	}

}
