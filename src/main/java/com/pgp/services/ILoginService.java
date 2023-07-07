package com.pgp.services;

public interface ILoginService {
	public boolean login(String username, String password);
	public boolean register(String username, String password);
}
