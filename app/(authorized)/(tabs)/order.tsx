// // // // import { LinearGradient } from "expo-linear-gradient";
// // // // import React, { useState } from "react";
// // // // import {
// // // //   Dimensions,
// // // //   FlatList,
// // // //   Image,
// // // //   StatusBar,
// // // //   StyleSheet,
// // // //   Text,
// // // //   TextInput,
// // // //   TouchableOpacity,
// // // //   View,
// // // // } from "react-native";
// // // // import OrderSummaryModal from "../_components/orderSummaryModal";
// // // // import VarientModal from "../_components/varientModal";

// // // // // Sample product data kept the same
// // // // const PRODUCTS = [
// // // //   {
// // // //     id: 1,
// // // //     name: "iPhone 14 Pro",
// // // //     price: 999,
// // // //     image:
// // // //       "https://www.dxomark.com/wp-content/uploads/medias/post-125834/Apple-iPhone-14_FINAL_featured-image-packshot-review.jpg",
// // // //     variants: [
// // // //       { id: 101, name: "iPhone 14 Pro 128GB", price: 999 },
// // // //       { id: 102, name: "iPhone 14 Pro 256GB", price: 1099 },
// // // //       { id: 103, name: "iPhone 14 Pro 512GB", price: 1299 },
// // // //     ],
// // // //     category: "Phones",
// // // //   },
// // // //   {
// // // //     id: 2,
// // // //     name: "MacBook Air",
// // // //     price: 1199,
// // // //     image:
// // // //       "https://alephksa.com/cdn/shop/files/MacBook_Air_15_in_M3_Midnight_PDP_Image_Position_1__en-AE_9c8e6839-222d-45c3-b903-053481a92ef6.jpg?v=1709594809&width=823",
// // // //     variants: [
// // // //       { id: 201, name: "MacBook Air 8GB/256GB", price: 1199 },
// // // //       { id: 202, name: "MacBook Air 16GB/512GB", price: 1499 },
// // // //     ],
// // // //     category: "Laptops",
// // // //   },
// // // //   {
// // // //     id: 3,
// // // //     name: "AirPods Pro",
// // // //     price: 249,
// // // //     image:
// // // //       "https://www.tech21.com/cdn/shop/files/1eee32c5-e890-4159-88e9-eb5a9cf980ec.jpg?v=1718361342",
// // // //     variants: [
// // // //       {
// // // //         id: 301,
// // // //         image:
// // // //           "https://www.tech21.com/cdn/shop/files/1eee32c5-e890-4159-88e9-eb5a9cf980ec.jpg?v=1718361342",
// // // //         name: "AirPods Pro",
// // // //         price: 249,
// // // //       },
// // // //       { id: 302, name: "AirPods Pro with MagSafe Case", price: 279 },
// // // //     ],
// // // //     category: "Audio",
// // // //   },
// // // //   {
// // // //     id: 4,
// // // //     name: "iPad Air",
// // // //     price: 599,
// // // //     image:
// // // //       "https://store.storeimages.cdn-apple.com/1/as-images.apple.com/is/ipad-pro-storage-select-202405-11inch-silver-glossy-wifi?wid=5120&hei=2880&fmt=p-jpg&qlt=80&.v=czlRMVFIQnlSdTl0T3ZTQUtJUW9rMm5pQUoxb0NIVEJFSjRVRzZ4dzV5VHhzSVRSdnBuOHFlMHZ5cERpS2J3bFZ4Z1Fxa3Y4V1F0eXdGcDVzSnYvZ3J4M3lYcDIyK01lckZBaW5GTC9DMEQxcjBVRyswWG14bEI4WVZBcUIybEZTMW5aeVlPZFhiTTZza0hENEFwOTlB&traceId=1",
// // // //     variants: [
// // // //       {
// // // //         id: 401,
// // // //         image:
// // // //           "https://www.dxomark.com/wp-content/uploads/medias/post-125834/Apple-iPhone-14_FINAL_featured-image-packshot-review.jpg",
// // // //         name: "iPad Air 64GB",
// // // //         price: 599,
// // // //       },
// // // //       { id: 402, name: "iPad Air 256GB", price: 749 },
// // // //     ],
// // // //     category: "Tablets",
// // // //   },
// // // //   {
// // // //     id: 5,
// // // //     name: "Apple Watch",
// // // //     price: 399,
// // // //     image:
// // // //       "https://www.greenware.lk/wp-content/uploads/2024/09/Apple-Watch-Series-10-Price-in-Sri-Lanka.webp",
// // // //     variants: [
// // // //       { id: 501, name: "Apple Watch Series 8 GPS", price: 399 },
// // // //       { id: 502, name: "Apple Watch Series 8 Cellular", price: 499 },
// // // //     ],
// // // //     category: "Wearables",
// // // //   },
// // // //   {
// // // //     id: 6,
// // // //     name: "HomePod mini",
// // // //     price: 99,
// // // //     image:
// // // //       "https://api.runbazaar.com/media/__sized__/product_img/2021/07/15/RBI000000000036/MJ2E3-YL_IMG_1_KtuTHrS-smart_crop-c0-5__0-5-750x750-70.jpg",
// // // //     variants: [
// // // //       { id: 601, name: "HomePod mini White", price: 99 },
// // // //       { id: 602, name: "HomePod mini Space Gray", price: 99 },
// // // //     ],
// // // //     category: "Home",
// // // //   },
// // // // ];

// // // // // Extract unique categories
// // // // const CATEGORIES = [
// // // //   "All",
// // // //   ...new Set(PRODUCTS.map((product) => product.category)),
// // // // ];

// // // // const { width } = Dimensions.get("window");
// // // // const ACCENT_COLOR = "#4D5DFA";
// // // // const SECONDARY_COLOR = "#FF8A65";

// // // // export default function ProductListingScreen() {
// // // //   const [cart, setCart] = useState<any>({});
// // // //   const [variantCart, setVariantCart] = useState<any>({});
// // // //   const [showOrderModal, setShowOrderModal] = useState(false);
// // // //   const [selectedProduct, setSelectedProduct] = useState<any>(null);
// // // //   const [showVariantModal, setShowVariantModal] = useState(false);
// // // //   const [searchQuery, setSearchQuery] = useState("");
// // // //   const [selectedCategory, setSelectedCategory] = useState("All");

// // // //   // Filter products based on search query and selected category
// // // //   const filteredProducts = PRODUCTS.filter((product) => {
// // // //     const matchesSearch = product.name
// // // //       .toLowerCase()
// // // //       .includes(searchQuery.toLowerCase());
// // // //     const matchesCategory =
// // // //       selectedCategory === "All" || product.category === selectedCategory;
// // // //     return matchesSearch && matchesCategory;
// // // //   });

// // // //   const handleIncrement = (productId: any) => {
// // // //     setCart((prevCart: any) => ({
// // // //       ...prevCart,
// // // //       [productId]: (prevCart[productId] || 0) + 1,
// // // //     }));
// // // //   };

// // // //   const handleDecrement = (productId: any) => {
// // // //     if (cart[productId] && cart[productId] > 0) {
// // // //       setCart((prevCart: any) => ({
// // // //         ...prevCart,
// // // //         [productId]: prevCart[productId] - 1,
// // // //       }));
// // // //     }
// // // //   };

// // // //   const handleVariantIncrement = (variantId: any) => {
// // // //     setVariantCart((prevCart: any) => ({
// // // //       ...prevCart,
// // // //       [variantId]: (prevCart[variantId] || 0) + 1,
// // // //     }));
// // // //   };

// // // //   const handleVariantDecrement = (variantId: any) => {
// // // //     if (variantCart[variantId] && variantCart[variantId] > 0) {
// // // //       setVariantCart((prevCart: any) => ({
// // // //         ...prevCart,
// // // //         [variantId]: prevCart[variantId] - 1,
// // // //       }));
// // // //     }
// // // //   };

// // // //   const showVariants = (product: any) => {
// // // //     setSelectedProduct(product);
// // // //     setShowVariantModal(true);
// // // //   };

// // // //   const getTotalPrice = () => {
// // // //     let total = 0;

// // // //     // Calculate total for base products
// // // //     Object.keys(cart).forEach((productId) => {
// // // //       const product = PRODUCTS.find((p) => p.id === parseInt(productId));
// // // //       if (product) {
// // // //         total += product.price * cart[productId];
// // // //       }
// // // //     });

// // // //     // Calculate total for variant products
// // // //     Object.keys(variantCart).forEach((variantId) => {
// // // //       const variant = PRODUCTS.flatMap((p) => p.variants).find(
// // // //         (v) => v.id === parseInt(variantId)
// // // //       );
// // // //       if (variant) {
// // // //         total += variant.price * variantCart[variantId];
// // // //       }
// // // //     });

// // // //     return total.toFixed(2);
// // // //   };

// // // //   const getTotalItems = () => {
// // // //     const baseItems: any = Object.values(cart).reduce(
// // // //       (sum: any, qty: any) => sum + qty,
// // // //       0
// // // //     );
// // // //     const variantItems = Object.values(variantCart).reduce(
// // // //       (sum: any, qty: any) => sum + qty,
// // // //       0
// // // //     );
// // // //     return baseItems + variantItems;
// // // //   };

// // // //   const renderProduct = ({ item }: any) => {
// // // //     const quantity = cart[item.id] || 0;

// // // //     return (
// // // //       <View style={styles.productCardContainer}>
// // // //         <TouchableOpacity
// // // //           style={styles.productCard}
// // // //           activeOpacity={0.9}
// // // //           onLongPress={() => showVariants(item)}
// // // //         >
// // // //           <View style={styles.imageContainer}>
// // // //             <Image source={{ uri: item.image }} style={styles.productImage} />
// // // //             <LinearGradient
// // // //               colors={["rgba(0,0,0,0.02)", "rgba(0,0,0,0.15)"]}
// // // //               start={{ x: 0, y: 0 }}
// // // //               end={{ x: 0, y: 1 }}
// // // //               style={styles.imageGradient}
// // // //             />
// // // //           </View>

// // // //           <View style={styles.productBadge}>
// // // //             <Text style={styles.productBadgeText}>
// // // //               {item.variants.length} variants
// // // //             </Text>
// // // //           </View>
// // // //           <View style={styles.productInfo}>
// // // //             <Text style={styles.productName}>{item.name}</Text>
// // // //             <Text style={styles.productPrice}>${item.price}</Text>
// // // //           </View>

// // // //           <View style={styles.quantityContainer}>
// // // //             {quantity > 0 ? (
// // // //               <View style={styles.quantityControls}>
// // // //                 <TouchableOpacity
// // // //                   style={styles.quantityButton}
// // // //                   onPress={() => handleDecrement(item.id)}
// // // //                 >
// // // //                   <Text style={styles.quantityButtonText}>−</Text>
// // // //                 </TouchableOpacity>

// // // //                 <Text style={styles.quantityText}>{quantity}</Text>

// // // //                 <TouchableOpacity
// // // //                   style={[styles.quantityButton, styles.incrementButton]}
// // // //                   onPress={() => handleIncrement(item.id)}
// // // //                 >
// // // //                   <Text
// // // //                     style={[styles.quantityButtonText, { color: "#FFFFFF" }]}
// // // //                   >
// // // //                     +
// // // //                   </Text>
// // // //                 </TouchableOpacity>
// // // //               </View>
// // // //             ) : (
// // // //               <TouchableOpacity
// // // //                 style={styles.addButton}
// // // //                 onPress={() => handleIncrement(item.id)}
// // // //               >
// // // //                 <LinearGradient
// // // //                   colors={[ACCENT_COLOR, "#7A86FF"]}
// // // //                   start={{ x: 0, y: 0 }}
// // // //                   end={{ x: 1, y: 0 }}
// // // //                   style={styles.addButtonGradient}
// // // //                 >
// // // //                   <Text style={styles.addButtonText}>Add</Text>
// // // //                 </LinearGradient>
// // // //               </TouchableOpacity>
// // // //             )}
// // // //           </View>
// // // //         </TouchableOpacity>
// // // //       </View>
// // // //     );
// // // //   };

// // // //   const renderCategoryItem = ({ item }: any) => (
// // // //     <TouchableOpacity
// // // //       style={[
// // // //         styles.categoryItem,
// // // //         selectedCategory === item && styles.selectedCategoryItem,
// // // //       ]}
// // // //       onPress={() => setSelectedCategory(item)}
// // // //     >
// // // //       <Text
// // // //         style={[
// // // //           styles.categoryText,
// // // //           selectedCategory === item && styles.selectedCategoryText,
// // // //         ]}
// // // //       >
// // // //         {item}
// // // //       </Text>
// // // //     </TouchableOpacity>
// // // //   );

// // // //   return (
// // // //     <View style={styles.container}>
// // // //       <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />

// // // //       {/* <View style={styles.header}>
// // // //         <View style={styles.headerTop}>
// // // //           <Text style={styles.headerTitle}>Premium Tech</Text>
// // // //           <TouchableOpacity
// // // //             style={styles.cartButton}
// // // //             onPress={() => getTotalItems() > 0 && setShowOrderModal(true)}
// // // //           >
// // // //             <LinearGradient
// // // //               colors={
// // // //                 getTotalItems() > 0
// // // //                   ? [ACCENT_COLOR, "#7A86FF"]
// // // //                   : ["#E0E0E0", "#F0F0F0"]
// // // //               }
// // // //               style={styles.cartIndicator}
// // // //             >
// // // //               <Text style={styles.cartIndicatorText}>{getTotalItems()}</Text>
// // // //             </LinearGradient>
// // // //           </TouchableOpacity>
// // // //         </View>

// // // //         <View style={styles.searchAndCategoriesContainer}>
// // // //           <View style={styles.searchBar}>
// // // //             <Text style={styles.searchIcon}>🔍</Text>
// // // //             <TextInput
// // // //               style={styles.searchInput}
// // // //               placeholder="Search products..."
// // // //               placeholderTextColor="#9DA3B4"
// // // //               value={searchQuery}
// // // //               onChangeText={setSearchQuery}
// // // //             />
// // // //             {searchQuery.length > 0 && (
// // // //               <TouchableOpacity
// // // //                 style={styles.clearButton}
// // // //                 onPress={() => setSearchQuery("")}
// // // //               >
// // // //                 <Text style={styles.clearButtonText}>✕</Text>
// // // //               </TouchableOpacity>
// // // //             )}
// // // //           </View>

