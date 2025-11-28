package com.monjima.EcoBazar.EcoBazarXCarbonFoorprint.config;

import com.monjima.EcoBazar.EcoBazarXCarbonFoorprint.entity.Product;
import com.monjima.EcoBazar.EcoBazarXCarbonFoorprint.repository.ProductRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.util.Arrays;
import java.util.List;

@Configuration
public class DataSeeder {
    @Bean
    CommandLineRunner seedDatabase(ProductRepository productRepository) {
        return args -> {
            if (productRepository.count() == 0) { // Only seed once
                List<Product> products = Arrays.asList(
                        new Product("1", "Eco Cotton T-Shirt", "Clothing", 799.0, 3.2,
                                "Sustainable cotton T-shirt with low carbon footprint.", "seller001", true, 0, true),

                        new Product("2", "Solar Lamp", "Electronics", 1299.0, 1.1,
                                "Solar-powered lamp ideal for eco-friendly homes.", "seller002", true, 0, true),

                        new Product("3", "Bamboo Toothbrush", "Personal Care", 199.0, 0.5,
                                "Bamboo toothbrush biodegradable handle.", "seller003", true, 0, true),

                        new Product("4", "Organic Face Wash", "Beauty", 349.0, 2.8,
                                "Plant-based face wash with recyclable packaging.", "seller004", true, 0, true),

                        new Product("5", "Reusable Water Bottle", "Home", 499.0, 0.9,
                                "Stainless steel bottle reduces single-use plastic.", "seller005", true, 0, true)
                );

                productRepository.saveAll(products);
                System.out.println("✅ Dummy product data inserted successfully!");
            }
        };
    }

}
