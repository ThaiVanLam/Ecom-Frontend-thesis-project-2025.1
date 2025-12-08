import SetQuantity from "../../components/cart/SetQuantity";
import api from "../../api/api";

export const fetchProducts = (queryString) => async (dispatch) => {
  try {
    dispatch({ type: "IS_FETCHING" });
    const { data } = await api.get(
      `/product-manager/api/public/products?${queryString}`
    );

    dispatch({
      type: "FETCH_PRODUCTS",
      payload: data.content,
      pageNumber: data.pageNumber,
      pageSize: data.pageSize,
      totalElements: data.totalElements,
      totalPages: data.totalPages,
      lastPage: data.lastPage,
    });
    dispatch({ type: "IS_SUCCESS" });
  } catch (error) {
    dispatch({
      type: "IS_ERROR",
      payload: error?.response?.data?.message || "Failed to fetch products",
    });
  }
};

export const fetchCategories = () => async (dispatch) => {
  try {
    dispatch({ type: "CATEGORY_LOADER" });
    const { data } = await api.get(`/product-manager/api/public/categories`);

    dispatch({
      type: "FETCH_CATEGORIES",
      payload: data.content,
      pageNumber: data.pageNumber,
      pageSize: data.pageSize,
      totalElements: data.totalElements,
      totalPages: data.totalPages,
      lastPage: data.lastPage,
    });
    dispatch({ type: "IS_ERROR" });
  } catch (error) {
    dispatch({
      type: "IS_ERROR",
      payload: error?.response?.data?.message || "Failed to fetch categories",
    });
  }
};

export const addToCart =
  (data, qty = 1, toast) =>
  (dispatch, getState) => {
    const { products } = getState().products;

    console.log(data);
    const getProduct = products.find(
      (item) => item.productId === data.productId
    );

    const isQuantityExist = getProduct.quantity >= qty;

    if (isQuantityExist) {
      dispatch({ type: "ADD_CART", payload: { ...data, quantity: qty } });
      toast.success(`${data?.productName} added to the cart`);
      localStorage.setItem("cartItems", JSON.stringify(getState().carts.cart));
    } else {
      toast.error("Out of stock");
    }
  };

export const increaseCartQuantity =
  (data, toast, currentQuantity, setCurrentQuantity) =>
  (dispatch, getState) => {
    const { products } = getState().products;
    const getProduct = products.find(
      (item) => item.productId === data.productId
    );

    const isQuantityExist = getProduct.quantity >= currentQuantity + 1;

    if (isQuantityExist) {
      const newQuantity = currentQuantity + 1;
      setCurrentQuantity(newQuantity);

      dispatch({
        type: "ADD_CART",
        payload: { ...data, quantity: newQuantity },
      });
      localStorage.setItem("cartItems", JSON.stringify(getState().carts.cart));
    } else {
      toast.error("Quantity Reached to limit");
    }
  };

export const decreaseCartQuantity =
  (data, newQuantity) => (dispatch, getState) => {
    dispatch({ type: "ADD_CART", payload: { ...data, quantity: newQuantity } });
    localStorage.setItem("cartItems", JSON.stringify(getState().carts.cart));
  };

export const removeFromCart = (data, toast) => (dispatch, getState) => {
  dispatch({ type: "REMOVE_CART", payload: data });
  toast.success(`${data.productName} removed from cart`);
  localStorage.setItem("cartItems", JSON.stringify(getState().carts.cart));
};

export const authenticateSigninUser =
  (sendData, toast, reset, navigate, setLoader) => async (dispatch) => {
    try {
      setLoader(true);
      const { data } = await api.post(
        "/user-manager/api/auth/signin",
        sendData
      );
      dispatch({ type: "LOGIN_USER", payload: data });
      localStorage.setItem("auth", JSON.stringify(data));
      reset();
      toast.success("Login Success");
      navigate("/");
    } catch (error) {
      console.log(error);
      toast.error(error?.response?.data?.message || "Internal Server Error");
    } finally {
      setLoader(false);
    }
  };

export const registerNewUser =
  (sendData, toast, reset, navigate, setLoader) => async (dispatch) => {
    try {
      setLoader(true);
      const { data } = await api.post(
        "/user-manager/api/auth/signup",
        sendData
      );

      reset();
      toast.success(data?.message || "User Registered Successfully");
      navigate("/login");
    } catch (error) {
      console.log(error);
      toast.error(
        error?.response?.data?.message ||
          error?.response?.data?.password ||
          "Internal Server Error"
      );
    } finally {
      setLoader(false);
    }
  };

export const logoutUser = (navigate) => (dispatch) => {
  dispatch({ type: "LOG_OUT" });
  localStorage.removeItem("auth");
  navigate("/login");
};

