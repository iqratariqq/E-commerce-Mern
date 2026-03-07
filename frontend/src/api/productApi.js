import axiosInstance from "../lib/axios";

export const addProduct = async (productData) => {
    console.log("product data in api", productData);
  const product = await axiosInstance.post(`/menu`, productData);
  console.log("product in api", product);
  return product;
};

export const getProducts = async () => {
  console.log("fetching products in api");
  const products = await axiosInstance.get(`/menu`);
  return products.data;
};

export const deleteProduct = async (productId) => {
  const response = await axiosInstance.delete(`/menu/${productId}`);
  console.log("delete response", response);
  return response;
};

export const updateProduct = async ({ productId, updatedData }) => {
  console.log("in update product api", updatedData);
  const response = await axiosInstance.put(`/menu/${productId}`, updatedData);

  return response;
};

export const toggleFeaturedProduct = async (productId) => {
  const response = await axiosInstance.patch(`/menu/${productId}`);
  return response;
};

export const getMenuByKitchenId = async (kitchenId) => {
console.log("fetching menu for kitchen id", kitchenId);
  const response=await axiosInstance.get(`/menu/${kitchenId}`);
  console.log("menu data in api", response.data);
  return response.data;
}

