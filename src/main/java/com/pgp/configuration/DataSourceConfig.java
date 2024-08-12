package com.pgp.configuration;

import org.springframework.jdbc.datasource.DriverManagerDataSource;

import java.util.HashMap;
import java.util.Map;

import javax.sql.DataSource;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class DataSourceConfig{

    @Bean
    public DataSource dataSource() {
    	MultitenantDataSource dataSource = new MultitenantDataSource();
        dataSource.setTargetDataSources(getDataSources());
        dataSource.setDefaultTargetDataSource(createDataSource("tenant1"));
        return dataSource;
    }

    private Map<Object, Object> getDataSources() {
        Map<Object, Object> dataSources = new HashMap<>();
        dataSources.put("tenant1", createDataSource("tenant1"));
        dataSources.put("tenant2", createDataSource("tenant2"));
        return dataSources;
    }

    private DataSource createDataSource(String tenant) {
    	String puerto = tenant.equals("tenant1")?"1521":"1522";
        DriverManagerDataSource dataSource = new DriverManagerDataSource();
        dataSource.setDriverClassName("oracle.jdbc.OracleDriver");
        dataSource.setUrl("jdbc:oracle:thin:@//localhost:"+puerto+"/xe");
        dataSource.setUsername("system");
        dataSource.setPassword("oracle");
        return dataSource;
    }
    

}
