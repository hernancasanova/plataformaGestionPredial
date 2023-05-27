package com.pgp.dao;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.pgp.models.Document;
import com.pgp.models.User;

public interface LoginDao extends JpaRepository<User,Long>{
	
	@Query(value="SELECT count(*) FROM (SELECT u.ID FROM HERNAN.USERS u WHERE u.NAME = ? AND U.PASSWORD = ? )", nativeQuery=true)
	int userExist (String username, String password);

}
