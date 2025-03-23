import {
  Image,
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import { BlurView } from "expo-blur";
import { ScrollView } from "react-native";
import { LinearGradient } from "expo-linear-gradient";

const ACCENT_COLOR = "#4D5DFA";

const VariantModal = ({
  visible,
  onClose,
  selectedProduct,
  handleVariantDecrement,
  handleVariantIncrement,
  variantCart,
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
                      {variant.image ? (
                        <View style={styles.orderImageContainer}>
                          <Image
                            source={{ uri: variant.image }}
                            style={styles.orderItemImage}
                          />
                          <LinearGradient
                            colors={["rgba(0,0,0,0.01)", "rgba(0,0,0,0.1)"]}
                            start={{ x: 0, y: 0 }}
                            end={{ x: 0, y: 1 }}
                            style={styles.orderImageGradient}
                          />
                        </View>
                      ) : (
                        <View style={styles.variantItemImage}>
                          <LinearGradient
                            colors={["#E3E6FF", "#D1D8FF"]}
                            style={styles.variantImageGradient}
                          >
                            <Text style={styles.variantLabel}>Variant</Text>
                          </LinearGradient>
                        </View>
                      )}

                      <View style={styles.variantItemDetails}>
                        <Text style={styles.variantItemName}>
                          {variant.name}
                        </Text>
                        <Text style={styles.variantItemPrice}>
                          ${variant.price}
                        </Text>
                      </View>

                      <View style={styles.variantItemQuantity}>
                        <TouchableOpacity
                          style={styles.variantQuantityButton}
                          onPress={() => handleVariantDecrement(variant.id)}
                        >
                          <Text style={styles.quantityControl}>−</Text>
                        </TouchableOpacity>

                        <Text style={styles.variantQuantityText}>
                          {quantity}
                        </Text>

                        <TouchableOpacity
                          style={[
                            styles.variantQuantityButton,
                            styles.variantIncrementButton,
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
                })}
              </ScrollView>

              <View style={styles.variantFooter}>
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
              </View>
            </>
          )}
        </View>
      </View>
    </Modal>
  );
};

export default VariantModal;

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    justifyContent: "flex-end",
    backgroundColor: "rgba(0, 0, 0, 0.4)",
  },
  variantModal: {
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
  variantsList: {
    paddingHorizontal: 20,
  },
  variantItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  variantItemImage: {
    width: 60,
    height: 60,
    borderRadius: 12,
    overflow: "hidden",
    backgroundColor: "#F8F9FA",
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
  variantItemDetails: {
    flex: 1,
    marginLeft: 15,
  },
  variantItemName: {
    fontSize: 16,
    fontWeight: "600",
    color: "#212529",
    marginBottom: 4,
  },
  variantItemPrice: {
    fontSize: 16,
    fontWeight: "700",
    color: ACCENT_COLOR,
  },
  variantItemQuantity: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F5F6FA",
    borderRadius: 10,
    padding: 4,
  },
  variantQuantityButton: {
    width: 28,
    height: 28,
    backgroundColor: "#FFFFFF",
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
  },
  variantIncrementButton: {
    backgroundColor: ACCENT_COLOR,
  },
  variantQuantityText: {
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
  variantFooter: {
    paddingHorizontal: 20,
    paddingVertical: 20,
    borderTopWidth: 1,
    borderTopColor: "#F0F2F5",
  },
  doneButton: {
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
  orderItemImage: {
    width: 60,
    height: 60,
    borderRadius: 12,
    backgroundColor: "#F8F9FA",
  },
});
