import React, { useState } from "react";
import ReactMapGL, { Marker } from "react-map-gl";
import Geocoder from "./Geocoder.js";
import "mapbox-gl/dist/mapbox-gl.css";

const MapComponent = () => {
  const [viewState, setViewState] = useState({
    longitude: -100,
    latitude: 40,
    zoom: 3.5,
  });

  //   {process.env.REACT_MAPBOX_ACCESS_TOKEN}
  return (
    <div style={{ height: "100vh", width: "100%" }}>
      <ReactMapGL
        {...viewState}
        mapboxAccessToken='pk.eyJ1Ijoic3Jpc2h0aS1nYXV0YW0iLCJhIjoiY2xydWh4M29xMGZ5bTJrbmFlNXJ1dWQ0dSJ9.rSmq3TK0NXSfUZD0yLONVw'
        onMove={(evt) => setViewState(evt.viewState)}
        style={{ width: "100%", height: "100vh" }}
        initialViewState={{
          longitude: viewState.longitude,
          latitude: viewState.latitude,
        }}
        mapStyle='mapbox://styles/mapbox/streets-v9'
      >
        <Marker latitude={viewState.latitude} longitude={viewState.longitude} />
        <Geocoder viewState={viewState} setViewState={setViewState} />
      </ReactMapGL>
    </div>
  );
};

export default MapComponent;
