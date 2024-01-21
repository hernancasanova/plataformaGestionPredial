package com.pgp.controllers;

import java.io.File;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonMappingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.pgp.dao.DocumentDao;
//import com.google.api.services.drive.model.File;
import com.pgp.dto.DocumentDto;
import com.pgp.models.Document;
import com.pgp.services.IDocumentService;

@RestController
@Transactional
public class DocumentController {

	@Autowired
	private IDocumentService documentService;

	@GetMapping("/listar")
	public List<DocumentDto> listar() {
		return documentService.getAll();
	}

	/*
	 * public class Documento{ public String name; public String description; public
	 * String type; public MultipartFile file; }
	 */

	@Autowired
	private HttpServletRequest request;

	@PostMapping(value = "/register", consumes = { MediaType.MULTIPART_FORM_DATA_VALUE })
	public int register(@RequestParam("name") String name, @RequestParam("description") String description,
			@RequestParam("type") String type, @RequestParam("file") MultipartFile file)
			throws JsonMappingException, JsonProcessingException {
		int type_document = Integer.parseInt(type);
		int statusCode;
		try {
			String fileName = file.getOriginalFilename();
			Path path = Paths.get("uploadedDocuments/" + fileName).toAbsolutePath();
			file.transferTo(path.toFile());
			statusCode = 200;
			Document document = new Document();
			document.name = name;
			document.description = description;
			document.type = type_document;
			documentService.register(document, path, fileName);
			return statusCode;
		} catch (Exception e) {
			System.out.println("No se pudo guardar: " + e);
			statusCode = 500;
			return statusCode;
		}
	}

	@Autowired
	private DocumentDao documentDao;
	
	@PostMapping(value = "/register_in_tenant")
	public ResponseEntity<?> registerInTenant() {
		// int type_document = Integer.parseInt(type);
		//int statusCode;
//			String fileName = file.getOriginalFilename();
//			Path path = Paths.get("uploadedDocuments/"+fileName).toAbsolutePath();
//			file.transferTo(path.toFile());
//			statusCode=200;
		Document document = new Document();
		document.name = "doc";
		document.description = "description";
		document.type = 2;
		documentDao.save(document);
		return ResponseEntity.ok(document);
	}

	// @PostMapping("/")
	// public String handleFileUpload(@RequestParam("file") MultipartFile file,
	// RedirectAttributes redirectAttributes) {

	/*
	 * storageService.store(file); redirectAttributes.addFlashAttribute("message",
	 * "You successfully uploaded " + file.getOriginalFilename() + "!");
	 * 
	 * return "redirect:/";
	 */
	// }
}
