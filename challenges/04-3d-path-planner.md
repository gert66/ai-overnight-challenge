# 4. 3D Path Planner

## What is the challenge?
Place a virtual robot or drone at a start point in a 3D world containing obstacles. The software must find a collision-free route to a target point and visualise how it gets there.

## Input available
Synthetic scenes only. Obstacles, start and goal can be generated in code or loaded from a simple JSON scene description.

## What should we see tomorrow?
A polished 3D scene with start, goal, obstacles, explored space, final route and an animation of the robot/drone following the route.

## Acceptance test
The route must not intersect any obstacle, must reach the goal, and should report path length, compute time and search effort on several scenes.

## Public background
- 3D RRT*: https://github.com/w0lzard/RRT-Path-Planning
- Path planning examples: https://github.com/zhm-real/PathPlanning
