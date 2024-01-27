import "./App.css";
import {
  ArcRotateCamera,
  Vector3,
  HemisphericLight,
  MeshBuilder,
} from "@babylonjs/core";

import MapComponent from "./component/MapComponent";

let box;

const onSceneReady = (scene) => {
  var camera = new ArcRotateCamera(
    "Camera",
    (3 * Math.PI) / 4,
    Math.PI / 4,
    4,
    new Vector3(0, 0, 0),
    scene
  );

  camera.setTarget(new Vector3(0, 0, 0));

  const canvas = scene.getEngine().getRenderingCanvas();

  camera.attachControl(canvas, true);

  var light = new HemisphericLight("light", new Vector3(1, 1, 0), scene);

  light.intensity = 0.7;

  box = MeshBuilder.CreateBox(
    "box",
    { height: 1, width: 0.75, depth: 0.25 },
    scene
  );
};

const onRender = (scene) => {
  if (box !== undefined) {
    var deltaTimeInMillis = scene.getEngine().getDeltaTime();

    const rpm = 10;
    box.rotation.y += (rpm / 60) * Math.PI * 2 * (deltaTimeInMillis / 1000);
  }
};

function App() {
  return (
    <div style={{ position: "relative" }}>
      <MapComponent
        antialias
        onSceneReady={onSceneReady}
        onRender={onRender}
        id='my-canvas'
      />
    </div>
  );
}

export default App;
