package com.monjima.EcoBazar.EcoBazarXCarbonFoorprint.controller;

import com.monjima.EcoBazar.EcoBazarXCarbonFoorprint.dto.ProductRequest;
import com.monjima.EcoBazar.EcoBazarXCarbonFoorprint.dto.ProductResponse;
import com.monjima.EcoBazar.EcoBazarXCarbonFoorprint.entity.Product;
import com.monjima.EcoBazar.EcoBazarXCarbonFoorprint.service.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/products")
@CrossOrigin(origins = "*")
public class ProductController {

    @Autowired
    private ProductService productService;

    // 👑 Only SELLER can add products
    @PreAuthorize("hasRole('SELLER')")
    @PostMapping("/add")
    public ResponseEntity<ProductResponse> addProduct(@RequestBody ProductRequest request,
                                                      Authentication authentication) {
        String sellerEmail = authentication.getName(); // extract from JWT
        return ResponseEntity.ok(productService.addProduct(request, sellerEmail));
    }

    // 🧑‍💼 Only SELLER can update their own products
    @PreAuthorize("hasRole('SELLER')")
    @PutMapping("/update/{id}")
    public ResponseEntity<ProductResponse> updateProduct(@PathVariable String id,
                                                         @RequestBody ProductRequest request,
                                                         Authentication authentication) {
        String sellerEmail = authentication.getName();
        return ResponseEntity.ok(productService.updateProduct(id, request, sellerEmail));
    }

    // 👑 Admin can delete any product, Seller can delete their own
    @PreAuthorize("hasAnyRole('ADMIN','SELLER')")
    @DeleteMapping("/delete/{id}")
    public ResponseEntity<String> deleteProduct(@PathVariable String id,
                                                Authentication authentication) {
        String requester = authentication.getName();
        productService.deleteProduct(id, requester);
        return ResponseEntity.ok("Product deleted successfully");
    }

    // 👀 All users (even without login) can view approved products
    @GetMapping("/all")
    public ResponseEntity<List<ProductResponse>> getAllProducts() {
        return ResponseEntity.ok(productService.getAllProducts());
    }

    @GetMapping("/category/{category}")
    public ResponseEntity<List<ProductResponse>> getByCategory(@PathVariable String category) {
        return ResponseEntity.ok(productService.getByCategory(category));
    }

    @GetMapping("/filter")
    public ResponseEntity<List<ProductResponse>> filterByCarbon(@RequestParam double maxCarbon) {
        return ResponseEntity.ok(productService.getByMaxCarbon(maxCarbon));
    }

    @GetMapping("/search")
    public ResponseEntity<List<ProductResponse>> searchByName(@RequestParam String name) {
        return ResponseEntity.ok(productService.searchByName(name));
    }

    @PostMapping("/{id}/like")
    public ResponseEntity<ProductResponse> likeProduct(@PathVariable String id) {
        ProductResponse response = productService.likeProduct(id);
        if (response == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(response);
    }
}
