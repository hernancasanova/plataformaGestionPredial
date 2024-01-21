package com.pgp.services;

import java.nio.file.Path;
import java.util.List;

import com.pgp.dto.DocumentDto;
//import com.pgp.controllers.DocumentController.Documento;
import com.pgp.models.Document;


public interface IDocumentService {
	public List<Document> findAll();
	public List<DocumentDto> getAll();
	public void register(Document document, Path path, String filename);
}
