package com.pgp.services;

import java.util.List;

import com.pgp.models.Document;


public interface IDocumentService {
	public List<Document> findAll();
	public void register(Document document);
}
