package com.monjima.EcoBazar.EcoBazarXCarbonFoorprint.service;

import com.monjima.EcoBazar.EcoBazarXCarbonFoorprint.entity.Cart;
import com.monjima.EcoBazar.EcoBazarXCarbonFoorprint.entity.CartItem;
import com.monjima.EcoBazar.EcoBazarXCarbonFoorprint.entity.Product;
import com.monjima.EcoBazar.EcoBazarXCarbonFoorprint.repository.CartRepository;
import com.monjima.EcoBazar.EcoBazarXCarbonFoorprint.repository.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class CartService {
    @Autowired
    private CartRepository cartRepository;
    @Autowired
    private ProductRepository productRepository;
    public Cart addToCart(String userId, String productId, int quantity) {
        Product product = productRepository.findById(productId)
                .orElseThrow(() -> new RuntimeException("Product not found"));

        Cart cart = cartRepository.findByUserId(userId)
                .orElse(new Cart(null, userId, new java.util.ArrayList<>(), 0, 0));

        Optional<CartItem> existing = cart.getItems().stream()
                .filter(item -> item.getProductId().equals(productId))
                .findFirst();

        if (existing.isPresent()) {
            existing.get().setQuantity(existing.get().getQuantity() + quantity);
        } else {
            cart.getItems().add(new CartItem(
                    product.getId(),
                    product.getName(),
                    quantity,
                    product.getPrice(),
                    product.getCarbonEmission()
            ));
        }

        recalculateCart(cart);
        return cartRepository.save(cart);
    }
    public Cart removeFromCart(String userId, String productId) {
        Cart cart = cartRepository.findByUserId(userId)
                .orElseThrow(() -> new RuntimeException("Cart not found"));
        cart.getItems().removeIf(i -> i.getProductId().equals(productId));
        recalculateCart(cart);
        return cartRepository.save(cart);
    }

    public Cart getCart(String userId) {
        return cartRepository.findByUserId(userId)
                .orElse(new Cart(null, userId, new java.util.ArrayList<>(), 0, 0));
    }

    private void recalculateCart(Cart cart) {
        double totalPrice = 0;
        double totalCarbon = 0;
        for (CartItem i : cart.getItems()) {
            totalPrice += i.getPrice() * i.getQuantity();
            totalCarbon += i.getCarbonEmission() * i.getQuantity();
        }
        cart.setTotalPrice(totalPrice);
        cart.setTotalCarbon(totalCarbon);
    }
}
