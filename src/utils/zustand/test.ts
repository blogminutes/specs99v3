import { client } from "../square";

const { locationsApi } = client;

export const checkSquareApi = async () => {
  try {
    let listLocationsResponse = await locationsApi.listLocations();

    console.log(listLocationsResponse);
  } catch (error) {
    console.log(error);
  }
};
