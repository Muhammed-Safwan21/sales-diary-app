import {
  Image,
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import { LinearGradient } from "expo-linear-gradient";
import { BlurView } from "expo-blur";
const ACCENT_COLOR = "#4D5DFA";

const OrderSummaryModal = ({
  visible,
  onClose,
  products,
  cart,
  handleIncrement,
  handleDecrement,
  variantCart,
  getTotalPrice,
  handleVariantIncrement,
  handleVariantDecrement,
}: any) => {
  return (
    <Modal
      visible={visible}
      transparent={true}
      animationType="slide"
      onRequestClose={onClose}
    >
      <View style={styles.modalOverlay}>
        <BlurView intensity={15} style={StyleSheet.absoluteFill} tint="dark" />

        <View style={styles.orderModal}>
          <View style={styles.modalHandle} />

          <View style={styles.modalHeader}>
            <Text style={styles.modalTitle}>Order Summary</Text>
            <TouchableOpacity
              style={styles.closeButtonContainer}
              onPress={onClose}
            >
              <Text style={styles.closeButton}>×</Text>
            </TouchableOpacity>
          </View>

          <ScrollView
            style={styles.orderItems}
            showsVerticalScrollIndicator={false}
          >
            {/* Base products in cart */}
            {Object.keys(cart).map((productId) => {
              const product = products.find(
                (p: any) => p.id === parseInt(productId)
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
                          style={[styles.quantityControl, { color: "#FFFFFF" }]}
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

            {/* Variant products in cart */}
            {Object.keys(variantCart).map((variantId) => {
              const variant = products
                .flatMap((p: any) => p.variants)
                .find((v: any) => v.id === parseInt(variantId));
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
                          style={[styles.quantityControl, { color: "#FFFFFF" }]}
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
    </Modal>
  );
};

export default OrderSummaryModal;

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    justifyContent: "flex-end",
    backgroundColor: "rgba(0, 0, 0, 0.4)",
  },
  orderModal: {
    backgroundColor: "#FFFFFF",
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingTop: 15,
  },
  modalHandle: {
    width: 40,
    height: 5,
    backgroundColor: "#E0E0E0",
    borderRadius: 3,
    alignSelf: "center",
    marginBottom: 15,
  },
  modalHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: "#212529",
  },
  closeButtonContainer: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: "#F0F2F5",
    justifyContent: "center",
    alignItems: "center",
  },
  closeButton: {
    fontSize: 20,
    fontWeight: "600",
    color: "#555555",
    lineHeight: 24,
  },
  orderItems: {
    paddingHorizontal: 20,
  },
  orderItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  orderItemImage: {
    width: 60,
    height: 60,
    borderRadius: 12,
    backgroundColor: "#F8F9FA",
  },
  orderItemDetails: {
    flex: 1,
    marginLeft: 15,
  },
  orderItemName: {
    fontSize: 16,
    fontWeight: "600",
    color: "#212529",
    marginBottom: 4,
  },
  orderItemPrice: {
    fontSize: 16,
    fontWeight: "700",
    color: ACCENT_COLOR,
  },
  orderItemQuantity: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F5F6FA",
    borderRadius: 10,
    padding: 4,
  },
  orderQuantityButton: {
    width: 28,
    height: 28,
    backgroundColor: "#FFFFFF",
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
  },
  orderIncrementButton: {
    backgroundColor: ACCENT_COLOR,
  },
  orderQuantityText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#212529",
    marginHorizontal: 10,
  },
  quantityControl: {
    fontSize: 14,
    fontWeight: "600",
    color: "#555555",
  },
  variantItemImage: {
    width: 60,
    height: 60,
    borderRadius: 12,
    overflow: "hidden",
  },
  variantImageGradient: {
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  variantLabel: {
    fontSize: 12,
    fontWeight: "600",
    color: ACCENT_COLOR,
  },
  orderSummary: {
    paddingHorizontal: 20,
    paddingVertical: 20,
    borderTopWidth: 1,
    borderTopColor: "#F0F2F5",
  },
  summaryRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  summaryLabel: {
    fontSize: 16,
    color: "#6C757D",
  },
  summaryValue: {
    fontSize: 16,
    fontWeight: "600",
    color: "#212529",
  },
  totalRow: {
    marginTop: 10,
    paddingTop: 15,
    borderTopWidth: 1,
    borderTopColor: "#F0F2F5",
    marginBottom: 20,
  },
  totalLabel: {
    fontSize: 18,
    fontWeight: "600",
    color: "#212529",
  },
  totalValue: {
    fontSize: 20,
    fontWeight: "700",
    color: ACCENT_COLOR,
  },
  checkoutButton: {
    borderRadius: 14,
    overflow: "hidden",
  },
  checkoutGradient: {
    paddingVertical: 16,
    alignItems: "center",
    borderRadius: 14,
  },
  checkoutButtonText: {
    color: "#FFFFFF",
    fontWeight: "600",
    fontSize: 18,
  },
  orderImageContainer: {
    position: "relative",
    width: 60,
    height: 60,
    borderRadius: 12,
    overflow: "hidden",
  },
  orderImageGradient: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    borderRadius: 12,
  },
});
