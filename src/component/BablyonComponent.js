import React from "react";
import { useEffect, useRef } from "react";
import {
  Engine,
  Scene,
  ArcRotateCamera,
  Vector3,
  SceneLoader,
  HemisphericLight,
  MeshBuilder,
} from "@babylonjs/core";
import "@babylonjs/core/Helpers/sceneHelpers";

const BablyonComponent = ({
  //   antialias,
  image,
  //   engineOptions,
  //   adaptToDeviceRatio,
  //   sceneOptions,
  //   onRender,
  //   onSceneReady,
  //   ...rest
}) => {
  useEffect(() => {
    // antialias,
    //   engineOptions,
    //   adaptToDeviceRatio

    const { current: canvas } = image;

    if (!canvas) return;

    const engine = new Engine(canvas, true);
    // , sceneOptions
    const scene = new Scene(engine);
    // const canvas = scene.getEngine().getRenderingCanvas();
    const camera = new ArcRotateCamera(
      "camera",
      1,
      1,
      4,
      new Vector3(0, 0, 0),
      scene
    );
    camera.setTarget(Vector3.Zero());

    camera.attachControl(canvas, true);

    let light = new HemisphericLight("light", new Vector3(1, 1, 0), scene);

    // Default intensity is 1. Let's dim the light a small amount
    light.intensity = 0.7;

    let box = MeshBuilder.CreateBox(
      "box",
      { height: 1, width: 0.75, depth: 0.25 },
      scene
    );
    // if (scene.isReady()) {
    //   onSceneReady(scene);
    // } else {
    //   scene.onReadyObservable.addOnce((scene) => onSceneReady(scene));
    // }

    engine.runRenderLoop(() => {
      //   if (typeof onRender === "function") onRender(scene);
      scene.render();
    });

    const resize = () => {
      scene.getEngine().resize();
    };

    if (window) {
      window.addEventListener("resize", resize);
    }

    SceneLoader.ImportMeshAsync("", image, null, scene).then((img) => {
      img.meshes[0].position.y = 2;
      camera.setTarget(img.meshes[0]);

      scene.onBeforeRenderObservable.add(() => {
        img.meshes[0].rotate(new Vector3(0, 1, 0), 0.001);
      });
    });

    return () => {
      scene.getEngine().dispose();

      if (window) {
        window.removeEventListener("resize", resize);
      }
    };
  }, [
    // antialias,
    // engineOptions,
    // adaptToDeviceRatio,
    // sceneOptions,
    // onRender,
    // onSceneReady,
    image,
  ]);

  return <canvas />;
};

export default BablyonComponent;
