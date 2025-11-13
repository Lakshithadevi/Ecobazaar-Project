package com.monjima.EcoBazar.EcoBazarXCarbonFoorprint.dto;

import lombok.Data;

@Data
public class ProductRequest {
    private String name;
    private String category;
    private double price;
    private double carbonEmission;
    private String description;
    private String sellerId;
    private boolean ecoCertified;
}
