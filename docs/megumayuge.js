var gl;
var points;

var program;

var flowerColor = getColors(1, 0.5, 1, 1, 61);

window.onload = function init()
{
    var canvas = document.getElementById("gl-canvas");
    
    gl = WebGLUtils.setupWebGL(canvas);
    if (!gl) {alert("WebGL isn't available");}

    //  Configure WebGL
    gl.viewport(0, 0, canvas.width, canvas.height);
    gl.clearColor(1.0, 1.0, 1.0, 1.0);
    
    //  Load shaders and initialize attribute buffers
    program = initShaders(gl, "vertex-shader", "fragment-shader" );
    gl.useProgram(program);
	
    gl.clear(gl.COLOR_BUFFER_BIT);
	
	var mayugeColor = colorBuff(gl, getColors(253/255, 230/255, 154/255, 1, 62));
	
	var leftHair = positionBuff(gl, oval(-1, 1, 1.6, 0.7, 270, 360));
	
	enableColorBuff(gl, program, mayugeColor, "vColor");
	render(enablePositionBuff(gl, program, leftHair, "vPosition"), gl.TRIANGLE_FAN, 0, 62);
	
	var rightHair = positionBuff(gl, oval(1, 1, 0.6, 0.6, 180, 270));
	
	render(enablePositionBuff(gl, program, rightHair, "vPosition"), gl.TRIANGLE_FAN, 0, 62);
	
	var leftMatuge = positionBuff(gl, oval(-0.5, -0.2, 0.3, 0.3, 30, 150, false, [-0.5, -0.05]));
	
	render(enablePositionBuff(gl, program, leftMatuge, "vPosition"), gl.TRIANGLE_FAN, 0, 62);
	
	var rightMatuge = positionBuff(gl, oval(0.5, -0.2, 0.3, 0.3, 30, 150, false, [0.5, -0.05]));
	
	render(enablePositionBuff(gl, program, rightMatuge, "vPosition"), gl.TRIANGLE_FAN, 0, 62);
	
	var faqiaColor = colorBuff(gl, getColors(1, 0.5, 0, 1, 62));
	
	var faqia = positionBuff(gl, oval(-1, 1, 1.6, 0.7, 292, 296, false, [-0.48, 0.58, -0.37, 0.62, -0.29, 0.375]));
	
	enableColorBuff(gl, program, faqiaColor, "vColor");
	render(enablePositionBuff(gl, program, faqia, "vPosition"), gl.TRIANGLE_FAN, 0, 62);
	
	var flowerColor = colorBuff(gl, getColors(251/255, 213/255, 223/255, 1, 184, [1, 1, 1, 1]));
	
	var flower = positionBuff(gl, oval(-0.5, 0.75, 0.1, 0.1, 210, 10, false,
		oval(-0.58, 0.61, 0.09, 0.09, 260, 100, false,
		oval(-0.48, 0.53, 0.09, 0.09, 340, 190, false, [-0.45, 0.65]))));
		
	var flower2 = positionBuff(gl, oval(-0.37, 0.58, 0.09, 0.09, 400, 250, false,
		oval(-0.36, 0.71, 0.09, 0.09, 500, 340, false, [-0.45, 0.65])));
	
	enableColorBuff(gl, program, flowerColor, "vColor");
	render(enablePositionBuff(gl, program, flower, "vPosition"), gl.TRIANGLE_FAN, 0, 184);
	
	render(enablePositionBuff(gl, program, flower2, "vPosition"), gl.TRIANGLE_FAN, 0, 123);
	
	var innerFlower = positionBuff(gl, oval(-0.46, 0.63, 0.03, 0.03, 0, 360, true));
	
	enableColorBuff(gl, program, mayugeColor, "vColor");
	render(enablePositionBuff(gl, program, innerFlower, "vPosition"), gl.TRIANGLE_FAN, 0, 62);
}


function render(vPosition, func, ps, pe) {
	//gl.enableVertexAttribArray(vColor);
	//gl.enableVertexAttribArray(vPosition);
	gl.drawArrays(func, ps, pe);
}