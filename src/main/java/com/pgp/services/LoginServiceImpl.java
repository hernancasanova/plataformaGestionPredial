package com.pgp.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.pgp.dao.LoginDao;


@Service
public class LoginServiceImpl implements ILoginService {

	@Autowired
	private LoginDao loginDao;
	
	@Override
	public boolean login(String username, String password) {
//		loginDao.
//		@Query(
//		  value = "SELECT * FROM USERS u WHERE u.status = 1", 
//		  nativeQuery = true)
//		Collection<User> findAllActiveUsersNative();
		int n=loginDao.userExist(username, password);
		return n>0?true:false;
	}

}
