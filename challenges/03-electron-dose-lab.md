# 3. Electron Dose Lab

## What is the challenge?
Build a simplified Monte Carlo research demonstrator for an electron beam incident on a synthetic phantom. The user can choose a block, cylinder or sphere and vary simple material regions and beam parameters.

## Input available
Public NIST stopping-power/range information and synthetic geometries only. No clinical patient data and no production dose engine.

A local cache of official NIST ESTAR electron data is provided in `nist_estar/` for liquid water, dry air, cortical bone (ICRP), and soft tissue (ICRP). Prefer this local cache during the autonomous run so the build does not depend on NIST network availability. Raw NIST text and parsed CSV files are both included.

## What should we see tomorrow?
Interactive phantom and beam controls, particle-history visualisation, 3D dose distribution, selectable 2D slices and a depth-dose style plot.

## Acceptance test
Runs must be reproducible with a fixed seed, energy/depth behaviour must be physically plausible, and the tool must include simple sanity checks against expected trends.

## Public background
- NIST ESTAR: https://physics.nist.gov/PhysRefData/Star/Text/ESTAR.html
- Geant4 reference: https://geant4.web.cern.ch/

This is a scientific demonstrator, not a clinically validated dose calculation system.