// // // //           <FlatList
// // // //             data={CATEGORIES}
// // // //             renderItem={renderCategoryItem}
// // // //             keyExtractor={(item) => item}
// // // //             horizontal
// // // //             showsHorizontalScrollIndicator={false}
// // // //             contentContainerStyle={styles.categoriesList}
// // // //           />
// // // //         </View>
// // // //       </View> */}
// // // //       <View style={styles.header}>
// // // //         <View style={styles.headerTop}>
// // // //           <View>
// // // //             <Text style={styles.headerTitle}>Products</Text>
// // // //             <Text
// // // //               style={{
// // // //                 fontSize: 14,
// // // //                 color: "#6C757D",
// // // //                 marginTop: 2,
// // // //                 fontWeight: "500",
// // // //               }}
// // // //             >
// // // //               Find your perfect device
// // // //             </Text>
// // // //           </View>
// // // //           <TouchableOpacity
// // // //             style={styles.cartButton}
// // // //             onPress={() => getTotalItems() > 0 && setShowOrderModal(true)}
// // // //           >
// // // //             <LinearGradient
// // // //               colors={
// // // //                 getTotalItems() > 0
// // // //                   ? [ACCENT_COLOR, "#7A86FF"]
// // // //                   : ["#E0E0E0", "#F0F0F0"]
// // // //               }
// // // //               style={styles.cartIndicator}
// // // //             >
// // // //               <Text style={styles.cartIndicatorText}>{getTotalItems()}</Text>
// // // //             </LinearGradient>
// // // //           </TouchableOpacity>
// // // //         </View>

// // // //         <View style={styles.searchAndCategoriesContainer}>
// // // //           <View style={styles.searchBar}>
// // // //             <Text style={styles.searchIcon}>🔍</Text>
// // // //             <TextInput
// // // //               style={styles.searchInput}
// // // //               placeholder="Search premium products..."
// // // //               placeholderTextColor="#9DA3B4"
// // // //               value={searchQuery}
// // // //               onChangeText={setSearchQuery}
// // // //             />
// // // //             {searchQuery.length > 0 && (
// // // //               <TouchableOpacity
// // // //                 style={styles.clearButton}
// // // //                 onPress={() => setSearchQuery("")}
// // // //               >
// // // //                 <Text style={styles.clearButtonText}>✕</Text>
// // // //               </TouchableOpacity>
// // // //             )}
// // // //           </View>

// // // //           <FlatList
// // // //             data={CATEGORIES}
// // // //             renderItem={renderCategoryItem}
// // // //             keyExtractor={(item) => item}
// // // //             horizontal
// // // //             showsHorizontalScrollIndicator={false}
// // // //             contentContainerStyle={styles.categoriesList}
// // // //           />
// // // //         </View>
// // // //       </View>

// // // //       {filteredProducts.length > 0 ? (
// // // //         <FlatList
// // // //           data={filteredProducts}
// // // //           renderItem={renderProduct}
// // // //           keyExtractor={(item) => item.id.toString()}
// // // //           numColumns={2}
// // // //           columnWrapperStyle={styles.productRow}
// // // //           contentContainerStyle={styles.productList}
// // // //           showsVerticalScrollIndicator={false}
// // // //         />
// // // //       ) : (
// // // //         <View style={styles.noResultsContainer}>
// // // //           <Text style={styles.noResultsText}>No products found</Text>
// // // //           <Text style={styles.noResultsSubtext}>
// // // //             Try a different search or category
// // // //           </Text>
// // // //         </View>
// // // //       )}

// // // //       {getTotalItems() > 0 && (
// // // //         <View style={styles.footerContainer}>
// // // //           <LinearGradient
// // // //             colors={["rgba(255,255,255,0)", "rgba(255,255,255,0.9)", "#FFFFFF"]}
// // // //             style={styles.footerGradient}
// // // //           />
// // // //           <View style={styles.footerContent}>
// // // //             <View style={styles.footerLeftContent}>
// // // //               <Text style={styles.totalItemsText}>
// // // //                 {getTotalItems()} item{getTotalItems() !== 1 ? "s" : ""}
// // // //               </Text>
// // // //               <Text style={styles.totalPriceText}>${getTotalPrice()}</Text>
// // // //             </View>

// // // //             <TouchableOpacity
// // // //               style={styles.placeOrderButton}
// // // //               onPress={() => setShowOrderModal(true)}
// // // //             >
// // // //               <LinearGradient
// // // //                 colors={[ACCENT_COLOR, "#7A86FF"]}
// // // //                 start={{ x: 0, y: 0 }}
// // // //                 end={{ x: 1, y: 0 }}
// // // //                 style={styles.placeOrderGradient}
// // // //               >
// // // //                 <Text style={styles.placeOrderButtonText}>Place Order</Text>
// // // //               </LinearGradient>
// // // //             </TouchableOpacity>
// // // //           </View>
// // // //         </View>
// // // //       )}

// // // //       {/* Order Summary Modal */}
// // // //       <OrderSummaryModal
// // // //         visible={showOrderModal}
// // // //         onClose={() => setShowOrderModal(false)}
// // // //         products={PRODUCTS}
// // // //         cart={cart}
// // // //         variantCart={variantCart}
// // // //         getTotalPrice={getTotalPrice}
// // // //         handleDecrement={handleDecrement}
// // // //         handleIncrement={handleIncrement}
// // // //         handleVariantDecrement={handleVariantDecrement}
// // // //         handleVariantIncrement={handleVariantIncrement}
// // // //       />

// // // //       {/* Product Variants Modal */}
// // // //       <VarientModal
// // // //         visible={showVariantModal}
// // // //         onClose={() => setShowVariantModal(false)}
// // // //         variantCart={variantCart}
// // // //         handleVariantDecrement={handleVariantDecrement}
// // // //         handleVariantIncrement={handleVariantIncrement}
// // // //         selectedProduct={selectedProduct}
// // // //       />
// // // //     </View>
// // // //   );
// // // // }

// // // // const styles = StyleSheet.create({
// // // //   container: {
// // // //     flex: 1,
// // // //     backgroundColor: "#FAFBFF",
// // // //   },
// // // //   header: {
// // // //     paddingTop: 40,
// // // //     paddingBottom: 5,
// // // //     backgroundColor: "#FFFFFF",
// // // //     borderBottomLeftRadius: 20,
// // // //     borderBottomRightRadius: 20,
// // // //     shadowColor: "#000",
// // // //     shadowOffset: { width: 0, height: 3 },
// // // //     shadowOpacity: 0.05,
// // // //     shadowRadius: 6,
// // // //     elevation: 3,
// // // //     zIndex: 10,
// // // //   },
// // // //   headerTop: {
// // // //     flexDirection: "row",
// // // //     justifyContent: "space-between",
// // // //     alignItems: "center",
// // // //     paddingHorizontal: 16,
// // // //     marginBottom: 10,
// // // //   },
// // // //   headerTitle: {
// // // //     fontSize: 22,
// // // //     fontWeight: "700",
// // // //     color: "#212529",
// // // //   },
// // // //   cartButton: {
// // // //     borderRadius: 14,
// // // //     overflow: "hidden",
// // // //   },
// // // //   cartIndicator: {
// // // //     width: 28,
// // // //     height: 28,
// // // //     borderRadius: 14,
// // // //     justifyContent: "center",
// // // //     alignItems: "center",
// // // //   },
// // // //   cartIndicatorText: {
// // // //     color: "#FFFFFF",
// // // //     fontWeight: "600",
// // // //     fontSize: 13,
// // // //   },
// // // //   searchAndCategoriesContainer: {
// // // //     paddingHorizontal: 16,
// // // //   },
// // // //   searchBar: {
// // // //     flexDirection: "row",
// // // //     alignItems: "center",
// // // //     backgroundColor: "#F5F6FA",
// // // //     borderRadius: 12,
// // // //     paddingHorizontal: 12,
// // // //     height: 40,
// // // //     marginBottom: 8,
// // // //   },
// // // //   searchIcon: {
// // // //     fontSize: 14,
// // // //     marginRight: 8,
// // // //     color: "#9DA3B4",
// // // //   },
// // // //   searchInput: {
// // // //     flex: 1,
// // // //     fontSize: 14,
// // // //     color: "#212529",
// // // //   },
// // // //   clearButton: {
// // // //     width: 20,
// // // //     height: 20,
// // // //     borderRadius: 10,
// // // //     backgroundColor: "#E0E0E0",
// // // //     justifyContent: "center",
// // // //     alignItems: "center",
// // // //   },
// // // //   clearButtonText: {
// // // //     fontSize: 12,
// // // //     fontWeight: "600",
// // // //     color: "#7A7A7A",
// // // //     textAlign: "center",
// // // //   },
// // // //   categoriesList: {
// // // //     paddingVertical: 4,
// // // //   },
// // // //   categoryItem: {
// // // //     paddingHorizontal: 12,
// // // //     paddingVertical: 6,
// // // //     marginRight: 6,
// // // //     borderRadius: 16,
// // // //     backgroundColor: "#F0F2F5",
// // // //   },
// // // //   selectedCategoryItem: {
// // // //     backgroundColor: ACCENT_COLOR,
// // // //   },
// // // //   categoryText: {
// // // //     fontSize: 12,
// // // //     fontWeight: "500",
// // // //     color: "#555555",
// // // //   },
// // // //   selectedCategoryText: {
// // // //     color: "#FFFFFF",
// // // //   },
// // // //   productList: {
// // // //     paddingHorizontal: 8,
// // // //     paddingTop: 16,
// // // //     paddingBottom: 80,
// // // //   },
// // // //   productRow: {
// // // //     justifyContent: "space-between",
// // // //     paddingHorizontal: 8,
// // // //   },
// // // //   productCardContainer: {
// // // //     width: (width - 40) / 2,
// // // //     marginBottom: 12,
// // // //   },
// // // //   productCard: {
// // // //     backgroundColor: "#FFFFFF",
// // // //     borderRadius: 16,
// // // //     padding: 10,
// // // //     shadowColor: "#000",
// // // //     shadowOffset: { width: 0, height: 5 },
// // // //     shadowOpacity: 0.06,
// // // //     shadowRadius: 10,
// // // //     elevation: 4,
// // // //     height: 220,
// // // //     justifyContent: "space-between",
// // // //     borderWidth: 0.5,
// // // //     borderColor: "rgba(0,0,0,0.03)",
// // // //   },
// // // //   imageContainer: {
// // // //     position: "relative",
// // // //     borderRadius: 14,
// // // //     overflow: "hidden",
// // // //     marginBottom: 8,
// // // //     elevation: 1,
// // // //   },
// // // //   productImage: {
// // // //     width: "100%",
// // // //     height: 110,
// // // //     borderRadius: 14,
// // // //     backgroundColor: "#F8F9FA",
// // // //     resizeMode: "cover",
// // // //   },
// // // //   imageGradient: {
// // // //     position: "absolute",
// // // //     top: 0,
// // // //     left: 0,
// // // //     right: 0,
// // // //     bottom: 0,
// // // //     opacity: 0.7,
// // // //   },
// // // //   productBadge: {
// // // //     position: "absolute",
// // // //     top: 8,
// // // //     right: 8,
// // // //     backgroundColor: "rgba(77, 93, 250, 0.12)",
// // // //     paddingHorizontal: 6,
// // // //     paddingVertical: 3,
// // // //     borderRadius: 10,
// // // //   },
// // // //   productBadgeText: {
// // // //     color: ACCENT_COLOR,
// // // //     fontSize: 9,
// // // //     fontWeight: "700",
// // // //     letterSpacing: 0.2,
// // // //   },
// // // //   productInfo: {
// // // //     marginBottom: 8,
// // // //   },
// // // //   productName: {
// // // //     fontSize: 14,
// // // //     fontWeight: "600",
// // // //     color: "#212529",
// // // //     marginBottom: 4,
// // // //     letterSpacing: 0.2,
// // // //   },
// // // //   productPrice: {
// // // //     fontSize: 16,
// // // //     fontWeight: "700",
// // // //     color: ACCENT_COLOR,
// // // //   },
// // // //   quantityContainer: {
// // // //     marginTop: "auto",
// // // //     alignItems: "flex-end",
// // // //   },
// // // //   quantityControls: {
// // // //     flexDirection: "row",
// // // //     justifyContent: "space-between",
// // // //     alignItems: "center",
// // // //     height: 34,
// // // //     backgroundColor: "#F7F8FC",
// // // //     borderRadius: 12,
// // // //     paddingHorizontal: 5,
// // // //   },
// // // //   quantityButton: {
// // // //     width: 28,
// // // //     height: 28,
// // // //     backgroundColor: "#FFFFFF",
// // // //     borderRadius: 10,
// // // //     justifyContent: "center",
// // // //     alignItems: "center",
// // // //     shadowColor: "#000",
// // // //     shadowOffset: { width: 0, height: 1 },
// // // //     shadowOpacity: 0.04,
// // // //     shadowRadius: 3,
// // // //     elevation: 1,
// // // //   },
// // // //   incrementButton: {
// // // //     backgroundColor: ACCENT_COLOR,
// // // //   },
// // // //   addButton: {
// // // //     borderRadius: 10,
// // // //     overflow: "hidden",
// // // //   },
// // // //   addButtonGradient: {
// // // //     paddingVertical: 8,
// // // //     paddingHorizontal: 28,
// // // //     alignItems: "center",
// // // //     borderRadius: 10,
// // // //   },
// // // //   addButtonText: {
// // // //     color: "#FFFFFF",
// // // //     fontWeight: "700",
// // // //     fontSize: 13,
// // // //     letterSpacing: 0.3,
// // // //   },
// // // //   quantityButtonText: {
// // // //     fontSize: 14,
// // // //     fontWeight: "600",
// // // //     color: "#555555",
// // // //   },
// // // //   quantityText: {
// // // //     fontSize: 14,
// // // //     fontWeight: "600",
// // // //     color: "#212529",
// // // //     marginHorizontal: 8,
// // // //   },
// // // //   noResultsContainer: {
// // // //     flex: 1,
// // // //     justifyContent: "center",
// // // //     alignItems: "center",
// // // //     paddingHorizontal: 16,
// // // //   },
// // // //   noResultsText: {
// // // //     fontSize: 16,
// // // //     fontWeight: "600",
// // // //     color: "#212529",
// // // //     marginBottom: 6,
// // // //   },
// // // //   noResultsSubtext: {
// // // //     fontSize: 13,
// // // //     color: "#6C757D",
// // // //     textAlign: "center",
// // // //   },
// // // //   footerContainer: {
// // // //     position: "absolute",
// // // //     bottom: 0,
// // // //     left: 0,
// // // //     right: 0,
// // // //     paddingTop: 12,
// // // //   },
// // // //   footerGradient: {
// // // //     position: "absolute",
// // // //     top: 0,
// // // //     left: 0,
// // // //     right: 0,
// // // //     height: 40,
// // // //   },
// // // //   footerContent: {
// // // //     flexDirection: "row",
// // // //     justifyContent: "space-between",
// // // //     alignItems: "center",
// // // //     paddingHorizontal: 16,
// // // //     paddingVertical: 12,
// // // //     backgroundColor: "#FFFFFF",
// // // //     borderTopLeftRadius: 20,
// // // //     borderTopRightRadius: 20,
// // // //     shadowColor: "#000",
// // // //     shadowOffset: { width: 0, height: -3 },
// // // //     shadowOpacity: 0.08,
// // // //     shadowRadius: 10,
// // // //     elevation: 4,
// // // //   },
// // // //   footerLeftContent: {
// // // //     justifyContent: "center",
// // // //   },
// // // //   totalItemsText: {
// // // //     fontSize: 12,
// // // //     color: "#6C757D",
// // // //     marginBottom: 2,
// // // //   },
// // // //   totalPriceText: {
// // // //     fontSize: 18,
// // // //     fontWeight: "700",
// // // //     color: "#212529",
// // // //   },
// // // //   placeOrderButton: {
// // // //     borderRadius: 12,
// // // //     overflow: "hidden",
// // // //   },
// // // //   placeOrderGradient: {
// // // //     paddingVertical: 10,
// // // //     paddingHorizontal: 16,
// // // //     borderRadius: 12,
// // // //   },
// // // //   placeOrderButtonText: {
// // // //     color: "#FFFFFF",
// // // //     fontWeight: "600",
// // // //     fontSize: 14,
// // // //   },
// // // // });
// // // import { LinearGradient } from "expo-linear-gradient";
// // // import React, { useState } from "react";
// // // import {
// // //   Dimensions,
// // //   FlatList,
// // //   Image,
// // //   StatusBar,
// // //   StyleSheet,
// // //   Text,
// // //   TextInput,
// // //   TouchableOpacity,
// // //   View,
// // // } from "react-native";
// // // import OrderSummaryModal from "../_components/orderSummaryModal";
// // // import VarientModal from "../_components/varientModal";

