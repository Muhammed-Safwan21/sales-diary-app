import { Modal, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { BlurView } from "expo-blur";
import { ScrollView } from "moti";
import { LinearGradient } from "expo-linear-gradient";
const ACCENT_COLOR = "#4D5DFA";
const SECONDARY_COLOR = "#FF8A65";

const VarientModal = ({
  visible,
  onClose,
  selectedProduct,
  handleVariantDecrement,
  handleVariantIncrement,
  variantCart
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

        <View style={styles.variantModal}>
          {selectedProduct && (
            <>
              <View style={styles.modalHandle} />

              <View style={styles.modalHeader}>
                <Text style={styles.modalTitle}>
                  {selectedProduct.name} Variants
                </Text>
                <TouchableOpacity
                  style={styles.closeButtonContainer}
                  onPress={onClose}
                >
                  <Text style={styles.closeButton}>×</Text>
                </TouchableOpacity>
              </View>

              <ScrollView
                style={styles.variantsList}
                showsVerticalScrollIndicator={false}
              >
                {selectedProduct.variants.map((variant: any) => {
                  const quantity = variantCart[variant.id] || 0;

                  return (
                    <View key={variant.id} style={styles.variantItem}>
                      <View style={styles.variantInfo}>
                        <Text style={styles.variantName}>{variant.name}</Text>
                        <Text style={styles.variantPrice}>
                          ${variant.price}
                        </Text>
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
                              style={[
                                styles.variantQuantityButton,
                                styles.variantIncrementButton,
                              ]}
                              onPress={() => handleVariantIncrement(variant.id)}
                            >
                              <Text
                                style={[
                                  styles.quantityButtonText,
                                  { color: "#FFFFFF" },
                                ]}
                              >
                                +
                              </Text>
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

              <TouchableOpacity style={styles.doneButton} onPress={onClose}>
                <LinearGradient
                  colors={[ACCENT_COLOR, "#7A86FF"]}
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
    </Modal>
  );
};

export default VarientModal;

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
    maxHeight: 300,
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
    // maxHeight: height * 0.4,
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
  variantModal: {
    backgroundColor: "#FFFFFF",
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingTop: 15,
    maxHeight: 300,
  },
  variantsList: {
    paddingHorizontal: 20,
    maxHeight: 300,
  },
  variantItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#F0F2F5",
  },
  variantInfo: {
    flex: 1,
  },
  variantName: {
    fontSize: 16,
    fontWeight: "600",
    color: "#212529",
    marginBottom: 4,
  },
  variantPrice: {
    fontSize: 16,
    fontWeight: "700",
    color: ACCENT_COLOR,
  },
  variantQuantity: {
    flexDirection: "row",
    alignItems: "center",
  },
  variantQuantityButton: {
    width: 32,
    height: 32,
    backgroundColor: "#F5F6FA",
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 5,
  },
  variantIncrementButton: {
    backgroundColor: ACCENT_COLOR,
  },
  variantAddButton: {
    backgroundColor: ACCENT_COLOR,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 10,
  },
  variantAddButtonText: {
    color: "#FFFFFF",
    fontWeight: "600",
    fontSize: 14,
  },
  doneButton: {
    marginHorizontal: 20,
    marginVertical: 20,
    borderRadius: 14,
    overflow: "hidden",
  },
  doneButtonGradient: {
    paddingVertical: 16,
    alignItems: "center",
    borderRadius: 14,
  },
  doneButtonText: {
    color: "#FFFFFF",
    fontWeight: "600",
    fontSize: 18,
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
  quantityButton: {
    width: 32,
    height: 32,
    backgroundColor: "#F0F2F5",
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  quantityControlGroup: {
    flexDirection: "row",
    alignItems: "center",
  },
});
