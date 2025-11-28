package com.monjima.EcoBazar.EcoBazarXCarbonFoorprint.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Document(collection = "orders")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Order {

    @Id
    private String id;

    private String userId;
    private String sellerId;

    private List<CartItem> items;
    private double totalPrice;
    private double totalCarbonEmission;
    private String deliveryMode;

    private String status = "PLACED";

    private String orderDate;

    // New tracking timeline
    private List<StatusEvent> timeline = new ArrayList<>();

    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    public static class StatusEvent {
        private String status;
        private LocalDateTime timestamp;
    }
}
