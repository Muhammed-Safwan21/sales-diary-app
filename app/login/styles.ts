import { COLOR } from "@/config/color";
import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8F5F1", // Light cream/beige background
  },
  keyboardAvoidView: {
    flex: 1,
  },
  scrollContainer: {
    flexGrow: 1,
    paddingHorizontal: 24,
    paddingTop: 40,
    paddingBottom: 24,
  },
  logoContainer: {
    alignItems: "flex-start",
    marginBottom: 40,
    flexDirection: "row",
  },
  logo: {
    width: 30,
    height: 30,
    marginRight: 10,
  },
  logoText: {
    fontSize: 22,
    color: "#333",
    fontFamily: "regular",
  },
  logoTagline: {
    fontSize: 22,
    fontFamily: "bold",
    color: "#888",
    marginLeft: 5,
  },
  welcomeContainer: {
    marginTop: 120,
    marginBottom: 60,

  },
  welcomeTitle: {
    fontSize: 27,
    fontFamily: "bold",
    color: COLOR.black,
    marginBottom: 8,
  },
  welcomeSubtitle: {
    fontSize: 16,
    color: COLOR.grey,
    fontFamily: "regular",
  },
  formContainer: {
    width: "100%",
    zIndex: 10,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    borderRadius: 8,
    height: 50,
    marginBottom: 16,
    paddingHorizontal: 16,
  },
  inputIcon: {
    marginRight: 12,
  },
  input: {
    flex: 1,
    height: "100%",
    color: "#333",
    fontSize: 16,
  },
  eyeIcon: {
    padding: 8,
  },
  forgotPasswordContainer: {
    alignSelf: "flex-end",
    marginBottom: 24,
  },
  forgotPasswordText: {
    color: "#2E7D32",
    fontSize: 14,
    fontWeight: "600",
  },
  loginButton: {
    height: 56,
    borderRadius: 16,
    overflow: "hidden",
    marginBottom: 24,
    shadowColor: "#4CAF50",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 4,
  },
  gradient: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  loginButtonText: {
    color: "#FFF",
    fontSize: 16,
    fontWeight: "bold",
  },
  dividerContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 24,
  },
  divider: {
    flex: 1,
    height: 1,
    backgroundColor: "#E0E0E0",
  },
  dividerText: {
    paddingHorizontal: 12,
    color: "#888",
    fontSize: 14,
  },
  socialContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: 32,
  },
  socialButton: {
    width: 56,
    height: 56,
    borderRadius: 16,
    overflow: "hidden",
    marginHorizontal: 8,
    // shadowColor: '#000',
    // shadowOffset: {
    //   width: 0,
    //   height: 2,
    // },
    // shadowOpacity: 0.1,
    // shadowRadius: 4,
    // elevation: 2,
  },
  socialGradient: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  registerContainer: {
    flexDirection: "row",
    justifyContent: "center",
  },
  registerText: {
    color: "#888",
    fontSize: 14,
  },
  registerLink: {
    color: "#2E7D32",
    fontSize: 14,
    fontWeight: "bold",
  },
  coffeeCircleContainer: {
    position: "absolute",
    right: -100,
    top: 120,
    width: 320,
    height: 320,
    zIndex: -1,
  },
  coffeeCircle: {
    width: "100%",
    height: "100%",
    borderRadius: 160,
    backgroundColor: "#4CAF50",
    justifyContent: "center",
    alignItems: "center",
    opacity: 0.15,
  },
  coffeeCupImage: {
    width: "70%",
    height: "70%",
    opacity: 0.8,
  },
});

export default styles;
