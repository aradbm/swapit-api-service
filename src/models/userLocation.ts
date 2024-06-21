import db from "../config/postgresDB";

type Location = {
  lat: number,
  lon: number,
  locationname: string,
};

const getLocationById = async (id: string) => {
  console.log("Fetching location:", id);
  try {
    const location = await db.oneOrNone(
      "SELECT * FROM userlocations WHERE id = $1",
      [id]
    );
    return location;
  } catch (error) {
    console.log(error);
    return null;
  }
};

const addLocation = async (location: Location) => {
  console.log("Inserting location:", location);

  if (!location) {
    throw new Error("Invalid location data");
  }

  try {
    const result = await db.one(
      'INSERT INTO "userlocations"(latitude, longitude, locationname) VALUES($1, $2, $3) RETURNING *',
      [location.lat, location.lon, location.locationname]
    );

    console.log("Result from DB insert:", result);
    return result;
  } catch (error) {
    console.log("Error inserting location:", error);
    throw error;
  }
};

// ... (The rest of your functions will be similar)

const updateLocation = async (locatio: Location) => {
  console.log("Updating location:", location);

};

const deleteLocation = async (location: Location) => {
  console.log("Deleting location:", location);
  
};

export default { getLocationById, addLocation, updateLocation, deleteLocation };