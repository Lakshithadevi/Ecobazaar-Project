package com.monjima.EcoBazar.EcoBazarXCarbonFoorprint.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import java.util.List;

@Document(collection = "orders")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Order {
    @Id
    private String id;
    private String userId;
    private List<CartItem> items; // You can reuse your CartItem entity
    private double totalPrice;
    private double totalCarbonEmission;
    private String deliveryMode; // eco, standard, express
    private String status = "PLACED"; // PLACED, SHIPPED, DELIVERED
    private String orderDate;
}