export const addUpdateUserAddress =
  (sendData, toast, addressId, setOpenAddressModal) =>
  async (dispatch, getState) => {
    // const { user } = getState.auth;

    dispatch({ type: "BUTTON_LOADER" });
    try {
      if (!addressId) {
        const { data } = await api.post(
          "/user-manager/api/addresses",
          sendData
        );
      } else {
        await api.put(`/user-manager/api/addresses/${addressId}`, sendData);
      }
      dispatch(getUserAddresses());
      toast.success("Address saved successfully");
      dispatch({ type: "IS_SUCCESS" });
    } catch (error) {
      console.log(error);
      toast.error(error?.response?.data?.message || "Internal Server Error");
      dispatch({ type: "IS_ERROR", payload: null });
    } finally {
      setOpenAddressModal(false);
    }
  };

export const getUserAddresses = () => async (dispatch, getState) => {
  try {
    dispatch({ type: "IS_FETCHING" });
    const { data } = await api.get(`/user-manager/api/users/addresses`);

    dispatch({
      type: "USER_ADDRESS",
      payload: data,
    });
    dispatch({ type: "IS_SUCCESS" });
  } catch (error) {
    dispatch({
      type: "IS_ERROR",
      payload:
        error?.response?.data?.message || "Failed to fetch user's addresses",
    });
  }
};

export const selectUserCheckoutAddress = (address) => {
  localStorage.setItem("CHECKOUT_ADDRESS", JSON.stringify(address));

  return {
    type: "SELECT_CHECKOUT_ADDRESS",
    payload: address,
  };
};

export const deleteUserAddress =
  (toast, addressId, setOpenDeleteModal) => async (dispatch, getState) => {
    try {
      dispatch({ type: "BUTTON_LOADER" });
      await api.delete(`/user-manager/api/addresses/${addressId}`);
      dispatch({ type: "IS_SUCCESS" });
      dispatch(getUserAddresses());
      dispatch(clearCheckoutAddress());
      toast.success("Address deleted successfully");
    } catch (error) {
      dispatch({
        type: "IS_ERROR",
        payload: error?.response?.data?.message || "Some Error Occured",
      });
    } finally {
      setOpenDeleteModal(false);
    }
  };

export const clearCheckoutAddress = () => {
  return {
    type: "REMOVE_CHECKOUT_ADDRESS",
  };
};

export const addPaymentMethod = (method) => {
  return {
    type: "ADD_PAYMENT_METHOD",
    payload: method,
  };
};

export const createUserCart = (sendCartItems) => async (dispatch, getState) => {
  try {
    dispatch({ type: "IS_FETCHING" });
    await api.post("/order-manager/api/cart/create", sendCartItems);
    await dispatch(getUserCart());
  } catch (error) {
    dispatch({
      type: "IS_ERROR",
      payload: error?.response?.data?.message || "Failed to create cart items",
    });
  }
};

export const getUserCart = () => async (dispatch, getState) => {
  try {
    dispatch({ type: "IS_FETCHING" });
    const { data } = await api.get("/order-manager/api/carts/users/cart");
    dispatch({
      type: "GET_USER_CART_PRODUCTS",
      payload: data.products,
      totalPrice: data.totalPrice,
      cartId: data.cartId,
    });
    localStorage.setItem("cartItems", JSON.stringify(getState().carts.cart));
    dispatch({ type: "IS_SUCCESS" });
  } catch (error) {
    dispatch({
      type: "IS_ERROR",
      payload: error?.response?.data?.message || "Failed to fetch cart items",
    });
  }
};

export const createStripePaymentSecret =
  (sendData) => async (dispatch, getState) => {
    try {
      dispatch({ type: "IS_FETCHING" });
      const { data } = await api.post(
        "/order-manager/api/order/stripe-client-secret",
        sendData
      );
      dispatch({ type: "CLIENT_SECRET", payload: data });
      localStorage.setItem("client-secret", JSON.stringify(data));
      dispatch({ type: "IS_SUCCESS" });
    } catch (error) {
      console.log(error);
      toast.error(
        error?.response?.data?.message || "Failed to create client secret"
      );
    }
  };

export const stripePaymentConfirmation =
  (sendData, setErrorMessage, setLoading, toast) =>
  async (dispatch, getState) => {
    try {
      const response = await api.post(
        "/order-manager/api/order/users/payments/online",
        sendData
      );
      console.log(response);
      if (response.data) {
        console.log("IN IF");
        localStorage.removeItem("CHECKOUT_ADDRESS");
        localStorage.removeItem("cartItems");
        localStorage.removeItem("client-secret");
        dispatch({ type: "REMOVE_CLIENT_SECRET_ADDRESS" });
        dispatch({ type: "CLEAR_CART" });
        toast.success("Order Accepted");
      } else {
        setErrorMessage("Payment Failed. Please try again.");
      }

      localStorage.setItem("client-secret", JSON.stringify(data));
      dispatch({ type: "IS_SUCCESS" });
    } catch (error) {
      setErrorMessage("Payment Failed. Please try again.");
    }
  };

