import { createSlice } from "@reduxjs/toolkit";
const axios = require("axios");
const THEAPI = `${process.env.NEXT_PUBLIC_API_URL}/react/general/index.php`;
// create a slice
export const generalSlice = createSlice({
  name: "siteData",
  initialState: {
    sitedata: [],
    // serves: [],
  },
  reducers: {
    getSiteData: (state, action) => {
      state.sitedata = action.payload;
    },
    // getServesData: (state, action) => {
    //   state.serves = action.payload;
    // },
  },
});

export const getSiteDataAsync = () => async (dispatch) => {
  try {
    const headers = {
      "Content-Type": "application/json",
    };
    const response = await axios.get(THEAPI, { headers });
    dispatch(getSiteData(response.data["data"]));
  } catch (err) {
    throw new Error(err);
  }
};
// export const getServesAsync = () => async (dispatch) => {
//   try {
//     const headers = {
//       "Content-Type": "application/json",
//     };
//     const response = await axios.get(
//       "https://qrs-global.com/react/serves/serves.php",
//       { headers }
//     );
//     dispatch(getServesData(response.data.allserves));
//   } catch (err) {
//     throw new Error(err);
//   }
// };

// export const { getSiteData, getServesData } = generalSlice.actions;
export const { getSiteData } = generalSlice.actions;
export const showSiteData = (state) => state.generaldata.sitedata;
// export const showServesData = (state) => state.generaldata.serves;
export default generalSlice.reducer;
