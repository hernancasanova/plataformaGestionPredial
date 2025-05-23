package com.pgp.controllers;

import java.io.File;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.ClassPathResource;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.google.common.io.Files;
import com.pgp.dto.BovineDto;
import com.pgp.dto.BovineIdentifierDto;
import com.pgp.dto.ChildrenDto;
import com.pgp.models.Bovine;
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
	
	
	@GetMapping("/bovines/{id}/children")
	//public List<Collection> bovines(){
	public List<ChildrenDto> childrenBovine(@PathVariable Long id){
		return bovineService.getChildren(id);
		//return bovineService.getAll();
	}
	
	@GetMapping("/bovines")
	//public List<Collection> bovines(){
	public List<BovineDto> bovines(){
		return bovineService.getAll();
	}
	
	@GetMapping("/bovines/{id}")
	//public List<Collection> bovines(){
	public BovineIdentifierDto bovine(@PathVariable Long id){
		return bovineService.get(id);
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
	
	
//	@GetMapping("/identifiers/bovines/{id}")
//	public interface IdentifierClienteRest {
//		
//	}
	
	
	@GetMapping("/images/bovines/{type}/{id}")
	//@Cacheable("images")
    public ResponseEntity<Resource> obtenerImagen(@PathVariable String id, @PathVariable String type) {
        try {
            // Carga la imagen desde el directorio de recursos
            Resource resource = new ClassPathResource("images/"+id+"/"+type+"/"+id+".jpg");
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
	
	@PutMapping("/bovines/{id}/delete")
    public int deleteBovine(@PathVariable Long id) {
        try {
            bovineService.deleteBovine(id);
            return 200;//cambiar
        } catch (Exception e) {
            // Manejo de excepciones
            //return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        	return 500;
        }
    }
	
	
	@PostMapping(value="/bovines/create", consumes = { MediaType.MULTIPART_FORM_DATA_VALUE })
	//@PostMapping(value="/bovines/create", consumes = { MediaType.MULTIPART_FORM_DATA_VALUE })
	/*public int register(@RequestParam("name") String name,@RequestParam("date birth") Date date_birth, @RequestParam("mother") int mother, @RequestParam("mother") int mother,
			@RequestParam("file") MultipartFile file) throws JsonMappingException, JsonProcessingException {*/
	//public int register(@RequestParam("name") String name, @RequestParam("file") MultipartFile file) throws JsonMappingException, JsonProcessingException {
	public int register(@RequestParam String jsonbovine, @RequestParam(required=false) MultipartFile youngFile, @RequestParam(required=false) MultipartFile oldFile) {
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
			statusCode=200;
			Long id=bovineService.register(bovine);
			if(youngFile != null) {
				String fileNameYoung = youngFile.getOriginalFilename();
				//Optional<String> extension=getExtensionByStringHandling(fileName);
				/*if(extension == null) {
					extension=Optional.of("png");
				}*/
				extension= Files.getFileExtension(fileNameYoung);
				if(extension=="")extension="png";
				
				File directorioEntidadYoung = new File("src/main/resources/images/"+id+"/young/");

                if(!directorioEntidadYoung.exists()){
                    directorioEntidadYoung.mkdirs();
                }
                //Path path = Paths.get(directorioEntidad+"/"+ myb.getNombreDocumento()).toAbsolutePath();
				//file.transferTo(path.toFile());
				Path pathYoung = Paths.get("src/main/resources/images/"+id+"/young/"+id+"."+extension).toAbsolutePath();
				youngFile.transferTo(pathYoung.toFile());
			}
			if(oldFile != null) {
				String fileName = oldFile.getOriginalFilename();
				//Optional<String> extension=getExtensionByStringHandling(fileName);
				/*if(extension == null) {
					extension=Optional.of("png");
				}*/
				extension= Files.getFileExtension(fileName);
				if(extension=="")extension="png";
				
				File directorioEntidad = new File("src/main/resources/images/"+id+"/old/");
				
                if(!directorioEntidad.exists()){
                    directorioEntidad.mkdirs();
                }
                
                //Path path = Paths.get(directorioEntidad+"/"+ myb.getNombreDocumento()).toAbsolutePath();
				//file.transferTo(path.toFile());
				Path path = Paths.get("src/main/resources/images/"+id+"/old/"+id+"."+extension).toAbsolutePath();
				oldFile.transferTo(path.toFile());
			}
			return statusCode;
		}catch(Exception e){
			System.out.println("No se pudo guardar: "+e);
			statusCode=500;
			return statusCode;
		}
	}
}
