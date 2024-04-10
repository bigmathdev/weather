import { ref } from "vue";
import axios from "axios";

export const useSearchCenterMap = () => {
  const mapboxKey = import.meta.env.VITE_KEY_MAPBOX;
  const centerMap = ref();

  const searchCenterMap = (cityName) => {
    axios
      .get(
        `https://api.mapbox.com/geocoding/v5/mapbox.places/${cityName}.json?proximity=ip&access_token=${mapboxKey}`
      )
      .then((response) => {
        centerMap.value = response.data.features[0].center;
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return {
    centerMap,
    searchCenterMap,
  };
};
