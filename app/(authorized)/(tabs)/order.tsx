import { LinearGradient } from "expo-linear-gradient";
import React, { useState } from "react";
import {
  Dimensions,
  FlatList,
  Image,
  Modal,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from "react-native";
import OrderSummaryModal from "../_components/orderSummaryModal";
import VarientModal from "../_components/varientModal";
import { BlurView } from "expo-blur";

// Sample product data
const PRODUCTS = [
  {
    id: 1,
    name: "iPhone 14 Pro",
    price: 999,
    image:
      "https://www.dxomark.com/wp-content/uploads/medias/post-125834/Apple-iPhone-14_FINAL_featured-image-packshot-review.jpg",
    variants: [
      { id: 101, name: "iPhone 14 Pro 128GB", price: 999 },
      { id: 102, name: "iPhone 14 Pro 256GB", price: 1099 },
      { id: 103, name: "iPhone 14 Pro 512GB", price: 1299 },
    ],
    category: "Phones",
  },
  {
    id: 2,
    name: "MacBook Air",
    price: 1199,
    image:
      "https://alephksa.com/cdn/shop/files/MacBook_Air_15_in_M3_Midnight_PDP_Image_Position_1__en-AE_9c8e6839-222d-45c3-b903-053481a92ef6.jpg?v=1709594809&width=823",
    variants: [
      { id: 201, name: "MacBook Air 8GB/256GB", price: 1199 },
      { id: 202, name: "MacBook Air 16GB/512GB", price: 1499 },
    ],
    category: "Laptops",
  },
  {
    id: 3,
    name: "AirPods Pro",
    price: 249,
    image:
      "https://www.tech21.com/cdn/shop/files/1eee32c5-e890-4159-88e9-eb5a9cf980ec.jpg?v=1718361342",
    variants: [
      { id: 301, name: "AirPods Pro", price: 249 },
      { id: 302, name: "AirPods Pro with MagSafe Case", price: 279 },
    ],
    category: "Audio",
  },
  {
    id: 4,
    name: "iPad Air",
    price: 599,
    image:
      "https://www.imagineonline.store/cdn/shop/files/iPad_Air_5thGen_Wi-Fi_Purple_PDP_Image_Position-1b__en-IN_7f057f0d-0511-471c-921c-9d38767c0a6b.jpg?v=1705480138&width=1445",
    variants: [
      { id: 401, name: "iPad Air 64GB", price: 599 },
      { id: 402, name: "iPad Air 256GB", price: 749 },
    ],
    category: "Tablets",
  },
  {
    id: 5,
    name: "Apple Watch",
    price: 399,
    image:
      "https://www.greenware.lk/wp-content/uploads/2024/09/Apple-Watch-Series-10-Price-in-Sri-Lanka.webp",
    variants: [
      { id: 501, name: "Apple Watch Series 8 GPS", price: 399 },
      { id: 502, name: "Apple Watch Series 8 Cellular", price: 499 },
    ],
    category: "Wearables",
  },
  {
    id: 6,
    name: "HomePod mini",
    price: 99,
    image:
      "https://api.runbazaar.com/media/__sized__/product_img/2021/07/15/RBI000000000036/MJ2E3-YL_IMG_1_KtuTHrS-smart_crop-c0-5__0-5-750x750-70.jpg",
    variants: [
      { id: 601, name: "HomePod mini White", price: 99 },
      { id: 602, name: "HomePod mini Space Gray", price: 99 },
    ],
    category: "Home",
  },
];

// Extract unique categories
const CATEGORIES = [
  "All",
  ...new Set(PRODUCTS.map((product) => product.category)),
];

const { width } = Dimensions.get("window");
const ACCENT_COLOR = "#4D5DFA";
const SECONDARY_COLOR = "#FF8A65";

export default function ProductListingScreen() {
  const [cart, setCart] = useState<any>({});
  const [variantCart, setVariantCart] = useState<any>({});
  const [showOrderModal, setShowOrderModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<any>(null);
  const [showVariantModal, setShowVariantModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  // Filter products based on search query and selected category
  const filteredProducts = PRODUCTS.filter((product) => {
    const matchesSearch = product.name
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const matchesCategory =
      selectedCategory === "All" || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleIncrement = (productId: any) => {
    setCart((prevCart: any) => ({
      ...prevCart,
      [productId]: (prevCart[productId] || 0) + 1,
    }));
  };

  const handleDecrement = (productId: any) => {
    if (cart[productId] && cart[productId] > 0) {
      setCart((prevCart: any) => ({
        ...prevCart,
        [productId]: prevCart[productId] - 1,
      }));
    }
  };

  const handleVariantIncrement = (variantId: any) => {
    setVariantCart((prevCart: any) => ({
      ...prevCart,
      [variantId]: (prevCart[variantId] || 0) + 1,
    }));
  };

  const handleVariantDecrement = (variantId: any) => {
    if (variantCart[variantId] && variantCart[variantId] > 0) {
      setVariantCart((prevCart: any) => ({
        ...prevCart,
        [variantId]: prevCart[variantId] - 1,
      }));
    }
  };

  const showVariants = (product: any) => {
    setSelectedProduct(product);
    setShowVariantModal(true);
  };

  const getTotalPrice = () => {
    let total = 0;

    // Calculate total for base products
    Object.keys(cart).forEach((productId) => {
      const product = PRODUCTS.find((p) => p.id === parseInt(productId));
      if (product) {
        total += product.price * cart[productId];
      }
    });

    // Calculate total for variant products
    Object.keys(variantCart).forEach((variantId) => {
      const variant = PRODUCTS.flatMap((p) => p.variants).find(
        (v) => v.id === parseInt(variantId)
      );
      if (variant) {
        total += variant.price * variantCart[variantId];
      }
    });

    return total.toFixed(2);
  };

  const getTotalItems = () => {
    const baseItems: any = Object.values(cart).reduce(
      (sum: any, qty: any) => sum + qty,
      0
    );
    const variantItems = Object.values(variantCart).reduce(
      (sum: any, qty: any) => sum + qty,
      0
    );
    return baseItems + variantItems;
  };

  const renderProduct = ({ item }: any) => {
    const quantity = cart[item.id] || 0;

    return (
      <View style={styles.productCardContainer}>
        <TouchableOpacity
          style={styles.productCard}
          activeOpacity={0.9}
          onLongPress={() => showVariants(item)}
        >
          <View style={styles.imageContainer}>
            <Image source={{ uri: item.image }} style={styles.productImage} />
            <LinearGradient
              colors={["rgba(0,0,0,0.02)", "rgba(0,0,0,0.15)"]}
              start={{ x: 0, y: 0 }}
              end={{ x: 0, y: 1 }}
              style={styles.imageGradient}
            />
          </View>

          <View style={styles.productBadge}>
            <Text style={styles.productBadgeText}>
              {item.variants.length} variants
            </Text>
          </View>

          <View style={styles.categoryBadge}>
            <Text style={styles.categoryBadgeText}>{item.category}</Text>
          </View>

          <View style={styles.productInfo}>
            <Text style={styles.productName}>{item.name}</Text>
            <Text style={styles.productPrice}>${item.price}</Text>
          </View>

          <View style={styles.quantityContainer}>
            {quantity > 0 ? (
              <View style={styles.quantityControls}>
                <TouchableOpacity
                  style={styles.quantityButton}
                  onPress={() => handleDecrement(item.id)}
                >
                  <Text style={styles.quantityButtonText}>−</Text>
                </TouchableOpacity>

                <Text style={styles.quantityText}>{quantity}</Text>

                <TouchableOpacity
                  style={[styles.quantityButton, styles.incrementButton]}
                  onPress={() => handleIncrement(item.id)}
                >
                  <Text
                    style={[styles.quantityButtonText, { color: "#FFFFFF" }]}
                  >
                    +
                  </Text>
                </TouchableOpacity>
              </View>
            ) : (
              <TouchableOpacity
                style={styles.addButton}
                onPress={() => handleIncrement(item.id)}
              >
                <LinearGradient
                  colors={[ACCENT_COLOR, "#7A86FF"]}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 0 }}
                  style={styles.addButtonGradient}
                >
                  <Text style={styles.addButtonText}>Add to Cart</Text>
                </LinearGradient>
              </TouchableOpacity>
            )}
          </View>
        </TouchableOpacity>
      </View>
    );
  };

  const renderCategoryItem = ({ item }: any) => (
    <TouchableOpacity
      style={[
        styles.categoryItem,
        selectedCategory === item && styles.selectedCategoryItem,
      ]}
      onPress={() => setSelectedCategory(item)}
    >
      <Text
        style={[
          styles.categoryText,
          selectedCategory === item && styles.selectedCategoryText,
        ]}
      >
        {item}
      </Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />

      <View style={styles.header}>
        <View style={styles.headerTop}>
          <Text style={styles.headerTitle}>Premium Tech</Text>
          <TouchableOpacity
            style={styles.cartButton}
            onPress={() => getTotalItems() > 0 && setShowOrderModal(true)}
          >
            <LinearGradient
              colors={
                getTotalItems() > 0
                  ? [ACCENT_COLOR, "#7A86FF"]
                  : ["#E0E0E0", "#F0F0F0"]
              }
              style={styles.cartIndicator}
            >
              <Text style={styles.cartIndicatorText}>{getTotalItems()}</Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>

        <View style={styles.searchContainer}>
          <View style={styles.searchBar}>
            <Text style={styles.searchIcon}>🔍</Text>
            <TextInput
              style={styles.searchInput}
              placeholder="Search products..."
              placeholderTextColor="#9DA3B4"
              value={searchQuery}
              onChangeText={setSearchQuery}
            />
            {searchQuery.length > 0 && (
              <TouchableOpacity
                style={styles.clearButton}
                onPress={() => setSearchQuery("")}
              >
                <Text style={styles.clearButtonText}>✕</Text>
              </TouchableOpacity>
            )}
          </View>
        </View>

        <View style={styles.categoriesContainer}>
          <FlatList
            data={CATEGORIES}
            renderItem={renderCategoryItem}
            keyExtractor={(item) => item}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.categoriesList}
          />
        </View>
      </View>

      {filteredProducts.length > 0 ? (
        <FlatList
          data={filteredProducts}
          renderItem={renderProduct}
          keyExtractor={(item) => item.id.toString()}
          numColumns={2}
          columnWrapperStyle={styles.productRow}
          contentContainerStyle={styles.productList}
          showsVerticalScrollIndicator={false}
        />
      ) : (
        <View style={styles.noResultsContainer}>
          <Text style={styles.noResultsText}>No products found</Text>
          <Text style={styles.noResultsSubtext}>
            Try a different search or category
          </Text>
        </View>
      )}

      {getTotalItems() > 0 && (
        <View style={styles.footerContainer}>
          <LinearGradient
            colors={["rgba(255,255,255,0)", "rgba(255,255,255,0.9)", "#FFFFFF"]}
            style={styles.footerGradient}
          />
          <View style={styles.footerContent}>
            <View style={styles.footerLeftContent}>
              <Text style={styles.totalItemsText}>
                {getTotalItems()} item{getTotalItems() !== 1 ? "s" : ""}
              </Text>
              <Text style={styles.totalPriceText}>${getTotalPrice()}</Text>
            </View>

            <TouchableOpacity
              style={styles.placeOrderButton}
              onPress={() => setShowOrderModal(true)}
            >
              <LinearGradient
                colors={[ACCENT_COLOR, "#7A86FF"]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={styles.placeOrderGradient}
              >
                <Text style={styles.placeOrderButtonText}>Place Order</Text>
              </LinearGradient>
            </TouchableOpacity>
          </View>
        </View>
      )}

      {/* Order Summary Modal */}
      {/* <Modal
        visible={showOrderModal}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setShowOrderModal(false)}
      >
        <View style={styles.modalOverlay}>
          <BlurView
            intensity={15}
            style={StyleSheet.absoluteFill}
            tint="dark"
          />

          <View style={styles.orderModal}>
            <View style={styles.modalHandle} />

            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Order Summary</Text>
              <TouchableOpacity
                style={styles.closeButtonContainer}
                onPress={() => setShowOrderModal(false)}
              >
                <Text style={styles.closeButton}>×</Text>
              </TouchableOpacity>
            </View>

            <ScrollView
              style={styles.orderItems}
              showsVerticalScrollIndicator={false}
            >
              {Object.keys(cart).map((productId) => {
                const product = PRODUCTS.find(
                  (p) => p.id === parseInt(productId)
                );
                if (product && cart[productId] > 0) {
                  return (
                    <View key={productId} style={styles.orderItem}>
                      <View style={styles.orderImageContainer}>
                        <Image
                          source={{ uri: product.image }}
                          style={styles.orderItemImage}
                        />
                        <LinearGradient
                          colors={["rgba(0,0,0,0.01)", "rgba(0,0,0,0.1)"]}
                          start={{ x: 0, y: 0 }}
                          end={{ x: 0, y: 1 }}
                          style={styles.orderImageGradient}
                        />
                      </View>
                      <View style={styles.orderItemDetails}>
                        <Text style={styles.orderItemName}>{product.name}</Text>
                        <Text style={styles.orderItemPrice}>
                          ${product.price}
                        </Text>
                      </View>
                      <View style={styles.orderItemQuantity}>
                        <TouchableOpacity
                          style={styles.orderQuantityButton}
                          onPress={() => handleDecrement(product.id)}
                        >
                          <Text style={styles.quantityControl}>−</Text>
                        </TouchableOpacity>
                        <Text style={styles.orderQuantityText}>
                          {cart[productId]}
                        </Text>
                        <TouchableOpacity
                          style={[
                            styles.orderQuantityButton,
                            styles.orderIncrementButton,
                          ]}
                          onPress={() => handleIncrement(product.id)}
                        >
                          <Text
                            style={[
                              styles.quantityControl,
                              { color: "#FFFFFF" },
                            ]}
                          >
                            +
                          </Text>
                        </TouchableOpacity>
                      </View>
                    </View>
                  );
                }
                return null;
              })}

              {Object.keys(variantCart).map((variantId) => {
                const variant = PRODUCTS.flatMap((p) => p.variants).find(
                  (v) => v.id === parseInt(variantId)
                );
                if (variant && variantCart[variantId] > 0) {
                  return (
                    <View key={variantId} style={styles.orderItem}>
                      <View style={styles.variantItemImage}>
                        <LinearGradient
                          colors={["#E3E6FF", "#D1D8FF"]}
                          style={styles.variantImageGradient}
                        >
                          <Text style={styles.variantLabel}>Variant</Text>
                        </LinearGradient>
                      </View>
                      <View style={styles.orderItemDetails}>
                        <Text style={styles.orderItemName}>{variant.name}</Text>
                        <Text style={styles.orderItemPrice}>
                          ${variant.price}
                        </Text>
                      </View>
                      <View style={styles.orderItemQuantity}>
                        <TouchableOpacity
                          style={styles.orderQuantityButton}
                          onPress={() => handleVariantDecrement(variant.id)}
                        >
                          <Text style={styles.quantityControl}>−</Text>
                        </TouchableOpacity>
                        <Text style={styles.orderQuantityText}>
                          {variantCart[variantId]}
                        </Text>
                        <TouchableOpacity
                          style={[
                            styles.orderQuantityButton,
                            styles.orderIncrementButton,
                          ]}
                          onPress={() => handleVariantIncrement(variant.id)}
                        >
                          <Text
                            style={[
                              styles.quantityControl,
                              { color: "#FFFFFF" },
                            ]}
                          >
                            +
                          </Text>
                        </TouchableOpacity>
                      </View>
                    </View>
                  );
                }
                return null;
              })}
            </ScrollView>

            <View style={styles.orderSummary}>
              <View style={styles.summaryRow}>
                <Text style={styles.summaryLabel}>Subtotal</Text>
                <Text style={styles.summaryValue}>${getTotalPrice()}</Text>
              </View>
              <View style={styles.summaryRow}>
                <Text style={styles.summaryLabel}>Tax</Text>
                <Text style={styles.summaryValue}>
                  ${(parseFloat(getTotalPrice()) * 0.08).toFixed(2)}
                </Text>
              </View>
              <View style={[styles.summaryRow, styles.totalRow]}>
                <Text style={styles.totalLabel}>Total</Text>
                <Text style={styles.totalValue}>
                  ${(parseFloat(getTotalPrice()) * 1.08).toFixed(2)}
                </Text>
              </View>

              <TouchableOpacity style={styles.checkoutButton}>
                <LinearGradient
                  colors={[ACCENT_COLOR, "#7A86FF"]}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 0 }}
                  style={styles.checkoutGradient}
                >
                  <Text style={styles.checkoutButtonText}>
                    Proceed to Checkout
                  </Text>
                </LinearGradient>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal> */}
      <OrderSummaryModal
        visible={showOrderModal}
        onClose={() => setShowOrderModal(false)}
        products={PRODUCTS}
        cart={cart}
        variantCart={variantCart}
        getTotalPrice={getTotalPrice}
        handleDecrement={handleDecrement}
        handleIncrement={handleIncrement}
        handleVariantDecrement={handleVariantDecrement}
        handleVariantIncrement={handleVariantIncrement}
      />

      {/* Product Variants Modal */}
      <VarientModal
        visible={showVariantModal}
        onClose={() => setShowVariantModal(false)}
        variantCart={variantCart}
        handleVariantDecrement={handleVariantDecrement}
        handleVariantIncrement={handleVariantIncrement}
      />
      {/* <Modal
        visible={showVariantModal}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setShowVariantModal(false)}
      >
        <View style={styles.modalOverlay}>
          <BlurView intensity={15} style={StyleSheet.absoluteFill} tint="dark" />
          
          <View style={styles.variantModal}>
            {selectedProduct && (
              <>
                <View style={styles.modalHandle} />
                
                <View style={styles.modalHeader}>
                  <Text style={styles.modalTitle}>{selectedProduct.name} Variants</Text>
                  <TouchableOpacity 
                    style={styles.closeButtonContainer}
                    onPress={() => setShowVariantModal(false)}
                  >
                    <Text style={styles.closeButton}>×</Text>
                  </TouchableOpacity>
                </View>
                
                <ScrollView style={styles.variantsList} showsVerticalScrollIndicator={false}>
                  {selectedProduct.variants.map((variant: any) => {
                    const quantity = variantCart[variant.id] || 0;
                    
                    return (
                      <View key={variant.id} style={styles.variantItem}>
                        <View style={styles.variantInfo}>
                          <Text style={styles.variantName}>{variant.name}</Text>
                          <Text style={styles.variantPrice}>${variant.price}</Text>
                        </View>
                        
                        <View style={styles.variantQuantity}>
                          {quantity > 0 ? (
                            <View style={styles.quantityControlGroup}>
                              <TouchableOpacity
                                style={styles.variantQuantityButton}
                                onPress={() => handleVariantDecrement(variant.id)}
                              >
                                <Text style={styles.quantityButtonText}>−</Text>
                              </TouchableOpacity>
                              
                              <Text style={styles.quantityText}>{quantity}</Text>
                              
                              <TouchableOpacity
                                style={[styles.variantQuantityButton, styles.variantIncrementButton]}
                                onPress={() => handleVariantIncrement(variant.id)}
                              >
                                <Text style={[styles.quantityButtonText, {color: '#FFFFFF'}]}>+</Text>
                              </TouchableOpacity>
                            </View>
                          ) : (
                            <TouchableOpacity
                              style={styles.variantAddButton}
                              onPress={() => handleVariantIncrement(variant.id)}
                            >
                              <Text style={styles.variantAddButtonText}>Add</Text>
                            </TouchableOpacity>
                          )}
                        </View>
                      </View>
                    );
                  })}
                </ScrollView>
                
                <TouchableOpacity
                  style={styles.doneButton}
                  onPress={() => setShowVariantModal(false)}
                >
                  <LinearGradient
                    colors={[ACCENT_COLOR, '#7A86FF']}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 0 }}
                    style={styles.doneButtonGradient}
                  >
                    <Text style={styles.doneButtonText}>Done</Text>
                  </LinearGradient>
                </TouchableOpacity>
              </>
            )}
          </View>
        </View>
      </Modal> */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FAFBFF",
  },
  header: {
    paddingTop: 60,
    paddingBottom: 10,
    backgroundColor: "#FFFFFF",
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.07,
    shadowRadius: 10,
    elevation: 5,
    zIndex: 10,
  },
  headerTop: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    marginBottom: 15,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: "700",
    color: "#212529",
  },
  cartButton: {
    borderRadius: 16,
    overflow: "hidden",
  },
  cartIndicator: {
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
  },
  cartIndicatorText: {
    color: "#FFFFFF",
    fontWeight: "600",
    fontSize: 14,
  },
  searchContainer: {
    paddingHorizontal: 20,
    marginBottom: 15,
  },
  searchBar: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F5F6FA",
    borderRadius: 15,
    paddingHorizontal: 15,
    height: 50,
  },
  searchIcon: {
    fontSize: 16,
    marginRight: 10,
    color: "#9DA3B4",
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: "#212529",
  },
  clearButton: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: "#E0E0E0",
    justifyContent: "center",
    alignItems: "center",
  },
  clearButtonText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#7A7A7A",
    textAlign: "center",
  },
  categoriesContainer: {
    marginBottom: 10,
  },
  categoriesList: {
    paddingHorizontal: 16,
    paddingVertical: 5,
  },
  categoryItem: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginHorizontal: 4,
    borderRadius: 20,
    backgroundColor: "#F0F2F5",
  },
  selectedCategoryItem: {
    backgroundColor: ACCENT_COLOR,
  },
  categoryText: {
    fontSize: 14,
    fontWeight: "500",
    color: "#555555",
  },
  selectedCategoryText: {
    color: "#FFFFFF",
  },
  productList: {
    paddingHorizontal: 10,
    paddingTop: 20,
    paddingBottom: 100,
  },
  productRow: {
    justifyContent: "space-between",
    paddingHorizontal: 10,
  },
  productCardContainer: {
    width: (width - 50) / 2,
    marginBottom: 20,
  },
  productCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    padding: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.1,
    shadowRadius: 15,
    elevation: 5,
    height: 280,
    justifyContent: "space-between",
  },
  imageContainer: {
    position: "relative",
    borderRadius: 16,
    overflow: "hidden",
    marginBottom: 12,
  },
  productImage: {
    width: "100%",
    height: 140,
    borderRadius: 16,
    backgroundColor: "#F8F9FA",
  },
  imageGradient: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  productBadge: {
    position: "absolute",
    top: 20,
    right: 20,
    backgroundColor: "rgba(77, 93, 250, 0.1)",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  productBadgeText: {
    color: ACCENT_COLOR,
    fontSize: 10,
    fontWeight: "600",
  },
  categoryBadge: {
    position: "absolute",
    top: 140,
    left: 20,
    backgroundColor: "rgba(255, 138, 101, 0.15)",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  categoryBadgeText: {
    color: SECONDARY_COLOR,
    fontSize: 10,
    fontWeight: "600",
  },
  productInfo: {
    marginBottom: 12,
  },
  productName: {
    fontSize: 16,
    fontWeight: "600",
    color: "#212529",
    marginBottom: 4,
  },
  productPrice: {
    fontSize: 18,
    fontWeight: "700",
    color: ACCENT_COLOR,
  },
  quantityContainer: {
    marginTop: "auto",
  },
  quantityControls: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    height: 36,
  },

  addButton: {
    borderRadius: 12,
    overflow: "hidden",
  },
  addButtonGradient: {
    paddingVertical: 12,
    alignItems: "center",
    borderRadius: 12,
  },
  addButtonText: {
    color: "#FFFFFF",
    fontWeight: "600",
    fontSize: 14,
  },
  quantityButton: {
    width: 32,
    height: 32,
    backgroundColor: "#F0F2F5",
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  incrementButton: {
    backgroundColor: ACCENT_COLOR,
  },
  quantityButtonText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#555555",
  },
  quantityText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#212529",
    marginHorizontal: 10,
  },
  noResultsContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  noResultsText: {
    fontSize: 18,
    fontWeight: "600",
    color: "#212529",
    marginBottom: 8,
  },
  noResultsSubtext: {
    fontSize: 14,
    color: "#6C757D",
    textAlign: "center",
  },
  footerContainer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    paddingTop: 15,
  },
  footerGradient: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    height: 50,
  },
  footerContent: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 15,
    backgroundColor: "#FFFFFF",
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: -5 },
    shadowOpacity: 0.1,
    shadowRadius: 15,
    elevation: 5,
  },
  footerLeftContent: {
    justifyContent: "center",
  },
  totalItemsText: {
    fontSize: 14,
    color: "#6C757D",
    marginBottom: 4,
  },
  totalPriceText: {
    fontSize: 20,
    fontWeight: "700",
    color: "#212529",
  },
  placeOrderButton: {
    borderRadius: 14,
    overflow: "hidden",
  },
  placeOrderGradient: {
    paddingVertical: 14,
    paddingHorizontal: 20,
    borderRadius: 14,
  },
  placeOrderButtonText: {
    color: "#FFFFFF",
    fontWeight: "600",
    fontSize: 16,
  },
});
