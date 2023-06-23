package com.pgp.controllers;

import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.Collection;
import java.util.Date;
import java.util.List;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonMappingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.pgp.dto.BovineDto;
import com.pgp.models.Bovine;
import com.pgp.models.Document;
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
	public Bovine bovine(@PathVariable Long id){
		return bovineService.findById(id);
	}
	
	//@Autowired
    //private HttpServletRequest request;
	@PostMapping(value="/bovines/create", consumes = { MediaType.MULTIPART_FORM_DATA_VALUE })
	//@PostMapping(value="/bovines/create", consumes = { MediaType.MULTIPART_FORM_DATA_VALUE })
	/*public int register(@RequestParam("name") String name,@RequestParam("date birth") Date date_birth, @RequestParam("mother") int mother, @RequestParam("mother") int mother,
			@RequestParam("file") MultipartFile file) throws JsonMappingException, JsonProcessingException {*/
	//public int register(@RequestParam("name") String name, @RequestParam("file") MultipartFile file) throws JsonMappingException, JsonProcessingException {
	public int register(@RequestParam String jsonbovine, @RequestParam("file") MultipartFile file) {
		/*int type_document = Integer.parseInt(type);
		int statusCode;
		try {
			String fileName = file.getOriginalFilename();
			Path path = Paths.get("uploadedDocuments/"+fileName).toAbsolutePath();
			file.transferTo(path.toFile());
			statusCode=200;
			Document document = new Document();
			document.name=name;
			document.description=description;
			document.type=type_document;
			//documentService.register(document,path,fileName);
			return statusCode;
		}catch(Exception e){
			System.out.println("No se pudo guardar: "+e);
			statusCode=500;
			return statusCode;
		}*/
		ObjectMapper objectMapper = new ObjectMapper();
		//Bovine bovine = objectMapper.convertValue(jsonbovine, Bovine.class);
		int statusCode;
		try {
			Bovine bovine = objectMapper.readValue(jsonbovine, Bovine.class);
			String fileName = file.getOriginalFilename();
			Path path = Paths.get("uploadedDocuments/images/"+fileName).toAbsolutePath();
			file.transferTo(path.toFile());
			statusCode=200;
			bovineService.register(bovine);
			return statusCode;
		}catch(Exception e){
			System.out.println("No se pudo guardar: "+e);
			statusCode=500;
			return statusCode;
		}
	}
}
