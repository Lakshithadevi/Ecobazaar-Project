package com.monjima.EcoBazar.EcoBazarXCarbonFoorprint.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ProductResponse {
    private String id;
    private String name;
    private String category;
    private double price;
    private double carbonEmission;
    private String description;
    private String sellerId;
    private boolean ecoCertified;
    private int likes;
    private boolean approved;
}