// // // // Brand colors
// // // export const COLOR = {
// // //   primary: "#48a877",
// // //   secondary: "#e8f5ef",
// // //   accent: "#3d8d64",
// // //   white: "#ffffff",
// // //   black: "#000",
// // //   grey: "#888",
// // //   lightGrey: "#f1f5f9",
// // //   darkGrey: "#4b5563",
// // //   red: "#ef4444",
// // //   green: "#22c55e",
// // // };

// // // // Sample product data kept the same
// // // const PRODUCTS = [
// // //   {
// // //     id: 1,
// // //     name: "iPhone 14 Pro",
// // //     price: 999,
// // //     image:
// // //       "https://www.dxomark.com/wp-content/uploads/medias/post-125834/Apple-iPhone-14_FINAL_featured-image-packshot-review.jpg",
// // //     variants: [
// // //       { id: 101, name: "iPhone 14 Pro 128GB", price: 999 },
// // //       { id: 102, name: "iPhone 14 Pro 256GB", price: 1099 },
// // //       { id: 103, name: "iPhone 14 Pro 512GB", price: 1299 },
// // //     ],
// // //     category: "Phones",
// // //   },
// // //   {
// // //     id: 2,
// // //     name: "MacBook Air",
// // //     price: 1199,
// // //     image:
// // //       "https://alephksa.com/cdn/shop/files/MacBook_Air_15_in_M3_Midnight_PDP_Image_Position_1__en-AE_9c8e6839-222d-45c3-b903-053481a92ef6.jpg?v=1709594809&width=823",
// // //     variants: [
// // //       { id: 201, name: "MacBook Air 8GB/256GB", price: 1199 },
// // //       { id: 202, name: "MacBook Air 16GB/512GB", price: 1499 },
// // //     ],
// // //     category: "Laptops",
// // //   },
// // //   {
// // //     id: 3,
// // //     name: "AirPods Pro",
// // //     price: 249,
// // //     image:
// // //       "https://www.tech21.com/cdn/shop/files/1eee32c5-e890-4159-88e9-eb5a9cf980ec.jpg?v=1718361342",
// // //     variants: [
// // //       {
// // //         id: 301,
// // //         image:
// // //           "https://www.tech21.com/cdn/shop/files/1eee32c5-e890-4159-88e9-eb5a9cf980ec.jpg?v=1718361342",
// // //         name: "AirPods Pro",
// // //         price: 249,
// // //       },
// // //       { id: 302, name: "AirPods Pro with MagSafe Case", price: 279 },
// // //     ],
// // //     category: "Audio",
// // //   },
// // //   {
// // //     id: 4,
// // //     name: "iPad Air",
// // //     price: 599,
// // //     image:
// // //       "https://store.storeimages.cdn-apple.com/1/as-images.apple.com/is/ipad-pro-storage-select-202405-11inch-silver-glossy-wifi?wid=5120&hei=2880&fmt=p-jpg&qlt=80&.v=czlRMVFIQnlSdTl0T3ZTQUtJUW9rMm5pQUoxb0NIVEJFSjRVRzZ4dzV5VHhzSVRSdnBuOHFlMHZ5cERpS2J3bFZ4Z1Fxa3Y4V1F0eXdGcDVzSnYvZ3J4M3lYcDIyK01lckZBaW5GTC9DMEQxcjBVRyswWG14bEI4WVZBcUIybEZTMW5aeVlPZFhiTTZza0hENEFwOTlB&traceId=1",
// // //     variants: [
// // //       {
// // //         id: 401,
// // //         image:
// // //           "https://www.dxomark.com/wp-content/uploads/medias/post-125834/Apple-iPhone-14_FINAL_featured-image-packshot-review.jpg",
// // //         name: "iPad Air 64GB",
// // //         price: 599,
// // //       },
// // //       { id: 402, name: "iPad Air 256GB", price: 749 },
// // //     ],
// // //     category: "Tablets",
// // //   },
// // //   {
// // //     id: 5,
// // //     name: "Apple Watch",
// // //     price: 399,
// // //     image:
// // //       "https://www.greenware.lk/wp-content/uploads/2024/09/Apple-Watch-Series-10-Price-in-Sri-Lanka.webp",
// // //     variants: [
// // //       { id: 501, name: "Apple Watch Series 8 GPS", price: 399 },
// // //       { id: 502, name: "Apple Watch Series 8 Cellular", price: 499 },
// // //     ],
// // //     category: "Wearables",
// // //   },
// // //   {
// // //     id: 6,
// // //     name: "HomePod mini",
// // //     price: 99,
// // //     image:
// // //       "https://api.runbazaar.com/media/__sized__/product_img/2021/07/15/RBI000000000036/MJ2E3-YL_IMG_1_KtuTHrS-smart_crop-c0-5__0-5-750x750-70.jpg",
// // //     variants: [
// // //       { id: 601, name: "HomePod mini White", price: 99 },
// // //       { id: 602, name: "HomePod mini Space Gray", price: 99 },
// // //     ],
// // //     category: "Home",
// // //   },
// // // ];

// // // // Extract unique categories
// // // const CATEGORIES = [
// // //   "All",
// // //   ...new Set(PRODUCTS.map((product) => product.category)),
// // // ];

// // // const { width } = Dimensions.get("window");

// // // export default function ProductListingScreen() {
// // //   const [cart, setCart] = useState<any>({});
// // //   const [variantCart, setVariantCart] = useState<any>({});
// // //   const [showOrderModal, setShowOrderModal] = useState(false);
// // //   const [selectedProduct, setSelectedProduct] = useState(null);
// // //   const [showVariantModal, setShowVariantModal] = useState(false);
// // //   const [searchQuery, setSearchQuery] = useState("");
// // //   const [selectedCategory, setSelectedCategory] = useState("All");

// // //   // Filter products based on search query and selected category
// // //   const filteredProducts = PRODUCTS.filter((product) => {
// // //     const matchesSearch = product.name
// // //       .toLowerCase()
// // //       .includes(searchQuery.toLowerCase());
// // //     const matchesCategory =
// // //       selectedCategory === "All" || product.category === selectedCategory;
// // //     return matchesSearch && matchesCategory;
// // //   });

// // //   const handleIncrement = (productId:any) => {
// // //     setCart((prevCart:any) => ({
// // //       ...prevCart,
// // //       [productId]: (prevCart[productId] || 0) + 1,
// // //     }));
// // //   };

// // //   const handleDecrement = (productId:any) => {
// // //     if (cart[productId] && cart[productId] > 0) {
// // //       setCart((prevCart:any) => ({
// // //         ...prevCart,
// // //         [productId]: prevCart[productId] - 1,
// // //       }));
// // //     }
// // //   };

// // //   const handleVariantIncrement = (variantId:any) => {
// // //     setVariantCart((prevCart:any) => ({
// // //       ...prevCart,
// // //       [variantId]: (prevCart[variantId] || 0) + 1,
// // //     }));
// // //   };

// // //   const handleVariantDecrement = (variantId:any) => {
// // //     if (variantCart[variantId] && variantCart[variantId] > 0) {
// // //       setVariantCart((prevCart:any) => ({
// // //         ...prevCart,
// // //         [variantId]: prevCart[variantId] - 1,
// // //       }));
// // //     }
// // //   };

// // //   const showVariants = (product:any) => {
// // //     setSelectedProduct(product);
// // //     setShowVariantModal(true);
// // //   };

// // //   const getTotalPrice = () => {
// // //     let total = 0;

// // //     // Calculate total for base products
// // //     Object.keys(cart).forEach((productId) => {
// // //       const product = PRODUCTS.find((p) => p.id === parseInt(productId));
// // //       if (product) {
// // //         total += product.price * cart[productId];
// // //       }
// // //     });

// // //     // Calculate total for variant products
// // //     Object.keys(variantCart).forEach((variantId) => {
// // //       const variant = PRODUCTS.flatMap((p) => p.variants).find(
// // //         (v) => v.id === parseInt(variantId)
// // //       );
// // //       if (variant) {
// // //         total += variant.price * variantCart[variantId];
// // //       }
// // //     });

// // //     return total.toFixed(2);
// // //   };

// // //   const getTotalItems = () => {
// // //     const baseItems:any = Object.values(cart).reduce(
// // //       (sum:any, qty) => sum + qty,
// // //       0
// // //     );
// // //     const variantItems = Object.values(variantCart).reduce(
// // //       (sum:any, qty) => sum + qty,
// // //       0
// // //     );
// // //     return baseItems + variantItems;
// // //   };

// // //   const renderProduct = ({ item }:any) => {
// // //     const quantity = cart[item.id] || 0;

// // //     return (
// // //       <View style={styles.productCardContainer}>
// // //         <TouchableOpacity
// // //           style={styles.productCard}
// // //           activeOpacity={0.9}
// // //           onLongPress={() => showVariants(item)}
// // //         >
// // //           <View style={styles.imageContainer}>
// // //             <Image source={{ uri: item.image }} style={styles.productImage} />
// // //             <LinearGradient
// // //               colors={["rgba(0,0,0,0.02)", "rgba(0,0,0,0.15)"]}
// // //               start={{ x: 0, y: 0 }}
// // //               end={{ x: 0, y: 1 }}
// // //               style={styles.imageGradient}
// // //             />
// // //           </View>

// // //           <View style={styles.productBadge}>
// // //             <Text style={styles.productBadgeText}>
// // //               {item.variants.length} variants
// // //             </Text>
// // //           </View>
// // //           <View style={styles.productInfo}>
// // //             <Text style={styles.productName}>{item.name}</Text>
// // //             <Text style={styles.productPrice}>${item.price}</Text>
// // //           </View>

// // //           <View style={styles.quantityContainer}>
// // //             {quantity > 0 ? (
// // //               <View style={styles.quantityControls}>
// // //                 <TouchableOpacity
// // //                   style={styles.quantityButton}
// // //                   onPress={() => handleDecrement(item.id)}
// // //                 >
// // //                   <Text style={styles.quantityButtonText}>−</Text>
// // //                 </TouchableOpacity>

// // //                 <Text style={styles.quantityText}>{quantity}</Text>

// // //                 <TouchableOpacity
// // //                   style={[styles.quantityButton, styles.incrementButton]}
// // //                   onPress={() => handleIncrement(item.id)}
// // //                 >
// // //                   <Text
// // //                     style={[styles.quantityButtonText, { color: COLOR.white }]}
// // //                   >
// // //                     +
// // //                   </Text>
// // //                 </TouchableOpacity>
// // //               </View>
// // //             ) : (
// // //               <TouchableOpacity
// // //                 style={styles.addButton}
// // //                 onPress={() => handleIncrement(item.id)}
// // //               >
// // //                 <LinearGradient
// // //                   colors={[COLOR.primary, COLOR.accent]}
// // //                   start={{ x: 0, y: 0 }}
// // //                   end={{ x: 1, y: 0 }}
// // //                   style={styles.addButtonGradient}
// // //                 >
// // //                   <Text style={styles.addButtonText}>Add</Text>
// // //                 </LinearGradient>
// // //               </TouchableOpacity>
// // //             )}
// // //           </View>
// // //         </TouchableOpacity>
// // //       </View>
// // //     );
// // //   };

// // //   const renderCategoryItem = ({ item }:any) => (
// // //     <TouchableOpacity
// // //       style={[
// // //         styles.categoryItem,
// // //         selectedCategory === item && styles.selectedCategoryItem,
// // //       ]}
// // //       onPress={() => setSelectedCategory(item)}
// // //     >
// // //       <Text
// // //         style={[
// // //           styles.categoryText,
// // //           selectedCategory === item && styles.selectedCategoryText,
// // //         ]}
// // //       >
// // //         {item}
// // //       </Text>
// // //     </TouchableOpacity>
// // //   );

// // //   return (
// // //     <View style={styles.container}>
// // //       <StatusBar barStyle="dark-content" backgroundColor={COLOR.white} />

// // //       <View style={styles.header}>
// // //         <View style={styles.headerTop}>
// // //           <View>
// // //             <Text style={styles.headerTitle}>Products</Text>
// // //             <Text style={styles.headerSubtitle}>
// // //               Find your perfect device
// // //             </Text>
// // //           </View>
// // //           <TouchableOpacity
// // //             style={styles.cartButton}
// // //             onPress={() => getTotalItems() > 0 && setShowOrderModal(true)}
// // //           >
// // //             <LinearGradient
// // //               colors={
// // //                 getTotalItems() > 0
// // //                   ? [COLOR.primary, COLOR.accent]
// // //                   : ["#E0E0E0", "#F0F0F0"]
// // //               }
// // //               style={styles.cartIndicator}
// // //             >
// // //               <Text style={styles.cartIndicatorText}>{getTotalItems()}</Text>
// // //             </LinearGradient>
// // //           </TouchableOpacity>
// // //         </View>

// // //         <View style={styles.searchAndCategoriesContainer}>
// // //           <View style={styles.searchBar}>
// // //             <Image 
// // //               source={{ uri: "https://img.icons8.com/ios-filled/50/48a877/search.png" }}
// // //               style={styles.searchIcon}
// // //             />
// // //             <TextInput
// // //               style={styles.searchInput}
// // //               placeholder="Search products..."
// // //               placeholderTextColor="#9DA3B4"
// // //               value={searchQuery}
// // //               onChangeText={setSearchQuery}
// // //             />
// // //             {searchQuery.length > 0 && (
// // //               <TouchableOpacity
// // //                 style={styles.clearButton}
// // //                 onPress={() => setSearchQuery("")}
// // //               >
// // //                 <Text style={styles.clearButtonText}>✕</Text>
// // //               </TouchableOpacity>
// // //             )}
// // //           </View>

