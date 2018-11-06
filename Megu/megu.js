var gl;
var points;

var program;

function addAction(name, show = name) {
	var act = document.getElementById("actions");
	act.innerHTML += "<input type='radio' value='" + name + "' name='action' id='" + name + "'/><div onclick=document.getElementById('" + name + "').click()><label for='" + name + "'>" + show + "</label></div><br />";
}

//Defination of color
var black = getColors(0, 0, 0, 1, 1024);
var white = getColors(1, 1, 1, 1, 1024);
var line = getColors(203/255, 167/255, 133/255, 1, 1024);

var hairColor = getColors(253/255, 230/255, 154/255, 1, 123);
var faceColor = getColors(251/255, 239/255, 217/255, 1, 122);
var backColor = getColors(1, 184/255, 102/255, 1, 122);
var clothesBColor = getColors(0.6, 0.6, 0.8, 1, 122);

var mimiColor = getColors(230/255, 120/255, 120/255, 1, 122);

var faceDColor = getColors(251/255, 229/255, 205/255, 1, 62);
var faceUColor = getColors(251/255, 217/255, 200/255, 1, 62);

var eyeColor = getColors(48/255, 152/255, 154/255, 1, 61, [174/255, 246/255, 209/255, 1]);

var hairClipColor = getColors(1, 184/255, 66/255, 1, 63);
var flowerColor = getColors(251/255, 213/255, 223/255, 1, 155, [1, 1, 1, 1]);
var flowerCoreColor = getColors(1, 229/255, 194/255, 1, 61, [1, 184/255, 120/255, 1]);

//defination of points
var backHair = union(rotate(getPoints(function(x){return (6 * x) ** 3 + 2 * x;}, -0.57, -0.3, -0.12, 0.1, false), -5, -0.57, -0.3, false, 1), rotate(getPoints(function(x){return (-6 * x) ** 3 + (-2) * x;}, 0.57, -0.3, 0.12, -0.1, false), 5, 0.57, -0.3, false, 1));

var clothesB = unionOval(0.002, -0.567, 0.57, 0.28, -30, 16, -0.002, -0.567, 0.57, 0.28, 164, 210);

var clothesBack = union(getPoints(function(x){return ((3 * x) ** 3);}, -0.42, -0.462, 0, -0.3, false), getPoints(function(x){return -((3 * x) ** 3);}, 0.42, -0.462, 0, 0.3, false));

var clothesLineB = [0.54, -0.395, -0.54, -0.395];

var maeHairC = oval(-0.04, 0.07, 0.53, 0.7, 30, 150, false, [0.33, 0.45]);
	
var neck = union(rotate(getPoints(function(x){return (9 * x) ** 10}, -0.18, -0.43, 0, 0.1, false), 10, -0.18, -0.43), rotate(getPoints(function(x){return (9 * x) ** 10;}, 0.18, -0.43, 0, -0.1, false), -10, 0.18, -0.43));

var neckIn = oval(0, -0.43, 0.4, 0.17, 180, 360, true);

var neckShade = union(rotate(getPoints(function(x){return (9 * x) ** 10}, -0.18, -0.43, 0.09, 0.1, false, oval(0.06, 0.055, 0.4, 0.4, 258, 245, false)), 10, -0.18, -0.43, false, 61, 0), rotate(getPoints(function(x){return (9 * x) ** 10;}, 0.18, -0.43, -0.09, -0.1, false, oval(-0.06, 0.055, 0.4, 0.4, 278, 295, false)), -10, 0.18, -0.43, false, 61, 0));

var neckLineL = oval(-0.15, -0.63, 0.12, 0.1, 50, 100, false);
var neckLineR = oval(0.15, -0.63, 0.12, 0.1, 130, 80, false);


var faceDR = rotate(oval(-0.06, 0.07, 0.4, 0.4, 280, 340, true), -2);
var faceDL = rotate(oval(0.06, 0.07, 0.4, 0.4, 200, 260, true), 2);
var faceU = [-0.3, -0.09, 0.3, -0.09, 0.34, 0.55, -0.35, 0.55];

var faceDUL = rotate(oval(-0.19, -0.07, 0.1, 0.06), 5, -0.19, -0.07);
var faceDUR = rotate(oval(0.19, -0.07, 0.1, 0.06), -4, 0.19, -0.07);
var faceUUL = rotate(oval(-0.19, -0.07, 0.08, 0.04), 5, -0.19, -0.07);
var faceUUR = rotate(oval(0.19, -0.07, 0.08, 0.04), -4, 0.19, -0.07);

var clothesFrontUL = union(oval(0, -0.48, 0.15, 0.20, 25, 10, false), getPoints(function(x){return -((x / 1.2) ** 2)}, 0.17, -0.4, 0, 0.38));
var clothesFrontUR = union(oval(0, -0.48, 0.15, 0.20, 155, 170, false), getPoints(function(x){return -((x / 1.2) ** 2)}, -0.17, -0.4, 0, -0.38));

var clothesFrontDL = unionOval(0, -0.48, 0.15, 0.20, 10, -90, 0, -0.4, 0.58, 0.30, -18, -90);
var clothesFrontDR = unionOval(0, -0.48, 0.15, 0.20, 170, 270, 0, -0.4, 0.58, 0.30, 198, 270);

var usamimiL = unionOval(0, -0.97, 0.12, 0.24, 110, 270, 0, -0.97, 0.12, 0.24, 430, 270);
var usamimiIL = oval(0, -0.96, 0.08, 0.16);
var usamimiR = rotate(usamimiL, 30, 0, -0.73, true);
var usamimiIR = rotate(usamimiIL, 30, 0, -0.73, true);
usamimiL = rotate(usamimiL, -30, 0, -0.73);
usamimiIL = rotate(usamimiIL, -30, 0, -0.73);

var clothesD = oval(0, -0.72, 0.08, 0.04, 0, 360, false);

//var clothesLineF = oval(0, -0.4, 0.54, 0.35, 180, 360, false);