export const analyticsAction = () => async (dispatch, getState) => {
  try {
    dispatch({ type: "IS_FETCHING" });

    // Gọi cả 2 API đồng thời
    const [orderAnalytics, productAnalytics] = await Promise.all([
      api.get("/order-manager/api/admin/app/analytics"),
      api.get("/product-manager/api/admin/app/analytics"),
    ]);

    // Kết hợp data từ cả 2 response
    const combinedData = {
      ...productAnalytics.data,
      ...orderAnalytics.data,
    };

    dispatch({ type: "FETCH_ANALYTICS", payload: combinedData });
    dispatch({ type: "IS_SUCCESS" });
  } catch (error) {
    dispatch({
      type: "IS_ERROR",
      payload:
        error?.response?.data?.message || "Failed to fetch analytics data",
    });
  }
};

export const getOrdersForDashboard = (queryString) => async (dispatch) => {
  try {
    dispatch({ type: "IS_FETCHING" });
    const { data } = await api.get(
      `/order-manager/api/admin/orders?${queryString}`
    );

    dispatch({
      type: "GET_ADMIN_ORDERS",
      payload: data.content,
      pageNumber: data.pageNumber,
      pageSize: data.pageSize,
      totalElements: data.totalElements,
      totalPages: data.totalPages,
      lastPage: data.lastPage,
    });
    dispatch({ type: "IS_SUCCESS" });
  } catch (error) {
    dispatch({
      type: "IS_ERROR",
      payload: error?.response?.data?.message || "Failed to fetch orders data",
    });
  }
};

export const updateOrderStatusFromDashboard =
  (orderId, orderStatus, toast, setLoader) => async (dispatch, getState) => {
    try {
      setLoader(true);

      const { data } = await api.put(
        `/order-manager/api/admin/orders/${orderId}/status`,
        { status: orderStatus }
      );

      toast.success(data.message || "Order updated successfully");
      await dispatch(getOrdersForDashboard());
    } catch (error) {
      console.log(error);
      toast.error(error?.response?.data?.message || "Internal Server Error");
    } finally {
      setLoader(false);
    }
  };

export const dashboardProductsAction = (queryString) => async (dispatch) => {
  try {
    dispatch({ type: "IS_FETCHING" });
    const { data } = await api.get(
      `/product-manager/api/admin/products?${queryString}`
    );

    dispatch({
      type: "FETCH_PRODUCTS",
      payload: data.content,
      pageNumber: data.pageNumber,
      pageSize: data.pageSize,
      totalElements: data.totalElements,
      totalPages: data.totalPages,
      lastPage: data.lastPage,
    });
    dispatch({ type: "IS_SUCCESS" });
  } catch (error) {
    dispatch({
      type: "IS_ERROR",
      payload:
        error?.response?.data?.message || "Failed to fetch dashboard products",
    });
  }
};

export const updateProductFromDashboard =
  (sendData, toast, reset, setLoader, setOpen) => async (dispatch) => {
    try {
      setLoader(true);
      await api.put(
        `/product-manager/api/admin/products/${sendData.id}`,
        sendData
      );
      toast.success("Product update successful");
      reset();
      setLoader(false);
      setOpen(false);
      await dispatch(dashboardProductsAction());
    } catch (error) {
      toast.error(
        error?.response?.data?.description || "Product update failed"
      );
    }
  };

export const addNewProductFromDashboard =
  (sendData, toast, reset, setLoader, setOpen) =>
  async (dispatch, getState) => {
    try {
      setLoader(true);
      await api.post(
        `/product-manager/api/admin/categories/${sendData.categoryId}/product`,
        sendData
      );
      toast.success("Product created successfully");
      reset();
      setOpen(false);
      await dispatch(dashboardProductsAction());
    } catch (error) {
      console.error(error);
      toast.error(
        error?.response?.data.description || "Product creation failed"
      );
    } finally {
      setLoader(false);
    }
  };

export const deleteProduct =
  (setLoader, productId, toast, setOpenDeleteModal) =>
  async (dispatch, getState) => {
    try {
      setLoader(true);
      await api.delete(`/product-manager/api/admin/products/${productId}`);
      toast.success("Product deleted successfully");
      setLoader(false);
      setOpenDeleteModal(false);
      await dispatch(dashboardProductsAction());
    } catch (error) {
      toast.error(error?.response?.data?.message || "Some Error Occured");
    }
  };