// // //           <FlatList
// // //             data={CATEGORIES}
// // //             renderItem={renderCategoryItem}
// // //             keyExtractor={(item) => item}
// // //             horizontal
// // //             showsHorizontalScrollIndicator={false}
// // //             contentContainerStyle={styles.categoriesList}
// // //           />
// // //         </View>
// // //       </View>

// // //       {filteredProducts.length > 0 ? (
// // //         <FlatList
// // //           data={filteredProducts}
// // //           renderItem={renderProduct}
// // //           keyExtractor={(item) => item.id.toString()}
// // //           numColumns={2}
// // //           columnWrapperStyle={styles.productRow}
// // //           contentContainerStyle={styles.productList}
// // //           showsVerticalScrollIndicator={false}
// // //         />
// // //       ) : (
// // //         <View style={styles.noResultsContainer}>
// // //           <Image 
// // //             source={{ uri: "https://img.icons8.com/ios-filled/100/48a877/search-no-results.png" }}
// // //             style={styles.noResultsIcon}
// // //           />
// // //           <Text style={styles.noResultsText}>No products found</Text>
// // //           <Text style={styles.noResultsSubtext}>
// // //             Try a different search or category
// // //           </Text>
// // //         </View>
// // //       )}

// // //       {getTotalItems() > 0 && (
// // //         <View style={styles.footerContainer}>
// // //           <LinearGradient
// // //             colors={["rgba(255,255,255,0)", "rgba(255,255,255,0.9)", COLOR.white]}
// // //             style={styles.footerGradient}
// // //           />
// // //           <View style={styles.footerContent}>
// // //             <View style={styles.footerLeftContent}>
// // //               <Text style={styles.totalItemsText}>
// // //                 {getTotalItems()} item{getTotalItems() !== 1 ? "s" : ""}
// // //               </Text>
// // //               <Text style={styles.totalPriceText}>${getTotalPrice()}</Text>
// // //             </View>

// // //             <TouchableOpacity
// // //               style={styles.placeOrderButton}
// // //               onPress={() => setShowOrderModal(true)}
// // //             >
// // //               <LinearGradient
// // //                 colors={[COLOR.primary, COLOR.accent]}
// // //                 start={{ x: 0, y: 0 }}
// // //                 end={{ x: 1, y: 0 }}
// // //                 style={styles.placeOrderGradient}
// // //               >
// // //                 <Text style={styles.placeOrderButtonText}>Place Order</Text>
// // //               </LinearGradient>
// // //             </TouchableOpacity>
// // //           </View>
// // //         </View>
// // //       )}

// // //       {/* Order Summary Modal */}
// // //       <OrderSummaryModal
// // //         visible={showOrderModal}
// // //         onClose={() => setShowOrderModal(false)}
// // //         products={PRODUCTS}
// // //         cart={cart}
// // //         variantCart={variantCart}
// // //         getTotalPrice={getTotalPrice}
// // //         handleDecrement={handleDecrement}
// // //         handleIncrement={handleIncrement}
// // //         handleVariantDecrement={handleVariantDecrement}
// // //         handleVariantIncrement={handleVariantIncrement}
// // //       />

// // //       {/* Product Variants Modal */}
// // //       <VarientModal
// // //         visible={showVariantModal}
// // //         onClose={() => setShowVariantModal(false)}
// // //         variantCart={variantCart}
// // //         handleVariantDecrement={handleVariantDecrement}
// // //         handleVariantIncrement={handleVariantIncrement}
// // //         selectedProduct={selectedProduct}
// // //       />
// // //     </View>
// // //   );
// // // }

// // // const styles = StyleSheet.create({
// // //   container: {
// // //     flex: 1,
// // //     backgroundColor: "#FAFBFF",
// // //   },
// // //   header: {
// // //     paddingTop: 50,
// // //     paddingBottom: 10,
// // //     backgroundColor: COLOR.white,
// // //     borderBottomLeftRadius: 24,
// // //     borderBottomRightRadius: 24,
// // //     shadowColor: COLOR.black,
// // //     shadowOffset: { width: 0, height: 4 },
// // //     shadowOpacity: 0.06,
// // //     shadowRadius: 8,
// // //     elevation: 3,
// // //     zIndex: 10,
// // //   },
// // //   headerTop: {
// // //     flexDirection: "row",
// // //     justifyContent: "space-between",
// // //     alignItems: "center",
// // //     paddingHorizontal: 20,
// // //     marginBottom: 14,
// // //   },
// // //   headerTitle: {
// // //     fontSize: 24,
// // //     fontWeight: "700",
// // //     color: COLOR.black,
// // //     letterSpacing: 0.2,
// // //   },
// // //   headerSubtitle: {
// // //     fontSize: 14,
// // //     color: COLOR.grey,
// // //     marginTop: 4,
// // //     fontWeight: "500",
// // //   },
// // //   cartButton: {
// // //     borderRadius: 16,
// // //     overflow: "hidden",
// // //   },
// // //   cartIndicator: {
// // //     width: 32,
// // //     height: 32,
// // //     borderRadius: 16,
// // //     justifyContent: "center",
// // //     alignItems: "center",
// // //   },
// // //   cartIndicatorText: {
// // //     color: COLOR.white,
// // //     fontWeight: "600",
// // //     fontSize: 14,
// // //   },
// // //   searchAndCategoriesContainer: {
// // //     paddingHorizontal: 20,
// // //   },
// // //   searchBar: {
// // //     flexDirection: "row",
// // //     alignItems: "center",
// // //     backgroundColor: "#F5F8F6",
// // //     borderRadius: 14,
// // //     paddingHorizontal: 14,
// // //     height: 46,
// // //     marginBottom: 12,
// // //     borderWidth: 1,
// // //     borderColor: "rgba(72, 168, 119, 0.1)",
// // //   },
// // //   searchIcon: {
// // //     width: 18,
// // //     height: 18,
// // //     marginRight: 10,
// // //     tintColor: COLOR.primary,
// // //     opacity: 0.7,
// // //   },
// // //   searchInput: {
// // //     flex: 1,
// // //     fontSize: 15,
// // //     color: COLOR.darkGrey,
// // //     height: 46,
// // //   },
// // //   clearButton: {
// // //     width: 22,
// // //     height: 22,
// // //     borderRadius: 11,
// // //     backgroundColor: "#E0E0E0",
// // //     justifyContent: "center",
// // //     alignItems: "center",
// // //   },
// // //   clearButtonText: {
// // //     fontSize: 12,
// // //     fontWeight: "600",
// // //     color: "#7A7A7A",
// // //     textAlign: "center",
// // //   },
// // //   categoriesList: {
// // //     paddingVertical: 6,
// // //   },
// // //   categoryItem: {
// // //     paddingHorizontal: 16,
// // //     paddingVertical: 8,
// // //     marginRight: 10,
// // //     borderRadius: 20,
// // //     backgroundColor: "#F0F2F5",
// // //   },
// // //   selectedCategoryItem: {
// // //     backgroundColor: COLOR.primary,
// // //   },
// // //   categoryText: {
// // //     fontSize: 13,
// // //     fontWeight: "500",
// // //     color: "#555555",
// // //   },
// // //   selectedCategoryText: {
// // //     color: COLOR.white,
// // //   },
// // //   productList: {
// // //     paddingHorizontal: 10,
// // //     paddingTop: 20,
// // //     paddingBottom: 100,
// // //   },
// // //   productRow: {
// // //     justifyContent: "space-between",
// // //     paddingHorizontal: 10,
// // //   },
// // //   productCardContainer: {
// // //     width: (width - 60) / 2,
// // //     marginBottom: 20,
// // //   },
// // //   productCard: {
// // //     backgroundColor: COLOR.white,
// // //     borderRadius: 18,
// // //     padding: 12,
// // //     shadowColor: COLOR.black,
// // //     shadowOffset: { width: 0, height: 6 },
// // //     shadowOpacity: 0.06,
// // //     shadowRadius: 12,
// // //     elevation: 4,
// // //     height: 240,
// // //     justifyContent: "space-between",
// // //     borderWidth: 1,
// // //     borderColor: "rgba(72, 168, 119, 0.05)",
// // //   },
// // //   imageContainer: {
// // //     position: "relative",
// // //     borderRadius: 16,
// // //     overflow: "hidden",
// // //     marginBottom: 10,
// // //     elevation: 1,
// // //   },
// // //   productImage: {
// // //     width: "100%",
// // //     height: 120,
// // //     borderRadius: 16,
// // //     backgroundColor: "#F8F9FA",
// // //     resizeMode: "cover",
// // //   },
// // //   imageGradient: {
// // //     position: "absolute",
// // //     top: 0,
// // //     left: 0,
// // //     right: 0,
// // //     bottom: 0,
// // //     opacity: 0.7,
// // //   },
// // //   productBadge: {
// // //     position: "absolute",
// // //     top: 10,
// // //     right: 10,
// // //     backgroundColor: "rgba(72, 168, 119, 0.12)",
// // //     paddingHorizontal: 8,
// // //     paddingVertical: 4,
// // //     borderRadius: 10,
// // //   },
// // //   productBadgeText: {
// // //     color: COLOR.primary,
// // //     fontSize: 10,
// // //     fontWeight: "700",
// // //     letterSpacing: 0.2,
// // //   },
// // //   productInfo: {
// // //     marginBottom: 12,
// // //   },
// // //   productName: {
// // //     fontSize: 15,
// // //     fontWeight: "600",
// // //     color: COLOR.black,
// // //     marginBottom: 6,
// // //     letterSpacing: 0.2,
// // //   },
// // //   productPrice: {
// // //     fontSize: 17,
// // //     fontWeight: "700",
// // //     color: COLOR.primary,
// // //   },
// // //   quantityContainer: {
// // //     marginTop: "auto",
// // //     alignItems: "flex-end",
// // //   },
// // //   quantityControls: {
// // //     flexDirection: "row",
// // //     justifyContent: "space-between",
// // //     alignItems: "center",
// // //     height: 38,
// // //     backgroundColor: "#F7F8FC",
// // //     borderRadius: 12,
// // //     paddingHorizontal: 6,
// // //   },
// // //   quantityButton: {
// // //     width: 30,
// // //     height: 30,
// // //     backgroundColor: COLOR.white,
// // //     borderRadius: 10,
// // //     justifyContent: "center",
// // //     alignItems: "center",
// // //     shadowColor: COLOR.black,
// // //     shadowOffset: { width: 0, height: 1 },
// // //     shadowOpacity: 0.04,
// // //     shadowRadius: 3,
// // //     elevation: 1,
// // //   },
// // //   incrementButton: {
// // //     backgroundColor: COLOR.primary,
// // //   },
// // //   addButton: {
// // //     borderRadius: 12,
// // //     overflow: "hidden",
// // //   },
// // //   addButtonGradient: {
// // //     paddingVertical: 10,
// // //     paddingHorizontal: 32,
// // //     alignItems: "center",
// // //     borderRadius: 12,
// // //   },
// // //   addButtonText: {
// // //     color: COLOR.white,
// // //     fontWeight: "700",
// // //     fontSize: 14,
// // //     letterSpacing: 0.3,
// // //   },
// // //   quantityButtonText: {
// // //     fontSize: 15,
// // //     fontWeight: "600",
// // //     color: "#555555",
// // //   },
// // //   quantityText: {
// // //     fontSize: 15,
// // //     fontWeight: "600",
// // //     color: COLOR.darkGrey,
// // //     marginHorizontal: 10,
// // //   },
// // //   noResultsContainer: {
// // //     flex: 1,
// // //     justifyContent: "center",
// // //     alignItems: "center",
// // //     paddingHorizontal: 20,
// // //   },
// // //   noResultsIcon: {
// // //     width: 70,
// // //     height: 70,
// // //     marginBottom: 16,
// // //     opacity: 0.6,
// // //   },
// // //   noResultsText: {
// // //     fontSize: 18,
// // //     fontWeight: "600",
// // //     color: COLOR.darkGrey,
// // //     marginBottom: 8,
// // //   },
// // //   noResultsSubtext: {
// // //     fontSize: 14,
// // //     color: COLOR.grey,
// // //     textAlign: "center",
// // //   },
// // //   footerContainer: {
// // //     position: "absolute",
// // //     bottom: 0,
// // //     left: 0,
// // //     right: 0,
// // //     paddingTop: 12,
// // //   },
// // //   footerGradient: {
// // //     position: "absolute",
// // //     top: 0,
// // //     left: 0,
// // //     right: 0,
// // //     height: 40,
// // //   },
// // //   footerContent: {
// // //     flexDirection: "row",
// // //     justifyContent: "space-between",
// // //     alignItems: "center",
// // //     paddingHorizontal: 20,
// // //     paddingVertical: 16,
// // //     backgroundColor: COLOR.white,
// // //     borderTopLeftRadius: 24,
// // //     borderTopRightRadius: 24,
// // //     shadowColor: COLOR.black,
// // //     shadowOffset: { width: 0, height: -3 },
// // //     shadowOpacity: 0.08,
// // //     shadowRadius: 10,
// // //     elevation: 8,
// // //   },
// // //   footerLeftContent: {
// // //     justifyContent: "center",
// // //   },
// // //   totalItemsText: {
// // //     fontSize: 13,
// // //     color: COLOR.grey,
// // //     marginBottom: 4,
// // //   },
// // //   totalPriceText: {
// // //     fontSize: 20,
// // //     fontWeight: "700",
// // //     color: COLOR.primary,
// // //   },
// // //   placeOrderButton: {
// // //     borderRadius: 14,
// // //     overflow: "hidden",
// // //   },
// // //   placeOrderGradient: {
// // //     paddingVertical: 12,
// // //     paddingHorizontal: 20,
// // //     borderRadius: 14,
// // //   },
// // //   placeOrderButtonText: {
// // //     color: COLOR.white,
// // //     fontWeight: "600",
// // //     fontSize: 15,
// // //   },
// // // });
// // import { LinearGradient } from "expo-linear-gradient";
// // import React, { useState } from "react";
// // import {
// //   Dimensions,
// //   FlatList,
// //   Image,
// //   StatusBar,
// //   StyleSheet,
// //   Text,
// //   TextInput,
// //   TouchableOpacity,
// //   View,
// // } from "react-native";
// // import OrderSummaryModal from "../_components/orderSummaryModal";
// // import VarientModal from "../_components/varientModal";

// // // Brand colors
// // export const COLOR = {
// //   primary: "#48a877",
// //   secondary: "#e8f5ef",
// //   accent: "#3d8d64",
// //   white: "#ffffff",
// //   black: "#000",
// //   grey: "#888",
// //   lightGrey: "#f1f5f9",
// //   darkGrey: "#4b5563",
// //   red: "#ef4444",
// //   green: "#22c55e",
// // };