var faceLineDR = rotate(oval(-0.06, 0.07, 0.40, 0.40, 280, 340, false), -2);
var faceLineDL = rotate(oval(0.06, 0.07, 0.40, 0.40, 200, 260, false), 2);

var maeHairUR = oval(0.03, 0.05, 0.53, 0.7, 0, 110, false, [0.34, 0.45]);
var maeHairUL = oval(-0.04, 0.07, 0.53, 0.7, 70, 180, false, [-0.35, 0.45]);

var maeHairDR = unionOval(0.03, 0.18, 0.57, 0.45, -27, 60, 0.62, 0.2, 0.32, 0.9, 210, 160);
rotate(maeHairDR, -30, 0.03, 0.18, false, 0, 0, 4);
rotate(maeHairDR, -6, 0.03, 0.18, false, 1, 0, 4);
var maeHairDL = unionOval(-0.04, 0.18, 0.57, 0.45, 120, 210, -0.6, 0.2, 0.3, 0.9, 20, -30);
rotate(maeHairDL, 30, -0.04, 0.18, false, 0, 0, 4);
rotate(maeHairDL, 7, 0.03, 0.18, false, 1, 0, 4);

var shitaHairL = rotate(oval(-0.01, -0.36, 0.32, 0.2, 151, 200, false, 
	oval(-0.06, -0.31, 0.38, 0.18, 240, 130, false, [-0.44, -0.31])), -12, -0.44, -0.31);
var shitaHairR = rotate(oval(0.037, -0.36, 0.32, 0.2, 393, 340, false, 
	oval(0.067, -0.31, 0.38, 0.18, 300, 410, false, [0.447, -0.31])), 12, 0.447, -0.31);

var maeHairUDL = [0.2, 0.6, -0.36, 0.6, -0.36, 0.27];
var maeHairUDR = [0.1, 0.6, 0.35, 0.6, 0.35, 0.2];

var mayugeL = rotate(oval(-0.17, 0.21, 0.1, 0.11, 30, 150, false, [-0.17, 0.26]), 8, -0.17, 0.26);
var mayugeR = rotate(oval(0.14, 0.22, 0.1, 0.11, 30, 150, false, [0.14, 0.27]), -5, 0.14, 0.27);

var hairClip = oval(-0.28, 0.43, 0.11, 0.11, -40, -55, false, [-0.30, 0.41, -0.27, 0.44]);

var flower = move(zoom(rotate(oval(0, 0.07, 0.05, 0.05, 0, 183, false, 
	rotate(oval(0, 0.07, 0.05, 0.05, 0, 180, false,
	rotate(oval(0, 0.07, 0.05, 0.05, 0, 180, false, 
	rotate(oval(0, 0.07, 0.05, 0.05, 0, 180, false,
	rotate(oval(0, 0.07, 0.05, 0.05, 0, 180, false,
	[0, 0], 30), -72), 30), -72), 30), -72), 30), -72), 30), 40), 0.75, 0.75), -0.28, 0.43);

var flowerCore = oval(-0.28, 0.43, 0.02, 0.02);

var eyel = oval(0, 0, 0.105, 0.095);// 0.07);
for(var i = 0; i < 124; i += 2) {
	if(eyel[i]>0)
		eyel[i]/=1.8;
	if(eyel[i + 1]<0)
		eyel[i + 1]/=1.2;
}
var eyer = move(rotate(zoom(eyel, -1, 1, 0, 0, true), -8), 0.15, 0.085); 
eyel = move(rotate(eyel, 5), -0.16, 0.085);

var eyeballl = oval(0, 0, 0.058, 0.088, -90, 270, false, [0, -0.05]);
for(var i = 0; i < 124; i += 2) {
	if(eyeballl[i + 1]<0)
		eyeballl[i + 1]/=1.4;
}
var eyeballr = move(rotate(zoom(eyeballl, -1, 1, 0, 0, true), -5), 0.155, 0.07);
eyeballl = move(rotate(eyeballl, 3), -0.165, 0.07);

var pupill = oval(0, 0, 0.014, 0.02);
var pupilr = move(rotate(zoom(pupill, -1, 1, 0, 0, true), -8), 0.155, 0.075);
pupil = move(rotate(pupill, 5), -0.165, 0.075);

var kiral = oval(0, 0, 0.018, 0.014);
var kirar = move(rotate(zoom(kiral, -1, 1, 0, 0, true), 42), 0.130, 0.126);
kiral = move(rotate(kiral, 40), -0.20, 0.12);


var meyeul = oval(0, 0, 0.12, 0.095, 0, 180, false, [-0.02, 0.18]);
for(var i = 0; i < meyeul.length; i += 2) {
	if(meyeul[i]>0)
		meyeul[i]/=1.5;
}
var eyeul = copy(meyeul);
//eyeul = zoom(eyeul, 1, 0.8, 0, 0, false, 1);
var meyeur = oval(0, 0, 0.12, 0.095, 0, 180, false, [0.02, 0.18]);
for(var i = 0; i < meyeur.length; i += 2) {
	if(meyeur[i]<0)
		meyeur[i]/=1.5;
}
var eyeur = copy(meyeur);
var meyedl = oval(0, 0, 0.12, 0.095, 180, 360, false, [-0.01, -0.15]);
for(var i = 0; i < meyeul.length; i += 2) {
	if(meyedl[i]>0)
		meyedl[i]/=1.5;
}
var eyedl = copy(meyedl);
//eyeul = zoom(eyeul, 1, 0.8, 0, 0, false, 1);
var meyedr = oval(0, 0, 0.12, 0.095, 180, 360, false, [0.01, -0.15]);
for(var i = 0; i < meyeur.length; i += 2) {
	if(meyedr[i]<0)
		meyedr[i]/=1.5;
}
var eyedr = copy(meyedr);
		
