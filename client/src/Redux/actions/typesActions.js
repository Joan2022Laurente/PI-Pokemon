import axios from "axios";

export const getTypes = () => {
  return async (dispatch) => {
    try {
      const res = await axios.get("http://localhost:3001/types");
      dispatch({
        type: "GET_TYPES",
        payload: res.data,
      });
    } catch (error) {
      console.log(error);
    }
  };
};
