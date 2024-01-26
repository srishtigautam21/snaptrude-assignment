import React from "react";
import MapboxGeocoder from "@mapbox/mapbox-gl-geocoder";
import { useControl } from "react-map-gl";
import "@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css";

const Geocoder = ({ viewState, setViewState }) => {
  const ctrl = new MapboxGeocoder({
    accessToken:
      "pk.eyJ1Ijoic3Jpc2h0aS1nYXV0YW0iLCJhIjoiY2xydWh4M29xMGZ5bTJrbmFlNXJ1dWQ0dSJ9.rSmq3TK0NXSfUZD0yLONVw",
    marker: false,
    collapsed: true,
  });
  useControl(() => ctrl);
  ctrl.on("result", (e) => {
    const coords = e.result.geometry.coordinates;
    setViewState((prev) => ({
      ...prev,
      longitude: coords[0],
      latitude: coords[1],
    }));
  });
  return <div></div>;
};

export default Geocoder;
