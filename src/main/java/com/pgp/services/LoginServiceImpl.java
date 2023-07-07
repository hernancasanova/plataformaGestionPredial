package com.pgp.services;

import java.io.IOException;
import java.security.GeneralSecurityException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.pgp.dao.LoginDao;
import com.pgp.models.User;


@Service
public class LoginServiceImpl implements ILoginService {

	@Autowired
	private LoginDao loginDao;
	
	@Override
	public boolean login(String username, String password) {
//		@Query(
//		  value = "SELECT * FROM USERS u WHERE u.status = 1", 
//		  nativeQuery = true)
//		Collection<User> findAllActiveUsersNative();
		int n=loginDao.userExist(username, password);
		return n>0?true:false;
	}

	@Override
	public boolean register(String username, String password) {
		boolean register=true;
		User newUser = new User(); 
		newUser.setEmail(username);
		newUser.setPassword(password);
		loginDao.save(newUser);
		return true;
	}

}
