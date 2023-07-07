package com.pgp.dao;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;

import com.pgp.dto.BovineDto;
import com.pgp.models.Identifier;

public interface IdentifierDao extends JpaRepository<Identifier,Long>{
	
	@Modifying
	@Query(value="UPDATE HERNAN.IDENTIFIERS i SET i.STATE='inactivo' WHERE i.STATE='activo' AND i.BOVINE_ID = ? ", nativeQuery=true)
	void desactivateDiios(Long bovine_id);

}
