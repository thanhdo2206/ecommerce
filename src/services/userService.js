import requestApi from "../utils/requestApi";

export const editProfileService = (id,userEdit,token) => {
  return requestApi({
    method: "put",
    url: `user/${id}`,
    headers: {
      Authorization: `Bearer ${token}`,
    },
    data:userEdit
  });
};
