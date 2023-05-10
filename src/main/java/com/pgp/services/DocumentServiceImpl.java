package com.pgp.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.pgp.dao.DocumentDao;
import com.pgp.models.Document;

@Service
public class DocumentServiceImpl implements IDocumentService{
	@Autowired
	private DocumentDao documentDao;
	
	@Transactional(readOnly=true)
	public List<Document> findAll() {
		return (List<Document>)documentDao.findAll();
	}

	@Override
	public void register(Document document) {
		// TODO Auto-generated method stub
		documentDao.save(document);
		
	}
}
