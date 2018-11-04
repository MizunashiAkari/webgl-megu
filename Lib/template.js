var gl;
var points;

var program;

window.onload = function init()
{
    var canvas = document.getElementById("gl-canvas");
    
    gl = WebGLUtils.setupWebGL(canvas);
    if (!gl) {alert("WebGL isn't available");}

    //  Configure WebGL
    gl.viewport(0, 0, canvas.width, canvas.height);
    gl.clearColor(1.0, 1.0, 1.0, 1.0);
    
    //  Load shaders and initialize attribute buffers
    program = initShaders(gl, "vertex-shader", "fragment-shader");
    gl.useProgram(program);
	
    gl.clear(gl.COLOR_BUFFER_BIT);
}


function render(vColor, vPosition, func, ps, pe) {
	gl.enableVertexAttribArray(vColor);
	gl.enableVertexAttribArray(vPosition);
	gl.drawArrays(func, ps, pe);
}