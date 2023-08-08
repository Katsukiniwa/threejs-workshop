import { WebGLRenderer } from "three/src/renderers/WebGLRenderer";
import { PerspectiveCamera } from "three/src/cameras/PerspectiveCamera";
import { Scene } from "three/src/scenes/Scene";
import { PointLight } from "three/src/lights/PointLight";
import { BoxGeometry } from "three/src/geometries/BoxGeometry";
import { MeshLambertMaterial } from "three/src/materials/MeshLambertMaterial";
import { Mesh } from "three/src/objects/Mesh";

export default class Canvas {
  constructor() {
    /**
     * window size
     */
    this.w = window.innerWidth;
    this.h = window.innerHeight;

    /**
     * create renderer
     */
    this.renderer = new WebGLRenderer({ alpha: true });

    /**
     * render size
     */
    this.renderer.setSize(this.w, this.h);

    /**
     * pixel ratio
     */
    this.renderer.setPixelRatio(window.devicePixelRatio);

    /**
     * add renderer canvas to #canvas-container
     */
    const container = document.getElementById("canvas-container");
    container.appendChild(this.renderer.domElement);

    /**
     * create camera
     * angle of view, screen ratio, shortest distance on camera, farthest distance on camera
     */
    this.camera = new PerspectiveCamera(40, this.w / this.h, 1, 10);

    /**
     * move the camera away
     */
    this.camera.position.z = 3;

    /**
     * create scene
     */
    this.scene = new Scene();

    /**
     * create light
     */
    this.light = new PointLight(0x00ffff);
    this.light.position.set(2, 2, 2);

    /**
     * add light to scene
     */
    this.scene.add(this.light);

    /**
     * create geometry of cube
     */
    const geo = new BoxGeometry(1, 1, 1);

    /**
     * create material
     */
    const material = new MeshLambertMaterial({ color: 0xffffff });

    /**
     * create mesh from geometry and material
     */
    this.mesh = new Mesh(geo, material);
    this.mesh.rotation.x = Math.PI / 6;
    this.mesh.rotation.y = Math.PI / 6;

    /**
     * add mesh to scene
     */
    this.scene.add(this.mesh);

    /**
     * render on screen
     */
    this.render();
  }

  render() {
    /**
     * require next frame
     */
    requestAnimationFrame(() => {
      this.render();
    });

    /**
     * convert from milliseconds to seconds
     */
    const sec = performance.now() / 1000;

    /**
     * rotate 45 radian per second
     */
    this.mesh.rotation.x = sec * (Math.PI / 4);
    this.mesh.rotation.y = sec * (Math.PI / 4);

    /**
     * render on screen
     */
    this.renderer.render(this.scene, this.camera);
  }
}