move(rotate(eyeur, -8), 0.15, 0.085);
move(rotate(eyeul, 5), -0.16, 0.085);
move(rotate(eyedr, -8), 0.15, 0.085);
move(rotate(eyedl, 5), -0.16, 0.085);


var matugelm = unionOval(0, 0, 0.105, 0.095, 35, 180, 0.01, -0.01, 0.108, 0.090, 35, 185);
for(var i = 0; i < matugelm.length; i += 2) {
	if(matugelm[i]>0)
		matugelm[i]/=1.8;
}
var matugel = copy(matugelm);
var matugerm = zoom(unionOval(0, 0, 0.105, 0.095, 35, 180, 0.01, -0.01, 0.108, 0.090, 35, 185), -1, 1, 0, 0);
for(var i = 0; i < matugerm.length; i += 2) {
	if(matugerm[i]<0)
		matugerm[i]/=1.8;
}
var matuger = copy(matugerm);

move(rotate(matugel, 5), -0.16, 0.085);
move(rotate(matuger, -8), 0.15, 0.085);

var eyelashl = zoom(getPoints(function(x){return -x * x;}, 0, 0, -0.05, 0.1, false), 0.3, 1);
var eyelashr = move(rotate(zoom(eyelashl, -1, 1, 0, 0, true), -8), 0.16, 0.198);
eyelashl = move(eyelashl, -0.16, 0.20);

var eyelashsl = move(rotate([-0.065, -0.012, -0.085, -0.005, -0.018, 0.03, -0.024, 0.048, 0.05, 0.04, 0.06, 0.05], 8), -0.2, 0.13);
var eyelashsr = move(rotate([0.048, -0.02, 0.068, -0.014, 0.004, 0.032, 0.014, 0.05, -0.06, 0.038, -0.07, 0.048], -10), 0.2, 0.13);

var nose = oval(0, -0.07, 0.005, 0.008);

var mouth = getPoints(function(x){return 4 * x * x;}, 0, -0.20, -0.05, 0.05, false, [], 60);


