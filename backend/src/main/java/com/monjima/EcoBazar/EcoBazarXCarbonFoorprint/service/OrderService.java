package com.monjima.EcoBazar.EcoBazarXCarbonFoorprint.service;

import com.monjima.EcoBazar.EcoBazarXCarbonFoorprint.dto.*;
import com.monjima.EcoBazar.EcoBazarXCarbonFoorprint.entity.Order;
import com.monjima.EcoBazar.EcoBazarXCarbonFoorprint.repository.OrderRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class OrderService {

    @Autowired
    private OrderRepository orderRepository;

    public OrderResponse placeOrder(OrderRequest request) {
        double totalPrice = request.getItems().stream()
                .mapToDouble(i -> i.getPrice() * i.getQuantity())
                .sum();

        double totalCarbon = request.getItems().stream()
                .mapToDouble(i -> i.getCarbonEmission() * i.getQuantity())
                .sum();

        Order order = new Order();
        order.setUserId(request.getUserId());
        order.setItems(request.getItems().stream()
                .map(i -> new com.monjima.EcoBazar.EcoBazarXCarbonFoorprint.entity.CartItem(
                        i.getProductId(), i.getProductName(), i.getQuantity(), i.getPrice(), i.getCarbonEmission()
                )).collect(Collectors.toList()));
        order.setTotalPrice(totalPrice);
        order.setTotalCarbonEmission(totalCarbon);
        order.setDeliveryMode(request.getDeliveryMode());
        order.setStatus("PLACED");
        order.setOrderDate(LocalDateTime.now().format(DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss")));

        return toResponse(orderRepository.save(order));
    }

    public List<OrderResponse> getOrdersByUser(String userId) {
        return orderRepository.findByUserId(userId)
                .stream().map(this::toResponse).collect(Collectors.toList());
    }

    public List<OrderResponse> getAllOrders() {
        return orderRepository.findAll()
                .stream().map(this::toResponse).collect(Collectors.toList());
    }

    private OrderResponse toResponse(Order order) {
        return OrderResponse.builder()
                .id(order.getId())
                .userId(order.getUserId())
                .items(order.getItems().stream().map(i -> {
                    CartItemDTO dto = new CartItemDTO();
                    dto.setProductId(i.getProductId());
                    dto.setProductName(i.getProductName());
                    dto.setQuantity(i.getQuantity());
                    dto.setPrice(i.getPrice());
                    dto.setCarbonEmission(i.getCarbonEmission());
                    return dto;
                }).collect(Collectors.toList()))
                .totalPrice(order.getTotalPrice())
                .totalCarbonEmission(order.getTotalCarbonEmission())
                .deliveryMode(order.getDeliveryMode())
                .status(order.getStatus())
                .orderDate(order.getOrderDate())
                .build();
    }
}
