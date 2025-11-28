package com.monjima.EcoBazar.EcoBazarXCarbonFoorprint.dto;

import lombok.Data;

import java.util.List;

@Data
public class OrderRequest {
    private String userId;
    private List<CartItemDTO> items;
    private String deliveryMode;
}
