import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  staffSelected: [],
  selectedMenuItem: [],
};

export const orderLogSlice = createSlice({
  name: "orderLog",
  initialState,
  reducers: {
    setStaff: (state, action) => {
      const { table, staffName } = action.payload;
      const existingStaff = state.staffSelected.find(
        (staff) => staff.table === table && staff.staffName === staffName
      );
      if (!existingStaff) {
        state.staffSelected.push(action.payload);
      }
    },
    removeStaff: (state, action) => {
      const { table_name } = action.payload;

      state.staffSelected = state.staffSelected.filter(
        (staff) => staff.table !== table_name
      );
    },
    addOrderMenuItem: (state, action) => {
      const data = action.payload;
      const existingMenu = state.selectedMenuItem?.find(
        (menu) => menu?.item_id === data?.item_id && menu?.table === data?.table
      );
      if (existingMenu) {
        existingMenu.item_quantity += 1;
      } else {
        state.selectedMenuItem.push({ ...data, item_quantity: 1 });
      }
    },
    removeTableWiseMenuItems: (state, action) => {
      const tablesToRemove = action?.payload?.map((item) => item?.table);

      state.selectedMenuItem = state?.selectedMenuItem?.filter(
        (item) => !tablesToRemove?.includes(item?.table)
      );
    },
    removeSingleMenuItem: (state, action) => {
      const { item_id, table } = action.payload;
      state.selectedMenuItem = state.selectedMenuItem?.filter(
        (item) => !(item.item_id === item_id && item.table === table)
      );
    },
    increaseMenuItemQuantity: (state, action) => {
      const { item_id, table } = action.payload;
      const item = state.selectedMenuItem?.find(
        (item) => item?.item_id === item_id && item?.table === table
      );
      if (item) {
        item.item_quantity += 1;
      }
    },
    decreaseMenuItemQuantity: (state, action) => {
      const { item_id, table } = action.payload;

      const item = state.selectedMenuItem?.find(
        (item) => item?.item_id === item_id && item?.table === table
      );

      if (item && item.item_quantity > 1) {
        item.item_quantity -= 1;
      }
    },
  },
});

export const {
  setStaff,
  removeStaff,
  addOrderMenuItem,
  removeSingleMenuItem,
  increaseMenuItemQuantity,
  decreaseMenuItemQuantity,
  removeTableWiseMenuItems,
} = orderLogSlice.actions;

export default orderLogSlice.reducer;

export const selectedStaffs = (state) => state.orderLog.staffSelected;
export const selectedMenu = (state) => state.orderLog.selectedMenuItem;