window.onload = function init()
{
    var canvas = document.getElementById("gl-canvas");
    
    gl = WebGLUtils.setupWebGL(canvas);
    if (!gl) {alert("WebGL isn't available");}

    //  Configure WebGL
    gl.viewport(0, 0, canvas.width, canvas.height);
    
    //  Load shaders and initialize attribute buffers
    program = initShaders(gl, "vertex-shader", "fragment-shader");
    gl.useProgram(program);
	
	black = colorBuff(gl, black);
	white = colorBuff(gl, white);
	line = colorBuff(gl, line);


	hairColor = colorBuff(gl, hairColor);
	faceColor = colorBuff(gl, faceColor);
	backColor = colorBuff(gl, backColor);
	clothesBColor = colorBuff(gl, clothesBColor);

	mimiColor = colorBuff(gl, mimiColor);
	
	faceDColor = colorBuff(gl, faceDColor);
	faceUColor = colorBuff(gl, faceUColor);

	eyeColor = colorBuff(gl, eyeColor);
	
	hairClipColor = colorBuff(gl, getColors(1, 184/255, 66/255, 1, 63));
	flowerColor = colorBuff(gl, flowerColor);
	flowerCoreColor = colorBuff(gl, flowerCoreColor);
	
	var eyeulc = move(rotate(zoom(meyeul, 1, -0.4, 0, 0, true, 1), 5), -0.16, 0.085);
	var eyeurc = move(rotate(zoom(meyeur, 1, -0.4, 0, 0, true, 1), -8), 0.15, 0.085)
	var eyedlc = move(rotate(zoom(meyedl, 1, 0, 0, 0, true, 1), 5), -0.16, 0.085)
	var eyedrc = move(rotate(zoom(meyedr, 1, 0, 0, 0, true, 1), -8), 0.15, 0.085)
	var matugelc = move(rotate(zoom(zoom(matugelm, 1, -0.4, 0, -0.02, true, 1, 0, 4), 1, -0.4, 0, 0, false, 0, 0, 4), 5), -0.16, 0.085)
	var matugerc = move(rotate(zoom(zoom(matugerm, 1, -0.4, 0, -0.02, true, 1, 0, 4), 1, -0.4, 0, 0, false, 0, 0, 4), -8), 0.15, 0.085)
        
	var eyelashlc = rotate(zoom(rotate(eyelashl, -5, -0.16, 0.095, true), 1, -0.3, -0.16, 0.095), 5, -0.16, 0.095)
	var eyelashslc = rotate(zoom(zoom(rotate(eyelashsl, -5, -0.16, 0.085, true), 1, -0.4, -0.16, 0.085, false, 0, 0, 4), 1, -0.8, -0.16, 0.085, false, 1, 0, 4), 5, -0.16, 0.085)
	var eyelashrc = rotate(zoom(rotate(eyelashr, 8, 0.15, 0.095, true), 1, -0.3, 0.15, 0.095), -8, 0.15, 0.095)
	var eyelashsrc = rotate(zoom(zoom(rotate(eyelashsr, 8, 0.15, 0.085, true), 1, -0.4, 0.15, 0.085, false, 0, 0, 4), 1, -0.8, 0.15, 0.085, false, 1, 0, 4), -8, 0.15, 0.085)
	
	eyeulb = linearAnimeBuff(gl, eyeul, eyeulc, 10);
	eyeurb = linearAnimeBuff(gl, eyeur, eyeurc, 10);
	eyedlb = linearAnimeBuff(gl, eyedl, eyedlc, 10);
	eyedrb = linearAnimeBuff(gl, eyedr, eyedrc, 10);
	matugelb = linearAnimeBuff(gl, matugel, matugelc, 10);
	matugerb = linearAnimeBuff(gl, matuger, matugerc, 10);

	eyelashlb = linearAnimeBuff(gl, eyelashl, eyelashlc, 10);
	eyelashslb = linearAnimeBuff(gl, eyelashsl, eyelashslc, 10);
	eyelashrb = linearAnimeBuff(gl, eyelashr, eyelashsrc, 10);
	eyelashsrb = linearAnimeBuff(gl, eyelashsr, eyelashsrc, 10);
	
	eyeuln = linearAnimeBuff(gl, eyeul, move(rotate(zoom(meyeul, 1, 0, 0, 0, true, 1), 5), -0.16, 0.085), 6);
	eyeurn = linearAnimeBuff(gl, eyeur, move(rotate(zoom(meyeur, 1, 0, 0, 0, true, 1), -8), 0.15, 0.085), 6);
	eyedln = linearAnimeBuff(gl, eyedl, move(rotate(zoom(meyedl, 1, -0.5, 0, 0, true, 1), 5), -0.16, 0.085), 6);
	eyedrn = linearAnimeBuff(gl, eyedr, move(rotate(zoom(meyedr, 1, -0.5, 0, 0, true, 1), -8), 0.15, 0.085), 6);
	matugeln = linearAnimeBuff(gl, matugel, move(rotate(rotate(zoom(zoom(matugelm, 0.95, 0.30, 0, -0.002, true, 1, 0, 4), 0.9, 0.5, 0, 0, false, 0, 0, 4), 5), -11, -0.105, 0), -0.16, 0.06), 6);
	matugern = linearAnimeBuff(gl, matuger, move(rotate(rotate(zoom(zoom(matugerm, 0.95, 0.30, 0, -0.002, true, 1, 0, 4), 0.9, 0.5, 0, 0, false, 0, 0, 4), -8), 12, 0.105, 0), 0.15, 0.065), 6);

	eyelashln = linearAnimeBuff(gl, eyelashl, rotate(rotate(zoom(rotate(eyelashl, -5, -0.16, 0.095, true), 0.9, 0.3, -0.16, 0.095), 5, -0.16, 0.095), -10, -0.265, 0.06), 6);
	eyelashsln = linearAnimeBuff(gl, eyelashsl, rotate(rotate(zoom(zoom(rotate(eyelashsl, -5, -0.16, 0.085, true), 0.9, 0.25, -0.16, 0.085, false, 0, 0, 4), 0.9, 0.4, -0.16, 0.085, false, 1, 0, 4), 5, -0.16, 0.085), -15, -0.265, -0.02), 6);
	eyelashrn = linearAnimeBuff(gl, eyelashr, rotate(rotate(zoom(rotate(eyelashr, 8, 0.15, 0.095, true), 0.9, 0.3, 0.15, 0.095), -8, 0.15, 0.095), 12, 0.255, 0.06), 6);
	eyelashsrn = linearAnimeBuff(gl, eyelashsr, rotate(rotate(zoom(zoom(rotate(eyelashsr, 8, 0.15, 0.085, true), 0.9, 0.25, 0.15, 0.085, false, 0, 0, 4), 0.9, 0.4, 0.15, 0.085, false, 1, 0, 4), -8, 0.15, 0.085), 14, 0.26, 0.02), 6);
		
	var eyeulos = move(rotate(zoom(meyeul, 1, 0.7, 0, 0, true, 1), 5), -0.16, 0.085);
	var eyeuros = move(rotate(zoom(meyeur, 1, 0.7, 0, 0, true, 1), -8), 0.15, 0.085);
	var eyedlos = move(rotate(zoom(meyedl, 1, 0.8, 0, 0, true, 1), 5), -0.16, 0.085);
	var eyedros = move(rotate(zoom(meyedr, 1, 0.8, 0, 0, true, 1), -8), 0.15, 0.085);
	var matugelos = move(rotate(zoom(zoom(matugelm, 1, 0.8, 0, -0.02, true, 1, 0, 4), 1, 0.8, 0, 0, false, 0, 0, 4), 5), -0.16, 0.085);
	var matugeros = move(rotate(zoom(zoom(matugerm, 1, 0.8, 0, -0.02, true, 1, 0, 4), 1, 0.8, 0, 0, false, 0, 0, 4), -8), 0.15, 0.085);
	
	var eyelashlos = rotate(zoom(rotate(eyelashl, -5, -0.16, 0.095, true), 1, 0.7, -0.16, 0.095), 5, -0.16, 0.095);
	var eyelashslos = rotate(zoom(zoom(rotate(eyelashsl, -5, -0.16, 0.085, true), 1, 0.8, -0.16, 0.085, false, 0, 0, 4), 1, 0.8, -0.16, 0.085, false, 1, 0, 4), 5, -0.16, 0.085);
	var eyelashros = rotate(zoom(rotate(eyelashr, 8, 0.15, 0.095, true), 1, 0.7, 0.15, 0.095), -8, 0.15, 0.095);
	var eyelashsros = rotate(zoom(zoom(rotate(eyelashsr, 8, 0.15, 0.085, true), 1, 0.8, 0.15, 0.085, false, 0, 0, 4), 1, 0.8, 0.15, 0.085, false, 1, 0, 4), -8, 0.15, 0.085);
	
	eyeulo = linearAnimeBuff(gl, eyeul, eyeulos, 12);
	eyeuro = linearAnimeBuff(gl, eyeur, eyeuros, 12);
	eyedlo = linearAnimeBuff(gl, eyedl, eyedlos, 12);
	eyedro = linearAnimeBuff(gl, eyedr, eyedros, 12);
	matugelo = linearAnimeBuff(gl, matugel, matugelos, 12);
	matugero = linearAnimeBuff(gl, matuger, matugeros, 12);

	eyelashlo = linearAnimeBuff(gl, eyelashl, eyelashlos, 12);
	eyelashslo = linearAnimeBuff(gl, eyelashsl, eyelashslos, 12);
	eyelashro = linearAnimeBuff(gl, eyelashr, eyelashros, 12);
	eyelashsro = linearAnimeBuff(gl, eyelashsr, eyelashsros, 12);
	
	eyeulob = linearAnimeBuff(gl, eyeulos, eyeulc, 10);
	eyeurob = linearAnimeBuff(gl, eyeuros, eyeurc, 10);
	eyedlob = linearAnimeBuff(gl, eyedlos, eyedlc, 10);
	eyedrob = linearAnimeBuff(gl, eyedros, eyedrc, 10);
	matugelob = linearAnimeBuff(gl, matugelos, matugelc, 10);
	matugerob = linearAnimeBuff(gl, matugeros, matugerc, 10);

	eyelashlob = linearAnimeBuff(gl, eyelashlos, eyelashlc, 10);
	eyelashslob = linearAnimeBuff(gl, eyelashslos, eyelashslc, 10);
	eyelashrob = linearAnimeBuff(gl, eyelashros, eyelashsrc, 10);
	eyelashsrob = linearAnimeBuff(gl, eyelashsros, eyelashsrc, 10);
	
	mayugelo = linearAnimeBuff(gl, mayugeL, rotate(oval(-0.16, 0.22, 0.1, 0.11, 150, 30, false, [-0.16, 0.26]), 148, -0.16, 0.27), 12);
	mayugero = linearAnimeBuff(gl, mayugeR, rotate(oval(0.13, 0.23, 0.1, 0.11, 150, 30, false, [0.13, 0.27]), -145, 0.13, 0.28), 12);
	
	moutho = linearAnimeBuff(gl, mouth, zoom(mouth, 1, -1.4, 0, -0.195, true), 12);
	
	backHair = positionBuff(gl, backHair);

	clothesB = positionBuff(gl, clothesB);

	clothesBack = positionBuff(gl, clothesBack);

	clothesLineB = positionBuff(gl, clothesLineB);

	maeHairC = positionBuff(gl, maeHairC);
		
	neck = positionBuff(gl, neck);

	neckIn = positionBuff(gl, neckIn);

	neckShade = positionBuff(gl, neckShade);

	neckLineL = positionBuff(gl, neckLineL);
	neckLineR = positionBuff(gl, neckLineR);


	faceDR = positionBuff(gl, faceDR);
	faceDL = positionBuff(gl, faceDL);
	faceU = positionBuff(gl, faceU);

	faceDUL = positionBuff(gl, faceDUL);
	faceDUR = positionBuff(gl, faceDUR);
	faceUUL = positionBuff(gl, faceUUL);
	faceUUR = positionBuff(gl, faceUUR);

	clothesFrontUL = positionBuff(gl, clothesFrontUL);
	clothesFrontUR = positionBuff(gl, clothesFrontUR);

	clothesFrontDL = positionBuff(gl, clothesFrontDL);
	clothesFrontDR = positionBuff(gl, clothesFrontDR);

	usamimiL = positionBuff(gl, usamimiL);
	usamimiIL = positionBuff(gl, usamimiIL);
	usamimiR = positionBuff(gl, usamimiR);
	usamimiIR = positionBuff(gl, usamimiIR);

	clothesD = positionBuff(gl, clothesD);


	faceLineDR = positionBuff(gl, faceLineDR);
	faceLineDL = positionBuff(gl, faceLineDL);

	maeHairUR = positionBuff(gl, maeHairUR);
	maeHairUL = positionBuff(gl, maeHairUL);

	maeHairDR = positionBuff(gl, maeHairDR);
	maeHairDL = positionBuff(gl, maeHairDL);

	shitaHairL = positionBuff(gl, shitaHairL);
	shitaHairR = positionBuff(gl, shitaHairR);

	maeHairUDL = positionBuff(gl, maeHairUDL);
	maeHairUDR = positionBuff(gl, maeHairUDR);

	mayugeL = positionBuff(gl, mayugeL);
	mayugeR = positionBuff(gl, mayugeR);

	hairClip = positionBuff(gl, hairClip);

	flower = positionBuff(gl, flower);

	flowerCore = positionBuff(gl, flowerCore);

	eyel = positionBuff(gl, eyel);
	eyer = positionBuff(gl, eyer); 

	eyeballl = positionBuff(gl, eyeballl);
	eyeballr = positionBuff(gl, eyeballr);

	pupill = positionBuff(gl, pupill);
	pupilr = positionBuff(gl, pupilr);

	kiral = positionBuff(gl, kiral);
	kirar = positionBuff(gl, kirar);


	eyeul = positionBuff(gl, eyeul);
	eyeur = positionBuff(gl, eyeur);
	eyedl = positionBuff(gl, eyedl);
	eyedr = positionBuff(gl, eyedr);

	matugel = positionBuff(gl, matugel);
	matuger = positionBuff(gl, matuger);

	eyelashl = positionBuff(gl, eyelashl);
	eyelashr = positionBuff(gl, eyelashr);

	eyelashsl = positionBuff(gl, eyelashsl);
	eyelashsr = positionBuff(gl, eyelashsr);

	nose = positionBuff(gl, nose);

	mouth = positionBuff(gl, mouth);
	
	drawAll();
	
	setTimeout("blink()", Math.random() * 3000);
	
	addAction("blink");
	addAction("nico");
	addAction("oko");

	document.getElementById("blink").onclick=function(){action(bn)};
	document.getElementById("nico").onclick=function(){action(nn)};
	document.getElementById("oko").onclick=function(){action(on)};
}


