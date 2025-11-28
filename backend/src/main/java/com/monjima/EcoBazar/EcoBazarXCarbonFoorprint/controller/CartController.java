package com.monjima.EcoBazar.EcoBazarXCarbonFoorprint.controller;

import com.monjima.EcoBazar.EcoBazarXCarbonFoorprint.entity.Cart;
import com.monjima.EcoBazar.EcoBazarXCarbonFoorprint.service.CartService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/cart")
@CrossOrigin(origins = "*")
public class CartController {
    @Autowired
    private CartService cartService;
    @PostMapping("/add")
    public ResponseEntity<Cart> addToCart(@RequestParam String userId,
                                          @RequestParam String productId,
                                          @RequestParam int quantity) {
        return ResponseEntity.ok(cartService.addToCart(userId, productId, quantity));
    }

    @DeleteMapping("/remove")
    public ResponseEntity<Cart> removeFromCart(@RequestParam String userId,
                                               @RequestParam String productId) {
        return ResponseEntity.ok(cartService.removeFromCart(userId, productId));
    }

    @GetMapping("/{userId}")
    public ResponseEntity<Cart> getCart(@PathVariable String userId) {
        return ResponseEntity.ok(cartService.getCart(userId));
    }
}
