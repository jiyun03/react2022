import axios from "axios";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchYoutube = createAsyncThunk(
  "youtube/requestYoutube",
  async () => {
    const key = "AIzaSyCCs-4zoiklCU1ygt2QFrB2Jy7nrfJc-dY";
    const playlist = "PL4wM-rifmHleEgufghHbslM5lnMBYdz1v";
    const num = 5;
    const url = `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&key=${key}&playlistId=${playlist}&maxResults=${num}`;

    const response = await axios.get(url);
    return response.data.items;
  }
);

const youtubeSlice = createSlice({
  name: "youtube",
  initialState: {
    data: [],
    isLoading: false,
  },
  extraReducers: {
    [fetchYoutube.pending]: (state) => {
      state.isLoading = true;
    },
    [fetchYoutube.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.data = action.payload;
    },
    [fetchYoutube.rejected]: (state) => {
      state.isLoading = false;
    },
  },
});

export default youtubeSlice.reducer;
