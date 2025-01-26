---
title: Stable Fast 3D - Notes
date: '2024-08-05'
tags: ['image-to-3d', 'AIGC', 'notes']
draft: false
summary: Notes about the Paper - Stable Fast 3D Mesh Reconstruction with UV-unwrapping and Illumination Disentanglement
layout: 'PostBannerInfo'
---

# Introduction

The most effective Image-to-3d method so far (considering generation speed, quality, number of vertices, etc.)

- [Project Page](https://stable-fast-3d.github.io/)

![](https://res.cloudinary.com/camtrik/image/upload/v1737906302/stable-fast-3d-1_wexfcd.png)

### Issues

**Vertex Coloring**

- Uses Vertex Color, resulting in a large number of vertices.
- **Solution**: Proposes **highly parallelizable fast box projection-based UV unwrapping**, completing UV unwrapping in 0.5 seconds.

**Light Bake-in**

- Shadows in the image are baked into the texture.
- **Solution**: Separates shadows using **Spherical Gaussians** (illumination modeling, Light Net).

**Lack of Material Properties**

- Previous methods lack material properties, making them unresponsive to changes in lighting conditions.
- **Solution**: Predict material properties with **Material Net**.

**Marching Cube**

- "Stair-stepping" occurs when transferring volumetric representations to meshes using marching cubes.
- **Solution**: Uses **Deep Marching Tetrahedra (DMTet)** instead of Marching Cube.

### Improvements

**Backbone Model**

- **DINO → DINOV2**: Generates image features (vision transformer).
- **Two-stream transformer**: Generates Triplane with high efficiency.

**Material Estimation**

- Estimates metallic and roughness properties.
- Uses **frozen CLIP as a backbone**, and trains the extracted features with MLP to predict material properties (contrastive learning), improving reflectivity and quality.

**Illumination Modeling**

- Estimates illumination in the input image using Triplanes output from the backbone model.
- Uses 2 CNN layers + 3 linear layers to predict **spherical Gaussian illumination maps**.
- Includes **lighting demodulation loss**.

**Mesh Extraction and Refinement**

- Generates meshes from Triplane using **DMTet**.
- Optimizes meshes (offset and normal) using MLP.

**Fast UV-Unwrapping and Export**

- **Pipeline**:  
  ![](https://res.cloudinary.com/camtrik/image/upload/v1737906302/stable-fast-3d-2_d5n7of.png)
  - **Box-projection**: Projects the 3D mesh vertices onto cube faces to determine UV coordinates, achieving high efficiency through parallelization.
  - Exports the mesh + UV texture as a **GLB file**.

### Implementation

**Input Image Size**

- Full: 1024×1024 → Half: 512×512 → Quarter: 256×256.
- Lower resolutions may cause issues.  
  ![](https://res.cloudinary.com/camtrik/image/upload/v1737906303/stable-fast-3d-3_qqogsg.png)

**Paint Light**

- [Painting Light](https://github.com/lllyasviel/PaintingLight).

**Super Resolution**

- [nunif/waifu2x](https://github.com/nagadomi/nunif/tree/master/waifu2x).

  - Left → Right: Original → Original with lighting → Original ×2 → Original ×2 with lighting.

  ![](https://res.cloudinary.com/camtrik/image/upload/v1737906302/stable-fast-3d-4_aeekyi.png)

  ![](https://res.cloudinary.com/camtrik/image/upload/v1737906302/stable-fast-3d-1_wexfcd.png)

**Size Estimation**

- **MiDaS depth estimation** → Size estimation (requires a reference object).
  - [MiDaS](https://github.com/isl-org/MiDaS).
- **ARKit**
  - [ARKit 6 - Augmented Reality - Apple Developer](https://developer.apple.com/augmented-reality/).
  - [ARKit | Apple Developer Documentation](https://developer.apple.com/documentation/arkit).
  - [automaticImageScaleEstimationEnabled | Apple Developer Documentation](https://developer.apple.com/documentation/arkit/automaticimagescaleestimationenabled).
