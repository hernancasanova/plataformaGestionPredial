package com.pgp.dao;

import org.springframework.data.jpa.repository.JpaRepository;

import com.pgp.models.Document;

public interface DocumentDao extends JpaRepository<Document,Long>{

}
