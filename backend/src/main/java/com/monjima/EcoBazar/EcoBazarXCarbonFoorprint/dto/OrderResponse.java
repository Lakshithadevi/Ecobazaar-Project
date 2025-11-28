package com.monjima.EcoBazar.EcoBazarXCarbonFoorprint.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class OrderResponse {
    private String id;
    private String userId;
    private List<CartItemDTO> items;
    private double totalPrice;
    private double totalCarbonEmission;
    private String deliveryMode;
    private String status;
    private String orderDate;
}
