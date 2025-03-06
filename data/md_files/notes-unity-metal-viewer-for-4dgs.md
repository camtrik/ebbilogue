---
title: Unity/Metal Viewer for 4D Gaussian
date: '2024-01-11'
tags: ['Unity', 'Metal', '4D Reconstruction', 'Gaussian Splatting']
draft: false
summary: Implementation of Unity/Metal Viewer for 4D Gaussian Splatting.
layout: 'PostBannerInfo'
---

# Introduction

4D Gaussian Splatting, or Dynamic Gaussian Splatting, is a series of state-of-the-art techniques for reconstructing dynamic scenes in real-time by leveraging AI-powered models.
It enables efficient reconstruction and rendering of real-life dynamic scenes with high-quality results.
There are many different methods about Dynamic Gaussian Splatting, extending [3D Gaussian Splatting](https://repo-sam.inria.fr/fungraph/3d-gaussian-splatting/) by modifying parameters across different frames to represent dynamic scenes.

The goal of our project is to train models using the 4DGS approach and render the results in real-time on platforms such as Unity and Metal, enabling seamless integration into XR applications.

# Achievements and Implementation

### Implementation Overview

The implementation is divided into two key components:

1. **AssetCreator**  
   Developed in Python, the `AssetCreator` generates binary files that store the initial frame data and frame-specific parameter changes. This structure ensures efficient handling of dynamic data during rendering.

2. **Viewer**  
   Created platform-specific viewers to render the results of 4DGS on Unity and Metal. These viewers are designed to provide high-quality visualizations with real-time performance, leveraging the optimized binary data produced by the `AssetCreator`.

### Results

Below is a preview of our implementation in action, showcasing the rendering of dynamic scenes in Quest3 by using Unity. You can see the same results by Metal with Vision Pro.

<img
src="https://res.cloudinary.com/camtrik/image/upload/v1737906304/4dgs_bbqlyx.gif"
alt="Dynamic Scene Rendering"
style={{ maxWidth: '100%', height: 'auto' }}
/>
