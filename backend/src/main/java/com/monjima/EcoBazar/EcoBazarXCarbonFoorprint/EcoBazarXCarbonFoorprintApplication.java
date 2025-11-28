package com.monjima.EcoBazar.EcoBazarXCarbonFoorprint;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.jdbc.DataSourceAutoConfiguration;

@SpringBootApplication(exclude = {DataSourceAutoConfiguration.class})
public class EcoBazarXCarbonFoorprintApplication {

	public static void main(String[] args) {
		SpringApplication.run(EcoBazarXCarbonFoorprintApplication.class, args);
	}

}
