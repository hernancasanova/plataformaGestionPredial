package com.pgp.dao;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.pgp.dto.DocumentDto;
import com.pgp.models.Document;

public interface DocumentDao extends JpaRepository<Document,Long>{
	@Query(value="SELECT d.name, d.description, td.name AS type FROM HERNAN.DOCUMENTS d JOIN HERNAN.TYPES_DOCUMENTS td ON td.ID=d.TYPE", nativeQuery=true)
	List<DocumentDto> getAll();
}
