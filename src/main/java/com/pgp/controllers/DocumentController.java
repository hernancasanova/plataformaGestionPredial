package com.pgp.controllers;

import java.io.File;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Controller;
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
//import com.google.api.services.drive.model.File;
import com.pgp.Documento;
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
	
	/*public class Documento{
		public String name;
		public String description;
		public String type;
	    public MultipartFile file;
	}*/
	
	@Autowired
    private HttpServletRequest request;
	
	//@PostMapping(value="/register",headers = ("content-type=multipart/*"), produces = "application/json", consumes = { MediaType.MULTIPART_FORM_DATA_VALUE })
	@PostMapping(value="/register", consumes = { MediaType.MULTIPART_FORM_DATA_VALUE })
	//@PostMapping(value="/register")
	//@PostMapping(value="/register", consumes = { MediaType.MULTIPART_FORM_DATA_VALUE })
	//public String register() {
	//public int register(@RequestBody Document document, @RequestParam("file") MultipartFile file,
	//public int register(Documento document) {
	//RedirectAttributes redirectAttributes ) {
	//public int register(@ModelAttribute Document document) {
	//public int register(@RequestBody Documento document) {
	public int register(@RequestParam("name") String name,@RequestParam("description") String description, @RequestParam("type") String type
			, @RequestParam("file") MultipartFile file) throws JsonMappingException, JsonProcessingException {
		int type_document = Integer.parseInt(type);
	//public int register(@RequestParam Documento document) {
		//ObjectMapper objectMapper = new ObjectMapper();
	    //Documento document[] = objectMapper.readValue(jsonString, Documento[].class);
		int statusCode;
		try {
			String fileName = file.getOriginalFilename();
			Path path = Paths.get("uploadedDocuments/"+fileName).toAbsolutePath();
			file.transferTo(path.toFile());
			statusCode=200;
			//String jsonstrin2g=jsonString;
			//String orgName = file.getOriginalFilename();
			//File temp = new File("uploadedDocuments/"+orgName);
			//File temp = new File("uploadedDocuments");//funciona
			//String directory = temp.getAbsolutePath();
			//System.out.println(temp.getAbsolutePath());
			//File temp = File.createTempFile("temp", ".tmp");
			/*String fileName = file.getOriginalFilename();
			String fileLocation = new File("static\\images").getAbsolutePath() + "\\" + fileName;
			FileOutputStream fos = new FileOutputStream(fileLocation);
			fos.write(imageByteArray);
			fos.close();*/
			//String filePath = request.getServletContext().getA
            //String filePath2 = filePath + orgName;
			//file.transferTo(new File(filePath2));
			//file.transferTo(new File("uploadedDocuments/"+orgName));
			//file.transferTo(new File("uploadedDocuments/"+orgName));//probando esto
			//file.transferTo(new File("uploadedDocuments"));
			//String pathFile=file.getOriginalFilename();
			Document document = new Document();
			document.name=name;
			document.description=description;
			document.type=type_document;
			documentService.register(document,path,fileName);
			return statusCode;
		}catch(Exception e){
			System.out.println("No se pudo guardar: "+e);
			statusCode=500;
			return statusCode;
		}
	}
	
	//@PostMapping("/")
	//public String handleFileUpload(@RequestParam("file") MultipartFile file,
			//RedirectAttributes redirectAttributes) {

		/*storageService.store(file);
		redirectAttributes.addFlashAttribute("message",
				"You successfully uploaded " + file.getOriginalFilename() + "!");

		return "redirect:/";*/
	//}
}
