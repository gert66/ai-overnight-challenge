import{_ as e,a as t,b as n,c as r,d as i,f as a,g as o,h as s,i as c,l,m as u,n as d,o as f,p,r as m,s as h,t as g,u as _,v,x as y,y as b}from"./three-zc1kIM9l.js";(function(){let e=document.createElement(`link`).relList;if(e&&e.supports&&e.supports(`modulepreload`))return;for(let e of document.querySelectorAll(`link[rel="modulepreload"]`))n(e);new MutationObserver(e=>{for(let t of e)if(t.type===`childList`)for(let e of t.addedNodes)e.tagName===`LINK`&&e.rel===`modulepreload`&&n(e)}).observe(document,{childList:!0,subtree:!0});function t(e){let t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),t.credentials=e.crossOrigin===`use-credentials`?`include`:e.crossOrigin===`anonymous`?`omit`:`same-origin`,t}function n(e){if(e.ep)return;e.ep=!0;let n=t(e);fetch(e.href,n)}})();var x={phantoms:[{name:`water_block`,shape:`box`,size_mm:[200,200,200],material:`water`},{name:`water_cylinder`,shape:`cylinder`,radius_mm:100,height_mm:200,material:`water`},{name:`water_sphere`,shape:`sphere`,radius_mm:100,material:`water`}],example_beam:{particle:`electron`,energy_MeV:12,field_mm:[50,50],histories:5e4}},S={water:`water_liquid`,air:`air_dry`,bone:`bone_cortical_icrp`,soft_tissue:`soft_tissue_icrp`};function C(e){return S[e.material]}function w(e,t){switch(e.shape){case`box`:{let[n,r,i]=e.sizeMM;return Math.abs(t.x)<=n/2&&Math.abs(t.y)<=r/2&&t.z>=0&&t.z<=i}case`cylinder`:return t.x*t.x+t.y*t.y<=e.radiusMM*e.radiusMM&&t.z>=0&&t.z<=e.heightMM;case`sphere`:{let n=t.z-e.radiusMM;return t.x*t.x+t.y*t.y+n*n<=e.radiusMM*e.radiusMM}}}var T=x;function ee(e){let t=e.material;if(e.shape===`box`){if(!e.size_mm)throw Error(`box phantom "${e.name}" is missing size_mm`);return{name:e.name,shape:`box`,material:t,sizeMM:e.size_mm}}if(e.shape===`cylinder`){if(e.radius_mm===void 0||e.height_mm===void 0)throw Error(`cylinder phantom "${e.name}" is missing radius_mm/height_mm`);return{name:e.name,shape:`cylinder`,material:t,radiusMM:e.radius_mm,heightMM:e.height_mm}}if(e.radius_mm===void 0)throw Error(`sphere phantom "${e.name}" is missing radius_mm`);return{name:e.name,shape:`sphere`,material:t,radiusMM:e.radius_mm}}var E=T.phantoms.map(ee),D=T.example_beam,te=`kinetic_energy_MeV,collision_stopping_power_MeV_cm2_g,radiative_stopping_power_MeV_cm2_g,total_stopping_power_MeV_cm2_g,csda_range_g_cm2,radiation_yield,density_effect_delta\r
1.000E-02,2.256E+01,3.898E-03,2.256E+01,2.515E-04,9.408E-05,0.000E+00\r
1.250E-02,1.897E+01,3.927E-03,1.898E+01,3.728E-04,1.133E-04,0.000E+00\r
1.500E-02,1.647E+01,3.944E-03,1.647E+01,5.147E-04,1.316E-04,0.000E+00\r
1.750E-02,1.461E+01,3.955E-03,1.461E+01,6.762E-04,1.493E-04,0.000E+00\r
2.000E-02,1.317E+01,3.963E-03,1.318E+01,8.566E-04,1.663E-04,0.000E+00\r
2.500E-02,1.109E+01,3.974E-03,1.110E+01,1.272E-03,1.990E-04,0.000E+00\r
3.000E-02,9.653E+00,3.984E-03,9.657E+00,1.756E-03,2.301E-04,0.000E+00\r
3.500E-02,8.592E+00,3.994E-03,8.596E+00,2.306E-03,2.599E-04,0.000E+00\r
4.000E-02,7.777E+00,4.005E-03,7.781E+00,2.919E-03,2.886E-04,0.000E+00\r
4.500E-02,7.130E+00,4.018E-03,7.134E+00,3.591E-03,3.165E-04,0.000E+00\r
5.000E-02,6.603E+00,4.031E-03,6.607E+00,4.320E-03,3.435E-04,0.000E+00\r
5.500E-02,6.166E+00,4.046E-03,6.170E+00,5.103E-03,3.698E-04,0.000E+00\r
6.000E-02,5.797E+00,4.062E-03,5.801E+00,5.940E-03,3.955E-04,0.000E+00\r
7.000E-02,5.207E+00,4.098E-03,5.211E+00,7.762E-03,4.453E-04,0.000E+00\r
8.000E-02,4.757E+00,4.138E-03,4.761E+00,9.773E-03,4.931E-04,0.000E+00\r
9.000E-02,4.402E+00,4.181E-03,4.407E+00,1.196E-02,5.393E-04,0.000E+00\r
1.000E-01,4.115E+00,4.228E-03,4.119E+00,1.431E-02,5.842E-04,0.000E+00\r
1.250E-01,3.591E+00,4.355E-03,3.596E+00,2.083E-02,6.912E-04,0.000E+00\r
1.500E-01,3.238E+00,4.494E-03,3.242E+00,2.817E-02,7.926E-04,0.000E+00\r
1.750E-01,2.984E+00,4.643E-03,2.988E+00,3.622E-02,8.894E-04,0.000E+00\r
2.000E-01,2.793E+00,4.801E-03,2.798E+00,4.488E-02,9.826E-04,0.000E+00\r
2.500E-01,2.528E+00,5.141E-03,2.533E+00,6.372E-02,1.161E-03,0.000E+00\r
3.000E-01,2.355E+00,5.514E-03,2.360E+00,8.421E-02,1.331E-03,0.000E+00\r
3.500E-01,2.235E+00,5.914E-03,2.241E+00,1.060E-01,1.496E-03,0.000E+00\r
4.000E-01,2.148E+00,6.339E-03,2.154E+00,1.288E-01,1.658E-03,0.000E+00\r
4.500E-01,2.083E+00,6.787E-03,2.090E+00,1.523E-01,1.818E-03,0.000E+00\r
5.000E-01,2.034E+00,7.257E-03,2.041E+00,1.766E-01,1.976E-03,0.000E+00\r
5.500E-01,1.995E+00,7.747E-03,2.003E+00,2.013E-01,2.134E-03,1.103E-02\r
6.000E-01,1.963E+00,8.254E-03,1.972E+00,2.265E-01,2.292E-03,2.938E-02\r
7.000E-01,1.917E+00,9.313E-03,1.926E+00,2.778E-01,2.608E-03,7.435E-02\r
8.000E-01,1.886E+00,1.042E-02,1.896E+00,3.302E-01,2.928E-03,1.267E-01\r
9.000E-01,1.864E+00,1.159E-02,1.876E+00,3.832E-01,3.251E-03,1.835E-01\r
1.000E+00,1.849E+00,1.280E-02,1.862E+00,4.367E-01,3.579E-03,2.428E-01\r
1.250E+00,1.829E+00,1.600E-02,1.845E+00,5.717E-01,4.416E-03,3.944E-01\r
1.500E+00,1.822E+00,1.942E-02,1.841E+00,7.075E-01,5.281E-03,5.437E-01\r
1.750E+00,1.821E+00,2.303E-02,1.844E+00,8.432E-01,6.171E-03,6.866E-01\r
2.000E+00,1.824E+00,2.678E-02,1.850E+00,9.785E-01,7.085E-03,8.218E-01\r
2.500E+00,1.834E+00,3.468E-02,1.868E+00,1.247E+00,8.969E-03,1.069E+00\r
3.000E+00,1.846E+00,4.299E-02,1.889E+00,1.514E+00,1.092E-02,1.288E+00\r
3.500E+00,1.858E+00,5.164E-02,1.910E+00,1.777E+00,1.291E-02,1.484E+00\r
4.000E+00,1.870E+00,6.058E-02,1.931E+00,2.037E+00,1.495E-02,1.660E+00\r
4.500E+00,1.882E+00,6.976E-02,1.951E+00,2.295E+00,1.702E-02,1.821E+00\r
5.000E+00,1.892E+00,7.917E-02,1.971E+00,2.550E+00,1.911E-02,1.967E+00\r
5.500E+00,1.902E+00,8.876E-02,1.991E+00,2.802E+00,2.123E-02,2.102E+00\r
6.000E+00,1.911E+00,9.854E-02,2.010E+00,3.052E+00,2.336E-02,2.227E+00\r
7.000E+00,1.928E+00,1.185E-01,2.047E+00,3.545E+00,2.766E-02,2.453E+00\r
8.000E+00,1.943E+00,1.391E-01,2.082E+00,4.030E+00,3.200E-02,2.652E+00\r
9.000E+00,1.956E+00,1.601E-01,2.116E+00,4.506E+00,3.636E-02,2.831E+00\r
1.000E+01,1.968E+00,1.814E-01,2.149E+00,4.975E+00,4.072E-02,2.992E+00\r
1.250E+01,1.993E+00,2.362E-01,2.230E+00,6.117E+00,5.163E-02,3.341E+00\r
1.500E+01,2.014E+00,2.926E-01,2.306E+00,7.219E+00,6.243E-02,3.633E+00\r
1.750E+01,2.031E+00,3.501E-01,2.381E+00,8.286E+00,7.309E-02,3.885E+00\r
2.000E+01,2.046E+00,4.086E-01,2.454E+00,9.320E+00,8.355E-02,4.107E+00\r
2.500E+01,2.070E+00,5.277E-01,2.598E+00,1.130E+01,1.039E-01,4.487E+00\r
3.000E+01,2.089E+00,6.489E-01,2.738E+00,1.317E+01,1.233E-01,4.806E+00\r
3.500E+01,2.105E+00,7.716E-01,2.876E+00,1.496E+01,1.418E-01,5.082E+00\r
4.000E+01,2.118E+00,8.955E-01,3.013E+00,1.665E+01,1.594E-01,5.326E+00\r
4.500E+01,2.129E+00,1.021E+00,3.150E+00,1.828E+01,1.762E-01,5.544E+00\r
5.000E+01,2.139E+00,1.146E+00,3.286E+00,1.983E+01,1.923E-01,5.741E+00\r
5.500E+01,2.148E+00,1.273E+00,3.421E+00,2.132E+01,2.076E-01,5.921E+00\r
6.000E+01,2.156E+00,1.400E+00,3.556E+00,2.276E+01,2.222E-01,6.087E+00\r
7.000E+01,2.170E+00,1.656E+00,3.827E+00,2.547E+01,2.496E-01,6.383E+00\r
8.000E+01,2.182E+00,1.914E+00,4.096E+00,2.799E+01,2.747E-01,6.641E+00\r
9.000E+01,2.193E+00,2.173E+00,4.366E+00,3.035E+01,2.978E-01,6.871E+00\r
1.000E+02,2.202E+00,2.434E+00,4.636E+00,3.258E+01,3.192E-01,7.077E+00\r
1.250E+02,2.222E+00,3.089E+00,5.311E+00,3.761E+01,3.662E-01,7.516E+00\r
1.500E+02,2.238E+00,3.749E+00,5.987E+00,4.204E+01,4.060E-01,7.876E+00\r
1.750E+02,2.251E+00,4.412E+00,6.663E+00,4.600E+01,4.401E-01,8.182E+00\r
2.000E+02,2.263E+00,5.078E+00,7.341E+00,4.957E+01,4.698E-01,8.447E+00\r
2.500E+02,2.282E+00,6.416E+00,8.698E+00,5.582E+01,5.190E-01,8.891E+00\r
3.000E+02,2.297E+00,7.760E+00,1.006E+01,6.116E+01,5.584E-01,9.254E+00\r
3.500E+02,2.311E+00,9.107E+00,1.142E+01,6.583E+01,5.908E-01,9.561E+00\r
4.000E+02,2.322E+00,1.046E+01,1.278E+01,6.996E+01,6.180E-01,9.827E+00\r
4.500E+02,2.332E+00,1.181E+01,1.414E+01,7.368E+01,6.412E-01,1.006E+01\r
5.000E+02,2.341E+00,1.317E+01,1.551E+01,7.706E+01,6.613E-01,1.027E+01\r
5.500E+02,2.349E+00,1.453E+01,1.688E+01,8.014E+01,6.789E-01,1.046E+01\r
6.000E+02,2.357E+00,1.589E+01,1.824E+01,8.299E+01,6.945E-01,1.064E+01\r
7.000E+02,2.370E+00,1.861E+01,2.098E+01,8.810E+01,7.209E-01,1.094E+01\r
8.000E+02,2.381E+00,2.133E+01,2.371E+01,9.258E+01,7.425E-01,1.121E+01\r
9.000E+02,2.391E+00,2.406E+01,2.645E+01,9.657E+01,7.605E-01,1.145E+01\r
1.000E+03,2.400E+00,2.679E+01,2.919E+01,1.002E+02,7.759E-01,1.166E+01\r
`,ne=`kinetic_energy_MeV,collision_stopping_power_MeV_cm2_g,radiative_stopping_power_MeV_cm2_g,total_stopping_power_MeV_cm2_g,csda_range_g_cm2,radiation_yield,density_effect_delta\r
1.000E-02,1.975E+01,3.897E-03,1.976E+01,2.884E-04,1.082E-04,0.000E+00\r
1.250E-02,1.663E+01,3.921E-03,1.663E+01,4.269E-04,1.299E-04,0.000E+00\r
1.500E-02,1.444E+01,3.937E-03,1.445E+01,5.886E-04,1.506E-04,0.000E+00\r
1.750E-02,1.282E+01,3.946E-03,1.283E+01,7.727E-04,1.706E-04,0.000E+00\r
2.000E-02,1.157E+01,3.954E-03,1.158E+01,9.782E-04,1.898E-04,0.000E+00\r
2.500E-02,9.753E+00,3.966E-03,9.757E+00,1.451E-03,2.267E-04,0.000E+00\r
3.000E-02,8.491E+00,3.976E-03,8.495E+00,2.002E-03,2.619E-04,0.000E+00\r
3.500E-02,7.562E+00,3.986E-03,7.566E+00,2.627E-03,2.955E-04,0.000E+00\r
4.000E-02,6.848E+00,3.998E-03,6.852E+00,3.322E-03,3.280E-04,0.000E+00\r
4.500E-02,6.280E+00,4.011E-03,6.284E+00,4.085E-03,3.595E-04,0.000E+00\r
5.000E-02,5.818E+00,4.025E-03,5.822E+00,4.913E-03,3.900E-04,0.000E+00\r
5.500E-02,5.434E+00,4.040E-03,5.438E+00,5.802E-03,4.198E-04,0.000E+00\r
6.000E-02,5.110E+00,4.057E-03,5.114E+00,6.751E-03,4.488E-04,0.000E+00\r
7.000E-02,4.593E+00,4.093E-03,4.597E+00,8.817E-03,5.050E-04,0.000E+00\r
8.000E-02,4.197E+00,4.133E-03,4.201E+00,1.110E-02,5.590E-04,0.000E+00\r
9.000E-02,3.885E+00,4.175E-03,3.889E+00,1.357E-02,6.112E-04,0.000E+00\r
1.000E-01,3.633E+00,4.222E-03,3.637E+00,1.623E-02,6.618E-04,0.000E+00\r
1.250E-01,3.172E+00,4.348E-03,3.176E+00,2.362E-02,7.826E-04,0.000E+00\r
1.500E-01,2.861E+00,4.485E-03,2.865E+00,3.193E-02,8.968E-04,0.000E+00\r
1.750E-01,2.637E+00,4.633E-03,2.642E+00,4.103E-02,1.006E-03,0.000E+00\r
2.000E-01,2.469E+00,4.789E-03,2.474E+00,5.082E-02,1.111E-03,0.000E+00\r
2.500E-01,2.236E+00,5.126E-03,2.241E+00,7.213E-02,1.311E-03,0.000E+00\r
3.000E-01,2.084E+00,5.495E-03,2.089E+00,9.528E-02,1.502E-03,0.000E+00\r
3.500E-01,1.978E+00,5.890E-03,1.984E+00,1.199E-01,1.688E-03,0.000E+00\r
4.000E-01,1.902E+00,6.311E-03,1.908E+00,1.456E-01,1.869E-03,0.000E+00\r
4.500E-01,1.845E+00,6.757E-03,1.852E+00,1.722E-01,2.048E-03,0.000E+00\r
5.000E-01,1.802E+00,7.223E-03,1.809E+00,1.995E-01,2.225E-03,0.000E+00\r
5.500E-01,1.769E+00,7.708E-03,1.776E+00,2.274E-01,2.401E-03,0.000E+00\r
6.000E-01,1.743E+00,8.210E-03,1.751E+00,2.558E-01,2.577E-03,0.000E+00\r
7.000E-01,1.706E+00,9.258E-03,1.715E+00,3.136E-01,2.930E-03,0.000E+00\r
8.000E-01,1.683E+00,1.036E-02,1.694E+00,3.723E-01,3.283E-03,0.000E+00\r
9.000E-01,1.669E+00,1.151E-02,1.681E+00,4.316E-01,3.639E-03,0.000E+00\r
1.000E+00,1.661E+00,1.271E-02,1.674E+00,4.912E-01,3.997E-03,0.000E+00\r
1.250E+00,1.655E+00,1.588E-02,1.671E+00,6.408E-01,4.907E-03,0.000E+00\r
1.500E+00,1.661E+00,1.927E-02,1.680E+00,7.901E-01,5.836E-03,0.000E+00\r
1.750E+00,1.671E+00,2.284E-02,1.694E+00,9.383E-01,6.784E-03,0.000E+00\r
2.000E+00,1.684E+00,2.656E-02,1.711E+00,1.085E+00,7.748E-03,0.000E+00\r
2.500E+00,1.712E+00,3.437E-02,1.747E+00,1.374E+00,9.717E-03,0.000E+00\r
3.000E+00,1.740E+00,4.260E-02,1.783E+00,1.658E+00,1.173E-02,0.000E+00\r
3.500E+00,1.766E+00,5.115E-02,1.817E+00,1.935E+00,1.377E-02,0.000E+00\r
4.000E+00,1.790E+00,5.999E-02,1.850E+00,2.208E+00,1.583E-02,0.000E+00\r
4.500E+00,1.812E+00,6.908E-02,1.881E+00,2.476E+00,1.792E-02,0.000E+00\r
5.000E+00,1.833E+00,7.838E-02,1.911E+00,2.740E+00,2.001E-02,0.000E+00\r
5.500E+00,1.852E+00,8.787E-02,1.940E+00,2.999E+00,2.211E-02,0.000E+00\r
6.000E+00,1.870E+00,9.754E-02,1.967E+00,3.255E+00,2.422E-02,0.000E+00\r
7.000E+00,1.902E+00,1.173E-01,2.020E+00,3.757E+00,2.846E-02,0.000E+00\r
8.000E+00,1.931E+00,1.376E-01,2.068E+00,4.246E+00,3.269E-02,0.000E+00\r
9.000E+00,1.956E+00,1.584E-01,2.115E+00,4.724E+00,3.692E-02,0.000E+00\r
1.000E+01,1.979E+00,1.795E-01,2.159E+00,5.192E+00,4.113E-02,0.000E+00\r
1.250E+01,2.029E+00,2.337E-01,2.262E+00,6.323E+00,5.156E-02,0.000E+00\r
1.500E+01,2.069E+00,2.895E-01,2.359E+00,7.405E+00,6.182E-02,0.000E+00\r
1.750E+01,2.104E+00,3.464E-01,2.450E+00,8.445E+00,7.186E-02,0.000E+00\r
2.000E+01,2.134E+00,4.042E-01,2.539E+00,9.447E+00,8.167E-02,0.000E+00\r
2.500E+01,2.185E+00,5.219E-01,2.707E+00,1.135E+01,1.006E-01,0.000E+00\r
3.000E+01,2.226E+00,6.417E-01,2.868E+00,1.315E+01,1.186E-01,7.563E-03\r
3.500E+01,2.257E+00,7.630E-01,3.020E+00,1.485E+01,1.357E-01,5.965E-02\r
4.000E+01,2.282E+00,8.855E-01,3.167E+00,1.646E+01,1.520E-01,1.375E-01\r
4.500E+01,2.302E+00,1.009E+00,3.311E+00,1.801E+01,1.676E-01,2.263E-01\r
5.000E+01,2.319E+00,1.133E+00,3.452E+00,1.948E+01,1.825E-01,3.189E-01\r
5.500E+01,2.334E+00,1.258E+00,3.592E+00,2.090E+01,1.968E-01,4.116E-01\r
6.000E+01,2.347E+00,1.384E+00,3.731E+00,2.227E+01,2.104E-01,5.025E-01\r
7.000E+01,2.369E+00,1.637E+00,4.006E+00,2.486E+01,2.361E-01,6.758E-01\r
8.000E+01,2.387E+00,1.892E+00,4.279E+00,2.727E+01,2.598E-01,8.361E-01\r
9.000E+01,2.403E+00,2.148E+00,4.551E+00,2.954E+01,2.818E-01,9.837E-01\r
1.000E+02,2.417E+00,2.405E+00,4.822E+00,3.167E+01,3.022E-01,1.120E+00\r
1.250E+02,2.445E+00,3.053E+00,5.498E+00,3.652E+01,3.474E-01,1.418E+00\r
1.500E+02,2.468E+00,3.705E+00,6.173E+00,4.081E+01,3.859E-01,1.670E+00\r
1.750E+02,2.486E+00,4.360E+00,6.847E+00,4.466E+01,4.192E-01,1.887E+00\r
2.000E+02,2.502E+00,5.018E+00,7.520E+00,4.814E+01,4.484E-01,2.078E+00\r
2.500E+02,2.529E+00,6.340E+00,8.868E+00,5.425E+01,4.972E-01,2.403E+00\r
3.000E+02,2.550E+00,7.667E+00,1.022E+01,5.950E+01,5.365E-01,2.674E+00\r
3.500E+02,2.567E+00,8.998E+00,1.157E+01,6.410E+01,5.691E-01,2.909E+00\r
4.000E+02,2.582E+00,1.033E+01,1.292E+01,6.819E+01,5.967E-01,3.116E+00\r
4.500E+02,2.595E+00,1.167E+01,1.427E+01,7.187E+01,6.203E-01,3.302E+00\r
5.000E+02,2.606E+00,1.301E+01,1.562E+01,7.522E+01,6.409E-01,3.471E+00\r
5.500E+02,2.616E+00,1.435E+01,1.697E+01,7.829E+01,6.589E-01,3.627E+00\r
6.000E+02,2.625E+00,1.569E+01,1.832E+01,8.113E+01,6.750E-01,3.772E+00\r
7.000E+02,2.641E+00,1.838E+01,2.102E+01,8.622E+01,7.022E-01,4.034E+00\r
8.000E+02,2.653E+00,2.107E+01,2.372E+01,9.069E+01,7.247E-01,4.267E+00\r
9.000E+02,2.664E+00,2.376E+01,2.643E+01,9.468E+01,7.435E-01,4.476E+00\r
1.000E+03,2.674E+00,2.646E+01,2.913E+01,9.829E+01,7.595E-01,4.667E+00\r
`,re=`kinetic_energy_MeV,collision_stopping_power_MeV_cm2_g,radiative_stopping_power_MeV_cm2_g,total_stopping_power_MeV_cm2_g,csda_range_g_cm2,radiation_yield,density_effect_delta\r
1.000E-02,1.972E+01,5.461E-03,1.972E+01,2.909E-04,1.468E-04,0.000E+00\r
1.250E-02,1.663E+01,5.579E-03,1.664E+01,4.295E-04,1.787E-04,0.000E+00\r
1.500E-02,1.447E+01,5.664E-03,1.447E+01,5.911E-04,2.095E-04,0.000E+00\r
1.750E-02,1.286E+01,5.728E-03,1.287E+01,7.747E-04,2.393E-04,0.000E+00\r
2.000E-02,1.162E+01,5.778E-03,1.162E+01,9.795E-04,2.683E-04,0.000E+00\r
2.500E-02,9.805E+00,5.853E-03,9.810E+00,1.450E-03,3.241E-04,0.000E+00\r
3.000E-02,8.546E+00,5.907E-03,8.552E+00,1.997E-03,3.775E-04,0.000E+00\r
3.500E-02,7.618E+00,5.951E-03,7.624E+00,2.618E-03,4.287E-04,0.000E+00\r
4.000E-02,6.904E+00,5.989E-03,6.910E+00,3.308E-03,4.781E-04,0.000E+00\r
4.500E-02,6.335E+00,6.022E-03,6.342E+00,4.064E-03,5.259E-04,0.000E+00\r
5.000E-02,5.873E+00,6.054E-03,5.879E+00,4.884E-03,5.723E-04,0.000E+00\r
5.500E-02,5.488E+00,6.084E-03,5.494E+00,5.764E-03,6.175E-04,0.000E+00\r
6.000E-02,5.163E+00,6.113E-03,5.169E+00,6.703E-03,6.614E-04,0.000E+00\r
7.000E-02,4.643E+00,6.171E-03,4.649E+00,8.747E-03,7.463E-04,0.000E+00\r
8.000E-02,4.246E+00,6.230E-03,4.252E+00,1.100E-02,8.276E-04,0.000E+00\r
9.000E-02,3.932E+00,6.292E-03,3.939E+00,1.345E-02,9.058E-04,0.000E+00\r
1.000E-01,3.679E+00,6.356E-03,3.685E+00,1.607E-02,9.814E-04,0.000E+00\r
1.250E-01,3.215E+00,6.530E-03,3.221E+00,2.336E-02,1.161E-03,0.000E+00\r
1.500E-01,2.901E+00,6.719E-03,2.908E+00,3.155E-02,1.329E-03,0.000E+00\r
1.750E-01,2.676E+00,6.923E-03,2.683E+00,4.051E-02,1.489E-03,0.000E+00\r
2.000E-01,2.507E+00,7.140E-03,2.514E+00,5.015E-02,1.641E-03,0.000E+00\r
2.500E-01,2.272E+00,7.612E-03,2.280E+00,7.110E-02,1.931E-03,0.000E+00\r
3.000E-01,2.119E+00,8.129E-03,2.127E+00,9.386E-02,2.206E-03,0.000E+00\r
3.500E-01,2.011E+00,8.685E-03,2.020E+00,1.180E-01,2.471E-03,8.962E-03\r
4.000E-01,1.932E+00,9.276E-03,1.941E+00,1.433E-01,2.730E-03,3.416E-02\r
4.500E-01,1.872E+00,9.901E-03,1.881E+00,1.695E-01,2.984E-03,6.206E-02\r
5.000E-01,1.825E+00,1.055E-02,1.836E+00,1.964E-01,3.236E-03,9.154E-02\r
5.500E-01,1.789E+00,1.124E-02,1.800E+00,2.239E-01,3.487E-03,1.220E-01\r
6.000E-01,1.760E+00,1.194E-02,1.772E+00,2.519E-01,3.737E-03,1.532E-01\r
7.000E-01,1.718E+00,1.341E-02,1.732E+00,3.090E-01,4.237E-03,2.167E-01\r
8.000E-01,1.690E+00,1.495E-02,1.705E+00,3.672E-01,4.740E-03,2.807E-01\r
9.000E-01,1.671E+00,1.657E-02,1.688E+00,4.262E-01,5.245E-03,3.443E-01\r
1.000E+00,1.659E+00,1.824E-02,1.677E+00,4.857E-01,5.755E-03,4.071E-01\r
1.250E+00,1.642E+00,2.267E-02,1.665E+00,6.354E-01,7.052E-03,5.581E-01\r
1.500E+00,1.638E+00,2.740E-02,1.665E+00,7.857E-01,8.382E-03,6.995E-01\r
1.750E+00,1.639E+00,3.237E-02,1.671E+00,9.356E-01,9.743E-03,8.311E-01\r
2.000E+00,1.643E+00,3.755E-02,1.681E+00,1.085E+00,1.113E-02,9.535E-01\r
2.500E+00,1.656E+00,4.840E-02,1.704E+00,1.380E+00,1.398E-02,1.174E+00\r
3.000E+00,1.670E+00,5.981E-02,1.730E+00,1.671E+00,1.689E-02,1.368E+00\r
3.500E+00,1.684E+00,7.165E-02,1.755E+00,1.958E+00,1.987E-02,1.541E+00\r
4.000E+00,1.697E+00,8.386E-02,1.781E+00,2.241E+00,2.288E-02,1.697E+00\r
4.500E+00,1.709E+00,9.638E-02,1.805E+00,2.520E+00,2.592E-02,1.840E+00\r
5.000E+00,1.720E+00,1.092E-01,1.829E+00,2.795E+00,2.898E-02,1.970E+00\r
5.500E+00,1.731E+00,1.222E-01,1.853E+00,3.067E+00,3.206E-02,2.091E+00\r
6.000E+00,1.740E+00,1.355E-01,1.876E+00,3.335E+00,3.514E-02,2.203E+00\r
7.000E+00,1.758E+00,1.627E-01,1.921E+00,3.862E+00,4.133E-02,2.408E+00\r
8.000E+00,1.773E+00,1.904E-01,1.964E+00,4.377E+00,4.752E-02,2.591E+00\r
9.000E+00,1.787E+00,2.188E-01,2.006E+00,4.880E+00,5.369E-02,2.757E+00\r
1.000E+01,1.799E+00,2.476E-01,2.046E+00,5.374E+00,5.983E-02,2.909E+00\r
1.250E+01,1.824E+00,3.214E-01,2.145E+00,6.567E+00,7.497E-02,3.241E+00\r
1.500E+01,1.844E+00,3.971E-01,2.241E+00,7.707E+00,8.974E-02,3.525E+00\r
1.750E+01,1.860E+00,4.742E-01,2.335E+00,8.800E+00,1.041E-01,3.773E+00\r
2.000E+01,1.874E+00,5.525E-01,2.427E+00,9.850E+00,1.180E-01,3.994E+00\r
2.500E+01,1.897E+00,7.117E-01,2.609E+00,1.184E+01,1.446E-01,4.375E+00\r
3.000E+01,1.915E+00,8.735E-01,2.788E+00,1.369E+01,1.694E-01,4.696E+00\r
3.500E+01,1.929E+00,1.037E+00,2.966E+00,1.543E+01,1.926E-01,4.973E+00\r
4.000E+01,1.942E+00,1.202E+00,3.144E+00,1.707E+01,2.143E-01,5.217E+00\r
4.500E+01,1.952E+00,1.369E+00,3.321E+00,1.861E+01,2.347E-01,5.435E+00\r
5.000E+01,1.962E+00,1.537E+00,3.498E+00,2.008E+01,2.538E-01,5.631E+00\r
5.500E+01,1.970E+00,1.705E+00,3.676E+00,2.147E+01,2.718E-01,5.810E+00\r
6.000E+01,1.978E+00,1.875E+00,3.853E+00,2.280E+01,2.887E-01,5.974E+00\r
7.000E+01,1.992E+00,2.215E+00,4.207E+00,2.529E+01,3.199E-01,6.267E+00\r
8.000E+01,2.003E+00,2.558E+00,4.561E+00,2.757E+01,3.480E-01,6.523E+00\r
9.000E+01,2.013E+00,2.903E+00,4.916E+00,2.968E+01,3.733E-01,6.750E+00\r
1.000E+02,2.022E+00,3.249E+00,5.272E+00,3.164E+01,3.964E-01,6.953E+00\r
1.250E+02,2.041E+00,4.120E+00,6.161E+00,3.602E+01,4.459E-01,7.387E+00\r
1.500E+02,2.056E+00,4.997E+00,7.053E+00,3.981E+01,4.865E-01,7.743E+00\r
1.750E+02,2.069E+00,5.878E+00,7.947E+00,4.315E+01,5.205E-01,8.046E+00\r
2.000E+02,2.080E+00,6.762E+00,8.842E+00,4.613E+01,5.495E-01,8.309E+00\r
2.500E+02,2.098E+00,8.537E+00,1.064E+01,5.128E+01,5.966E-01,8.750E+00\r
3.000E+02,2.113E+00,1.032E+01,1.243E+01,5.563E+01,6.333E-01,9.111E+00\r
3.500E+02,2.126E+00,1.211E+01,1.423E+01,5.938E+01,6.630E-01,9.418E+00\r
4.000E+02,2.136E+00,1.390E+01,1.604E+01,6.269E+01,6.875E-01,9.683E+00\r
4.500E+02,2.146E+00,1.569E+01,1.784E+01,6.564E+01,7.081E-01,9.918E+00\r
5.000E+02,2.154E+00,1.749E+01,1.964E+01,6.831E+01,7.258E-01,1.013E+01\r
5.500E+02,2.162E+00,1.929E+01,2.145E+01,7.075E+01,7.412E-01,1.032E+01\r
6.000E+02,2.169E+00,2.109E+01,2.326E+01,7.299E+01,7.547E-01,1.049E+01\r
7.000E+02,2.181E+00,2.470E+01,2.688E+01,7.698E+01,7.773E-01,1.080E+01\r
8.000E+02,2.192E+00,2.831E+01,3.050E+01,8.047E+01,7.956E-01,1.107E+01\r
9.000E+02,2.202E+00,3.192E+01,3.412E+01,8.357E+01,8.108E-01,1.130E+01\r
1.000E+03,2.210E+00,3.553E+01,3.774E+01,8.636E+01,8.235E-01,1.151E+01\r
`,ie=`kinetic_energy_MeV,collision_stopping_power_MeV_cm2_g,radiative_stopping_power_MeV_cm2_g,total_stopping_power_MeV_cm2_g,csda_range_g_cm2,radiation_yield,density_effect_delta\r
1.000E-02,2.257E+01,3.680E-03,2.257E+01,2.512E-04,8.894E-05,0.000E+00\r
1.250E-02,1.897E+01,3.706E-03,1.898E+01,3.725E-04,1.070E-04,0.000E+00\r
1.500E-02,1.646E+01,3.721E-03,1.647E+01,5.144E-04,1.243E-04,0.000E+00\r
1.750E-02,1.460E+01,3.732E-03,1.461E+01,6.759E-04,1.410E-04,0.000E+00\r
2.000E-02,1.317E+01,3.740E-03,1.317E+01,8.565E-04,1.571E-04,0.000E+00\r
2.500E-02,1.108E+01,3.752E-03,1.109E+01,1.272E-03,1.879E-04,0.000E+00\r
3.000E-02,9.643E+00,3.762E-03,9.647E+00,1.757E-03,2.173E-04,0.000E+00\r
3.500E-02,8.582E+00,3.773E-03,8.586E+00,2.308E-03,2.456E-04,0.000E+00\r
4.000E-02,7.767E+00,3.785E-03,7.771E+00,2.921E-03,2.728E-04,0.000E+00\r
4.500E-02,7.120E+00,3.797E-03,7.124E+00,3.594E-03,2.992E-04,0.000E+00\r
5.000E-02,6.593E+00,3.811E-03,6.597E+00,4.324E-03,3.248E-04,0.000E+00\r
5.500E-02,6.156E+00,3.826E-03,6.160E+00,5.109E-03,3.498E-04,0.000E+00\r
6.000E-02,5.787E+00,3.842E-03,5.791E+00,5.946E-03,3.742E-04,0.000E+00\r
7.000E-02,5.198E+00,3.877E-03,5.202E+00,7.772E-03,4.214E-04,0.000E+00\r
8.000E-02,4.749E+00,3.916E-03,4.753E+00,9.786E-03,4.668E-04,0.000E+00\r
9.000E-02,4.394E+00,3.958E-03,4.398E+00,1.198E-02,5.107E-04,0.000E+00\r
1.000E-01,4.107E+00,4.002E-03,4.111E+00,1.433E-02,5.533E-04,0.000E+00\r
1.250E-01,3.584E+00,4.124E-03,3.588E+00,2.087E-02,6.552E-04,0.000E+00\r
1.500E-01,3.230E+00,4.258E-03,3.235E+00,2.822E-02,7.515E-04,0.000E+00\r
1.750E-01,2.977E+00,4.400E-03,2.981E+00,3.629E-02,8.437E-04,0.000E+00\r
2.000E-01,2.786E+00,4.551E-03,2.791E+00,4.497E-02,9.324E-04,0.000E+00\r
2.500E-01,2.522E+00,4.876E-03,2.527E+00,6.386E-02,1.102E-03,0.000E+00\r
3.000E-01,2.349E+00,5.232E-03,2.354E+00,8.441E-02,1.265E-03,0.000E+00\r
3.500E-01,2.229E+00,5.613E-03,2.234E+00,1.062E-01,1.422E-03,0.000E+00\r
4.000E-01,2.142E+00,6.018E-03,2.148E+00,1.291E-01,1.576E-03,0.000E+00\r
4.500E-01,2.077E+00,6.446E-03,2.084E+00,1.527E-01,1.729E-03,0.000E+00\r
5.000E-01,2.027E+00,6.895E-03,2.034E+00,1.770E-01,1.880E-03,7.184E-03\r
5.500E-01,1.987E+00,7.361E-03,1.995E+00,2.019E-01,2.031E-03,2.846E-02\r
6.000E-01,1.955E+00,7.844E-03,1.963E+00,2.271E-01,2.182E-03,5.251E-02\r
7.000E-01,1.908E+00,8.854E-03,1.917E+00,2.787E-01,2.485E-03,1.066E-01\r
8.000E-01,1.876E+00,9.914E-03,1.886E+00,3.314E-01,2.792E-03,1.657E-01\r
9.000E-01,1.854E+00,1.102E-02,1.865E+00,3.847E-01,3.102E-03,2.276E-01\r
1.000E+00,1.839E+00,1.218E-02,1.851E+00,4.385E-01,3.416E-03,2.908E-01\r
1.250E+00,1.818E+00,1.523E-02,1.833E+00,5.744E-01,4.220E-03,4.487E-01\r
1.500E+00,1.810E+00,1.849E-02,1.829E+00,7.110E-01,5.051E-03,6.012E-01\r
1.750E+00,1.809E+00,2.193E-02,1.831E+00,8.476E-01,5.907E-03,7.453E-01\r
2.000E+00,1.812E+00,2.552E-02,1.838E+00,9.839E-01,6.784E-03,8.807E-01\r
2.500E+00,1.822E+00,3.305E-02,1.855E+00,1.255E+00,8.595E-03,1.127E+00\r
3.000E+00,1.835E+00,4.099E-02,1.876E+00,1.523E+00,1.047E-02,1.343E+00\r
3.500E+00,1.847E+00,4.925E-02,1.896E+00,1.788E+00,1.239E-02,1.537E+00\r
4.000E+00,1.859E+00,5.778E-02,1.917E+00,2.050E+00,1.434E-02,1.710E+00\r
4.500E+00,1.871E+00,6.655E-02,1.937E+00,2.310E+00,1.633E-02,1.868E+00\r
5.000E+00,1.881E+00,7.553E-02,1.957E+00,2.566E+00,1.835E-02,2.012E+00\r
5.500E+00,1.891E+00,8.470E-02,1.976E+00,2.821E+00,2.038E-02,2.145E+00\r
6.000E+00,1.901E+00,9.404E-02,1.995E+00,3.073E+00,2.243E-02,2.268E+00\r
7.000E+00,1.918E+00,1.132E-01,2.031E+00,3.569E+00,2.658E-02,2.491E+00\r
8.000E+00,1.932E+00,1.328E-01,2.065E+00,4.058E+00,3.076E-02,2.688E+00\r
9.000E+00,1.946E+00,1.528E-01,2.099E+00,4.538E+00,3.496E-02,2.865E+00\r
1.000E+01,1.958E+00,1.733E-01,2.131E+00,5.011E+00,3.917E-02,3.025E+00\r
1.250E+01,1.983E+00,2.257E-01,2.209E+00,6.163E+00,4.969E-02,3.373E+00\r
1.500E+01,2.003E+00,2.796E-01,2.283E+00,7.276E+00,6.014E-02,3.666E+00\r
1.750E+01,2.020E+00,3.346E-01,2.355E+00,8.354E+00,7.045E-02,3.920E+00\r
2.000E+01,2.035E+00,3.905E-01,2.425E+00,9.401E+00,8.060E-02,4.144E+00\r
2.500E+01,2.058E+00,5.045E-01,2.562E+00,1.141E+01,1.003E-01,4.529E+00\r
3.000E+01,2.077E+00,6.204E-01,2.697E+00,1.331E+01,1.192E-01,4.853E+00\r
3.500E+01,2.092E+00,7.378E-01,2.830E+00,1.512E+01,1.373E-01,5.133E+00\r
4.000E+01,2.105E+00,8.565E-01,2.961E+00,1.684E+01,1.545E-01,5.379E+00\r
4.500E+01,2.116E+00,9.762E-01,3.092E+00,1.850E+01,1.710E-01,5.600E+00\r
5.000E+01,2.126E+00,1.097E+00,3.222E+00,2.008E+01,1.867E-01,5.799E+00\r
5.500E+01,2.134E+00,1.218E+00,3.352E+00,2.160E+01,2.017E-01,5.980E+00\r
6.000E+01,2.142E+00,1.340E+00,3.482E+00,2.307E+01,2.161E-01,6.147E+00\r
7.000E+01,2.156E+00,1.585E+00,3.741E+00,2.584E+01,2.430E-01,6.444E+00\r
8.000E+01,2.168E+00,1.832E+00,4.000E+00,2.842E+01,2.678E-01,6.704E+00\r
9.000E+01,2.178E+00,2.080E+00,4.259E+00,3.084E+01,2.906E-01,6.934E+00\r
1.000E+02,2.188E+00,2.330E+00,4.517E+00,3.312E+01,3.118E-01,7.141E+00\r
1.250E+02,2.207E+00,2.957E+00,5.164E+00,3.829E+01,3.585E-01,7.581E+00\r
1.500E+02,2.223E+00,3.590E+00,5.812E+00,4.285E+01,3.981E-01,7.941E+00\r
1.750E+02,2.236E+00,4.225E+00,6.461E+00,4.693E+01,4.321E-01,8.247E+00\r
2.000E+02,2.247E+00,4.863E+00,7.111E+00,5.062E+01,4.618E-01,8.513E+00\r
2.500E+02,2.266E+00,6.145E+00,8.412E+00,5.708E+01,5.111E-01,8.957E+00\r
3.000E+02,2.282E+00,7.433E+00,9.716E+00,6.260E+01,5.507E-01,9.320E+00\r
3.500E+02,2.295E+00,8.726E+00,1.102E+01,6.743E+01,5.833E-01,9.627E+00\r
4.000E+02,2.306E+00,1.002E+01,1.233E+01,7.172E+01,6.107E-01,9.894E+00\r
4.500E+02,2.316E+00,1.132E+01,1.364E+01,7.557E+01,6.342E-01,1.013E+01\r
5.000E+02,2.325E+00,1.262E+01,1.494E+01,7.908E+01,6.545E-01,1.034E+01\r
5.500E+02,2.334E+00,1.392E+01,1.625E+01,8.228E+01,6.723E-01,1.053E+01\r
6.000E+02,2.341E+00,1.522E+01,1.756E+01,8.524E+01,6.881E-01,1.070E+01\r
7.000E+02,2.354E+00,1.783E+01,2.019E+01,9.055E+01,7.149E-01,1.101E+01\r
8.000E+02,2.365E+00,2.045E+01,2.281E+01,9.520E+01,7.368E-01,1.128E+01\r
9.000E+02,2.375E+00,2.306E+01,2.544E+01,9.935E+01,7.551E-01,1.151E+01\r
1.000E+03,2.384E+00,2.568E+01,2.807E+01,1.031E+02,7.707E-01,1.172E+01\r
`;function O(e){let t=e.trim().split(`
`),n=[];for(let e=1;e<t.length;e++){let r=t[e].trim();if(!r)continue;let i=r.split(`,`);n.push({energyMeV:Number(i[0]),collisionStoppingPowerMeVcm2g:Number(i[1]),radiativeStoppingPowerMeVcm2g:Number(i[2]),totalStoppingPowerMeVcm2g:Number(i[3]),csdaRangeGcm2:Number(i[4])})}return n}var ae={water_liquid:O(te),air_dry:O(ne),bone_cortical_icrp:O(re),soft_tissue_icrp:O(ie)};function k(e,t,n,r,i){let a=(Math.log(e)-Math.log(t))/(Math.log(r)-Math.log(t));return Math.exp(Math.log(n)+a*(Math.log(i)-Math.log(n)))}function A(e){return{collisionStoppingPowerMeVcm2g:e.collisionStoppingPowerMeVcm2g,radiativeStoppingPowerMeVcm2g:e.radiativeStoppingPowerMeVcm2g,totalStoppingPowerMeVcm2g:e.totalStoppingPowerMeVcm2g,csdaRangeGcm2:e.csdaRangeGcm2}}function j(e,t){let n=ae[e],r=n[0],i=n[n.length-1],a=Math.min(Math.max(t,r.energyMeV),i.energyMeV);if(a<=r.energyMeV)return A(r);if(a>=i.energyMeV)return A(i);let o=0,s=n.length-1;for(;s-o>1;){let e=o+s>>1;n[e].energyMeV<=a?o=e:s=e}let c=n[o],l=n[s];return a===c.energyMeV?A(c):a===l.energyMeV?A(l):{collisionStoppingPowerMeVcm2g:k(a,c.energyMeV,c.collisionStoppingPowerMeVcm2g,l.energyMeV,l.collisionStoppingPowerMeVcm2g),radiativeStoppingPowerMeVcm2g:k(a,c.energyMeV,c.radiativeStoppingPowerMeVcm2g,l.energyMeV,l.radiativeStoppingPowerMeVcm2g),totalStoppingPowerMeVcm2g:k(a,c.energyMeV,c.totalStoppingPowerMeVcm2g,l.energyMeV,l.totalStoppingPowerMeVcm2g),csdaRangeGcm2:k(a,c.energyMeV,c.csdaRangeGcm2,l.energyMeV,l.csdaRangeGcm2)}}var M={water_liquid:1,air_dry:.001205,bone_cortical_icrp:1.85,soft_tissue_icrp:1.03},oe={water_liquid:36.08,air_dry:36.62,bone_cortical_icrp:10.9,soft_tissue_icrp:36.5},N=.511;function se(e){let t=e>>>0;return function(){t|=0,t=t+1831565813|0;let e=Math.imul(t^t>>>15,1|t);return e=e+Math.imul(e^e>>>7,61|e)^e,((e^e>>>14)>>>0)/4294967296}}function P(e){let t=Math.max(e(),2**-52),n=e();return Math.sqrt(-2*Math.log(t))*Math.cos(2*Math.PI*n)}function ce(e,t,n){return{x:e.x+t.x*n,y:e.y+t.y*n,z:e.z+t.z*n}}function le(e,t){return{x:(e.x+t.x)/2,y:(e.y+t.y)/2,z:(e.z+t.z)/2}}function F(e){let t=Math.sqrt(e.x*e.x+e.y*e.y+e.z*e.z)||1;return{x:e.x/t,y:e.y/t,z:e.z/t}}function I(e,t){return{x:e.y*t.z-e.z*t.y,y:e.z*t.x-e.x*t.z,z:e.x*t.y-e.y*t.x}}function ue(e){let t=F(I(e,Math.abs(e.z)<.9?{x:0,y:0,z:1}:{x:1,y:0,z:0}));return[t,I(e,t)]}function de(e,t,n){let[r,i]=ue(e);return F({x:e.x+t*r.x+n*i.x,y:e.y+t*r.y+n*i.y,z:e.z+t*r.z+n*i.z})}function fe(e,t,n){let r=e+N,i=Math.sqrt(Math.max(r*r-N*N,1e-12)),a=i/r,o=Math.max(t,1e-12)/n,s=Math.max(1+.038*Math.log(o),.1);return 13.6/(a*i)*Math.sqrt(o)*s}function pe(e){switch(e.shape){case`box`:{let[t,n,r]=e.sizeMM;return{minX:-t/2,maxX:t/2,minY:-n/2,maxY:n/2,minZ:0,maxZ:r}}case`cylinder`:return{minX:-e.radiusMM,maxX:e.radiusMM,minY:-e.radiusMM,maxY:e.radiusMM,minZ:0,maxZ:e.heightMM};case`sphere`:return{minX:-e.radiusMM,maxX:e.radiusMM,minY:-e.radiusMM,maxY:e.radiusMM,minZ:0,maxZ:2*e.radiusMM}}}function L(e,t,n,r){return t+e.nx*(n+e.ny*r)}function me(e,t){let n=pe(e),r={x:(n.maxX-n.minX)/t.nx,y:(n.maxY-n.minY)/t.ny,z:(n.maxZ-n.minZ)/t.nz},i=t.nx*t.ny*t.nz,a=new Float64Array(i),o=new Uint8Array(i);for(let i=0;i<t.nz;i++)for(let a=0;a<t.ny;a++)for(let s=0;s<t.nx;s++)w(e,{x:n.minX+(s+.5)*r.x,y:n.minY+(a+.5)*r.y,z:n.minZ+(i+.5)*r.z})&&(o[L(t,s,a,i)]=1);return{bounds:n,dims:t,spacingMM:r,energyMeV:a,insideMask:o}}function he(e,t){let{bounds:n,dims:r,spacingMM:i}=e;return t.x<n.minX||t.x>n.maxX||t.y<n.minY||t.y>n.maxY||t.z<n.minZ||t.z>n.maxZ?null:L(r,Math.min(r.nx-1,Math.floor((t.x-n.minX)/i.x)),Math.min(r.ny-1,Math.floor((t.y-n.minY)/i.y)),Math.min(r.nz-1,Math.floor((t.z-n.minZ)/i.z)))}var ge={nx:32,ny:32,nz:32},_e=.01,ve=25,ye=200,be=4e3;function xe(e,t,n,r,i={}){let a=i.lowEnergyCutoffMeV??_e,o=i.gridDims??ge,s=i.maxSampledPaths??ve,c=i.stepsPerInitialRange??ye,l=C(e),u=M[l],d=oe[l],f=me(e,o),p=se(r),m=j(l,t.energyMeV).csdaRangeGcm2/u*10,h=Math.min(5,Math.max(.01,m/c)),g=[],_=0,v=0,y=0;for(let r=0;r<n;r++){let n={x:(p()-.5)*t.fieldSizeMM[0],y:(p()-.5)*t.fieldSizeMM[1],z:0},r={x:0,y:0,z:1},i=t.energyMeV,o=0,c=0,m=!1,b=g.length<s,x=b?[{...n}]:[];for(let t=0;t<be&&!(i<=a);t++){let t=h/10*u,a=fe(i,t,d),s=P(p)*a,g=P(p)*a;r=de(r,s,g);let _=ce(n,r,h),v=le(n,_),y=j(l,i).collisionStoppingPowerMeVcm2g*t,S=Math.min(y,i),C=he(f,v);if(C!==null&&f.insideMask[C]===1&&(f.energyMeV[C]+=S,o+=S),i-=S,n=_,c=Math.max(c,n.z),b&&x.push({...n}),!w(e,n)){m=!0;break}}_+=o,v+=c,y=Math.max(y,o),b&&g.push({initialEnergyMeV:t.energyMeV,points:x,totalEnergyDepositedMeV:o,exitedPhantom:m})}let b=[];for(let e=0;e<f.dims.nz;e++){let t=0;for(let n=0;n<f.dims.ny;n++)for(let r=0;r<f.dims.nx;r++)t+=f.energyMeV[L(f.dims,r,n,e)];b.push({depthMM:f.bounds.minZ+(e+.5)*f.spacingMM.z,energyMeV:t})}return{phantom:e,beam:t,seed:r,numHistories:n,doseGrid:f,sampledPaths:g,depthDose:b,stats:{historiesSimulated:n,meanRangeMM:n>0?v/n:0,totalEnergyDepositedMeV:_,meanEnergyDepositedPerHistoryMeV:n>0?_/n:0,maxHistoryEnergyDepositedMeV:y}}}function Se(e,t,n=2){return!(t>0)||!(e>=0)||!(n>1)?{percentDifference:NaN,passed:!1}:{percentDifference:(e-t)/t*100,passed:e>=t/n&&e<=t*n}}function Ce(e,t,n,r,i=2){let a=j(e,n).csdaRangeGcm2/t*10,{percentDifference:o,passed:s}=Se(r,a,i);return{material:e,beamEnergyMeV:n,simulatedRangeMM:r,referenceCsdaRangeMM:a,percentDifference:o,toleranceRatio:i,passed:s}}function we(e,t,n){let{dims:r,bounds:i,energyMeV:a,insideMask:o}=e;function s(e,t,n){let i=e+r.nx*(t+r.ny*n);return o[i]===1?a[i]:0}let c,l,u,d,f,p,m,h,g,_;switch(t){case`z`:c=r.nx,l=r.ny,u=r.nz,d=i.minZ,f=i.maxZ,p=i.minX/10,m=i.maxX/10,h=i.minY/10,g=i.maxY/10,_=(e,t,n)=>s(e,t,n);break;case`y`:c=r.nx,l=r.nz,u=r.ny,d=i.minY,f=i.maxY,p=i.minX/10,m=i.maxX/10,h=i.minZ/10,g=i.maxZ/10,_=(e,t,n)=>s(e,n,t);break;case`x`:c=r.ny,l=r.nz,u=r.nx,d=i.minX,f=i.maxX,p=i.minY/10,m=i.maxY/10,h=i.minZ/10,g=i.maxZ/10,_=(e,t,n)=>s(n,e,t)}let v=Math.min(u-1,Math.max(0,Math.trunc(n))),y=new Float64Array(c*l),b=0;for(let e=0;e<l;e++)for(let t=0;t<c;t++){let n=_(t,e,v);y[t+c*e]=n,n>b&&(b=n)}let x=(f-d)/u,S=d+(v+.5)*x;return{nu:c,nv:l,values:y,maxValue:b,minU:p,maxU:m,minV:h,maxV:g,positionMM:S,axisMinMM:d,axisMaxMM:f,index:v,count:u}}function R(e,t,n,r,i){return n===t?(r+i)/2:r+(e-t)/(n-t)*(i-r)}function Te(e,t){let n=(e.maxX-e.minX)*t,r=(e.maxZ-e.minZ)*t;return{minX:e.minX-n,maxX:e.maxX+n,minZ:e.minZ-r,maxZ:e.maxZ+r}}function z(e,t,n,r){return{x:R(e.x,t.minX,t.maxX,0,n),y:R(e.z,t.minZ,t.maxZ,0,r)}}function Ee(e){let t=e.reduce((e,t)=>Math.max(e,t.energyMeV),0);return t<=0?e.map(e=>({depthMM:e.depthMM,percent:0})):e.map(e=>({depthMM:e.depthMM,percent:e.energyMeV/t*100}))}function De(e,t=64){switch(e.shape){case`box`:{let[t,,n]=e.sizeMM,r=t/2;return[{x:-r,z:0},{x:r,z:0},{x:r,z:n},{x:-r,z:n},{x:-r,z:0}]}case`cylinder`:{let{radiusMM:t,heightMM:n}=e;return[{x:-t,z:0},{x:t,z:0},{x:t,z:n},{x:-t,z:n},{x:-t,z:0}]}case`sphere`:{let{radiusMM:n}=e,r=[];for(let e=0;e<=t;e++){let i=e/t*2*Math.PI;r.push({x:n*Math.sin(i),z:n-n*Math.cos(i)})}return r}}}function Oe(e,t,n,r=64){function i(e,t,n){let i=[];for(let a=0;a<=r;a++){let o=a/r*2*Math.PI;i.push({x:t+e*Math.cos(o),z:n+e*Math.sin(o)})}return i}function a(e,t,n,r){return[{x:e,z:n},{x:t,z:n},{x:t,z:r},{x:e,z:r},{x:e,z:n}]}switch(e.shape){case`box`:{let[r,i,o]=e.sizeMM,s=r/2,c=i/2;return t===`z`?n<0||n>o?null:a(-s,s,-c,c):t===`y`?Math.abs(n)>c?null:a(-s,s,0,o):Math.abs(n)>s?null:a(-c,c,0,o)}case`cylinder`:{let{radiusMM:r,heightMM:o}=e;if(t===`z`)return n<0||n>o?null:i(r,0,0);if(Math.abs(n)>r)return null;let s=Math.sqrt(r*r-n*n);return a(-s,s,0,o)}case`sphere`:{let{radiusMM:r}=e;if(t===`z`){let e=n-r;return Math.abs(e)>r?null:i(Math.sqrt(Math.max(0,r*r-e*e)),0,0)}return Math.abs(n)>r?null:i(Math.sqrt(Math.max(0,r*r-n*n)),0,r)}}}var B=[[15,23,32],[37,99,235],[16,185,129],[250,204,21],[220,38,38]];function V(e){let t=Math.min(1,Math.max(0,e))*(B.length-1),n=Math.min(B.length-2,Math.floor(t)),r=t-n,[i,a,o]=B[n],[s,c,l]=B[n+1];return[Math.round(i+(s-i)*r),Math.round(a+(c-a)*r),Math.round(o+(l-o)*r)]}var ke=.05;function Ae(e){let t=new l,o;switch(e.shape){case`box`:{let[t,n,r]=e.sizeMM;o=new c(t,n,r),o.translate(0,0,r/2);break}case`cylinder`:{let{radiusMM:t,heightMM:n}=e;o=new h(t,t,n,48),o.rotateX(Math.PI/2),o.translate(0,0,n/2);break}case`sphere`:{let{radiusMM:t}=e;o=new n(t,32,24),o.translate(0,0,t);break}}let s=new u({color:10466248,transparent:!0,opacity:.12,depthWrite:!1});t.add(new p(o,s));let d=new r(o,20),f=new i({color:10466248,transparent:!0,opacity:.6});return t.add(new a(d,f)),t}function je(e,t){let n=new l,s=new o(e[0],e[1]),c=new a(new r(s),new i({color:5231045}));n.add(c);let u=Math.max(10,t*.3),d=new m(new y(0,0,1),new y(0,0,-u),u,5231045,u*.3,u*.2);return n.add(d),n}function Me(e){let n=new l,r=new i({color:6333946,transparent:!0,opacity:.55});for(let i of e.sampledPaths){if(i.points.length<2)continue;let e=new Float32Array(i.points.length*3);i.points.forEach((t,n)=>{e[n*3]=t.x,e[n*3+1]=t.y,e[n*3+2]=t.z});let a=new f;a.setAttribute(`position`,new t(e,3)),n.add(new _(a,r))}return n}function Ne(n){let{dims:r,bounds:i,spacingMM:a,energyMeV:o,insideMask:s}=n.doseGrid,c=0;for(let e=0;e<o.length;e++)s[e]===1&&o[e]>c&&(c=o[e]);let l=[],u=[];if(c>0)for(let e=0;e<r.nz;e++)for(let t=0;t<r.ny;t++)for(let n=0;n<r.nx;n++){let d=n+r.nx*(t+r.ny*e);if(s[d]!==1)continue;let f=o[d]/c;if(f<ke)continue;l.push(i.minX+(n+.5)*a.x,i.minY+(t+.5)*a.y,i.minZ+(e+.5)*a.z);let[p,m,h]=V(f);u.push(p/255,m/255,h/255)}let d=new f;d.setAttribute(`position`,new t(new Float32Array(l),3)),d.setAttribute(`color`,new t(new Float32Array(u),3));let p=Math.max(1,Math.min(a.x,a.y,a.z)*1.4),m=new v({size:p,vertexColors:!0,transparent:!0,opacity:.85,sizeAttenuation:!0});return new e(d,m)}function H(t){t.traverse(t=>{if(t instanceof p||t instanceof _||t instanceof e){t.geometry.dispose();let e=t.material;Array.isArray(e)?e.forEach(e=>e.dispose()):e.dispose()}})}var Pe=class{available=!1;renderer=null;scene=null;camera=null;controls=null;contentGroup=null;canvas=null;handleResize=()=>void 0;renderFrame=()=>void 0;initialCameraPosition=new y(1,1,1);initialTarget=new y(0,0,0);init(e){let t;try{t=new d({canvas:e,antialias:!0,alpha:!0})}catch{return!1}return this.canvas=e,this.renderer=t,this.scene=new b,this.camera=new s(45,1,1,1e5),this.contentGroup=new l,this.scene.add(this.contentGroup),this.controls=new g(this.camera,t.domElement),this.controls.enableDamping=!1,this.controls.screenSpacePanning=!0,this.renderFrame=()=>{this.renderer&&this.scene&&this.camera&&this.renderer.render(this.scene,this.camera)},this.controls.addEventListener(`change`,this.renderFrame),this.handleResize=()=>{this.sizeToCanvas(),this.renderFrame()},window.addEventListener(`resize`,this.handleResize),this.sizeToCanvas(),this.renderFrame(),this.available=!0,!0}sizeToCanvas(){if(!this.canvas||!this.renderer||!this.camera)return;let e=Math.max(1,this.canvas.clientWidth||this.canvas.width||300),t=Math.max(1,this.canvas.clientHeight||this.canvas.height||300);this.renderer.setPixelRatio(Math.min(window.devicePixelRatio||1,2)),this.renderer.setSize(e,t,!1),this.camera.aspect=e/t,this.camera.updateProjectionMatrix()}update(e){if(!this.available||!this.contentGroup||!this.camera||!this.controls)return;for(;this.contentGroup.children.length>0;){let e=this.contentGroup.children[0];this.contentGroup.remove(e),H(e)}let t=e.doseGrid.bounds.maxZ-e.doseGrid.bounds.minZ;this.contentGroup.add(Ae(e.phantom)),this.contentGroup.add(je(e.beam.fieldSizeMM,t)),this.contentGroup.add(Me(e)),this.contentGroup.add(Ne(e));let{bounds:n}=e.doseGrid,r=new y((n.minX+n.maxX)/2,(n.minY+n.maxY)/2,(n.minZ+n.maxZ)/2),i=Math.max(n.maxX-n.minX,n.maxY-n.minY,t,1),a=i*1.8;this.initialTarget=r.clone(),this.initialCameraPosition=r.clone().add(new y(a,a*.6,-a)),this.camera.position.copy(this.initialCameraPosition),this.camera.near=Math.max(.1,i/1e3),this.camera.far=a*20,this.camera.updateProjectionMatrix(),this.controls.target.copy(this.initialTarget),this.controls.update(),this.sizeToCanvas(),this.renderFrame()}resetView(){this.available&&this.camera&&this.controls&&(this.camera.position.copy(this.initialCameraPosition),this.controls.target.copy(this.initialTarget),this.controls.update(),this.renderFrame())}dispose(){if(this.handleResize&&window.removeEventListener(`resize`,this.handleResize),this.controls&&(this.controls.removeEventListener(`change`,this.renderFrame),this.controls.dispose()),this.contentGroup)for(;this.contentGroup.children.length>0;){let e=this.contentGroup.children[0];this.contentGroup.remove(e),H(e)}this.renderer?.dispose(),this.available=!1,this.renderer=null,this.scene=null,this.camera=null,this.controls=null,this.contentGroup=null,this.canvas=null}},Fe=3e3,Ie=42,Le=document.querySelector(`#app`);Le.innerHTML=`
  <div class="app-shell">
    <header class="app-header">
      <p class="eyebrow">Research demonstrator</p>
      <h1>Electron Dose Lab</h1>
      <p class="tagline">Interactive Monte Carlo research demonstrator for electron beam dose deposition</p>
    </header>

    <p class="disclaimer" role="note">
      <span class="disclaimer-icon" aria-hidden="true">&#9888;&#65039;</span>
      <span>Research / education demonstrator &mdash; not for clinical use.
      Not a validated clinical dose engine.</span>
    </p>

    <main id="main-content">
      <section class="panel controls-panel" aria-label="Phantom and beam controls">
        <div class="panel-header">
          <h2>Phantom &amp; beam setup</h2>
        </div>
        <fieldset id="controls-fieldset" class="controls">
          <legend class="visually-hidden">Simulation controls</legend>
          <div class="control-group">
            <label for="phantom-select">Phantom</label>
            <select id="phantom-select">${E.map((e,t)=>`<option value="${t}">${e.name} (${e.shape})</option>`).join(``)}</select>
          </div>
          <div class="control-group">
            <label for="energy-input">Beam energy (MeV)</label>
            <input id="energy-input" type="number" inputmode="decimal" min="0.1" max="1000" step="0.1" value="${D.energy_MeV}" />
          </div>
          <div class="control-group">
            <label for="field-x-input">Field width (mm)</label>
            <input id="field-x-input" type="number" inputmode="numeric" min="1" max="500" step="1" value="${D.field_mm[0]}" />
          </div>
          <div class="control-group">
            <label for="field-y-input">Field height (mm)</label>
            <input id="field-y-input" type="number" inputmode="numeric" min="1" max="500" step="1" value="${D.field_mm[1]}" />
          </div>
          <div class="control-group">
            <label for="histories-input">Number of histories</label>
            <input id="histories-input" type="number" inputmode="numeric" min="10" max="200000" step="10" value="${Fe}" />
          </div>
          <div class="control-group">
            <label for="seed-input">RNG seed</label>
            <input id="seed-input" type="number" inputmode="numeric" min="0" step="1" value="${Ie}" />
          </div>
          <div class="control-group control-group-action">
            <button id="run-button" type="button">Run simulation</button>
          </div>
        </fieldset>

        <p id="status" class="status" role="status"></p>
      </section>

      <section class="panel results-panel" aria-label="Simulation results">
        <div class="panel-header">
          <h2>Visualizations</h2>
        </div>
        <div class="results">
          <div class="viz-card">
            <h3>Dose slice</h3>
            <div class="slice-controls">
              <div class="control-group">
                <label for="slice-axis-select">Plane</label>
                <select id="slice-axis-select">
                  <option value="z">x-y (transverse)</option>
                  <option value="y" selected>x-z</option>
                  <option value="x">y-z</option>
                </select>
              </div>
              <div class="control-group">
                <label for="slice-position-input">
                  Position (cm): <span id="slice-position-value"></span>
                </label>
                <input id="slice-position-input" type="range" min="0" max="1" step="1" value="0" />
              </div>
            </div>
            <canvas id="dose-slice-canvas" width="360" height="360"></canvas>
            <div class="dose-legend" aria-label="Relative dose colour scale, 0 to 100 percent">
              <span class="dose-legend-label" aria-hidden="true">0%</span>
              <div id="dose-legend-bar" class="dose-legend-bar" aria-hidden="true"></div>
              <span class="dose-legend-label" aria-hidden="true">100%</span>
            </div>
            <p class="viz-note">Relative dose (% of this slice's own maximum).</p>
          </div>
          <div class="viz-card">
            <h3>Depth-dose curve</h3>
            <canvas id="depth-dose-canvas" width="360" height="360"></canvas>
          </div>
          <div class="viz-card">
            <h3>Sampled particle paths (phantom outline, x vs. z)</h3>
            <canvas id="path-overlay-canvas" width="360" height="360"></canvas>
          </div>
          <div class="viz-card viz-card-3d">
            <div class="viz-card-header-row">
              <h3>Phantom &amp; dose (3D)</h3>
              <button id="reset-view-button" type="button" class="secondary-button">Reset view</button>
            </div>
            <canvas id="scene3d-canvas"></canvas>
            <p id="scene3d-fallback" class="viz-note" hidden>
              3D view unavailable: this browser could not create a WebGL context. The
              2D dose slice, depth-dose curve, and particle-path overlay above are
              unaffected.
            </p>
            <p class="viz-note">
              Drag (or touch-drag) to rotate, scroll/pinch to zoom. Translucent mesh:
              phantom outline. Teal rectangle/arrow: beam entry field and direction.
              Blue lines: sampled particle tracks. Colored points: dose above 5% of
              the run's peak, using the same colour scale as the 2D slice.
            </p>
          </div>
        </div>
      </section>

      <section id="stats-panel" class="panel stats-panel" aria-label="Summary statistics"></section>

      <section
        id="sanity-check-panel"
        class="panel sanity-check-panel"
        aria-label="Physics sanity check"
      ></section>
    </main>
  </div>
`;var U=document.querySelector(`#controls-fieldset`),Re=document.querySelector(`#phantom-select`),ze=document.querySelector(`#energy-input`),Be=document.querySelector(`#field-x-input`),Ve=document.querySelector(`#field-y-input`),He=document.querySelector(`#histories-input`),Ue=document.querySelector(`#seed-input`),W=document.querySelector(`#run-button`),G=document.querySelector(`#status`),We=document.querySelector(`#stats-panel`),Ge=document.querySelector(`#sanity-check-panel`),Ke=document.querySelector(`#dose-slice-canvas`),qe=document.querySelector(`#depth-dose-canvas`),Je=document.querySelector(`#path-overlay-canvas`),K=document.querySelector(`#slice-axis-select`),q=document.querySelector(`#slice-position-input`),Ye=document.querySelector(`#slice-position-value`),Xe=document.querySelector(`#dose-legend-bar`),J=document.querySelector(`#scene3d-canvas`),Ze=document.querySelector(`#scene3d-fallback`),Qe=document.querySelector(`#reset-view-button`);function $e(e){let t=[];for(let e=0;e<=20;e++){let n=e/20,[r,i,a]=V(n);t.push(`rgb(${r}, ${i}, ${a}) ${(n*100).toFixed(0)}%`)}e.style.backgroundImage=`linear-gradient(to right, ${t.join(`, `)})`}function et(e,t){let{dims:n}=e.doseGrid;return t===`z`?n.nz:t===`y`?n.ny:n.nx}function tt(e,t,n,r){let i=e.getContext(`2d`),a=we(t.doseGrid,n,r);i.clearRect(0,0,e.width,e.height);let o=e.width/a.nu,s=e.height/a.nv;for(let e=0;e<a.nv;e++)for(let t=0;t<a.nu;t++){let n=a.values[t+a.nu*e],[r,c,l]=V(a.maxValue>0?n/a.maxValue:0);i.fillStyle=`rgb(${r}, ${c}, ${l})`,i.fillRect(t*o,e*s,o+1,s+1)}let c=Oe(t.phantom,n,a.positionMM);if(c){let t={minX:a.minU*10,maxX:a.maxU*10,minZ:a.minV*10,maxZ:a.maxV*10};i.strokeStyle=`rgba(159, 179, 200, 0.8)`,i.lineWidth=1.5,i.beginPath(),c.forEach((n,r)=>{let a=z(n,t,e.width,e.height);r===0?i.moveTo(a.x,a.y):i.lineTo(a.x,a.y)}),i.stroke()}return a}function Y(e,t){let n=K.value,r=Math.max(0,et(e,n)-1);(t||Number(q.max)!==r)&&(q.min=`0`,q.max=String(r),q.value=String(Math.floor(r/2))),Ye.textContent=`${(tt(Ke,e,n,Number(q.value)).positionMM/10).toFixed(1)} cm`}function nt(e,t){let n=e.getContext(`2d`);n.clearRect(0,0,e.width,e.height);let r=e.width-60,i=e.height-60,a=Ee(t.depthDose),o=t.doseGrid.bounds.maxZ;n.strokeStyle=`#3a4b5c`,n.lineWidth=1,n.strokeRect(30,30,r,i),n.strokeStyle=`#4fd1c5`,n.lineWidth=2,n.beginPath(),a.forEach((e,t)=>{let a=30+e.depthMM/o*r,s=30+i-e.percent/100*i;t===0?n.moveTo(a,s):n.lineTo(a,s)}),n.stroke(),n.fillStyle=`#9fb3c8`,n.font=`11px sans-serif`,n.fillText(`0%`,4,30+i),n.fillText(`100%`,4,34),n.fillText(`depth (mm) →`,30,e.height-6)}function rt(e,t){let n=e.getContext(`2d`);n.clearRect(0,0,e.width,e.height);let r=Te(t.doseGrid.bounds,.08),i=De(t.phantom);n.strokeStyle=`#9fb3c8`,n.lineWidth=1.5,n.beginPath(),i.forEach((t,i)=>{let a=z(t,r,e.width,e.height);i===0?n.moveTo(a.x,a.y):n.lineTo(a.x,a.y)}),n.stroke(),n.strokeStyle=`rgba(96, 165, 250, 0.6)`,n.lineWidth=1;for(let i of t.sampledPaths)n.beginPath(),i.points.forEach((t,i)=>{let a=z(t,r,e.width,e.height);i===0?n.moveTo(a.x,a.y):n.lineTo(a.x,a.y)}),n.stroke()}function it(e){let{stats:t}=e;We.innerHTML=`
    <div class="panel-header">
      <h2>Summary statistics</h2>
    </div>
    <ul>
      <li>Histories simulated: ${t.historiesSimulated}</li>
      <li>Mean simulated range: ${t.meanRangeMM.toFixed(2)} mm</li>
      <li>Total energy deposited: ${t.totalEnergyDepositedMeV.toFixed(2)} MeV</li>
      <li>Mean energy deposited per history: ${t.meanEnergyDepositedPerHistoryMeV.toFixed(4)} MeV</li>
      <li>Max energy deposited by a single history: ${t.maxHistoryEnergyDepositedMeV.toFixed(4)} MeV</li>
    </ul>
  `}function at(e){let t=C(e.phantom),n=M[t],r=Ce(t,n,e.beam.energyMeV,e.stats.meanRangeMM),i=r.passed?`sanity-pass`:`sanity-fail`,a=r.passed?`PLAUSIBLE`:`IMPLAUSIBLE`,o=r.percentDifference>=0?`+`:``;return Ge.innerHTML=`
    <div class="panel-header">
      <h2>Physics sanity check: simulated range vs. NIST ESTAR CSDA range</h2>
    </div>
    <p class="sanity-check-note">
      Compares the engine's simulated mean electron penetration depth against
      the independent NIST ESTAR tabulated CSDA range for ${t.replace(/_/g,` `)}
      at ${r.beamEnergyMeV} MeV, converted to mm at ${n} g/cm&sup3;.
      Agreement within a factor of ${r.toleranceRatio} is expected for this
      simplified single-scattering-parameter transport model (scattering makes
      the simulated projected range shorter than the straight-line CSDA range).
    </p>
    <ul>
      <li>Simulated mean range: <span data-testid="sanity-simulated-range">${r.simulatedRangeMM.toFixed(2)} mm</span></li>
      <li>ESTAR CSDA reference range: <span data-testid="sanity-reference-range">${r.referenceCsdaRangeMM.toFixed(2)} mm</span></li>
      <li>Difference: <span data-testid="sanity-percent-difference">${o}${r.percentDifference.toFixed(1)}%</span></li>
      <li>
        Verdict:
        <span class="${i}" data-testid="sanity-verdict">${a}</span>
      </li>
    </ul>
  `,r}function ot(){return E[Number(Re.value)]}var X=null,Z=new Pe,Q=Z.init(J);Q||(J.hidden=!0,Ze.hidden=!1),$e(Xe),K.addEventListener(`change`,()=>{X&&Y(X,!0)}),q.addEventListener(`input`,()=>{X&&Y(X,!1)}),Qe.addEventListener(`click`,()=>{Z.resetView()});function $(){let e=ot(),t=Number(ze.value),n=[Number(Be.value),Number(Ve.value)],r=Math.max(1,Math.trunc(Number(He.value))),i=Math.trunc(Number(Ue.value));if(!Number.isFinite(t)||t<=0){G.textContent=`Beam energy must be a positive number.`;return}if(n.some(e=>!Number.isFinite(e)||e<=0)){G.textContent=`Field width/height must be positive numbers.`;return}if(!Number.isFinite(i)){G.textContent=`RNG seed must be a number.`;return}G.textContent=`Running ${r} histories...`,G.classList.add(`is-running`),W.disabled=!0,U.disabled=!0,setTimeout(()=>{let a=xe(e,{energyMeV:t,fieldSizeMM:n},r,i),o=X===null;X=a,Y(a,o),nt(qe,a),rt(Je,a),it(a),at(a),Q&&Z.update(a),G.textContent=`Done: ${r} histories, seed ${i}, phantom "${e.name}".`,G.classList.remove(`is-running`),W.disabled=!1,U.disabled=!1},0)}W.addEventListener(`click`,$),$(),`serviceWorker`in navigator&&window.addEventListener(`load`,()=>{navigator.serviceWorker.register(`./sw.js`).catch(()=>{})});