// // // Sample product data kept the same
// // const PRODUCTS = [
// //   {
// //     id: 1,
// //     name: "iPhone 14 Pro",
// //     price: 999,
// //     image:
// //       "https://www.dxomark.com/wp-content/uploads/medias/post-125834/Apple-iPhone-14_FINAL_featured-image-packshot-review.jpg",
// //     variants: [
// //       { id: 101, name: "iPhone 14 Pro 128GB", price: 999 },
// //       { id: 102, name: "iPhone 14 Pro 256GB", price: 1099 },
// //       { id: 103, name: "iPhone 14 Pro 512GB", price: 1299 },
// //     ],
// //     category: "Phones",
// //   },
// //   {
// //     id: 2,
// //     name: "MacBook Air",
// //     price: 1199,
// //     image:
// //       "https://alephksa.com/cdn/shop/files/MacBook_Air_15_in_M3_Midnight_PDP_Image_Position_1__en-AE_9c8e6839-222d-45c3-b903-053481a92ef6.jpg?v=1709594809&width=823",
// //     variants: [
// //       { id: 201, name: "MacBook Air 8GB/256GB", price: 1199 },
// //       { id: 202, name: "MacBook Air 16GB/512GB", price: 1499 },
// //     ],
// //     category: "Laptops",
// //   },
// //   {
// //     id: 3,
// //     name: "AirPods Pro",
// //     price: 249,
// //     image:
// //       "https://www.tech21.com/cdn/shop/files/1eee32c5-e890-4159-88e9-eb5a9cf980ec.jpg?v=1718361342",
// //     variants: [
// //       {
// //         id: 301,
// //         image:
// //           "https://www.tech21.com/cdn/shop/files/1eee32c5-e890-4159-88e9-eb5a9cf980ec.jpg?v=1718361342",
// //         name: "AirPods Pro",
// //         price: 249,
// //       },
// //       { id: 302, name: "AirPods Pro with MagSafe Case", price: 279 },
// //     ],
// //     category: "Audio",
// //   },
// //   {
// //     id: 4,
// //     name: "iPad Air",
// //     price: 599,
// //     image:
// //       "https://store.storeimages.cdn-apple.com/1/as-images.apple.com/is/ipad-pro-storage-select-202405-11inch-silver-glossy-wifi?wid=5120&hei=2880&fmt=p-jpg&qlt=80&.v=czlRMVFIQnlSdTl0T3ZTQUtJUW9rMm5pQUoxb0NIVEJFSjRVRzZ4dzV5VHhzSVRSdnBuOHFlMHZ5cERpS2J3bFZ4Z1Fxa3Y4V1F0eXdGcDVzSnYvZ3J4M3lYcDIyK01lckZBaW5GTC9DMEQxcjBVRyswWG14bEI4WVZBcUIybEZTMW5aeVlPZFhiTTZza0hENEFwOTlB&traceId=1",
// //     variants: [
// //       {
// //         id: 401,
// //         image:
// //           "https://www.dxomark.com/wp-content/uploads/medias/post-125834/Apple-iPhone-14_FINAL_featured-image-packshot-review.jpg",
// //         name: "iPad Air 64GB",
// //         price: 599,
// //       },
// //       { id: 402, name: "iPad Air 256GB", price: 749 },
// //     ],
// //     category: "Tablets",
// //   },
// //   {
// //     id: 5,
// //     name: "Apple Watch",
// //     price: 399,
// //     image:
// //       "https://www.greenware.lk/wp-content/uploads/2024/09/Apple-Watch-Series-10-Price-in-Sri-Lanka.webp",
// //     variants: [
// //       { id: 501, name: "Apple Watch Series 8 GPS", price: 399 },
// //       { id: 502, name: "Apple Watch Series 8 Cellular", price: 499 },
// //     ],
// //     category: "Wearables",
// //   },
// //   {
// //     id: 6,
// //     name: "HomePod mini",
// //     price: 99,
// //     image:
// //       "https://api.runbazaar.com/media/__sized__/product_img/2021/07/15/RBI000000000036/MJ2E3-YL_IMG_1_KtuTHrS-smart_crop-c0-5__0-5-750x750-70.jpg",
// //     variants: [
// //       { id: 601, name: "HomePod mini White", price: 99 },
// //       { id: 602, name: "HomePod mini Space Gray", price: 99 },
// //     ],
// //     category: "Home",
// //   },
// // ];

// // // Extract unique categories
// // const CATEGORIES = [
// //   "All",
// //   ...new Set(PRODUCTS.map((product) => product.category)),
// // ];

// // const { width } = Dimensions.get("window");

// // export default function ProductListingScreen() {
// //   const [cart, setCart] = useState<any>({});
// //   const [variantCart, setVariantCart] = useState<any>({});
// //   const [showOrderModal, setShowOrderModal] = useState(false);
// //   const [selectedProduct, setSelectedProduct] = useState(null);
// //   const [showVariantModal, setShowVariantModal] = useState(false);
// //   const [searchQuery, setSearchQuery] = useState("");
// //   const [selectedCategory, setSelectedCategory] = useState("All");

// //   // Filter products based on search query and selected category
// //   const filteredProducts = PRODUCTS.filter((product) => {
// //     const matchesSearch = product.name
// //       .toLowerCase()
// //       .includes(searchQuery.toLowerCase());
// //     const matchesCategory =
// //       selectedCategory === "All" || product.category === selectedCategory;
// //     return matchesSearch && matchesCategory;
// //   });

// //   const handleIncrement = (productId:any) => {
// //     setCart((prevCart:any) => ({
// //       ...prevCart,
// //       [productId]: (prevCart[productId] || 0) + 1,
// //     }));
// //   };

// //   const handleDecrement = (productId:any) => {
// //     if (cart[productId] && cart[productId] > 0) {
// //       setCart((prevCart:any) => ({
// //         ...prevCart,
// //         [productId]: prevCart[productId] - 1,
// //       }));
// //     }
// //   };

// //   const handleVariantIncrement = (variantId:any) => {
// //     setVariantCart((prevCart:any) => ({
// //       ...prevCart,
// //       [variantId]: (prevCart[variantId] || 0) + 1,
// //     }));
// //   };

// //   const handleVariantDecrement = (variantId:any) => {
// //     if (variantCart[variantId] && variantCart[variantId] > 0) {
// //       setVariantCart((prevCart:any) => ({
// //         ...prevCart,
// //         [variantId]: prevCart[variantId] - 1,
// //       }));
// //     }
// //   };

// //   const showVariants = (product:any) => {
// //     setSelectedProduct(product);
// //     setShowVariantModal(true);
// //   };

// //   const getTotalPrice = () => {
// //     let total = 0;

// //     // Calculate total for base products
// //     Object.keys(cart).forEach((productId) => {
// //       const product = PRODUCTS.find((p) => p.id === parseInt(productId));
// //       if (product) {
// //         total += product.price * cart[productId];
// //       }
// //     });

// //     // Calculate total for variant products
// //     Object.keys(variantCart).forEach((variantId) => {
// //       const variant = PRODUCTS.flatMap((p) => p.variants).find(
// //         (v) => v.id === parseInt(variantId)
// //       );
// //       if (variant) {
// //         total += variant.price * variantCart[variantId];
// //       }
// //     });

// //     return total.toFixed(2);
// //   };

// //   const getTotalItems = () => {
// //     const baseItems = Object.values(cart).reduce(
// //       (sum:any, qty) => sum + qty,
// //       0
// //     );
// //     const variantItems:any = Object.values(variantCart).reduce(
// //       (sum:any, qty) => sum + qty,
// //       0
// //     );
// //     return baseItems + variantItems;
// //   };

// //   const renderProduct = ({ item }:any) => {
// //     const quantity = cart[item.id] || 0;

// //     return (
// //       <View style={styles.productCardContainer}>
// //         <TouchableOpacity
// //           style={styles.productCard}
// //           activeOpacity={0.9}
// //           onLongPress={() => showVariants(item)}
// //         >
// //           <View style={styles.imageContainer}>
// //             <Image source={{ uri: item.image }} style={styles.productImage} />
// //             <LinearGradient
// //               colors={["rgba(0,0,0,0.02)", "rgba(0,0,0,0.15)"]}
// //               start={{ x: 0, y: 0 }}
// //               end={{ x: 0, y: 1 }}
// //               style={styles.imageGradient}
// //             />
// //           </View>

// //           <View style={styles.productBadge}>
// //             <Text style={styles.productBadgeText}>
// //               {item.variants.length} variants
// //             </Text>
// //           </View>
// //           <View style={styles.productInfo}>
// //             <Text style={styles.productName}>{item.name}</Text>
// //             <Text style={styles.productPrice}>${item.price}</Text>
// //           </View>

// //           <View style={styles.quantityContainer}>
// //             {quantity > 0 ? (
// //               <View style={styles.quantityControls}>
// //                 <TouchableOpacity
// //                   style={styles.quantityButton}
// //                   onPress={() => handleDecrement(item.id)}
// //                 >
// //                   <Text style={styles.quantityButtonText}>−</Text>
// //                 </TouchableOpacity>

// //                 <Text style={styles.quantityText}>{quantity}</Text>

// //                 <TouchableOpacity
// //                   style={[styles.quantityButton, styles.incrementButton]}
// //                   onPress={() => handleIncrement(item.id)}
// //                 >
// //                   <Text
// //                     style={[styles.quantityButtonText, { color: COLOR.white }]}
// //                   >
// //                     +
// //                   </Text>
// //                 </TouchableOpacity>
// //               </View>
// //             ) : (
// //               <TouchableOpacity
// //                 style={styles.addButton}
// //                 onPress={() => handleIncrement(item.id)}
// //               >
// //                 <LinearGradient
// //                   colors={[COLOR.primary, COLOR.accent]}
// //                   start={{ x: 0, y: 0 }}
// //                   end={{ x: 1, y: 0 }}
// //                   style={styles.addButtonGradient}
// //                 >
// //                   <Text style={styles.addButtonText}>Add</Text>
// //                 </LinearGradient>
// //               </TouchableOpacity>
// //             )}
// //           </View>
// //         </TouchableOpacity>
// //       </View>
// //     );
// //   };

// //   const renderCategoryItem = ({ item }:any) => (
// //     <TouchableOpacity
// //       style={[
// //         styles.categoryItem,
// //         selectedCategory === item && styles.selectedCategoryItem,
// //       ]}
// //       onPress={() => setSelectedCategory(item)}
// //     >
// //       <Text
// //         style={[
// //           styles.categoryText,
// //           selectedCategory === item && styles.selectedCategoryText,
// //         ]}
// //       >
// //         {item}
// //       </Text>
// //     </TouchableOpacity>
// //   );

// //   return (
// //     <View style={styles.container}>
// //       <StatusBar barStyle="dark-content" backgroundColor={COLOR.white} />

// //       <View style={styles.header}>
// //         <View style={styles.headerTop}>
// //           <View>
// //             <Text style={styles.headerTitle}>Products</Text>
// //             <Text style={styles.headerSubtitle}>
// //               Find your perfect device
// //             </Text>
// //           </View>
// //           <TouchableOpacity
// //             style={styles.cartButton}
// //             onPress={() => getTotalItems() > 0 && setShowOrderModal(true)}
// //           >
// //             <LinearGradient
// //               colors={
// //                 getTotalItems() > 0
// //                   ? [COLOR.primary, COLOR.accent]
// //                   : ["#E0E0E0", "#F0F0F0"]
// //               }
// //               style={styles.cartIndicator}
// //             >
// //               <Text style={styles.cartIndicatorText}>{getTotalItems()}</Text>
// //             </LinearGradient>
// //           </TouchableOpacity>
// //         </View>

// //         <View style={styles.searchAndCategoriesContainer}>
// //           <View style={styles.searchBar}>
// //             <Image 
// //               source={{ uri: "https://img.icons8.com/ios-filled/50/48a877/search.png" }}
// //               style={styles.searchIcon}
// //             />
// //             <TextInput
// //               style={styles.searchInput}
// //               placeholder="Search products..."
// //               placeholderTextColor="#9DA3B4"
// //               value={searchQuery}
// //               onChangeText={setSearchQuery}
// //             />
// //             {searchQuery.length > 0 && (
// //               <TouchableOpacity
// //                 style={styles.clearButton}
// //                 onPress={() => setSearchQuery("")}
// //               >
// //                 <Text style={styles.clearButtonText}>✕</Text>
// //               </TouchableOpacity>
// //             )}
// //           </View>

// //           <FlatList
// //             data={CATEGORIES}
// //             renderItem={renderCategoryItem}
// //             keyExtractor={(item) => item}
// //             horizontal
// //             showsHorizontalScrollIndicator={false}
// //             contentContainerStyle={styles.categoriesList}
// //           />
// //         </View>
// //       </View>

// //       {filteredProducts.length > 0 ? (
// //         <FlatList
// //           data={filteredProducts}
// //           renderItem={renderProduct}
// //           keyExtractor={(item) => item.id.toString()}
// //           numColumns={2}
// //           columnWrapperStyle={styles.productRow}
// //           contentContainerStyle={styles.productList}
// //           showsVerticalScrollIndicator={false}
// //         />
// //       ) : (
// //         <View style={styles.noResultsContainer}>
// //           <Image 
// //             source={{ uri: "https://img.icons8.com/ios-filled/100/48a877/search-no-results.png" }}
// //             style={styles.noResultsIcon}
// //           />
// //           <Text style={styles.noResultsText}>No products found</Text>
// //           <Text style={styles.noResultsSubtext}>
// //             Try a different search or category
// //           </Text>
// //         </View>
// //       )}

// //       {getTotalItems() > 0 && (
// //         <View style={styles.footerContainer}>
// //           <LinearGradient
// //             colors={["rgba(255,255,255,0)", "rgba(255,255,255,0.9)", COLOR.white]}
// //             style={styles.footerGradient}
// //           />
// //           <View style={styles.footerContent}>
// //             <View style={styles.footerLeftContent}>
// //               <Text style={styles.totalItemsText}>
// //                 {getTotalItems()} item{getTotalItems() !== 1 ? "s" : ""}
// //               </Text>
// //               <Text style={styles.totalPriceText}>${getTotalPrice()}</Text>
// //             </View>

// //             <TouchableOpacity
// //               style={styles.placeOrderButton}
// //               onPress={() => setShowOrderModal(true)}
// //             >
// //               <LinearGradient
// //                 colors={[COLOR.primary, COLOR.accent]}
// //                 start={{ x: 0, y: 0 }}
// //                 end={{ x: 1, y: 0 }}
// //                 style={styles.placeOrderGradient}
// //               >
// //                 <Text style={styles.placeOrderButtonText}>Place Order</Text>
// //               </LinearGradient>
// //             </TouchableOpacity>
// //           </View>
// //         </View>
// //       )}

// //       {/* Order Summary Modal */}
// //       <OrderSummaryModal
// //         visible={showOrderModal}
// //         onClose={() => setShowOrderModal(false)}
// //         products={PRODUCTS}
// //         cart={cart}
// //         variantCart={variantCart}
// //         getTotalPrice={getTotalPrice}
// //         handleDecrement={handleDecrement}
// //         handleIncrement={handleIncrement}
// //         handleVariantDecrement={handleVariantDecrement}
// //         handleVariantIncrement={handleVariantIncrement}
// //       />

