const LocationPath = (location) => {
  const locationPath = location.pathname.split("/");
  const lastPath = locationPath[locationPath?.length - 1];
  return lastPath;
};

export default LocationPath;
