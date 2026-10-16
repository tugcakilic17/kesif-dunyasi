export const TREE_WIND_FRAGMENT_SHADER = `
#ifdef GL_FRAGMENT_PRECISION_HIGH
precision highp float;
#else
precision mediump float;
#endif

varying vec2 outTexCoord;
uniform sampler2D uTreeLeaves;
uniform float uTime;

float softEllipse(vec2 uv, vec2 center, vec2 radius) {
  float distanceFromCenter = length((uv - center) / radius);
  return 1.0 - smoothstep(0.68, 1.0, distanceFromCenter);
}

void main() {
  vec2 uv = outTexCoord;
  vec2 maskUv = vec2(uv.x, 1.0 - uv.y);
  float windTime = uTime * 1.08;

  float leftOuter = softEllipse(maskUv, vec2(0.055, 0.15), vec2(0.15, 0.22));
  float leftMiddle = softEllipse(maskUv, vec2(0.19, 0.105), vec2(0.16, 0.19));
  float leftInner = softEllipse(maskUv, vec2(0.35, 0.075), vec2(0.14, 0.15));
  float rightInner = softEllipse(maskUv, vec2(0.65, 0.075), vec2(0.14, 0.15));
  float rightMiddle = softEllipse(maskUv, vec2(0.81, 0.105), vec2(0.16, 0.19));
  float rightOuter = softEllipse(maskUv, vec2(0.945, 0.15), vec2(0.15, 0.22));

  float leftMask = max(leftOuter, max(leftMiddle, leftInner));
  float rightMask = max(rightOuter, max(rightMiddle, rightInner));
  float canopyMask = max(leftMask, rightMask);

  float leftWeight = leftOuter + leftMiddle + leftInner + 0.001;
  float rightWeight = rightOuter + rightMiddle + rightInner + 0.001;
  float leftResponse =
    (sin(windTime * 0.67 + 0.15) * leftOuter +
     sin(windTime * 0.54 + 0.72) * leftMiddle +
     sin(windTime * 0.46 + 1.31) * leftInner) / leftWeight;
  float rightResponse =
    (sin(windTime * 0.48 + 1.74) * rightInner +
     sin(windTime * 0.57 + 1.08) * rightMiddle +
     sin(windTime * 0.64 + 0.42) * rightOuter) / rightWeight;

  float globalWind =
    sin(windTime * 0.36) * 0.65 +
    sin(windTime * 0.15 + 1.7) * 0.24 +
    sin(windTime * 0.83 + 0.4) * 0.11;
  float gust = pow(max(0.0, sin(windTime * 0.11 - 0.8)), 8.0);

  float hangingFlex = smoothstep(0.035, 0.30, maskUv.y) *
    (1.0 - smoothstep(0.38, 0.52, maskUv.y));
  float localResponse = leftResponse * leftMask + rightResponse * rightMask;
  float outerMask = max(leftOuter, rightOuter);
  float middleMask = max(leftMiddle, rightMiddle);
  float innerMask = max(leftInner, rightInner);
  float motionStrength = max(
    outerMask * 1.15,
    max(middleMask * 0.9, innerMask * 0.65)
  );
  float fineFlutter =
    sin(uv.x * 29.0 + uv.y * 19.0 + windTime * 2.0) *
    outerMask * 0.0012;

  float horizontalOffset =
    ((globalWind * 0.009 + gust * 0.0045) * motionStrength +
     localResponse * 0.003 * canopyMask) * hangingFlex + fineFlutter;
  float verticalOffset =
    cos(windTime * 0.43 + uv.x * 8.0) * 0.0018 * canopyMask * hangingFlex;

  vec2 sampleUv = clamp(
    uv - vec2(horizontalOffset, verticalOffset),
    vec2(0.0),
    vec2(1.0)
  );
  gl_FragColor = texture2D(uTreeLeaves, sampleUv);
}
`