// //       {/* Product Variants Modal */}
// //       <VarientModal
// //         visible={showVariantModal}
// //         onClose={() => setShowVariantModal(false)}
// //         variantCart={variantCart}
// //         handleVariantDecrement={handleVariantDecrement}
// //         handleVariantIncrement={handleVariantIncrement}
// //         selectedProduct={selectedProduct}
// //       />
// //     </View>
// //   );
// // }

// // const styles = StyleSheet.create({
// //   container: {
// //     flex: 1,
// //     backgroundColor: "#FAFBFF",
// //   },
// //   header: {
// //     paddingTop: 45,
// //     paddingBottom: 8,
// //     backgroundColor: COLOR.white,
// //     borderBottomLeftRadius: 20,
// //     borderBottomRightRadius: 20,
// //     shadowColor: COLOR.black,
// //     shadowOffset: { width: 0, height: 3 },
// //     shadowOpacity: 0.05,
// //     shadowRadius: 6,
// //     elevation: 3,
// //     zIndex: 10,
// //   },
// //   headerTop: {
// //     flexDirection: "row",
// //     justifyContent: "space-between",
// //     alignItems: "center",
// //     paddingHorizontal: 20,
// //     marginBottom: 14,
// //   },
// //   headerTitle: {
// //     fontSize: 24,
// //     fontWeight: "700",
// //     color: COLOR.black,
// //     letterSpacing: 0.2,
// //   },
// //   headerSubtitle: {
// //     fontSize: 14,
// //     color: COLOR.grey,
// //     marginTop: 4,
// //     fontWeight: "500",
// //   },
// //   cartButton: {
// //     borderRadius: 16,
// //     overflow: "hidden",
// //   },
// //   cartIndicator: {
// //     width: 32,
// //     height: 32,
// //     borderRadius: 16,
// //     justifyContent: "center",
// //     alignItems: "center",
// //   },
// //   cartIndicatorText: {
// //     color: COLOR.white,
// //     fontWeight: "600",
// //     fontSize: 14,
// //   },
// //   searchAndCategoriesContainer: {
// //     paddingHorizontal: 16,
// //   },
// //   searchBar: {
// //     flexDirection: "row",
// //     alignItems: "center",
// //     backgroundColor: "#F5F8F6",
// //     borderRadius: 12,
// //     paddingHorizontal: 12,
// //     height: 40,
// //     marginBottom: 8,
// //     borderWidth: 1,
// //     borderColor: "rgba(72, 168, 119, 0.1)",
// //   },
// //   searchIcon: {
// //     width: 18,
// //     height: 18,
// //     marginRight: 10,
// //     tintColor: COLOR.primary,
// //     opacity: 0.7,
// //   },
// //   searchInput: {
// //     flex: 1,
// //     fontSize: 15,
// //     color: COLOR.darkGrey,
// //     height: 46,
// //   },
// //   clearButton: {
// //     width: 22,
// //     height: 22,
// //     borderRadius: 11,
// //     backgroundColor: "#E0E0E0",
// //     justifyContent: "center",
// //     alignItems: "center",
// //   },
// //   clearButtonText: {
// //     fontSize: 12,
// //     fontWeight: "600",
// //     color: "#7A7A7A",
// //     textAlign: "center",
// //   },
// //   categoriesList: {
// //     paddingVertical: 6,
// //   },
// //   categoryItem: {
// //     paddingHorizontal: 16,
// //     paddingVertical: 8,
// //     marginRight: 10,
// //     borderRadius: 20,
// //     backgroundColor: "#F0F2F5",
// //   },
// //   selectedCategoryItem: {
// //     backgroundColor: COLOR.primary,
// //   },
// //   categoryText: {
// //     fontSize: 13,
// //     fontWeight: "500",
// //     color: "#555555",
// //   },
// //   selectedCategoryText: {
// //     color: COLOR.white,
// //   },
// //   productList: {
// //     paddingHorizontal: 10,
// //     paddingTop: 20,
// //     paddingBottom: 100,
// //   },
// //   productRow: {
// //     justifyContent: "space-between",
// //     paddingHorizontal: 10,
// //   },
// //   productCardContainer: {
// //     width: (width - 50) / 2,
// //     marginBottom: 12,
// //   },
// //   productCard: {
// //     backgroundColor: COLOR.white,
// //     borderRadius: 16,
// //     padding: 10,
// //     shadowColor: COLOR.black,
// //     shadowOffset: { width: 0, height: 4 },
// //     shadowOpacity: 0.06,
// //     shadowRadius: 10,
// //     elevation: 3,
// //     height: 200,
// //     justifyContent: "space-between",
// //     borderWidth: 1,
// //     borderColor: "rgba(72, 168, 119, 0.05)",
// //   },
// //   imageContainer: {
// //     position: "relative",
// //     borderRadius: 14,
// //     overflow: "hidden",
// //     marginBottom: 8,
// //     elevation: 1,
// //   },
// //   productImage: {
// //     width: "100%",
// //     height: 95,
// //     borderRadius: 14,
// //     backgroundColor: "#F8F9FA",
// //     resizeMode: "cover",
// //   },
// //   imageGradient: {
// //     position: "absolute",
// //     top: 0,
// //     left: 0,
// //     right: 0,
// //     bottom: 0,
// //     opacity: 0.7,
// //   },
// //   productBadge: {
// //     position: "absolute",
// //     top: 10,
// //     right: 10,
// //     backgroundColor: "rgba(72, 168, 119, 0.12)",
// //     paddingHorizontal: 8,
// //     paddingVertical: 4,
// //     borderRadius: 10,
// //   },
// //   productBadgeText: {
// //     color: COLOR.primary,
// //     fontSize: 10,
// //     fontWeight: "700",
// //     letterSpacing: 0.2,
// //   },
// //   productInfo: {
// //     marginBottom: 8,
// //   },
// //   productName: {
// //     fontSize: 14,
// //     fontWeight: "600",
// //     color: COLOR.black,
// //     marginBottom: 4,
// //     letterSpacing: 0.2,
// //   },
// //   productPrice: {
// //     fontSize: 16,
// //     fontWeight: "700",
// //     color: COLOR.primary,
// //   },
// //   quantityContainer: {
// //     marginTop: "auto",
// //     alignItems: "flex-end",
// //   },
// //   quantityControls: {
// //     flexDirection: "row",
// //     justifyContent: "space-between",
// //     alignItems: "center",
// //     height: 38,
// //     backgroundColor: "#F7F8FC",
// //     borderRadius: 12,
// //     paddingHorizontal: 6,
// //   },
// //   quantityButton: {
// //     width: 30,
// //     height: 30,
// //     backgroundColor: COLOR.white,
// //     borderRadius: 10,
// //     justifyContent: "center",
// //     alignItems: "center",
// //     shadowColor: COLOR.black,
// //     shadowOffset: { width: 0, height: 1 },
// //     shadowOpacity: 0.04,
// //     shadowRadius: 3,
// //     elevation: 1,
// //   },
// //   incrementButton: {
// //     backgroundColor: COLOR.primary,
// //   },
// //   addButton: {
// //     borderRadius: 12,
// //     overflow: "hidden",
// //   },
// //   addButtonGradient: {
// //     paddingVertical: 10,
// //     paddingHorizontal: 32,
// //     alignItems: "center",
// //     borderRadius: 12,
// //   },
// //   addButtonText: {
// //     color: COLOR.white,
// //     fontWeight: "700",
// //     fontSize: 14,
// //     letterSpacing: 0.3,
// //   },
// //   quantityButtonText: {
// //     fontSize: 15,
// //     fontWeight: "600",
// //     color: "#555555",
// //   },
// //   quantityText: {
// //     fontSize: 15,
// //     fontWeight: "600",
// //     color: COLOR.darkGrey,
// //     marginHorizontal: 10,
// //   },
// //   noResultsContainer: {
// //     flex: 1,
// //     justifyContent: "center",
// //     alignItems: "center",
// //     paddingHorizontal: 20,
// //   },
// //   noResultsIcon: {
// //     width: 70,
// //     height: 70,
// //     marginBottom: 16,
// //     opacity: 0.6,
// //   },
// //   noResultsText: {
// //     fontSize: 18,
// //     fontWeight: "600",
// //     color: COLOR.darkGrey,
// //     marginBottom: 8,
// //   },
// //   noResultsSubtext: {
// //     fontSize: 14,
// //     color: COLOR.grey,
// //     textAlign: "center",
// //   },
// //   footerContainer: {
// //     position: "absolute",
// //     bottom: 0,
// //     left: 0,
// //     right: 0,
// //     paddingTop: 12,
// //   },
// //   footerGradient: {
// //     position: "absolute",
// //     top: 0,
// //     left: 0,
// //     right: 0,
// //     height: 40,
// //   },
// //   footerContent: {
// //     flexDirection: "row",
// //     justifyContent: "space-between",
// //     alignItems: "center",
// //     paddingHorizontal: 20,
// //     paddingVertical: 16,
// //     backgroundColor: COLOR.white,
// //     borderTopLeftRadius: 24,
// //     borderTopRightRadius: 24,
// //     shadowColor: COLOR.black,
// //     shadowOffset: { width: 0, height: -3 },
// //     shadowOpacity: 0.08,
// //     shadowRadius: 10,
// //     elevation: 8,
// //   },
// //   footerLeftContent: {
// //     justifyContent: "center",
// //   },
// //   totalItemsText: {
// //     fontSize: 13,
// //     color: COLOR.grey,
// //     marginBottom: 4,
// //   },
// //   totalPriceText: {
// //     fontSize: 20,
// //     fontWeight: "700",
// //     color: COLOR.primary,
// //   },
// //   placeOrderButton: {
// //     borderRadius: 14,
// //     overflow: "hidden",
// //   },
// //   placeOrderGradient: {
// //     paddingVertical: 12,
// //     paddingHorizontal: 20,
// //     borderRadius: 14,
// //   },
// //   placeOrderButtonText: {
// //     color: COLOR.white,
// //     fontWeight: "600",
// //     fontSize: 15,
// //   },
// // });
// import { LinearGradient } from "expo-linear-gradient";
// import React, { useState } from "react";
// import {
//   Dimensions,
//   FlatList,
//   Image,
//   StatusBar,
//   StyleSheet,
//   Text,
//   TextInput,
//   TouchableOpacity,
//   View,
// } from "react-native";
// import OrderSummaryModal from "../_components/orderSummaryModal";
// import VarientModal from "../_components/varientModal";

// // Brand colors
// export const COLOR = {
//   primary: "#48a877",
//   secondary: "#e8f5ef",
//   accent: "#3d8d64",
//   white: "#ffffff",
//   black: "#000",
//   grey: "#888",
//   lightGrey: "#f1f5f9",
//   darkGrey: "#4b5563",
//   red: "#ef4444",
//   green: "#22c55e",
// };

// // Sample product data kept the same
// const PRODUCTS = [
//   {
//     id: 1,
//     name: "iPhone 14 Pro",
//     price: 999,
//     image:
//       "https://www.dxomark.com/wp-content/uploads/medias/post-125834/Apple-iPhone-14_FINAL_featured-image-packshot-review.jpg",
//     variants: [
//       { id: 101, name: "iPhone 14 Pro 128GB", price: 999 },
//       { id: 102, name: "iPhone 14 Pro 256GB", price: 1099 },
//       { id: 103, name: "iPhone 14 Pro 512GB", price: 1299 },
//     ],
//     category: "Phones",
//   },
//   {
//     id: 2,
//     name: "MacBook Air",
//     price: 1199,
//     image:
//       "https://alephksa.com/cdn/shop/files/MacBook_Air_15_in_M3_Midnight_PDP_Image_Position_1__en-AE_9c8e6839-222d-45c3-b903-053481a92ef6.jpg?v=1709594809&width=823",
//     variants: [
//       { id: 201, name: "MacBook Air 8GB/256GB", price: 1199 },
//       { id: 202, name: "MacBook Air 16GB/512GB", price: 1499 },
//     ],
//     category: "Laptops",
//   },
//   {
//     id: 3,
//     name: "AirPods Pro",
//     price: 249,
//     image:
//       "https://www.tech21.com/cdn/shop/files/1eee32c5-e890-4159-88e9-eb5a9cf980ec.jpg?v=1718361342",
//     variants: [
//       {
//         id: 301,
//         image:
//           "https://www.tech21.com/cdn/shop/files/1eee32c5-e890-4159-88e9-eb5a9cf980ec.jpg?v=1718361342",
//         name: "AirPods Pro",
//         price: 249,
//       },
//       { id: 302, name: "AirPods Pro with MagSafe Case", price: 279 },
//     ],
//     category: "Audio",
//   },
//   {
//     id: 4,
//     name: "iPad Air",
//     price: 599,
//     image:
//       "https://store.storeimages.cdn-apple.com/1/as-images.apple.com/is/ipad-pro-storage-select-202405-11inch-silver-glossy-wifi?wid=5120&hei=2880&fmt=p-jpg&qlt=80&.v=czlRMVFIQnlSdTl0T3ZTQUtJUW9rMm5pQUoxb0NIVEJFSjRVRzZ4dzV5VHhzSVRSdnBuOHFlMHZ5cERpS2J3bFZ4Z1Fxa3Y4V1F0eXdGcDVzSnYvZ3J4M3lYcDIyK01lckZBaW5GTC9DMEQxcjBVRyswWG14bEI4WVZBcUIybEZTMW5aeVlPZFhiTTZza0hENEFwOTlB&traceId=1",
//     variants: [
//       {
//         id: 401,
//         image:
//           "https://www.dxomark.com/wp-content/uploads/medias/post-125834/Apple-iPhone-14_FINAL_featured-image-packshot-review.jpg",
//         name: "iPad Air 64GB",
//         price: 599,
//       },
//       { id: 402, name: "iPad Air 256GB", price: 749 },
//     ],
//     category: "Tablets",
//   },
//   {
//     id: 5,
//     name: "Apple Watch",
//     price: 399,
//     image:
//       "https://www.greenware.lk/wp-content/uploads/2024/09/Apple-Watch-Series-10-Price-in-Sri-Lanka.webp",
//     variants: [
//       { id: 501, name: "Apple Watch Series 8 GPS", price: 399 },
//       { id: 502, name: "Apple Watch Series 8 Cellular", price: 499 },
//     ],
//     category: "Wearables",
//   },
//   {
//     id: 6,
//     name: "HomePod mini",
//     price: 99,
//     image:
//       "https://api.runbazaar.com/media/__sized__/product_img/2021/07/15/RBI000000000036/MJ2E3-YL_IMG_1_KtuTHrS-smart_crop-c0-5__0-5-750x750-70.jpg",
//     variants: [
//       { id: 601, name: "HomePod mini White", price: 99 },
//       { id: 602, name: "HomePod mini Space Gray", price: 99 },
//     ],
//     category: "Home",
//   },
// ];

