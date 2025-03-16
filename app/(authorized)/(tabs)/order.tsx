import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
  Image,
  Modal,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function Order() {
  const [products, setProducts] = useState([
    {
      id: 1,
      name: "Premium Smart Watch",
      description: "Fitness tracking, heart rate monitor, GPS",
      price: 199.99,
      image: "https://via.placeholder.com/100",
      count: 0,
      category: "Electronics"
    },
    {
      id: 2,
      name: "Wireless Noise-Canceling Headphones",
      description: "40-hour battery, premium sound quality",
      price: 149.99,
      image: "https://via.placeholder.com/100",
      count: 0,
      category: "Electronics"
    },
    {
      id: 3,
      name: "Organic Cotton T-Shirt",
      description: "Sustainable, eco-friendly material",
      price: 29.99,
      image: "https://via.placeholder.com/100",
      count: 0,
      category: "Apparel"
    },
    {
      id: 4,
      name: "Stainless Steel Water Bottle",
      description: "Vacuum insulated, 24-hour temperature control",
      price: 34.99,
      image: "https://via.placeholder.com/100",
      count: 0,
      category: "Lifestyle"
    },
    {
      id: 5,
      name: "Smart Home Speaker",
      description: "Voice control, premium sound quality",
      price: 129.99,
      image: "https://via.placeholder.com/100",
      count: 0,
      category: "Electronics"
    },
  ]);

  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("All");

  const categories = ["All", ...new Set(products.map(product => product.category))];
  
  const incrementCount = (id:any) => {
    setProducts(products.map(product => 
      product.id === id ? {...product, count: product.count + 1} : product
    ));
  };

  const decrementCount = (id:any) => {
    setProducts(products.map(product => 
      product.id === id && product.count > 0 ? {...product, count: product.count - 1} : product
    ));
  };

  const totalItems = products.reduce((sum, product) => sum + product.count, 0);
  const totalPrice = products.reduce((sum, product) => sum + (product.count * product.price), 0).toFixed(2);
  
  const filteredProducts = selectedCategory === "All" 
    ? products 
    : products.filter(product => product.category === selectedCategory);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <View>
          <Text style={styles.headerTitle}>Order Products</Text>
          <Text style={styles.headerSubtitle}>Select items to order</Text>
        </View>
        <View style={styles.profileContainer}>
          <Image
            source={{ uri: "https://via.placeholder.com/100" }}
            style={styles.profileImage}
          />
        </View>
      </View>

      <View style={styles.categoriesContainer}>
        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.categoriesScroll}
        >
          {categories.map((category) => (
            <TouchableOpacity
              key={category}
              style={[
                styles.categoryButton,
                selectedCategory === category && styles.selectedCategory
              ]}
              onPress={() => setSelectedCategory(category)}
            >
              <Text 
                style={[
                  styles.categoryText,
                  selectedCategory === category && styles.selectedCategoryText
                ]}
              >
                {category}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.productsContainer}>
          {filteredProducts.map((product) => (
            <View key={product.id} style={styles.productCard}>
              <View style={styles.productImageContainer}>
                <Image
                  source={{ uri: product.image }}
                  style={styles.productImage}
                />
              </View>
              <View style={styles.productDetails}>
                <Text style={styles.productTitle}>{product.name}</Text>
                <Text style={styles.productDescription}>{product.description}</Text>
                <Text style={styles.productPrice}>${product.price}</Text>
              </View>
              <View style={styles.counterContainer}>
                {product.count > 0 ? (
                  <View style={styles.counterControls}>
                    <TouchableOpacity
                      onPress={() => decrementCount(product.id)}
                      style={styles.counterButton}
                    >
                      <Ionicons name="remove" size={18} color="#fff" />
                    </TouchableOpacity>
                    <Text style={styles.counterText}>{product.count}</Text>
                    <TouchableOpacity
                      onPress={() => incrementCount(product.id)}
                      style={styles.counterButton}
                    >
                      <Ionicons name="add" size={18} color="#fff" />
                    </TouchableOpacity>
                  </View>
                ) : (
                  <TouchableOpacity
                    onPress={() => incrementCount(product.id)}
                    style={styles.addButton}
                  >
                    <Ionicons name="add" size={20} color="#fff" />
                  </TouchableOpacity>
                )}
              </View>
            </View>
          ))}
        </View>
      </ScrollView>

      {totalItems > 0 && (
        <View style={styles.footer}>
          <View style={styles.orderSummary}>
            <Text style={styles.orderSummaryText}>
              {totalItems} {totalItems === 1 ? 'item' : 'items'} | ${totalPrice}
            </Text>
          </View>
          <TouchableOpacity
            style={styles.placeOrderButton}
            onPress={() => setShowConfirmModal(true)}
          >
            <Text style={styles.placeOrderButtonText}>Place Order</Text>
            <Ionicons name="arrow-forward" size={20} color="#fff" />
          </TouchableOpacity>
        </View>
      )}

      <Modal
        animationType="slide"
        transparent={true}
        visible={showConfirmModal}
        onRequestClose={() => setShowConfirmModal(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Confirm Order</Text>
            </View>
            
            <Text style={styles.orderConfirmTitle}>Order Summary</Text>
            {products.filter(p => p.count > 0).map((product) => (
              <View key={product.id} style={styles.orderItem}>
                <Text style={styles.orderItemName}>{product.name}</Text>
                <View style={styles.orderItemDetails}>
                  <Text style={styles.orderItemCount}>{product.count} x ${product.price}</Text>
                  <Text style={styles.orderItemTotal}>${(product.count * product.price).toFixed(2)}</Text>
                </View>
              </View>
            ))}
            
            <View style={styles.orderTotalContainer}>
              <Text style={styles.orderTotalLabel}>Total</Text>
              <Text style={styles.orderTotalValue}>${totalPrice}</Text>
            </View>
            
            <TouchableOpacity
              style={styles.confirmButton}
              onPress={() => {
                setShowConfirmModal(false);
                // Here you would handle order placement logic
              }}
            >
              <Text style={styles.confirmButtonText}>Confirm Order</Text>
            </TouchableOpacity>
            
            <TouchableOpacity
              style={styles.cancelButton}
              onPress={() => setShowConfirmModal(false)}
            >
              <Text style={styles.cancelButtonText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8FAFF",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: "700",
    color: "#333",
  },
  headerSubtitle: {
    fontSize: 14,
    color: "#888",
    marginTop: 4,
  },
  profileContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    overflow: "hidden",
    borderWidth: 2,
    borderColor: "#E0E7FF",
  },
  profileImage: {
    width: "100%",
    height: "100%",
  },
  categoriesContainer: {
    paddingVertical: 10,
  },
  categoriesScroll: {
    paddingHorizontal: 15,
  },
  categoryButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    marginRight: 10,
    backgroundColor: "#fff",
    shadowColor: "rgba(100, 100, 111, 0.1)",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 4,
    elevation: 2,
  },
  selectedCategory: {
    backgroundColor: "#4F6CF7",
  },
  categoryText: {
    fontSize: 14,
    fontWeight: "500",
    color: "#555",
  },
  selectedCategoryText: {
    color: "#fff",
  },
  scrollContent: {
    paddingBottom: 100,
  },
  productsContainer: {
    paddingHorizontal: 15,
  },
  productCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 16,
    marginBottom: 12,
    padding: 15,
    shadowColor: "rgba(100, 100, 111, 0.1)",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.5,
    shadowRadius: 8,
    elevation: 4,
  },
  productImageContainer: {
    width: 80,
    height: 80,
    borderRadius: 12,
    overflow: "hidden",
    marginRight: 15,
  },
  productImage: {
    width: "100%",
    height: "100%",
  },
  productDetails: {
    flex: 1,
    marginRight: 10,
  },
  productTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
    marginBottom: 4,
  },
  productDescription: {
    fontSize: 13,
    color: "#888",
    marginBottom: 4,
  },
  productPrice: {
    fontSize: 16,
    fontWeight: "700",
    color: "#4F6CF7",
  },
  counterContainer: {
    alignItems: "center",
    justifyContent: "center",
  },
  addButton: {
    width: 34,
    height: 34,
    borderRadius: 17,
    backgroundColor: "#4F6CF7",
    justifyContent: "center",
    alignItems: "center",
  },
  counterControls: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F0F4FF",
    borderRadius: 20,
    padding: 4,
  },
  counterButton: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: "#4F6CF7",
    justifyContent: "center",
    alignItems: "center",
  },
  counterText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
    paddingHorizontal: 12,
  },
  footer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "#fff",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    shadowColor: "rgba(0, 0, 0, 0.1)",
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.5,
    shadowRadius: 8,
    elevation: 8,
  },
  orderSummary: {
    flex: 1,
  },
  orderSummaryText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
  },
  placeOrderButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#4F6CF7",
    borderRadius: 12,
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  placeOrderButtonText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#fff",
    marginRight: 8,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "flex-end",
  },
  modalContent: {
    backgroundColor: "#fff",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
    maxHeight: "80%",
  },
  modalHeader: {
    alignItems: "center",
    marginBottom: 20,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#333",
  },
  orderConfirmTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#555",
    marginBottom: 12,
  },
  orderItem: {
    marginBottom: 12,
  },
  orderItemName: {
    fontSize: 15,
    fontWeight: "500",
    color: "#333",
    marginBottom: 4,
  },
  orderItemDetails: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  orderItemCount: {
    fontSize: 14,
    color: "#888",
  },
  orderItemTotal: {
    fontSize: 14,
    fontWeight: "600",
    color: "#333",
  },
  orderTotalContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    borderTopWidth: 1,
    borderTopColor: "#F0F0F0",
    paddingTop: 15,
    marginTop: 10,
    marginBottom: 20,
  },
  orderTotalLabel: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
  },
  orderTotalValue: {
    fontSize: 18,
    fontWeight: "700",
    color: "#4F6CF7",
  },
  confirmButton: {
    backgroundColor: "#4F6CF7",
    borderRadius: 12,
    paddingVertical: 15,
    alignItems: "center",
    marginBottom: 15,
  },
  confirmButtonText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#fff",
  },
  cancelButton: {
    backgroundColor: "#F0F0F0",
    borderRadius: 12,
    paddingVertical: 15,
    alignItems: "center",
  },
  cancelButtonText: {
    fontSize: 16,
    fontWeight: "500",
    color: "#333",
  },
});