export const FOREGROUND_WIND_FRAGMENT_SHADER = `
#ifdef GL_FRAGMENT_PRECISION_HIGH
precision highp float;
#else
precision mediump float;
#endif

varying vec2 outTexCoord;
uniform sampler2D uForegroundLeaves;
uniform float uTime;

float softEllipse(vec2 uv, vec2 center, vec2 radius) {
  float distanceFromCenter = length((uv - center) / radius);
  return 1.0 - smoothstep(0.68, 1.0, distanceFromCenter);
}

void main() {
  vec2 uv = outTexCoord;
  vec2 maskUv = vec2(uv.x, 1.0 - uv.y);
  float windTime = uTime * 1.22;

  float leftOuter = softEllipse(maskUv, vec2(0.075, 0.82), vec2(0.17, 0.22));
  float leftMiddle = softEllipse(maskUv, vec2(0.23, 0.875), vec2(0.19, 0.19));
  float leftInner = softEllipse(maskUv, vec2(0.385, 0.835), vec2(0.135, 0.19));
  float rightInner = softEllipse(maskUv, vec2(0.625, 0.835), vec2(0.135, 0.19));
  float rightMiddle = softEllipse(maskUv, vec2(0.78, 0.875), vec2(0.19, 0.19));
  float rightOuter = softEllipse(maskUv, vec2(0.935, 0.82), vec2(0.17, 0.22));

  float leftMask = max(leftOuter, max(leftMiddle, leftInner));
  float rightMask = max(rightOuter, max(rightMiddle, rightInner));
  float canopyMask = max(leftMask, rightMask);

  float leftWeight = leftOuter + leftMiddle + leftInner + 0.001;
  float rightWeight = rightOuter + rightMiddle + rightInner + 0.001;
  float leftResponse =
    (leftOuter * sin(windTime * 0.63 + 0.1) +
     leftMiddle * sin(windTime * 0.57 + 0.58) +
     leftInner * sin(windTime * 0.51 + 0.96)) / leftWeight;
  float rightResponse =
    (rightInner * sin(windTime * 0.49 + 1.42) +
     rightMiddle * sin(windTime * 0.55 + 1.02) +
     rightOuter * sin(windTime * 0.67 + 0.54)) / rightWeight;

  float globalWind =
    sin(windTime * 0.39) * 0.62 +
    sin(windTime * 0.17 + 1.9) * 0.25 +
    sin(windTime * 0.91 + 0.35) * 0.13;
  float gust = pow(max(0.0, sin(windTime * 0.12 - 0.7)), 8.0);

  float localResponse = leftResponse * leftMask + rightResponse * rightMask;
  float hangingLeafFade = smoothstep(0.64, 0.73, maskUv.y);
  float leftAttachment = softEllipse(maskUv, vec2(0.015, 0.94), vec2(0.09, 0.12));
  float rightAttachment = softEllipse(maskUv, vec2(0.985, 0.94), vec2(0.09, 0.12));
  float attachmentFlex = 1.0 - max(leftAttachment, rightAttachment) * 0.82;

  float outerFlutterMask = max(leftOuter, rightOuter);
  float middleMask = max(leftMiddle, rightMiddle);
  float innerMask = max(leftInner, rightInner);
  float motionStrength = max(
    outerFlutterMask * 1.2,
    max(middleMask * 0.92, innerMask * 0.62)
  );
  float fineFlutter =
    sin(uv.x * 31.0 + uv.y * 17.0 + windTime * 2.15) *
    outerFlutterMask * 0.0012;

  float horizontalOffset =
    ((globalWind * 0.0105 + gust * 0.005) * motionStrength +
     localResponse * 0.004 * canopyMask) *
    hangingLeafFade * attachmentFlex + fineFlutter;

  vec2 sampleUv = vec2(clamp(uv.x - horizontalOffset, 0.0, 1.0), uv.y);
  gl_FragColor = texture2D(uForegroundLeaves, sampleUv);
}
`