var eyeulb;
var eyeurb;
var eyedlb;
var eyedrb;
var matugelb;
var matugerb;

var eyelashlb;
var eyelashslb;
var eyelashrb;
var eyelashsrb;

var bi = 0;
var bb = false;
var bn = register(false, 0, blink, antiblink);

function blink() {
	actionMarks[bn] = true;
	eyeul = eyeulb[bi];
	eyeur = eyeurb[bi];
	eyedl = eyedlb[bi];
	eyedr = eyedrb[bi];
	matugel = matugelb[bi];
	matuger = matugerb[bi];
	eyelashl = eyelashlb[bi];
	eyelashsl = eyelashslb[bi];
	eyelashr = eyelashrb[bi];
	eyelashsr = eyelashsrb[bi];
	if(!bb) {
		if(++bi == matugelb.length)
		{
			bb = true;
			bi-=2;
		}
	}
	else {
		if(--bi == -1)
		{
			bb = false;
			bi=0;
			timeMark[bn] = setTimeout("blink()", Math.random() * 3000  + 200);
			drawAll();
			return;
		}
	}
	timeMark[bn] = setTimeout("blink()", 1000/60);
	drawAll();
}

function antiblink(callback) {
	eyeul = eyeulb[bi];
	eyeur = eyeurb[bi];
	eyedl = eyedlb[bi];
	eyedr = eyedrb[bi];
	matugel = matugelb[bi];
	matuger = matugerb[bi];
	eyelashl = eyelashlb[bi];
	eyelashsl = eyelashslb[bi];
	eyelashr = eyelashrb[bi];
	eyelashsr = eyelashsrb[bi];
	if(--bi == -1)
	{
		bb = actionMarks[bn] = false;
		bi = 0;
		drawAll();
		callback();
		return;
	}
	drawAll();
	timeMark[bn] = setTimeout("antiblink(" + callback + ")", 1000/60);
}

