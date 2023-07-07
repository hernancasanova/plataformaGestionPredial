package com.pgp.controllers;

import java.io.File;
import java.io.IOException;
import java.io.InputStream;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.Collection;
import java.util.Date;
import java.util.List;
import java.util.Optional;

import javax.servlet.http.HttpServletRequest;

//import org.apache.tomcat.util.http.fileupload.IOUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.core.io.ClassPathResource;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonMappingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.google.api.client.util.IOUtils;
import com.google.common.io.Files;
import com.pgp.dto.BovineDto;
import com.pgp.models.Bovine;
import com.pgp.models.Document;
import com.pgp.services.IBovineService;


@RestController
public class BovineController {
	@Autowired
	private IBovineService bovineService;
	
	
	public Optional<String> getExtensionByStringHandling(String filename) {
	    return Optional.ofNullable(filename)
	      .filter(f -> f.contains("."))
	      .map(f -> f.substring(filename.lastIndexOf(".") + 1));
	}
	
	
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
	
	/*@GetMapping(value = "/image", produces = MediaType.IMAGE_JPEG_VALUE)
	public @ResponseBody byte[] getImage() throws IOException {
	    InputStream in = getClass()
	      .getResourceAsStream("/com/baeldung/produceimage/image.jpg");
	    return IOUtils.toByteArray(in);
	}*/
	
	/*@GetMapping(value = "/image", produces = MediaType.IMAGE_JPEG_VALUE)
    public ResponseEntity<Resource> image() throws IOException {
        final ByteArrayResource inputStream = new ByteArrayResource(Files.readAllBytes(Paths.get(
                "/home/silentsudo/Videos/dum111111b.jpg"
        )));
        return ResponseEntity
                .status(HttpStatus.OK)
                .contentLength(inputStream.contentLength())
                .body(inputStream);

    }*/
	
	
	/*@GetMapping(value = "/imagens/{dir}/{img}", produces = MediaType.IMAGE_JPEG_VALUE)
	public @ResponseBody byte[] getImage(@PathVariable String dir, @PathVariable String img) throws IOException {


	     byte[] bytes = Files.readAllBytes(Paths.get("/var/www/back_imoveis/back_imoveis/imoveis/src/main/resources/public/fotos/" + dir + "/miniaturas/" + img));

	     return bytes;


	}*/
	
	
	@GetMapping("/images/bovines/{nombre}")
    public ResponseEntity<Resource> obtenerImagen(@PathVariable String nombre) {
        try {
            // Carga la imagen desde el directorio de recursos
            Resource resource = new ClassPathResource("images/"+nombre+".jpg");

            // Verifica si la imagen existe
            if (resource.exists()) {
                // Establece el tipo de contenido de la respuesta como imagen
                MediaType mediaType = MediaType.IMAGE_JPEG; // O MediaType.IMAGE_PNG para imágenes PNG

                // Retorna la imagen en la respuesta
                return ResponseEntity.ok()
                        .contentType(mediaType)
                        .body(resource);
            } else {
                // Retorna una respuesta de error si la imagen no existe
                return ResponseEntity.notFound().build();
            }
        } catch (Exception e) {
            // Manejo de excepciones
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }
	
	
	//@Autowired
    //private HttpServletRequest request;
	@PostMapping(value="/bovines/create", consumes = { MediaType.MULTIPART_FORM_DATA_VALUE })
	//@PostMapping(value="/bovines/create", consumes = { MediaType.MULTIPART_FORM_DATA_VALUE })
	/*public int register(@RequestParam("name") String name,@RequestParam("date birth") Date date_birth, @RequestParam("mother") int mother, @RequestParam("mother") int mother,
			@RequestParam("file") MultipartFile file) throws JsonMappingException, JsonProcessingException {*/
	//public int register(@RequestParam("name") String name, @RequestParam("file") MultipartFile file) throws JsonMappingException, JsonProcessingException {
	public int register(@RequestParam String jsonbovine, @RequestParam(required=false) MultipartFile file) {
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
			String extension;
			Bovine bovine = objectMapper.readValue(jsonbovine, Bovine.class);
			//if(file != null) {
				System.out.println("Pasé por donde no debía");
				String fileName = file.getOriginalFilename();
				//Optional<String> extension=getExtensionByStringHandling(fileName);
				/*if(extension == null) {
					extension=Optional.of("png");
				}*/
				extension= Files.getFileExtension(fileName);
				if(extension=="")extension="png";
				Path path = Paths.get("src/main/resources/images/"+bovine.getName()+"."+extension).toAbsolutePath();
				file.transferTo(path.toFile());
			//}
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
