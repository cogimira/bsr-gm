// 创建一个shader
/**
 * var vertexShader = createShader(gl, gl.VERTEX_SHADER, vertexShaderSource);
var fragmentShader = createShader(gl, gl.FRAGMENT_SHADER, fragmentShaderSource);
*/
export function createShader(gl, type, source) {
    let shader;
    if(type === "vertex") {
        shader = gl.createShader(gl.VERTEX_SHADER);
    }
    if(type === "fragment") {
        shader = gl.createShader(gl.FRAGMENT_SHADER);
    }
    gl.shaderSource(shader, source);
    gl.compileShader(shader);
    var success = gl.getShaderParameter(shader, gl.COMPILE_STATUS);
    if (success) {
        return shader;
    }
    console.log(gl.getShaderInfoLog(shader));
    gl.deleteShader(shader);
}

/**
 * var program = createProgram(gl, vertexShader, fragmentShader);
 */
export function createProgram(gl, vertexShader, fragmentShader) {
    var program = gl.createProgram();
    gl.attachShader(program, vertexShader);
    gl.attachShader(program, fragmentShader);
    gl.linkProgram(program);
    var success = gl.getProgramParameter(program, gl.LINK_STATUS);
    if (success) {
        return program;
    }

    console.log(gl.getProgramInfoLog(program));
    gl.deleteProgram(program);
}

export function baseVertexShader() {

return `attribute vec2 a_position;
    attribute vec2 a_texCoord;
    uniform vec2 u_resolution;
    varying vec2 v_texCoord;

    void main() {
    //    vec2 zeroToOne = a_position / u_resolution;
       gl_Position = vec4(a_position, 0, 1);
       v_texCoord = a_texCoord;
    }`
}

export function baseFragmentShader() {
    return `
    precision mediump float;

    // our texture
    uniform sampler2D u_image;
    
    // the texCoords passed in from the vertex shader.
    varying vec2 v_texCoord;
    
    void main() {
       gl_FragColor = texture2D(u_image, v_texCoord).rggg;
    }`
}

export function createBuffer(gl, buffer) {
    var targetBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, targetBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(buffer), gl.STATIC_DRAW);
    return targetBuffer;
}

export function baseTextCoordBuffer() {
    return new Float32Array([
              0.0,  0.0,
              1.0,  0.0,
              0.0,  1.0,
              0.0,  1.0,
              1.0,  0.0,
              1.0,  1.0,
          ]);
}

export function basePositionBuffer() {
    var x1 = -1.0;
    var x2 = 1.0;
    var y1 = 1.0;
    var y2 = -1.0;
    // gl.bufferData(gl.ARRAY_BUFFER, ), gl.STATIC_DRAW);
    return new Float32Array([
        x1, y1,
        x2, y1,
        x1, y2,
        x1, y2,
        x2, y1,
        x2, y2,
    ]);
}

export function resizeCanvasToDisplaySize(canvas, multiplier) {
    multiplier = multiplier || 1;
    const width  = canvas.clientWidth  * multiplier | 0;
    const height = canvas.clientHeight * multiplier | 0;
    if (canvas.width !== width ||  canvas.height !== height) {
      canvas.width  = width;
      canvas.height = height;
      return true;
    }
    return false;
  }



/**
 * testSrc = "https://webglfundamentals.org/webgl/resources/leaves.jpg"
 * loadImg('https://webglfundamentals.org/webgl/resources/leaves.jpg')
*/
export function loadImg(src) {
    return new Promise((resolve, reject) => {
        var image = new Image();

        image.src = src;
        image.crossOrigin="anonymous"
        image.onload = function() {
            resolve(image);
        };
    });
}




export function getWebGl(canvas) {
    var gl = canvas.getContext("webgl");
    if (!gl) {
        return;
    } else {
        return gl;
    }
}

export function getTargetLocation(gl, program, locations) {
    let returnMap = new Map();
    let locationsData = [];
    for(let i = 0; i < locations[i]; i++) {
        let location = gl.getAttribLocation(program, locations[i]);
        locationsData.push(locations[i]);
        returnMap.set(locations[i], location);
    }
    return {
        locations: locationsData,
        locationmap: returnMap
    }
}