// export default function ProductListingScreen() {
//   const [cart, setCart] = useState<any>({});
//   const [variantCart, setVariantCart] = useState<any>({});
//   const [showOrderModal, setShowOrderModal] = useState(false);
//   const [selectedProduct, setSelectedProduct] = useState(null);
//   const [showVariantModal, setShowVariantModal] = useState(false);
//   const [searchQuery, setSearchQuery] = useState("");

//   // Filter products based on search query
//   const filteredProducts = PRODUCTS.filter((product) => {
//     return product.name.toLowerCase().includes(searchQuery.toLowerCase());
//   });

//   const handleIncrement = (productId:any) => {
//     setCart((prevCart:any) => ({
//       ...prevCart,
//       [productId]: (prevCart[productId] || 0) + 1,
//     }));
//   };

//   const handleDecrement = (productId:any) => {
//     if (cart[productId] && cart[productId] > 0) {
//       setCart((prevCart:any) => ({
//         ...prevCart,
//         [productId]: prevCart[productId] - 1,
//       }));
//     }
//   };

//   const handleVariantIncrement = (variantId:any) => {
//     setVariantCart((prevCart:any) => ({
//       ...prevCart,
//       [variantId]: (prevCart[variantId] || 0) + 1,
//     }));
//   };

//   const handleVariantDecrement = (variantId:any) => {
//     if (variantCart[variantId] && variantCart[variantId] > 0) {
//       setVariantCart((prevCart:any) => ({
//         ...prevCart,
//         [variantId]: prevCart[variantId] - 1,
//       }));
//     }
//   };

//   const showVariants = (product:any) => {
//     setSelectedProduct(product);
//     setShowVariantModal(true);
//   };

//   const getTotalPrice = () => {
//     let total = 0;

//     // Calculate total for base products
//     Object.keys(cart).forEach((productId:any) => {
//       const product = PRODUCTS.find((p) => p.id === parseInt(productId));
//       if (product) {
//         total += product.price * cart[productId];
//       }
//     });

//     // Calculate total for variant products
//     Object.keys(variantCart).forEach((variantId) => {
//       const variant = PRODUCTS.flatMap((p) => p.variants).find(
//         (v) => v.id === parseInt(variantId)
//       );
//       if (variant) {
//         total += variant.price * variantCart[variantId];
//       }
//     });

//     return total.toFixed(2);
//   };

//   const getTotalItems = () => {
//     const baseItems:any = Object.values(cart).reduce(
//       (sum:any, qty) => sum + qty,
//       0
//     );
//     const variantItems = Object.values(variantCart).reduce(
//       (sum:any, qty) => sum + qty,
//       0
//     );
//     return baseItems + variantItems;
//   };

//   const renderProduct = ({ item }:any) => {
//     const quantity = cart[item.id] || 0;

//     return (
//       <View style={styles.productCard}>
//         {/* Product Image */}
//         <View style={styles.productImageContainer}>
//           <Image source={{ uri: item.image }} style={styles.productImage} />
//           {item.variants.length > 0 && (
//             <View style={styles.productBadge}>
//               <Text style={styles.productBadgeText}>
//                 {item.variants.length} variants
//               </Text>
//             </View>
//           )}
//         </View>

//         {/* Product Info */}
//         <View style={styles.productInfo}>
//           <View>
//             <Text style={styles.productName}>{item.name}</Text>
//             <Text style={styles.productCategory}>{item.category}</Text>
//             <Text style={styles.productPrice}>${item.price}</Text>
//           </View>

//           {/* Quantity Controls */}
//           <View style={styles.quantityContainer}>
//             {quantity > 0 ? (
//               <View style={styles.quantityControls}>
//                 <TouchableOpacity
//                   style={styles.quantityButton}
//                   onPress={() => handleDecrement(item.id)}
//                 >
//                   <Text style={styles.quantityButtonText}>−</Text>
//                 </TouchableOpacity>

//                 <Text style={styles.quantityText}>{quantity}</Text>

//                 <TouchableOpacity
//                   style={[styles.quantityButton, styles.incrementButton]}
//                   onPress={() => handleIncrement(item.id)}
//                 >
//                   <Text
//                     style={[styles.quantityButtonText, { color: COLOR.white }]}
//                   >
//                     +
//                   </Text>
//                 </TouchableOpacity>
//               </View>
//             ) : (
//               <TouchableOpacity
//                 style={styles.addButton}
//                 onPress={() => handleIncrement(item.id)}
//               >
//                 <LinearGradient
//                   colors={[COLOR.primary, COLOR.accent]}
//                   start={{ x: 0, y: 0 }}
//                   end={{ x: 1, y: 0 }}
//                   style={styles.addButtonGradient}
//                 >
//                   <Text style={styles.addButtonText}>Add</Text>
//                 </LinearGradient>
//               </TouchableOpacity>
//             )}
//           </View>
//         </View>

//         {/* Long press for variants */}
//         <TouchableOpacity
//           style={styles.variantOverlay}
//           activeOpacity={1}
//           onLongPress={() => showVariants(item)}
//         />
//       </View>
//     );
//   };

//   return (
//     <View style={styles.container}>
//       <StatusBar barStyle="dark-content" backgroundColor={COLOR.white} />

//       <View style={styles.header}>
//         <View style={styles.headerTop}>
//           <View>
//             <Text style={styles.headerTitle}>Products</Text>
//             <Text style={styles.headerSubtitle}>
//               Find your perfect device
//             </Text>
//           </View>
//           <TouchableOpacity
//             style={styles.cartButton}
//             onPress={() => getTotalItems() > 0 && setShowOrderModal(true)}
//           >
//             <LinearGradient
//               colors={
//                 getTotalItems() > 0
//                   ? [COLOR.primary, COLOR.accent]
//                   : ["#E0E0E0", "#F0F0F0"]
//               }
//               style={styles.cartIndicator}
//             >
//               <Text style={styles.cartIndicatorText}>{getTotalItems()}</Text>
//             </LinearGradient>
//           </TouchableOpacity>
//         </View>

//         <View style={styles.searchContainer}>
//           <View style={styles.searchBar}>
//             <Image 
//               source={{ uri: "https://img.icons8.com/ios-filled/50/48a877/search.png" }}
//               style={styles.searchIcon}
//             />
//             <TextInput
//               style={styles.searchInput}
//               placeholder="Search products..."
//               placeholderTextColor="#9DA3B4"
//               value={searchQuery}
//               onChangeText={setSearchQuery}
//             />
//             {searchQuery.length > 0 && (
//               <TouchableOpacity
//                 style={styles.clearButton}
//                 onPress={() => setSearchQuery("")}
//               >
//                 <Text style={styles.clearButtonText}>✕</Text>
//               </TouchableOpacity>
//             )}
//           </View>
//         </View>
//       </View>

//       {filteredProducts.length > 0 ? (
//         <FlatList
//           data={filteredProducts}
//           renderItem={renderProduct}
//           keyExtractor={(item) => item.id.toString()}
//           contentContainerStyle={styles.productList}
//           showsVerticalScrollIndicator={false}
//         />
//       ) : (
//         <View style={styles.noResultsContainer}>
//           <Image 
//             source={{ uri: "https://img.icons8.com/ios-filled/100/48a877/search-no-results.png" }}
//             style={styles.noResultsIcon}
//           />
//           <Text style={styles.noResultsText}>No products found</Text>
//           <Text style={styles.noResultsSubtext}>
//             Try a different search
//           </Text>
//         </View>
//       )}

//       {getTotalItems() > 0 && (
//         <View style={styles.footerContainer}>
//           <LinearGradient
//             colors={["rgba(255,255,255,0)", "rgba(255,255,255,0.9)", COLOR.white]}
//             style={styles.footerGradient}
//           />
//           <View style={styles.footerContent}>
//             <View style={styles.footerLeftContent}>
//               <Text style={styles.totalItemsText}>
//                 {getTotalItems()} item{getTotalItems() !== 1 ? "s" : ""}
//               </Text>
//               <Text style={styles.totalPriceText}>${getTotalPrice()}</Text>
//             </View>

//             <TouchableOpacity
//               style={styles.placeOrderButton}
//               onPress={() => setShowOrderModal(true)}
//             >
//               <LinearGradient
//                 colors={[COLOR.primary, COLOR.accent]}
//                 start={{ x: 0, y: 0 }}
//                 end={{ x: 1, y: 0 }}
//                 style={styles.placeOrderGradient}
//               >
//                 <Text style={styles.placeOrderButtonText}>Place Order</Text>
//               </LinearGradient>
//             </TouchableOpacity>
//           </View>
//         </View>
//       )}

//       {/* Order Summary Modal */}
//       <OrderSummaryModal
//         visible={showOrderModal}
//         onClose={() => setShowOrderModal(false)}
//         products={PRODUCTS}
//         cart={cart}
//         variantCart={variantCart}
//         getTotalPrice={getTotalPrice}
//         handleDecrement={handleDecrement}
//         handleIncrement={handleIncrement}
//         handleVariantDecrement={handleVariantDecrement}
//         handleVariantIncrement={handleVariantIncrement}
//       />

//       {/* Product Variants Modal */}
//       <VarientModal
//         visible={showVariantModal}
//         onClose={() => setShowVariantModal(false)}
//         variantCart={variantCart}
//         handleVariantDecrement={handleVariantDecrement}
//         handleVariantIncrement={handleVariantIncrement}
//         selectedProduct={selectedProduct}
//       />
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "#FAFBFF",
//   },
//   header: {
//     paddingTop: 45,
//     paddingBottom: 15,
//     backgroundColor: COLOR.white,
//     borderBottomLeftRadius: 20,
//     borderBottomRightRadius: 20,
//     shadowColor: COLOR.black,
//     shadowOffset: { width: 0, height: 3 },
//     shadowOpacity: 0.05,
//     shadowRadius: 6,
//     elevation: 3,
//     zIndex: 10,
//   },
//   headerTop: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     alignItems: "center",
//     paddingHorizontal: 20,
//     marginBottom: 14,
//   },
//   headerTitle: {
//     fontSize: 24,
//     fontWeight: "700",
//     color: COLOR.black,
//     letterSpacing: 0.2,
//   },
//   headerSubtitle: {
//     fontSize: 14,
//     color: COLOR.grey,
//     marginTop: 4,
//     fontWeight: "500",
//   },
//   cartButton: {
//     borderRadius: 16,
//     overflow: "hidden",
//   },
//   cartIndicator: {
//     width: 32,
//     height: 32,
//     borderRadius: 16,
//     justifyContent: "center",
//     alignItems: "center",
//   },
//   cartIndicatorText: {
//     color: COLOR.white,
//     fontWeight: "600",
//     fontSize: 14,
//   },
//   searchContainer: {
//     paddingHorizontal: 16,
//   },
//   searchBar: {
//     flexDirection: "row",
//     alignItems: "center",
//     backgroundColor: "#F5F8F6",
//     borderRadius: 12,
//     paddingHorizontal: 12,
//     height: 40,
//     borderWidth: 1,
//     borderColor: "rgba(72, 168, 119, 0.1)",
//   },
//   searchIcon: {
//     width: 18,
//     height: 18,
//     marginRight: 10,
//     tintColor: COLOR.primary,
//     opacity: 0.7,
//   },
//   searchInput: {
//     flex: 1,
//     fontSize: 15,
//     color: COLOR.darkGrey,
//     height: 46,
//   },
//   clearButton: {
//     width: 22,
//     height: 22,
//     borderRadius: 11,
//     backgroundColor: "#E0E0E0",
//     justifyContent: "center",
//     alignItems: "center",
//   },
//   clearButtonText: {
//     fontSize: 12,
//     fontWeight: "600",
//     color: "#7A7A7A",
//     textAlign: "center",
//   },
//   productList: {
//     paddingHorizontal: 16,
//     paddingTop: 16,
//     paddingBottom: 100,
//   },
//   productCard: {
//     flexDirection: "row",
//     backgroundColor: COLOR.white,
//     borderRadius: 16,
//     marginBottom: 12,
//     shadowColor: COLOR.black,
//     shadowOffset: { width: 0, height: 4 },
//     shadowOpacity: 0.06,
//     shadowRadius: 8,
//     elevation: 2,
//     overflow: "hidden",
//     borderWidth: 1,
//     borderColor: "rgba(72, 168, 119, 0.05)",
//     position: "relative",
//   },
//   variantOverlay: {
//     position: "absolute",
//     top: 0,
//     left: 0,
//     right: 0,
//     bottom: 0,
//   },
//   productImageContainer: {
//     position: "relative",
//     width: 100,
//     height: 100,
//     borderTopLeftRadius: 16,
//     borderBottomLeftRadius: 16,
//     overflow: "hidden",
//   },
//   productImage: {
//     width: "100%",
//     height: "100%",
//     resizeMode: "cover",
//   },
//   productBadge: {
//     position: "absolute",
//     top: 8,
//     left: 8,
//     backgroundColor: "rgba(72, 168, 119, 0.12)",
//     paddingHorizontal: 8,
//     paddingVertical: 4,
//     borderRadius: 10,
//   },
//   productBadgeText: {
//     color: COLOR.primary,
//     fontSize: 10,
//     fontWeight: "700",
//     letterSpacing: 0.2,
//   },
//   productInfo: {
//     flex: 1,
//     flexDirection: "row",
//     justifyContent: "space-between",
//     alignItems: "center",
//     padding: 12,
//   },
//   productName: {
//     fontSize: 16,
//     fontWeight: "600",
//     color: COLOR.black,
//     marginBottom: 4,
//     letterSpacing: 0.2,
//   },
//   productCategory: {
//     fontSize: 12,
//     color: COLOR.grey,
//     marginBottom: 8,
//   },
//   productPrice: {
//     fontSize: 17,
//     fontWeight: "700",
//     color: COLOR.primary,
//   },
//   quantityContainer: {
//     justifyContent: "center",
//     alignItems: "flex-end",
//     marginLeft: 10,
//   },
//   quantityControls: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     alignItems: "center",
//     height: 36,
//     backgroundColor: "#F7F8FC",
//     borderRadius: 12,
//     paddingHorizontal: 6,
//   },
//   quantityButton: {
//     width: 28,
//     height: 28,
//     backgroundColor: COLOR.white,
//     borderRadius: 10,
//     justifyContent: "center",
//     alignItems: "center",
//     shadowColor: COLOR.black,
//     shadowOffset: { width: 0, height: 1 },
//     shadowOpacity: 0.04,
//     shadowRadius: 3,
//     elevation: 1,
//   },
//   incrementButton: {
//     backgroundColor: COLOR.primary,
//   },
//   addButton: {
//     borderRadius: 12,
//     overflow: "hidden",
//   },
//   addButtonGradient: {
//     paddingVertical: 8,
//     paddingHorizontal: 18,
//     alignItems: "center",
//     borderRadius: 12,
//   },
//   addButtonText: {
//     color: COLOR.white,
//     fontWeight: "700",
//     fontSize: 14,
//     letterSpacing: 0.3,
//   },
//   quantityButtonText: {
//     fontSize: 15,
//     fontWeight: "600",
//     color: "#555555",
//   },
//   quantityText: {
//     fontSize: 15,
//     fontWeight: "600",
//     color: COLOR.darkGrey,
//     marginHorizontal: 10,
//   },
//   noResultsContainer: {
//     flex: 1,
//     justifyContent: "center",
//     alignItems: "center",
//     paddingHorizontal: 20,
//   },
//   noResultsIcon: {
//     width: 70,
//     height: 70,
//     marginBottom: 16,
//     opacity: 0.6,
//   },
//   noResultsText: {
//     fontSize: 18,
//     fontWeight: "600",
//     color: COLOR.darkGrey,
//     marginBottom: 8,
//   },
//   noResultsSubtext: {
//     fontSize: 14,
//     color: COLOR.grey,
//     textAlign: "center",
//   },
//   footerContainer: {
//     position: "absolute",
//     bottom: 0,
//     left: 0,
//     right: 0,
//     paddingTop: 12,
//   },
//   footerGradient: {
//     position: "absolute",
//     top: 0,
//     left: 0,
//     right: 0,
//     height: 40,
//   },
//   footerContent: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     alignItems: "center",
//     paddingHorizontal: 20,
//     paddingVertical: 16,
//     backgroundColor: COLOR.white,
//     borderTopLeftRadius: 24,
//     borderTopRightRadius: 24,
//     shadowColor: COLOR.black,
//     shadowOffset: { width: 0, height: -3 },
//     shadowOpacity: 0.08,
//     shadowRadius: 10,
//     elevation: 8,
//   },
//   footerLeftContent: {
//     justifyContent: "center",
//   },
//   totalItemsText: {
//     fontSize: 13,
//     color: COLOR.grey,
//     marginBottom: 4,
//   },
//   totalPriceText: {
//     fontSize: 20,
//     fontWeight: "700",
//     color: COLOR.primary,
//   },
//   placeOrderButton: {
//     borderRadius: 14,
//     overflow: "hidden",
//   },
//   placeOrderGradient: {
//     paddingVertical: 12,
//     paddingHorizontal: 20,
//     borderRadius: 14,
//   },
//   placeOrderButtonText: {
//     color: COLOR.white,
//     fontWeight: "600",
//     fontSize: 15,
//   },
// });

