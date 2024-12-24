/**
 * Determines the appropriate terrain color based on the value of c.
 *
 * @param {number} c - The terrain coefficient, typically between 0 and 1.
 * @param {object|string} [terrainConfig=defaultTerrains] - The terrain configuration object or its JSON representation.
 * @returns {string} - The RGB color value for the terrain.
 */
function terrainColor(c, terrainConfig = defaultTerrains) {
  let terrains;

  // Check if the provided config is JSON, if so, parse it.
  if (typeof terrainConfig === "string") {
    try {
      terrains = JSON.parse(terrainConfig);
    } catch (e) {
      throw new Error("Invalid JSON provided for terrainConfig");
    }
  } else if (typeof terrainConfig === "object") {
    terrains = terrainConfig;
  } else {
    throw new Error(
      "Invalid terrainConfig provided. Expected JSON string or object."
    );
  }

  for (let terrain of terrains) {
    if (c >= terrain.range[0] && c < terrain.range[1]) {
      for (let colorStop of terrain.colors) {
        if (c < colorStop.limit) {
          return colorStop.value;
        }
      }
    }
  }
}

const defaultTerrains = [
  {
    name: "sea",
    range: [0, 0.33],
    colors: [
      { limit: 0.055, value: "rgb(253, 253, 253)" }
      
    ],
  },
  {
    name: "beach",
    range: [0.33, 0.5],
    
  },
  {
    name: "plains",
    range: [0.5, 0.75],
    
  },
  {
    // expanded mountain values + amended limit: 1 = snowy white
    name: "mountains",
    range: [0.75, 1],
    
  },
];
