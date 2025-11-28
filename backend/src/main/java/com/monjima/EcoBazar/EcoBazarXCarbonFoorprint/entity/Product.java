package com.monjima.EcoBazar.EcoBazarXCarbonFoorprint.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "products")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Product {
    @Id
    private String id;
    private String name;
    private String category;
    private double price;
    private double carbonEmission; // in kg CO2e
    private String description;
    private String sellerId;
    private boolean ecoCertified; // if verified for low emission
    private int likes = 0;
    private boolean approved = false;


}