var eyeuln;
var eyeurn;
var eyedln;
var eyedrn;
var matugeln;
var matugern;

var eyelashln;
var eyelashsln;
var eyelashrn;
var eyelashsrn;

var ni = 0;
var nb = false;
var nn = register(false, 0, nico, antinico);
function nico() {
	if(!nb) {
		eyeul = eyeuln[ni];
		eyeur = eyeurn[ni];
		eyedl = eyedln[ni];
		eyedr = eyedrn[ni];
		matugel = matugeln[ni];
		matuger = matugern[ni];
		eyelashl = eyelashln[ni];
		eyelashsl = eyelashsln[ni];
		eyelashr = eyelashrn[ni];
		eyelashsr = eyelashsrn[ni];
		if(++ni == eyeuln.length)
		{
			nb = actionMarks[nn] = true;
			ni = 5;
			drawAll();
			return;
		}
		timeMark[nn] = setTimeout("nico()", 1000/60);
		drawAll();
	}
}

function antinico(callback) {
	nb = false;
	eyeul = eyeuln[ni];
	eyeur = eyeurn[ni];
	eyedl = eyedln[ni];
	eyedr = eyedrn[ni];
	matugel = matugeln[ni];
	matuger = matugern[ni];
	eyelashl = eyelashln[ni];
	eyelashsl = eyelashsln[ni];
	eyelashr = eyelashrn[ni];
	eyelashsr = eyelashsrn[ni];
	if(--ni == -1)
	{
		actionMarks[nn] = false;
		ni=0;
		drawAll();
		callback();
		return true;
	}
	drawAll();
	timeMark[nn] = setTimeout("antinico(" + callback + ")", 1000/60);
	return false;
}

var eyeulo;
var eyeuro;
var eyedlo;
var eyedro;
var matugelo;
var matugero;
var eyelashlo;
var eyelashslo;
var eyelashro;
var eyelashsro;
var mayugelo;
var mayugero;
var moutho;

var oi = 0;
var ob = false;
var on = register(false, 0, oko, antioko);

function oko() {
	if(!nb) {
		eyeul = eyeulo[oi];
		eyeur = eyeuro[oi];
		eyedl = eyedlo[oi];
		eyedr = eyedro[oi];
		matugel = matugelo[oi];
		matuger = matugero[oi];
		eyelashl = eyelashlo[oi];
		eyelashsl = eyelashslo[oi];
		eyelashr = eyelashro[oi];
		eyelashsr = eyelashsro[oi];
		mayugeL = mayugelo[oi];
		mayugeR = mayugero[oi];
		mouth = moutho[oi];
		if(++oi == mayugelo.length)
		{
			ob = actionMarks[on] = true;
			oi -= 1;
			timeMark[on] = setTimeout("okoblink()", Math.random() * 3000  + 200);
			drawAll();
			return;
		}
		timeMark[on] = setTimeout("oko()", 1000/60);
		drawAll();
	}
}

var eyeulob;
var eyeurob;
var eyedlob;
var eyedrob;
var matugelob;
var matugerob;
var eyelashlob;
var eyelashslob;
var eyelashrob;
var eyelashsrob;

var obi = 0;
var obb = false;

function okoblink() {
	eyeul = eyeulob[obi];
	eyeur = eyeurob[obi];
	eyedl = eyedlob[obi];
	eyedr = eyedrob[obi];
	matugel = matugelob[obi];
	matuger = matugerob[obi];
	eyelashl = eyelashlob[obi];
	eyelashsl = eyelashslob[obi];
	eyelashr = eyelashrob[obi];
	eyelashsr = eyelashsrob[obi];
	if(!obb) {
		if(++obi == matugelob.length)
		{
			obb = true;
			obi-=2;
		}
	}
	else {
		if(--obi == -1)
		{
			obb = false;
			obi=0;
			timeMark[on] = setTimeout("okoblink()", Math.random() * 3000  + 200);
			drawAll();
			return;
		}
	}
	timeMark[on] = setTimeout("okoblink()", 1000/60);
	drawAll();
}

function antioko(callback) {
	nb = false;
	eyeul = eyeulo[oi];
	eyeur = eyeuro[oi];
	eyedl = eyedlo[oi];
	eyedr = eyedro[oi];
	matugel = matugelo[oi];
	matuger = matugero[oi];
	eyelashl = eyelashlo[oi];
	eyelashsl = eyelashslo[oi];
	eyelashr = eyelashro[oi];
	eyelashsr = eyelashsro[oi];
	mayugeL = mayugelo[oi];
	mayugeR = mayugero[oi];
	mouth = moutho[oi];
	if(--oi == -1)
	{
		actionMarks[on] = false;
		oi=0;
		drawAll();
		callback();
		return true;
	}
	drawAll();
	timeMark[on] = setTimeout("antioko(" + callback + ")", 1000/60);
	return false;
}