import { LinearGradient } from "expo-linear-gradient";
import React, { useState } from "react";
import {
  Dimensions,
  FlatList,
  Image,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import OrderSummaryModal from "../_components/orderSummaryModal";
import VarientModal from "../_components/varientModal";

// Brand colors
export const COLOR = {
  primary: "#48a877",
  secondary: "#e8f5ef",
  accent: "#3d8d64",
  white: "#ffffff",
  black: "#000",
  grey: "#888",
  lightGrey: "#f1f5f9",
  darkGrey: "#4b5563",
  red: "#ef4444",
  green: "#22c55e",
};

// Sample product data kept the same
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
      {
        id: 301,
        image:
          "https://www.tech21.com/cdn/shop/files/1eee32c5-e890-4159-88e9-eb5a9cf980ec.jpg?v=1718361342",
        name: "AirPods Pro",
        price: 249,
      },
      { id: 302, name: "AirPods Pro with MagSafe Case", price: 279 },
    ],
    category: "Audio",
  },
  {
    id: 4,
    name: "iPad Air",
    price: 599,
    image:
      "https://store.storeimages.cdn-apple.com/1/as-images.apple.com/is/ipad-pro-storage-select-202405-11inch-silver-glossy-wifi?wid=5120&hei=2880&fmt=p-jpg&qlt=80&.v=czlRMVFIQnlSdTl0T3ZTQUtJUW9rMm5pQUoxb0NIVEJFSjRVRzZ4dzV5VHhzSVRSdnBuOHFlMHZ5cERpS2J3bFZ4Z1Fxa3Y4V1F0eXdGcDVzSnYvZ3J4M3lYcDIyK01lckZBaW5GTC9DMEQxcjBVRyswWG14bEI4WVZBcUIybEZTMW5aeVlPZFhiTTZza0hENEFwOTlB&traceId=1",
    variants: [
      {
        id: 401,
        image:
          "https://www.dxomark.com/wp-content/uploads/medias/post-125834/Apple-iPhone-14_FINAL_featured-image-packshot-review.jpg",
        name: "iPad Air 64GB",
        price: 599,
      },
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

export default function ProductListingScreen() {
  const [cart, setCart] = useState<any>({});
  const [variantCart, setVariantCart] = useState<any>({});
  const [showOrderModal, setShowOrderModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [showVariantModal, setShowVariantModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  // Filter products based on search query
  const filteredProducts = PRODUCTS.filter((product) => {
    return product.name.toLowerCase().includes(searchQuery.toLowerCase());
  });

  const handleIncrement = (productId:any) => {
    setCart((prevCart:any) => ({
      ...prevCart,
      [productId]: (prevCart[productId] || 0) + 1,
    }));
  };

  const handleDecrement = (productId:any) => {
    if (cart[productId] && cart[productId] > 0) {
      setCart((prevCart:any) => ({
        ...prevCart,
        [productId]: prevCart[productId] - 1,
      }));
    }
  };

  const handleVariantIncrement = (variantId:any) => {
    setVariantCart((prevCart:any) => ({
      ...prevCart,
      [variantId]: (prevCart[variantId] || 0) + 1,
    }));
  };

  const handleVariantDecrement = (variantId:any) => {
    if (variantCart[variantId] && variantCart[variantId] > 0) {
      setVariantCart((prevCart:any) => ({
        ...prevCart,
        [variantId]: prevCart[variantId] - 1,
      }));
    }
  };

  const showVariants = (product:any) => {
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
    const baseItems:any = Object.values(cart).reduce(
      (sum:any, qty) => sum + qty,
      0
    );
    const variantItems = Object.values(variantCart).reduce(
      (sum:any, qty) => sum + qty,
      0
    );
    return baseItems + variantItems;
  };

  const renderProduct = ({ item }:any) => {
    const quantity = cart[item.id] || 0;

    return (
      <TouchableOpacity
        style={styles.productCard}
        activeOpacity={0.9}
        onLongPress={() => showVariants(item)}
      >
        {/* Product Image */}
        <View style={styles.productImageContainer}>
          <Image source={{ uri: item.image }} style={styles.productImage} />
          {item.variants.length > 0 && (
            <View style={styles.productBadge}>
              <Text style={styles.productBadgeText}>
                {item.variants.length} variants
              </Text>
            </View>
          )}
        </View>

        {/* Product Info */}
        <View style={styles.productInfo}>
          <View>
            <Text style={styles.productName}>{item.name}</Text>
            <Text style={styles.productCategory}>{item.category}</Text>
            <Text style={styles.productPrice}>${item.price}</Text>
          </View>

          {/* Quantity Controls */}
          <View style={styles.quantityContainer}>
            {quantity > 0 ? (
              <View style={styles.quantityControls}>
                <TouchableOpacity
                  style={styles.quantityButton}
                  onPress={(e) => {
                    e.stopPropagation();
                    handleDecrement(item.id);
                  }}
                >
                  <Text style={styles.quantityButtonText}>−</Text>
                </TouchableOpacity>

                <Text style={styles.quantityText}>{quantity}</Text>

                <TouchableOpacity
                  style={[styles.quantityButton, styles.incrementButton]}
                  onPress={(e) => {
                    e.stopPropagation();
                    handleIncrement(item.id);
                  }}
                >
                  <Text
                    style={[styles.quantityButtonText, { color: COLOR.white }]}
                  >
                    +
                  </Text>
                </TouchableOpacity>
              </View>
            ) : (
              <TouchableOpacity
                style={styles.addButton}
                onPress={(e) => {
                  e.stopPropagation();
                  handleIncrement(item.id);
                }}
              >
                <LinearGradient
                  colors={[COLOR.primary, COLOR.accent]}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 0 }}
                  style={styles.addButtonGradient}
                >
                  <Text style={styles.addButtonText}>Add</Text>
                </LinearGradient>
              </TouchableOpacity>
            )}
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={COLOR.white} />

      <View style={styles.header}>
        <View style={styles.headerTop}>
          <View>
            <Text style={styles.headerTitle}>Products</Text>
            <Text style={styles.headerSubtitle}>
              Find your perfect device
            </Text>
          </View>
          <TouchableOpacity
            style={styles.cartButton}
            onPress={() => getTotalItems() > 0 && setShowOrderModal(true)}
          >
            <LinearGradient
              colors={
                getTotalItems() > 0
                  ? [COLOR.primary, COLOR.accent]
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
            <Image 
              source={{ uri: "https://img.icons8.com/ios-filled/50/48a877/search.png" }}
              style={styles.searchIcon}
            />
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
      </View>

      {filteredProducts.length > 0 ? (
        <FlatList
          data={filteredProducts}
          renderItem={renderProduct}
          keyExtractor={(item) => item.id.toString()}
          contentContainerStyle={styles.productList}
          showsVerticalScrollIndicator={false}
        />
      ) : (
        <View style={styles.noResultsContainer}>
          <Image 
            source={{ uri: "https://img.icons8.com/ios-filled/100/48a877/search-no-results.png" }}
            style={styles.noResultsIcon}
          />
          <Text style={styles.noResultsText}>No products found</Text>
          <Text style={styles.noResultsSubtext}>
            Try a different search
          </Text>
        </View>
      )}

      {getTotalItems() > 0 && (
        <View style={styles.footerContainer}>
          <LinearGradient
            colors={["rgba(255,255,255,0)", "rgba(255,255,255,0.9)", COLOR.white]}
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
                colors={[COLOR.primary, COLOR.accent]}
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
        selectedProduct={selectedProduct}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FAFBFF",
  },
  header: {
    // paddingTop: 45,
    // paddingBottom: 15,
    // paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 8,
    backgroundColor: COLOR.white,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    shadowColor: COLOR.black,
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.05,
    shadowRadius: 6,
    elevation: 3,
    zIndex: 10,
  },
  headerTop: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    marginBottom: 14,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: "700",
    color: COLOR.black,
    letterSpacing: 0.2,
  },
  headerSubtitle: {
    fontSize: 14,
    color: COLOR.grey,
    marginTop: 4,
    fontWeight: "500",
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
    color: COLOR.white,
    fontWeight: "600",
    fontSize: 14,
  },
  searchContainer: {
    paddingHorizontal: 16,
  },
  searchBar: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F5F8F6",
    borderRadius: 12,
    paddingHorizontal: 12,
    height: 40,
    borderWidth: 1,
    borderColor: "rgba(72, 168, 119, 0.1)",
  },
  searchIcon: {
    width: 18,
    height: 18,
    marginRight: 10,
    tintColor: COLOR.primary,
    opacity: 0.7,
  },
  searchInput: {
    flex: 1,
    fontSize: 15,
    color: COLOR.darkGrey,
    height: 46,
  },
  clearButton: {
    width: 22,
    height: 22,
    borderRadius: 11,
    backgroundColor: "#E0E0E0",
    justifyContent: "center",
    alignItems: "center",
  },
  clearButtonText: {
    fontSize: 12,
    fontWeight: "600",
    color: "#7A7A7A",
    textAlign: "center",
  },
  productList: {
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 100,
  },
  productCard: {
    flexDirection: "row",
    backgroundColor: COLOR.white,
    borderRadius: 16,
    marginBottom: 5,
    shadowColor: COLOR.black,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 2,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: "rgba(72, 168, 119, 0.05)",
    position: "relative",
  },
  variantOverlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  productImageContainer: {
    position: "relative",
    width: 100,
    height: 100,
    borderTopLeftRadius: 16,
    borderBottomLeftRadius: 16,
    overflow: "hidden",
  },
  productImage: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
  productBadge: {
    position: "absolute",
    top: 8,
    left: 8,
    backgroundColor: "rgba(72, 168, 119, 0.12)",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 10,
  },
  productBadgeText: {
    color: COLOR.primary,
    fontSize: 10,
    fontWeight: "700",
    letterSpacing: 0.2,
  },
  productInfo: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 12,
  },
  productName: {
    fontSize: 16,
    fontWeight: "600",
    color: COLOR.black,
    marginBottom: 4,
    letterSpacing: 0.2,
  },
  productCategory: {
    fontSize: 12,
    color: COLOR.grey,
    marginBottom: 8,
  },
  productPrice: {
    fontSize: 17,
    fontWeight: "700",
    color: COLOR.primary,
  },
  quantityContainer: {
    justifyContent: "center",
    alignItems: "flex-end",
    marginLeft: 10,
  },
  quantityControls: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    height: 36,
    backgroundColor: "#F7F8FC",
    borderRadius: 12,
    paddingHorizontal: 6,
  },
  quantityButton: {
    width: 28,
    height: 28,
    backgroundColor: COLOR.white,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: COLOR.black,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.04,
    shadowRadius: 3,
    elevation: 1,
  },
  incrementButton: {
    backgroundColor: COLOR.primary,
  },
  addButton: {
    borderRadius: 12,
    overflow: "hidden",
  },
  addButtonGradient: {
    paddingVertical: 8,
    paddingHorizontal: 18,
    alignItems: "center",
    borderRadius: 12,
  },
  addButtonText: {
    color: COLOR.white,
    fontWeight: "700",
    fontSize: 14,
    letterSpacing: 0.3,
  },
  quantityButtonText: {
    fontSize: 15,
    fontWeight: "600",
    color: "#555555",
  },
  quantityText: {
    fontSize: 15,
    fontWeight: "600",
    color: COLOR.darkGrey,
    marginHorizontal: 10,
  },
  noResultsContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  noResultsIcon: {
    width: 70,
    height: 70,
    marginBottom: 16,
    opacity: 0.6,
  },
  noResultsText: {
    fontSize: 18,
    fontWeight: "600",
    color: COLOR.darkGrey,
    marginBottom: 8,
  },
  noResultsSubtext: {
    fontSize: 14,
    color: COLOR.grey,
    textAlign: "center",
  },
  footerContainer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    paddingTop: 12,
  },
  footerGradient: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    height: 40,
  },
  footerContent: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: COLOR.white,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    shadowColor: COLOR.black,
    shadowOffset: { width: 0, height: -3 },
    shadowOpacity: 0.08,
    shadowRadius: 10,
    elevation: 8,
  },
  footerLeftContent: {
    justifyContent: "center",
  },
  totalItemsText: {
    fontSize: 13,
    color: COLOR.grey,
    marginBottom: 4,
  },
  totalPriceText: {
    fontSize: 20,
    fontWeight: "700",
    color: COLOR.primary,
  },
  placeOrderButton: {
    borderRadius: 14,
    overflow: "hidden",
  },
  placeOrderGradient: {
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 14,
  },
  placeOrderButtonText: {
    color: COLOR.white,
    fontWeight: "600",
    fontSize: 15,
  },
});