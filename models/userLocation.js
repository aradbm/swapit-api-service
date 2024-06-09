const db = require("../config/postgresDB");
const getLocationById = async (id) => {
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

const addLocation = async (location) => {
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

const updateLocation = async (location) => {
  console.log("Updating location:", location);

  if (!location || !location.uid) {
    throw new Error("Invalid location data");
  }
  try {
    const result = await db.one(
      'UPDATE "userlocations" SET latitude = $1, longitude = $2 WHERE uid = $3 RETURNING *',
      [location.lat, location.lon, location.uid]
    );

    console.log("Result from DB update:", result);
    return result;
  } catch (error) {
    console.log("Error updating location:", error);
    throw error;
  }
};

const deleteLocation = async (location) => {
  console.log("Deleting location:", location);

  if (!location || !location.uid) {
    throw new Error("Invalid location data");
  }
  try {
    const result = await db.one(
      'DELETE FROM "userlocations" WHERE uid = $1 RETURNING *',
      [location.uid]
    );

    console.log("Result from DB delete:", result);
    return result;
  } catch (error) {
    console.log("Error deleting location:", error);
    throw error;
  }
};

module.exports = {
  getLocationById,
  addLocation,
  updateLocation,
  deleteLocation,
};
