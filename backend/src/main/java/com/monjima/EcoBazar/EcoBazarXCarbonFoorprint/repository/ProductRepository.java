package com.monjima.EcoBazar.EcoBazarXCarbonFoorprint.repository;

import com.monjima.EcoBazar.EcoBazarXCarbonFoorprint.entity.Product;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;

public interface ProductRepository extends MongoRepository<Product,String> {
    List<Product> findByCategory(String category);
    List<Product> findByCarbonEmissionLessThanEqual(double maxCarbon);
    List<Product> findByNameContainingIgnoreCase(String name);
    List<Product> findByApproved(boolean approved);

}
