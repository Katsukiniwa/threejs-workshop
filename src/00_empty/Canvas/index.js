import * as THREE from 'three'

// このクラス内に three.js のコードを書いていきます
export default class Canvas {
  constructor() {
    /**
     * window size
     */
    this.w = window.innerWidth
    this.h = window.innerHeight

    /**
     * create renderer
     */
    this.renderer = new THREE.WebGLRenderer();

    /**
     * render size
     */
    this.renderer.setSize(this.w, this.h)
  
    /**
     * pixel ratio
     */
    this.renderer.setPixelRatio(window.devicePixelRatio)

    /**
     * add renderer canvas to #canvas-container
     */
    const container = document.getElementById('canvas-container')
    container.appendChild(this.renderer.domElement)

    /**
     * create camera
     * angle of view, screen ratio, shortest distance on camera, farthest distance on camera
     */
    this.camera = new THREE.PerspectiveCamera(60, this.w / this.h, 1, 10);
    
    /**
     * move the camera away
     */
    this.camera.position.z = 3

    /**
     * create scene
     */
    this.scene = new THREE.Scene();

    /**
     * create light
     */
    this.light = new THREE.SpotLight(0x00ffff);
    this.light.position.set(2,2,2);

    /**
     * add light to scene
     */
    this.scene.add(this.light)

    /**
     * create geometry of cube
     */
    const geo = new THREE.BoxGeometry(1,1,1)

    /**
     * create material
     */
    const material = new THREE.MeshLambertMaterial({color: 0xffffff})

    /**
     * create mesh from geometry and material
     */
    this.mesh = new THREE.Mesh(geo, material)

    /**
     * add mesh to scene
     */
    this.scene.add(this.mesh)

    /**
     * render on screen
     */
    this.renderer.render(this.scene, this.camera);
  }
};
