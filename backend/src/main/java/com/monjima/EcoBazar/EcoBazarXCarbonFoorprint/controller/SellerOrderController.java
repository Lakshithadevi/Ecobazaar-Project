package com.monjima.EcoBazar.EcoBazarXCarbonFoorprint.controller;

import com.monjima.EcoBazar.EcoBazarXCarbonFoorprint.entity.Order;
import com.monjima.EcoBazar.EcoBazarXCarbonFoorprint.service.OrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/seller/orders")
public class SellerOrderController {

    @Autowired
    private OrderService orderService;

    // Seller gets all orders (later filter by seller-owned products)
    @GetMapping("/all")
    public List<Order> getAllOrders() {
        return orderService.getAllOrdersForSeller();
    }

    // Seller updates order stage
    @PutMapping("/{orderId}/status/{status}")
    public Order updateOrderStatus(
            @PathVariable String orderId,
            @PathVariable String status) {

        return orderService.updateStatus(orderId, status.toUpperCase());
    }
}
