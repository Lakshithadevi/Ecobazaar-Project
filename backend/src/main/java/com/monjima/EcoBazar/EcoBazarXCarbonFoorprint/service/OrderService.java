package com.monjima.EcoBazar.EcoBazarXCarbonFoorprint.service;

import com.monjima.EcoBazar.EcoBazarXCarbonFoorprint.entity.Order;
import com.monjima.EcoBazar.EcoBazarXCarbonFoorprint.repository.OrderRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class OrderService {

    @Autowired
    private OrderRepository orderRepository;

    public Order placeOrder(Order order) {
        return orderRepository.save(order);
    }

    public List<Order> getOrdersByUser(String userId) {
        return orderRepository.findByUserId(userId);
    }

    public Order getOrderById(String orderId) {
        return orderRepository.findById(orderId).orElse(null);
    }

    public Order updateStatus(String orderId, String status) {
        Order order = getOrderById(orderId);
        if (order == null) return null;
        order.setStatus(status);
        return orderRepository.save(order);
    }

    public List<Order> getAllOrdersForSeller() {
        return orderRepository.findAll(); // later apply product-based filtering
    }
}
