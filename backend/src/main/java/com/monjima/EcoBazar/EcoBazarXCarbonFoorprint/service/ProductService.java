package com.monjima.EcoBazar.EcoBazarXCarbonFoorprint.service;

import com.monjima.EcoBazar.EcoBazarXCarbonFoorprint.dto.ProductRequest;
import com.monjima.EcoBazar.EcoBazarXCarbonFoorprint.dto.ProductResponse;
import com.monjima.EcoBazar.EcoBazarXCarbonFoorprint.entity.Product;
import com.monjima.EcoBazar.EcoBazarXCarbonFoorprint.repository.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class ProductService {

    @Autowired
    private ProductRepository productRepository;

    public ProductResponse addProduct(ProductRequest request, String sellerEmail) {
        Product product = new Product();
        product.setName(request.getName());
        product.setCategory(request.getCategory());
        product.setPrice(request.getPrice());
        product.setCarbonEmission(request.getCarbonEmission());
        product.setDescription(request.getDescription());
        product.setSellerId(sellerEmail);
        product.setEcoCertified(request.isEcoCertified());
        product.setApproved(true);
        return toResponse(productRepository.save(product));
    }

    public ProductResponse updateProduct(String id, ProductRequest request, String sellerEmail) {
        Product product = productRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Product not found"));

        if (!product.getSellerId().equals(sellerEmail)) {
            throw new RuntimeException("Unauthorized: You can only update your own products");
        }

        product.setName(request.getName());
        product.setCategory(request.getCategory());
        product.setPrice(request.getPrice());
        product.setCarbonEmission(request.getCarbonEmission());
        product.setDescription(request.getDescription());
        product.setEcoCertified(request.isEcoCertified());
        return toResponse(productRepository.save(product));
    }

    public void deleteProduct(String id, String requesterEmail) {
        Product product = productRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Product not found"));

        // Admin or owner can delete
        if (!product.getSellerId().equals(requesterEmail)) {
            throw new RuntimeException("Unauthorized: You can only delete your own products");
        }

        productRepository.deleteById(id);
    }

    public ProductResponse approveProduct(String id) {
        Product product = productRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Product not found"));
        product.setApproved(true);
        return toResponse(productRepository.save(product));
    }

    public List<ProductResponse> getAllProducts() {
        return productRepository.findByApproved(true)
                .stream().map(this::toResponse).collect(Collectors.toList());
    }

    public List<ProductResponse> getByCategory(String category) {
        return productRepository.findByCategory(category)
                .stream().filter(Product::isApproved)
                .map(this::toResponse).collect(Collectors.toList());
    }

    public List<ProductResponse> getByMaxCarbon(double maxCarbon) {
        return productRepository.findByCarbonEmissionLessThanEqual(maxCarbon)
                .stream().filter(Product::isApproved)
                .map(this::toResponse).collect(Collectors.toList());
    }

    public List<ProductResponse> searchByName(String name) {
        return productRepository.findByNameContainingIgnoreCase(name)
                .stream().filter(Product::isApproved)
                .map(this::toResponse).collect(Collectors.toList());
    }

    public ProductResponse likeProduct(String id) {
        Product product = productRepository.findById(id).orElse(null);
        if (product == null) return null;
        product.setLikes(product.getLikes() + 1);
        return toResponse(productRepository.save(product));
    }

    private ProductResponse toResponse(Product product) {
        return new ProductResponse(
                product.getId(),
                product.getName(),
                product.getCategory(),
                product.getPrice(),
                product.getCarbonEmission(),
                product.getDescription(),
                product.getSellerId(),
                product.isEcoCertified(),
                product.getLikes(),
                product.isApproved()
        );
    }
}