export const updateProductImageFromDashboard =
  (formData, productId, toast, setLoader, setOpen) => async (dispatch) => {
    try {
      setLoader(true);
      await api.put(
        `/product-manager/api/admin/products/${productId}/image`,
        formData
      );
      toast.success("Image upload successful");
      setLoader(false);
      setOpen(false);
      await dispatch(dashboardProductsAction());
    } catch (error) {
      toast.error(
        error?.response?.data?.description || "Product Image update failed"
      );
    }
  };

export const dashboardCategoriesAction = (queryString) => async (dispatch) => {
  try {
    dispatch({ type: "IS_FETCHING" });
    const { data } = await api.get(
      `/product-manager/api/public/categories?${queryString}`
    );

    dispatch({
      type: "FETCH_CATEGORIES",
      payload: data.content,
      pageNumber: data.pageNumber,
      pageSize: data.pageSize,
      totalElements: data.totalElements,
      totalPages: data.totalPages,
      lastPage: data.lastPage,
    });
    dispatch({ type: "IS_SUCCESS" });
  } catch (error) {
    dispatch({
      type: "IS_ERROR",
      payload:
        error?.response?.data?.message ||
        "Failed to fetch dashboard categories",
    });
  }
};

export const addNewCategoryFromDashboard =
  (sendData, toast, reset, setLoader, setOpen) =>
  async (dispatch, getState) => {
    try {
      setLoader(true);
      await api.post(`/product-manager/api/admin/categories`, sendData);
      toast.success("Category created successfully");
      reset();
      setOpen(false);
      await dispatch(dashboardCategoriesAction());
    } catch (error) {
      console.error(error);
      toast.error(
        error?.response?.data.description || "Category creation failed"
      );
    } finally {
      setLoader(false);
    }
  };

export const updateCategoryFromDashboard =
  (sendData, toast, reset, setLoader, setOpen) => async (dispatch) => {
    try {
      setLoader(true);
      await api.put(
        `/product-manager/api/admin/categories/${sendData.id}`,
        sendData
      );
      toast.success("Category update successful");
      reset();
      setLoader(false);
      setOpen(false);
      await dispatch(dashboardCategoriesAction());
    } catch (error) {
      toast.error(
        error?.response?.data?.description || "Category update failed"
      );
    }
  };

export const deleteCategory =
  (setLoader, categoryId, toast, setOpenDeleteModal) =>
  async (dispatch, getState) => {
    try {
      setLoader(true);
      await api.delete(`/product-manager/api/admin/categories/${categoryId}`);
      toast.success("Category deleted successfully");
      setLoader(false);
      setOpenDeleteModal(false);
      await dispatch(dashboardCategoriesAction());
    } catch (error) {
      toast.error(error?.response?.data?.message || "Some Error Occured");
    }
  };

export const dashboardSellersAction = (queryString) => async (dispatch) => {
  try {
    dispatch({ type: "IS_FETCHING" });
    const { data } = await api.get(
      `/user-manager/api/auth/sellers?${queryString}`
    );

    dispatch({
      type: "FETCH_SELLERS",
      payload: data.content,
      pageNumber: data.pageNumber,
      pageSize: data.pageSize,
      totalElements: data.totalElements,
      totalPages: data.totalPages,
      lastPage: data.lastPage,
    });
    dispatch({ type: "IS_SUCCESS" });
  } catch (error) {
    dispatch({
      type: "IS_ERROR",
      payload:
        error?.response?.data?.message || "Failed to fetch dashboard sellers",
    });
  }
};

export const fetchSellers = () => async (dispatch) => {
  try {
    dispatch({ type: "CATEGORY_LOADER" });
    const { data } = await api.get(`/user-manager/api/auth/sellers`);

    dispatch({
      type: "FETCH_SELLERS",
      payload: data.content,
      pageNumber: data.pageNumber,
      pageSize: data.pageSize,
      totalElements: data.totalElements,
      totalPages: data.totalPages,
      lastPage: data.lastPage,
    });
    dispatch({ type: "IS_ERROR" });
  } catch (error) {
    dispatch({
      type: "IS_ERROR",
      payload: error?.response?.data?.message || "Failed to fetch sellers",
    });
  }
};

export const addNewSellerFromDashboard =
  (sendData, toast, reset, setLoader, setOpen) =>
  async (dispatch, getState) => {
    try {
      setLoader(true);
      await api.post(`/user-manager/api/auth/signup`, sendData);
      toast.success("Seller created successfully");
      reset();
      setOpen(false);
      await dispatch(dashboardSellersAction());
    } catch (error) {
      console.error(error);
      toast.error(
        error?.response?.data.description || "Seller creation failed"
      );
    } finally {
      setLoader(false);
    }
  };
