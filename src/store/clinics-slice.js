import { createSlice } from "@reduxjs/toolkit";

const clinicsSlice = createSlice({
  name: "clinics",
  initialState: {
    clinics: [],
    totalQuantity: 0,
    changed: false,
  },
  reducers: {
    showClinics(state, action) {
      state.clinics = action.payload.clinics;
      state.totalQuantity = action.payload.totalQuantity;
    },
    addClinic(state, action) {
      state.changed = true;
      const newClinic = action.payload;
      newClinic.id = state.clinics.length;
      newClinic.time = `Morning ${newClinic.clinic_open} - Evening ${newClinic.clinic_close}`;
      state.totalQuantity++;
      state.clinics.push(newClinic);
    },

    uploadClinicImages(state, action) {
      const { arrayIndex, newImage, imageType } = action.payload;
      state.changed = true;
      if (!state.clinics[arrayIndex].images) {
        state.clinics[arrayIndex]["images"] = [];
      }
      state = {
        ...state,
        clinics: {
          ...state.clinics,
          [arrayIndex]: {
            ...state.clinics[arrayIndex],
            images: state.clinics[arrayIndex].images.push({
              id: newImage,
              type: imageType,
            }),
          },
        },
      };
    },
    updateClinicInfo(state, action) {
      state.changed = true;
      const updatedClinic = action.payload;
      const clinicArrayIndex = state.clinics.findIndex(
        (clinic) => clinic.id === updatedClinic.id
      );
      state = {
        ...state,
        clinics: {
          ...state.clinics,
          ...state.clinics[clinicArrayIndex] = updatedClinic,
        },
      };
    },
  },
});

export const clinicsActions = clinicsSlice.actions;

export default clinicsSlice;
