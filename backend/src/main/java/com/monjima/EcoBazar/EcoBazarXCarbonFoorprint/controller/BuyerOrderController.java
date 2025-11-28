package com.monjima.EcoBazar.EcoBazarXCarbonFoorprint.controller;

import com.monjima.EcoBazar.EcoBazarXCarbonFoorprint.entity.Order;
import com.monjima.EcoBazar.EcoBazarXCarbonFoorprint.service.OrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/buyer/orders")
public class BuyerOrderController {

    @Autowired
    private OrderService orderService;

    // Buyer places order
    @PostMapping("/place")
    public Order placeOrder(@RequestBody Order order) {
        order.setStatus("PLACED");
        return orderService.placeOrder(order);
    }

    // Buyer fetches all their orders
    @GetMapping("/{userId}")
    public List<Order> getMyOrders(@PathVariable String userId) {
        return orderService.getOrdersByUser(userId);
    }

    // Buyer tracks specific order
    @GetMapping("/track/{orderId}")
    public Order trackOrder(@PathVariable String orderId) {
        return orderService.getOrderById(orderId);
    }

    // Buyer confirms delivery
    @PutMapping("/confirm-delivery/{orderId}")
    public Order confirmDelivery(@PathVariable String orderId) {
        return orderService.updateStatus(orderId, "DELIVERED");
    }
}
