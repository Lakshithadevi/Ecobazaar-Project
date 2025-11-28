package com.monjima.EcoBazar.EcoBazarXCarbonFoorprint.controller;

import com.monjima.EcoBazar.EcoBazarXCarbonFoorprint.dto.OrderRequest;
import com.monjima.EcoBazar.EcoBazarXCarbonFoorprint.dto.OrderResponse;
import com.monjima.EcoBazar.EcoBazarXCarbonFoorprint.service.OrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/orders")
@CrossOrigin(origins = "*")
public class OrderController {

    @Autowired
    private OrderService orderService;

    // Place an order — accessible to users
    @PreAuthorize("hasRole('USER')")
    @PostMapping("/place")
    public ResponseEntity<OrderResponse> placeOrder(@RequestBody OrderRequest request) {
        return ResponseEntity.ok(orderService.placeOrder(request));
    }

    // View user’s own orders
    @PreAuthorize("hasRole('USER')")
    @GetMapping("/my-orders/{userId}")
    public ResponseEntity<List<OrderResponse>> getUserOrders(@PathVariable String userId) {
        return ResponseEntity.ok(orderService.getOrdersByUser(userId));
    }

    // Admin can view all orders
    @PreAuthorize("hasRole('ADMIN')")
    @GetMapping("/all")
    public ResponseEntity<List<OrderResponse>> getAllOrders() {
        return ResponseEntity.ok(orderService.getAllOrders());
    }
}
