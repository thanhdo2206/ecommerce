import requestApi from "../utils/requestApi";

export const createOrderService = async (dataCreateOrder) => {
  try {
    const respone = await requestApi({
      method: "post",
      url: "order",
      data: {
        fullName: `${dataCreateOrder.name}`,
        receiving_address: `${dataCreateOrder.address}`,
        phone_number: `${dataCreateOrder.number}`,
      },
      headers: {
        Authorization: "Bearer " + `${dataCreateOrder.accessToken}`,
      },
    });
    return respone;
  } catch (error) {
    return error;
  }
};

export const getAllOrderAnUserService = async (accessToken) => {
  try {
    const respone = await requestApi({
      method: "get",
      url: "order",
      headers: {
        Authorization: "Bearer " + `${accessToken}`,
      },
    });
    return respone;
  } catch (error) {
    return error;
  }
};

export const getDetailsOrderService = async (dataOrderDetail) => {
  try {
    const respone = await requestApi({
      method: "get",
      url: `orderItem/${dataOrderDetail.id}`,
      headers: {
        Authorization: "Bearer " + `${dataOrderDetail.accessToken}`,
      },
    });
    return respone;
  } catch (error) {
    return error;
  }
};
