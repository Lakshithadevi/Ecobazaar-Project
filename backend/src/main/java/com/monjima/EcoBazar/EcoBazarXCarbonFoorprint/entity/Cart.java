package com.monjima.EcoBazar.EcoBazarXCarbonFoorprint.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.ArrayList;
import java.util.List;

@Document(collection = "carts")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Cart {
    @Id
    private  String id;
    private String userId;
    private List<CartItem> items = new ArrayList<>();
    private double totalPrice;
    private double totalCarbon;
}