function drawAll() {
    gl.clearColor(0.0, 0.0, 0.0, 0.00);
    gl.clear(gl.COLOR_BUFFER_BIT);
	
	enableColorBuff(gl, program, backColor, "vColor");
	render(enablePositionBuff(gl, program, backHair, "vPosition"), gl.TRIANGLE_STRIP, 0, 122);
	
	enableColorBuff(gl, program, clothesBColor, "vColor");
	render(enablePositionBuff(gl, program, clothesB, "vPosition"), gl.TRIANGLE_STRIP, 0, 122);
	
	enableColorBuff(gl, program, black, "vColor");
	render(enablePositionBuff(gl, program, clothesBack, "vPosition"), gl.TRIANGLE_STRIP, 0, 122);
	//render(colorBuff(gl, program, black, "vColor"), enablePositionBuff(gl, program, clothesLineB, "vPosition"), gl.LINES, 0, 2);
	
	enableColorBuff(gl, program, hairColor, "vColor");
	render(enablePositionBuff(gl, program, maeHairC, "vPosition"), gl.TRIANGLE_FAN, 0, 62);
	
	enableColorBuff(gl, program, faceColor, "vColor");
	render(enablePositionBuff(gl, program, neck, "vPosition"), gl.TRIANGLE_STRIP, 0, 122);
	render(enablePositionBuff(gl, program, neckIn, "vPosition"), gl.TRIANGLE_FAN, 0, 62);
	//render(colorBuff(gl, program, getColors(152/255, 100/255, 69/255, 1, 244), "vColor"), enablePositionBuff(gl, program, neckShade, "vPosition"), gl.TRIANGLE_STRIP, 0, 244);
	
	enableColorBuff(gl, program, colorBuff(gl, getColors(120/255, 110/255, 90/255, 1, 61)), "vColor");
	render(enablePositionBuff(gl, program, neckLineL, "vPosition"), gl.LINE_STRIP, 0, 61);
	render(enablePositionBuff(gl, program, neckLineR, "vPosition"), gl.LINE_STRIP, 0, 61);
	
	enableColorBuff(gl, program, line, "vColor");
	render(enablePositionBuff(gl, program, positionBuff(gl, rotate(getPoints(function(x){return (9 * x) ** 10}, -0.18, -0.43, 0, 0.1, false), 10, -0.18, -0.43), "vPosition")), gl.LINE_STRIP, 0, 61);
	render(enablePositionBuff(gl, program, positionBuff(gl, rotate(getPoints(function(x){return (9 * x) ** 10;}, 0.18, -0.43, 0, -0.1, false), -10, 0.18, -0.43), "vPosition")), gl.LINE_STRIP, 0, 61);
	
	enableColorBuff(gl, program, faceColor, "vColor");
	render(enablePositionBuff(gl, program, faceDL, "vPosition"), gl.TRIANGLE_FAN, 0, 62);
	render(enablePositionBuff(gl, program, faceDR, "vPosition"), gl.TRIANGLE_FAN, 0, 62);
	render(enablePositionBuff(gl, program, faceU, "vPosition"), gl.TRIANGLE_FAN, 0, 4);
		
	enableColorBuff(gl, program, white, "vColor");
	render(enablePositionBuff(gl, program, clothesFrontUL, "vPosition"), gl.TRIANGLE_STRIP, 0, 122);
	render(enablePositionBuff(gl, program, clothesFrontUR, "vPosition"), gl.TRIANGLE_STRIP, 0, 122);
	
	render(enablePositionBuff(gl, program, clothesFrontDL, "vPosition"), gl.TRIANGLE_STRIP, 0, 122);
	render(enablePositionBuff(gl, program, clothesFrontDR, "vPosition"), gl.TRIANGLE_STRIP, 0, 122);
	
	render(enablePositionBuff(gl, program, usamimiR, "vPosition"), gl.TRIANGLE_STRIP, 0, 122);
	enableColorBuff(gl, program, mimiColor, "vColor");
	render(enablePositionBuff(gl, program, usamimiIR, "vPosition"), gl.TRIANGLE_FAN, 0, 62);
	
	enableColorBuff(gl, program, white, "vColor");
	render(enablePositionBuff(gl, program, usamimiL, "vPosition"), gl.TRIANGLE_STRIP, 0, 122);
	enableColorBuff(gl, program, mimiColor, "vColor");
	render(enablePositionBuff(gl, program, usamimiIL, "vPosition"), gl.TRIANGLE_FAN, 0, 62);
	
	
	enableColorBuff(gl, program, white, "vColor");
	render(enablePositionBuff(gl, program, clothesD, "vPosition"), gl.TRIANGLE_FAN, 0, 61);
	//render(colorBuff(gl, program, black, "vColor"), enablePositionBuff(gl, program, clothesD, "vPosition"), gl.LINE_STRIP, 0, 61);
	
	
	//render(colorBuff(gl, program, black, "vColor"), enablePositionBuff(gl, program, clothesLineF, "vPosition"), gl.LINE_STRIP, 0, 61);
	
	render(enablePositionBuff(gl, program, eyel, "vPosition"), gl.TRIANGLE_FAN, 0, 62);
	render(enablePositionBuff(gl, program, eyer, "vPosition"), gl.TRIANGLE_FAN, 0, 62);
	
	enableColorBuff(gl, program, eyeColor, "vColor");
	render(enablePositionBuff(gl, program, eyeballl, "vPosition"), gl.TRIANGLE_FAN, 0, 62);
	render(enablePositionBuff(gl, program, eyeballr, "vPosition"), gl.TRIANGLE_FAN, 0, 62);
	
	enableColorBuff(gl, program, black, "vColor");
	render(enablePositionBuff(gl, program, pupill, "vPosition"), gl.TRIANGLE_FAN, 0, 62);
	render(enablePositionBuff(gl, program, pupilr, "vPosition"), gl.TRIANGLE_FAN, 0, 62);
	
	enableColorBuff(gl, program, white, "vColor");
	render(enablePositionBuff(gl, program, kiral, "vPosition"), gl.TRIANGLE_FAN, 0, 62);
	render(enablePositionBuff(gl, program, kirar, "vPosition"), gl.TRIANGLE_FAN, 0, 62);
	
	
	enableColorBuff(gl, program, faceColor, "vColor");
	render(enablePositionBuff(gl, program, eyeul, "vPosition"), gl.TRIANGLE_FAN, 0, 62);
	render(enablePositionBuff(gl, program, eyeur, "vPosition"), gl.TRIANGLE_FAN, 0, 62);
	render(enablePositionBuff(gl, program, eyedl, "vPosition"), gl.TRIANGLE_FAN, 0, 62);
	render(enablePositionBuff(gl, program, eyedr, "vPosition"), gl.TRIANGLE_FAN, 0, 62);
	
	enableColorBuff(gl, program, faceDColor, "vColor");
	render(enablePositionBuff(gl, program, faceDUL, "vPosition"), gl.TRIANGLE_FAN, 0, 62);
	render(enablePositionBuff(gl, program, faceDUR, "vPosition"), gl.TRIANGLE_FAN, 0, 62);
	enableColorBuff(gl, program, faceUColor, "vColor");
	render(enablePositionBuff(gl, program, faceUUL, "vPosition"), gl.TRIANGLE_FAN, 0, 62);
	render(enablePositionBuff(gl, program, faceUUR, "vPosition"), gl.TRIANGLE_FAN, 0, 62);
	
	enableColorBuff(gl, program, black, "vColor");
	render(enablePositionBuff(gl, program, matugel, "vPosition"), gl.TRIANGLE_STRIP, 0, 122);
	render(enablePositionBuff(gl, program, matuger, "vPosition"), gl.TRIANGLE_STRIP, 0, 122);

	render(enablePositionBuff(gl, program, eyelashl, "vPosition"), gl.LINE_STRIP, 0, 61);
	render(enablePositionBuff(gl, program, eyelashr, "vPosition"), gl.LINE_STRIP, 0, 61);
	render(enablePositionBuff(gl, program, eyelashsl, "vPosition"), gl.LINES, 0, 6);
	render(enablePositionBuff(gl, program, eyelashsr, "vPosition"), gl.LINES, 0, 6);
	
	render(enablePositionBuff(gl, program, nose, "vPosition"), gl.TRIANGLE_FAN, 0, 62);
	
	render(enablePositionBuff(gl, program, mouth, "vPosition"), gl.LINE_STRIP, 0, 61);
	
	enableColorBuff(gl, program, line, "vColor");
	render(enablePositionBuff(gl, program, faceLineDL, "vPosition"), gl.LINE_STRIP, 0, 61);
	render(enablePositionBuff(gl, program, faceLineDR, "vPosition"), gl.LINE_STRIP, 0, 61);
	
	//render(colorBuff(gl, program, line, "vColor"), enablePositionBuff(gl, program, [0.2, 0.595, -0.36, 0.265], "vPosition"), gl.LINES, 0, 2);
	//render(colorBuff(gl, program, line, "vColor"), enablePositionBuff(gl, program, [0.1, 0.595, 0.35, 0.195], "vPosition"), gl.LINES, 0, 2);
	
	enableColorBuff(gl, program, hairColor, "vColor");
	render(enablePositionBuff(gl, program, maeHairUR, "vPosition"), gl.TRIANGLE_FAN, 0, 62);
	render(enablePositionBuff(gl, program, maeHairUL, "vPosition"), gl.TRIANGLE_FAN, 0, 62);
	
	render(enablePositionBuff(gl, program, maeHairDR, "vPosition"), gl.TRIANGLE_STRIP, 0, 122);
	render(enablePositionBuff(gl, program, maeHairDL, "vPosition"), gl.TRIANGLE_STRIP, 0, 122);
	render(enablePositionBuff(gl, program, shitaHairL, "vPosition"), gl.TRIANGLE_FAN, 0, 123);
	render(enablePositionBuff(gl, program, shitaHairR, "vPosition"), gl.TRIANGLE_FAN, 0, 123);
	
	render(enablePositionBuff(gl, program, maeHairUDL, "vPosition"), gl.TRIANGLES, 0, 3);
	render(enablePositionBuff(gl, program, maeHairUDR, "vPosition"), gl.TRIANGLES, 0, 3);
	
	render(enablePositionBuff(gl, program, mayugeL, "vPosition"), gl.TRIANGLE_FAN, 0, 62);
	render(enablePositionBuff(gl, program, mayugeR, "vPosition"), gl.TRIANGLE_FAN, 0, 62);
	
	//render(colorBuff(gl, program, line, "vColor"), enablePositionBuff(gl, program, rotate(oval(0.62, 0.2, 0.32, 0.9, 200, 175, false), -6, 0.03, 0.18), "vPosition"), gl.LINE_STRIP, 0, 61);
	//render(colorBuff(gl, program, line, "vColor"), enablePositionBuff(gl, program, rotate(oval(-0.6, 0.2, 0.3, 0.9, 8, -20, false), 7, 0.03, 0.18), "vPosition"), gl.LINE_STRIP, 0, 61);
	
	enableColorBuff(gl, program, hairClipColor, "vColor");
	render(enablePositionBuff(gl, program, hairClip, "vPosition"), gl.TRIANGLE_FAN, 0, 63);
	
	enableColorBuff(gl, program, flowerColor, "vColor");
	render(enablePositionBuff(gl, program, flower, "vPosition"), gl.TRIANGLE_FAN, 0, 156);
	
	enableColorBuff(gl, program, flowerCoreColor, "vColor");
	render(enablePositionBuff(gl, program, flowerCore, "vPosition"), gl.TRIANGLE_FAN, 0, 62);
	
}

function render(vPosition, func, ps, pe) {
	//gl.enableVertexAttribArray(vPosition);
	gl.drawArrays(func, ps, pe);
}