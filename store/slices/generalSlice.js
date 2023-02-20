import { createSlice } from "@reduxjs/toolkit";
const axios = require("axios");
const API_URL = "https://qrs-global.com/react/general/index.php";
// create a slice
export const generalSlice = createSlice({
  name: "siteData",
  initialState: {
    sitename: "Qrs Medical",
    sitemail: "info@qrs-global.com",
    sitetelephone: "04-6860006",
    sitephone: "054-2021912",
    sitephone2: "054-3023043",
    siteaddress: "רחוב תובל, פארק תעשייה קורן, מעלות",
    sitedata: [],
  },
  reducers: {
    getSiteName: (state, action) => {
      state.sitename = action.payload;
    },
    getSiteData: (state, action) => {
      state.sitedata = [action.payload];
    },
  },
});

export const getSiteDataAsync = () => async (dispatch) => {
  try {
    const headers = {
      "Content-Type": "application/json",
    };
    const response = await axios.get(API_URL, { headers });
    dispatch(getSiteData(response.data["data"]));
  } catch (err) {
    throw new Error(err);
  }
};

export const { getSiteName, getSiteData } = generalSlice.actions;
export const showSiteData = (state) => state.generaldata.sitedata;
export const showSiteName = (state) => state.generaldata.sitename;
export const showSiteMail = (state) => state.generaldata.sitemail;
export const showSiteTelePhone = (state) => state.generaldata.sitetelephone;
export const showSitePhone = (state) => state.generaldata.sitephone;
export const showSitePhone2 = (state) => state.generaldata.sitephone2;
export const showSiteAddress = (state) => state.generaldata.siteaddress;
export default generalSlice.reducer;
