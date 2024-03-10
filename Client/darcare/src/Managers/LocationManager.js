const baseUrl = "https://localhost:7205/api/Location";

export const getAllLocations = () => {
  return fetch(baseUrl).then((res) => {
    return res.json();
  });
};
