import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  imageUrl: string;
  userCode: string;
  subscriptionExpiry: string;
  role: string;
}

interface Configuration {
  salesProductsLedgerId: string | null;
  sundryDebtorsLedgerId: string | null;
  sundryCreditorsLedgerId: string | null;
  taxLedgerId: string | null;
  discountLedgerId: string | null;
  roundOffLedgerId: string | null;
  cashLedgerId: string | null;
  bankLedgerId: string | null;
  invoiceTemplate: string | null;
  invoiceConfigValue: string | null;
  completionStatus: string;
}

interface FinancialYear {
  id: string;
  name: string;
  fromDate: string;
  toDate: string;
}

interface CountryInfo {
  id: string;
  code: string;
  name: string;
  phoneCode: string;
  currencyCode: string;
  currency: string;
  symbol: string;
  taxType: string;
}

interface BranchInfo {
  id: string;
  name: string;
  type: string | null;
  branchCode: string;
  address: string;
  city: string | null;
  email: string;
  phone: string;
  mobile: string;
  contactPerson: string;
  logo: string;
  openingTime: string | null;
  closingTime: string | null;
  countryId: string;
}

interface AuthState {
  accessToken: string | null;
  refreshToken: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  user: User | null;
  configuration: Configuration | null;
  financialYear: FinancialYear | null;
  countryInfo: CountryInfo | null;
  branchInfo: BranchInfo | null;
}

const initialState: AuthState = {
  accessToken: null,
  refreshToken: null,
  isAuthenticated: false,
  isLoading: false,
  user: null,
  configuration: null,
  financialYear: null,
  countryInfo: null,
  branchInfo: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setTokens: (state, action: PayloadAction<{ 
      accessToken: string; 
      refreshToken: string; 
      user: any; 
    }>) => {
      const { accessToken, refreshToken, user } = action.payload;
      
      state.accessToken = accessToken;
      state.refreshToken = refreshToken;
      state.isAuthenticated = true;
      
      // Extract user data (excluding branchInfo)
      const { branchInfo, ...userData } = user;
      state.user = userData;
      
      // Set branch info separately
      if (branchInfo) {
        const { configuration, financialYearInfo, countryInfo, ...branchData } = branchInfo;
        state.branchInfo = branchData;
        
        // Set configuration separately
        if (configuration) {
          state.configuration = configuration;
        }
        
        // Set financial year separately
        if (financialYearInfo) {
          state.financialYear = financialYearInfo;
        }
        
        // Set country info separately
        if (countryInfo) {
          state.countryInfo = countryInfo;
        }
      }
    },
    setAccessToken: (state, action: PayloadAction<string>) => {
      state.accessToken = action.payload;
      state.isAuthenticated = true;
    },
    setUser: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
    },
    setConfiguration: (state, action: PayloadAction<Configuration>) => {
      state.configuration = action.payload;
    },
    updateConfiguration: (state, action: PayloadAction<Partial<Configuration>>) => {
      if (state.configuration) {
        state.configuration = { ...state.configuration, ...action.payload };
      }
    },
    setFinancialYear: (state, action: PayloadAction<FinancialYear>) => {
      state.financialYear = action.payload;
    },
    setCountryInfo: (state, action: PayloadAction<CountryInfo>) => {
      state.countryInfo = action.payload;
    },
    setBranchInfo: (state, action: PayloadAction<BranchInfo>) => {
      state.branchInfo = action.payload;
    },
    updateBranchInfo: (state, action: PayloadAction<Partial<BranchInfo>>) => {
      if (state.branchInfo) {
        state.branchInfo = { ...state.branchInfo, ...action.payload };
      }
    },
    clearTokens: (state) => {
      state.accessToken = null;
      state.refreshToken = null;
      state.isAuthenticated = false;
      state.user = null;
      state.configuration = null;
      state.financialYear = null;
      state.countryInfo = null;
      state.branchInfo = null;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
  },
});

export const { 
  setTokens, 
  setAccessToken, 
  setUser, 
  setConfiguration,
  updateConfiguration,
  setFinancialYear,
  setCountryInfo,
  setBranchInfo,
  updateBranchInfo,
  clearTokens, 
  setLoading 
} = authSlice.actions;

export default authSlice.reducer;