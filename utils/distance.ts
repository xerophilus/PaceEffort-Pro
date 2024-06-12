import haversineDistance from "haversine-distance";

const calculateDistance = (prevLocation, newLocation, units) => {
    if(!prevLocation) return 0;
    const distance = haversineDistance(prevLocation, newLocation) / units; // Convert meters to miles or kilometers
    return distance;
};


export { calculateDistance };