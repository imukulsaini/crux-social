import { createAsyncThunk } from "@reduxjs/toolkit";
import { CLOUDNARY_API } from "../../utils/index";
import { checkErrorAndReturnMessage } from "../util/errorHandler";
import axios from "axios";

export const uploadPicOnCloudnary = createAsyncThunk(
  "users/uploadPicOnCloudnary",
  async (imageData, { rejectWithValue }) => {
    const url = CLOUDNARY_API;
    const { formData } = imageData;
    try {
      const userResponse = await axios.post(url, formData);
      return userResponse.data;
    } catch (error) {
      const message = checkErrorAndReturnMessage(error);
      return rejectWithValue(message);
    }
  }
);
