package com.pgp.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.pgp.Documento;
import com.pgp.PgpApplication;
//import com.pgp.controllers.DocumentController.Documento;
import com.pgp.dao.DocumentDao;
import com.pgp.models.Document;
import com.google.api.client.auth.oauth2.Credential;
import com.google.api.client.extensions.java6.auth.oauth2.AuthorizationCodeInstalledApp;
import com.google.api.client.extensions.jetty.auth.oauth2.LocalServerReceiver;
import com.google.api.client.googleapis.auth.oauth2.GoogleAuthorizationCodeFlow;
import com.google.api.client.googleapis.auth.oauth2.GoogleClientSecrets;
import com.google.api.client.googleapis.javanet.GoogleNetHttpTransport;
import com.google.api.client.googleapis.json.GoogleJsonResponseException;
import com.google.api.client.http.FileContent;
import com.google.api.client.http.HttpRequestInitializer;
import com.google.api.client.http.javanet.NetHttpTransport;
import com.google.api.client.json.JsonFactory;
import com.google.api.client.json.gson.GsonFactory;
import com.google.api.client.util.store.FileDataStoreFactory;
import com.google.api.services.drive.Drive;
import com.google.api.services.drive.DriveScopes;
import com.google.api.services.drive.model.File;
import com.google.auth.http.HttpCredentialsAdapter;
import com.google.auth.oauth2.GoogleCredentials;

import java.io.FileNotFoundException;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.nio.file.Path;
import java.security.GeneralSecurityException;
import java.util.Arrays;
import java.util.Collections;

@Service
public class DocumentServiceImpl implements IDocumentService{
	/**
	   * Application name.
	   */
	  private static final String APPLICATION_NAME = "Google Drive API Java Quickstart";
	  /**
	   * Global instance of the JSON factory.
	   */
	  private static final JsonFactory JSON_FACTORY = GsonFactory.getDefaultInstance();
	  /**
	   * Directory to store authorization tokens for this application.
	   */
	  private static final String TOKENS_DIRECTORY_PATH = "tokens";
	
	  /**
	   * Global instance of the scopes required by this quickstart.
	   * If modifying these scopes, delete your previously saved tokens/ folder.
	   */
	  private static final List<String> SCOPES =
	      Collections.singletonList(DriveScopes.DRIVE);
	  private static final String CREDENTIALS_FILE_PATH = "/credentials.json";
	
	  /**
	   * Creates an authorized Credential object.
	   *
	   * @param HTTP_TRANSPORT The network HTTP Transport.
	   * @return An authorized Credential object.
	   * @throws IOException If the credentials.json file cannot be found.
	   */
	
	private static Credential getCredentials(final NetHttpTransport HTTP_TRANSPORT)
		      throws IOException {
	    // Load client secrets.
		InputStream in = PgpApplication.class.getResourceAsStream(CREDENTIALS_FILE_PATH);
		if (in == null) {
		  throw new FileNotFoundException("Resource not found: " + CREDENTIALS_FILE_PATH);
		}
		GoogleClientSecrets clientSecrets =
		    GoogleClientSecrets.load(JSON_FACTORY, new InputStreamReader(in));
		
		// Build flow and trigger user authorization request.
		GoogleAuthorizationCodeFlow flow = new GoogleAuthorizationCodeFlow.Builder(
		    HTTP_TRANSPORT, JSON_FACTORY, clientSecrets, SCOPES)
		    .setDataStoreFactory(new FileDataStoreFactory(new java.io.File(TOKENS_DIRECTORY_PATH)))
		    .setAccessType("offline")
		    .build();
		LocalServerReceiver receiver = new LocalServerReceiver.Builder().setPort(8888).build();
		Credential credential = new AuthorizationCodeInstalledApp(flow, receiver).authorize("user");
		//returns an authorized Credential object.
		    return credential;
	}
	public String uploadBasic(Path path, String filename) throws IOException, GeneralSecurityException {
	    // Load pre-authorized user credentials from the environment.
	    // TODO(developer) - See https://developers.google.com/identity for
	    // guides on implementing OAuth2 for your application.
	    /*GoogleCredentials credentials = GoogleCredentials.getApplicationDefault()
	        .createScoped(Arrays.asList(DriveScopes.DRIVE_FILE));
	    HttpRequestInitializer requestInitializer = new HttpCredentialsAdapter(credentials);*/

	    // Build a new authorized API client service.
	    final NetHttpTransport HTTP_TRANSPORT = GoogleNetHttpTransport.newTrustedTransport();
	    Drive service = new Drive.Builder(HTTP_TRANSPORT,
	        GsonFactory.getDefaultInstance(),
	        getCredentials(HTTP_TRANSPORT))
	        .setApplicationName("Plataforma de gestion predial")
	        .build();
	    // Upload file photo.jpg on drive.
	    File fileMetadata = new File();
	    fileMetadata.setName(filename);
	    fileMetadata.setParents(Collections.singletonList("1qnNMjZJbVnZYb3HcZGhxLupjSPPhCWTk"));
	    // File's content.
	    //java.io.File filePath = new java.io.File("C:\\Users\\Usuario\\Desktop\\Hernan\\pgp.jpg");
	    java.io.File filePath = new java.io.File("C:\\Users\\Usuario\\Desktop\\Hernan\\proyectos\\workspace\\pgp\\uploadedDocuments\\"+filename);
	    // Specify media type and file-path for file.
	    FileContent mediaContent = new FileContent("image/jpeg", filePath);
	    try {
	      File file = service.files().create(fileMetadata, mediaContent)
	          .setFields("id")
	          .execute();
	      System.out.println("File ID: " + file.getId());
	      return file.getId();
	    } catch (GoogleJsonResponseException e) {
	      // TODO(developer) - handle error appropriately
	      System.err.println("Unable to upload file: " + e.getDetails());
	      throw e;
	    }
	}
	
	@Autowired
	private DocumentDao documentDao;
	
	@Transactional(readOnly=true)
	public List<Document> findAll() {
		return (List<Document>)documentDao.findAll();
	}

	@Override
	public void register(Document document, Path path, String filename) {
		// TODO Auto-generated method stub
		try {
			//String name=document.name;
			uploadBasic(path,filename);
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} catch (GeneralSecurityException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		documentDao.save(document);
		
	}
}
