import {
    createShader,
    createProgram,
    baseVertexShader,
    baseFragmentShader,
    getTargetLocation,
    createBuffer,
    baseTextCoordBuffer,
    basePositionBuffer,
    loadImg,
    resizeCanvasToDisplaySize,
    getWebGl
} from '../util/webgl-util';

export class BsrGm {
    constructor(canvas) {
        this.canvas = canvas;

        let gl = getWebGl(this.canvas);
        let vertexSd = createShader(gl, 'vertex', baseVertexShader());
        let fragmentSd = createShader(gl, 'fragment', baseFragmentShader());

        let program = createProgram(gl, vertexSd, fragmentSd);
        var positionLocation = gl.getAttribLocation(program, "a_position");
        var texcoordLocation = gl.getAttribLocation(program, "a_texCoord");


        let positionBuffer = createBuffer(gl, basePositionBuffer());
        let texcoordBuffer = createBuffer(gl, baseTextCoordBuffer()); 


        loadImg('http://localhost:3000/logo512.png').then((image) => {
            canvas.width = image.width;
            canvas.height = image.height;
            var texture = gl.createTexture();
            gl.bindTexture(gl.TEXTURE_2D, texture);
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
            gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, image);


            var resolutionLocation = gl.getUniformLocation(program, "u_resolution");

            resizeCanvasToDisplaySize(gl.canvas);
            gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);
            gl.clearColor(0, 0, 0, 0);
            gl.clear(gl.COLOR_BUFFER_BIT);


            gl.useProgram(program);


            // Turn on the position attribute
            gl.enableVertexAttribArray(positionLocation);
            gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
            var size = 2;          // 2 components per iteration
            var type = gl.FLOAT;   // the data is 32bit floats
            var normalize = false; // don't normalize the data
            var stride = 0;        // 0 = move forward size * sizeof(type) each iteration to get the next position
            var offset = 0;        // start at the beginning of the buffer
            gl.vertexAttribPointer(positionLocation, size, type, normalize, stride, offset);




            gl.enableVertexAttribArray(texcoordLocation);
            gl.bindBuffer(gl.ARRAY_BUFFER, texcoordBuffer);
            var size = 2;          // 2 components per iteration
            var type = gl.FLOAT;   // the data is 32bit floats
            var normalize = false; // don't normalize the data
            var stride = 0;        // 0 = move forward size * sizeof(type) each iteration to get the next position
            var offset = 0;        // start at the beginning of the buffer
            gl.vertexAttribPointer(texcoordLocation, size, type, normalize, stride, offset);

            gl.uniform2f(resolutionLocation, gl.canvas.width, gl.canvas.height);

            // Draw the rectangle.
            var primitiveType = gl.TRIANGLES;
            var offset = 0;
            var count = 6;
            gl.drawArrays(primitiveType, offset, count);
        });
        
    }
}