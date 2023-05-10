package com.pgp.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.pgp.models.Document;
import com.pgp.services.IDocumentService;

@RestController
public class DocumentController {
	
	@Autowired
	private IDocumentService documentService;
	
	@GetMapping("/listar")
	public List<Document> listar(){
		return documentService.findAll();
	}
	
	@PostMapping("/register")
	//public String register() {
	public int register(@RequestBody Document document) {
		int statusCode;
		try {
			statusCode=200;
			documentService.register(document);
			return statusCode;
		}catch(Exception e){
			System.out.println("No se pudo guardar: "+e);
			statusCode=500;
			return statusCode;
		}
	}
}
