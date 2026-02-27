# Spatial Visualizer

A browser-based 3D viewer for visualizing spatial mapping data captured during the [Uncharted Caves of Kyrgyzstan](https://martinedstrom.com/projects/uncharted-caves-of-kyrgyzstan/) expedition.

The goal is to make high-resolution 3D mapping data — point clouds, meshes, and gaussian splats — explorable directly in the browser, with future support for VR via WebXR.

## What's in here

| Page | Status | Description |
|------|--------|-------------|
| `/pointcloud.html` | ✅ Live | 262k-point cloud with vertex colors |
| `/mesh.html` | 🔜 Planned | Textured mesh reconstruction |
| `/splat.html` | 🔜 Planned | Gaussian splat rendering |

## How it's made

- **Vite** — fast dev server and build tool, configured for multi-page output
- **React** + **React Three Fiber** — declarative 3D scene graph on top of Three.js
- **@react-three/drei** — orbit controls, GLB loading, and helpers
- **Three.js** — WebGL rendering with vertex color support
- GLB models are stored in `public/models/` and served statically

## Getting started

```bash
npm install
npm run dev
```

Open `http://localhost:5173` for the landing page, or go directly to `http://localhost:5173/pointcloud.html`.

To preview on your phone (same Wi-Fi), use the Network URL shown in the terminal.

## Project structure

```
index.html              ← Landing page with links to each visualization
pointcloud.html         ← Point cloud viewer entry
src/
  pointcloud.jsx        ← Point cloud React entry point
  App.jsx               ← 3D scene, controls, UI overlay
  PointCloudModel.jsx   ← GLB loader with vertex color support
  index.css             ← Global styles
public/
  models/               ← GLB/PLY model files
vite.config.js          ← Multi-page Vite configuration
```

## Data

The 3D data originates from extensive drone flights and photogrammetry conducted in the Tian Shan mountains of Kyrgyzstan. More about the expedition at [martinedstrom.com](https://martinedstrom.com).
