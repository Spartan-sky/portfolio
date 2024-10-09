varying vec2 vUv;

void main() {
    vUv = uv;

    vec4 modelPos = modelMatrix * vec4(position, 1.);
    vec4 viewPos = viewMatrix * modelPos;
    vec4 projectedPos = projectionMatrix * viewPos;

    gl_Position = projectedPos;
}