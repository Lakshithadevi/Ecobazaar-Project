package com.monjima.EcoBazar.EcoBazarXCarbonFoorprint.dto;

import lombok.Data;

@Data
public class CartItemDTO {
    private String productId;
    private String productName;
    private int quantity;
    private double price;
    private double carbonEmission;
}
