import React, { useState, useRef } from "react";
import { toPng } from "html-to-image";
import Map, { Marker } from "react-map-gl";
import Geocoder from "./Geocoder.js";
import "mapbox-gl/dist/mapbox-gl.css";
import "./MapComponent.css";
// import mapboxgl from "mapbox-gl";
// import { MapboxExportControl } from "@watergis/mapbox-gl-export";
import "@watergis/mapbox-gl-export/css/styles.css";
// import BablyonComponent from "./BablyonComponent.js";

const MapComponent = (props) => {
  const {
    antialias,
    engineOptions,
    adaptToDeviceRatio,
    sceneOptions,
    onRender,
    onSceneReady,
    ...rest
  } = props;
  const [viewState, setViewState] = useState({
    longitude: -100,
    latitude: 40,
    zoom: 3.5,
  });

  const mapRef = useRef(null);
  const [image, setImage] = useState(null);

  const htmlToImageConvert = () => {
    toPng(mapRef.current, { cacheBust: false })
      .then((dataUrl) => {
        let img = new Image(500, 500);
        img.src = dataUrl;
        setImage(img.src);
      })
      .catch((error) => {
        console.error("oops, something went wrong!", error);
      });
  };
  // Was trying to use MapboxExportControl but there has been no
  //component made for same to be used with react-map-gl

  //   const map = new mapboxgl.Map();

  //   map.addControl(new MapboxExportControl(), "top-right");

  // const exportMapImage = () => {
  //   const map = mapRef.current.getMap();
  //   // const map = mapRef.current;
  //   console.log(map);
  //   const mapboxExport = new MapboxExportControl(map);

  //   // mapboxExport
  //   map
  //     .toImage("image/png")
  //     .then((dataUrl) => {
  //       setImage(dataUrl);
  //     })
  //     .catch((error) => {
  //       console.error("Error exporting map:", error);
  //     });
  // };

  //   {process.env.REACT_MAPBOX_ACCESS_TOKEN}
  return (
    <>
      <div style={{ height: "100vh", width: "100%" }} ref={mapRef}>
        <Map
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
          <Marker
            latitude={viewState.latitude}
            longitude={viewState.longitude}
          />
          <Geocoder viewState={viewState} setViewState={setViewState} />
        </Map>

        <button className='capture-btn' onClick={htmlToImageConvert}>
          Capture Image
        </button>

        <div>
          {image && (
            <>
              <img src={image} alt='map' className='map-image' />
              {/* <BablyonComponent
                image={image}
                antialias
                onSceneReady={onSceneReady}
                onRender={onRender}
                id='my-canvas'
              /> */}
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default MapComponent;
