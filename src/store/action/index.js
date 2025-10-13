import api from "../../api/api";

export const fetchProducts = () => async (dispatch) => {
  try {
    const { data } = await api.get(`/public/products`);
  } catch (error) {
    console.log(error);
  }
};
