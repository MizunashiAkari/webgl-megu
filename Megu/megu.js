var gl;
var points;

var program;

function addAction(name, show = name) {
	var act = document.getElementById("actions");
	act.innerHTML += "<input type='radio' value='" + name + "' name='action' id='" + name + "'/><div onclick=document.getElementById('" + name + "').click()><label for='" + name + "'>" + show + "</label></div><br />";
}

function getQueryString(name) {
	var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
	var r = window.location.search.substr(1).match(reg);
	if (r != null) return unescape(r[2]); return null;
}

//Defination of color
var black = getColors(0, 0, 0, 1, 1024);
var white = getColors(1, 1, 1, 1, 1024);
var line = getColors(203/255, 167/255, 133/255, 1, 1024);

var hairColor = getColors(253/255, 230/255, 149/255, 1, 123);
var faceColor = getColors(255/255, 239/255, 217/255, 1, 122);
var backColor = getColors(1, 189/255, 112/255, 1, 122);
var clothesBColor = getColors(0.6, 0.6, 0.8, 1, 122);

var mimiColor = getColors(250/255, 120/255, 120/255, 1, 122);

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

var pupill = oval(0, 0, 0.013, 0.018);
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
var meyedl = oval(0, 0, 0.11, 0.095, 180, 360, false, [-0.02, -0.20]);
for(var i = 0; i < meyeul.length; i += 2) {
	if(meyedl[i]>0)
		meyedl[i]/=1.5;
	if(meyedl[i + 1]<0)
		meyedl[i + 1]/=1.2;
}
var eyedl = copy(meyedl);
//eyeul = zoom(eyeul, 1, 0.8, 0, 0, false, 1);
var meyedr = oval(0, 0, 0.11, 0.095, 180, 360, false, [0.02, -0.20]);
for(var i = 0; i < meyeur.length; i += 2) {
	if(meyedr[i]<0)
		meyedr[i]/=1.5;
	if(meyedr[i + 1]<0)
		meyedr[i + 1]/=1.2;
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
	
	hairClipColor = colorBuff(gl, hairClipColor);
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
	eyelashrb = linearAnimeBuff(gl, eyelashr, eyelashrc, 10);
	eyelashsrb = linearAnimeBuff(gl, eyelashsr, eyelashsrc, 10);
	
	var eyeulns = move(rotate(zoom(meyeul, 1, -0.1, 0, 0, true, 1), 5), -0.16, 0.085);
	var eyeurns = move(rotate(zoom(meyeur, 1, -0.1, 0, 0, true, 1), -8), 0.15, 0.085);
	var eyedlns = move(rotate(zoom(meyedl, 1, -0.2, 0, 0, true, 1), 5), -0.16, 0.085);
	var eyedrns = move(rotate(zoom(meyedr, 1, -0.2, 0, 0, true, 1), -8), 0.15, 0.085);
	var matugelns = move(rotate(rotate(zoom(zoom(matugelm, 0.95, 0.40, 0, -0.002, true, 1, 0, 4), 0.9, 0.6, 0, 0, false, 0, 0, 4), 5), -8, -0.105, 0), -0.16, 0.06);
	var matugerns = move(rotate(rotate(zoom(zoom(matugerm, 0.95, 0.40, 0, -0.002, true, 1, 0, 4), 0.9, 0.6, 0, 0, false, 0, 0, 4), -8), 10, 0.105, 0), 0.15, 0.065);

	var eyelashlns = rotate(rotate(zoom(rotate(eyelashl, -5, -0.16, 0.095, true), 0.9, 0.4, -0.16, 0.095), 5, -0.16, 0.095), -10, -0.265, 0.06);
	var eyelashslns = rotate(rotate(zoom(zoom(rotate(eyelashsl, -5, -0.16, 0.085, true), 0.9, 0.32, -0.16, 0.085, false, 0, 0, 4), 0.9, 0.45, -0.16, 0.085, false, 1, 0, 4), 5, -0.16, 0.085), -16, -0.265, -0.02);
	var eyelashrns = rotate(rotate(zoom(rotate(eyelashr, 8, 0.15, 0.1, true), 0.9, 0.4, 0.15, 0.1), -8, 0.15, 0.1), 12, 0.255, 0.065);
	var eyelashsrns = rotate(rotate(zoom(zoom(rotate(eyelashsr, 8, 0.15, 0.085, true), 0.9, 0.32, 0.15, 0.085, false, 0, 0, 4), 0.9, 0.45, 0.15, 0.085, false, 1, 0, 4), -8, 0.15, 0.085), 15, 0.26, 0.02);
	
	eyeuln = linearAnimeBuff(gl, eyeul, eyeulns, 6);
	eyeurn = linearAnimeBuff(gl, eyeur, eyeurns, 6);
	eyedln = linearAnimeBuff(gl, eyedl, eyedlns, 6);
	eyedrn = linearAnimeBuff(gl, eyedr, eyedrns, 6);
	matugeln = linearAnimeBuff(gl, matugel, matugelns, 6);
	matugern = linearAnimeBuff(gl, matuger, matugerns, 6);

	eyelashln = linearAnimeBuff(gl, eyelashl, eyelashlns, 6);
	eyelashsln = linearAnimeBuff(gl, eyelashsl, eyelashslns, 6);
	eyelashrn = linearAnimeBuff(gl, eyelashr, eyelashrns, 6);
	eyelashsrn = linearAnimeBuff(gl, eyelashsr, eyelashsrns, 6);
		
	var eyeulos = move(rotate(zoom(meyeul, 1, 0.75, 0, 0, true, 1), 5), -0.16, 0.085);
	var eyeuros = move(rotate(zoom(meyeur, 1, 0.75, 0, 0, true, 1), -8), 0.15, 0.085);
	var eyedlos = move(rotate(zoom(meyedl, 21/22, 0.85, 0, 0, true, 1), 5), -0.16, 0.085);
	var eyedros = move(rotate(zoom(meyedr, 21/22, 0.85, 0, 0, true, 1), -8), 0.15, 0.085);
	var matugelos = move(rotate(zoom(zoom(matugelm, 1, 0.85, 0, -0.02, true, 1, 0, 4), 1, 0.85, 0, 0, false, 0, 0, 4), 5), -0.16, 0.085);
	var matugeros = move(rotate(zoom(zoom(matugerm, 1, 0.85, 0, -0.02, true, 1, 0, 4), 1, 0.85, 0, 0, false, 0, 0, 4), -8), 0.15, 0.085);
	
	var eyelashlos = rotate(zoom(rotate(eyelashl, -5, -0.16, 0.095, true), 1, 0.85, -0.16, 0.095), 5, -0.16, 0.095);
	var eyelashslos = rotate(zoom(zoom(rotate(eyelashsl, -5, -0.16, 0.085, true), 1, 0.85, -0.16, 0.085, false, 0, 0, 4), 1, 0.85, -0.16, 0.085, false, 1, 0, 4), 5, -0.16, 0.085);
	var eyelashros = rotate(zoom(rotate(eyelashr, 8, 0.15, 0.095, true), 1, 0.85, 0.15, 0.095), -8, 0.15, 0.095);
	var eyelashsros = rotate(zoom(zoom(rotate(eyelashsr, 8, 0.15, 0.085, true), 1, 0.85, 0.15, 0.085, false, 0, 0, 4), 1, 0.85, 0.15, 0.085, false, 1, 0, 4), -8, 0.15, 0.085);
	
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
	eyelashrob = linearAnimeBuff(gl, eyelashros, eyelashrc, 10);
	eyelashsrob = linearAnimeBuff(gl, eyelashsros, eyelashsrc, 10);
	
	mayugelo = linearAnimeBuff(gl, mayugeL, rotate(oval(-0.16, 0.21, 0.1, 0.11, 150, 30, false, [-0.16, 0.26]), 162, -0.16, 0.275), 12);
	mayugero = linearAnimeBuff(gl, mayugeR, rotate(oval(0.13, 0.22, 0.1, 0.11, 150, 30, false, [0.13, 0.27]), -160, 0.13, 0.285), 12);
	
	moutho = linearAnimeBuff(gl, mouth, zoom(mouth, 0.8, -1, 0, -0.195, true), 12);
	
	var eyeulkss= move(rotate(zoom(meyeul, 1, 0.6, 0, 0, true, 1), 5), -0.16, 0.085);
	var eyeurkss= move(rotate(zoom(meyeur, 1, 0.6, 0, 0, true, 1), -8), 0.15, 0.085);
	var eyedlkss= move(rotate(zoom(meyedl, 21/22, 0.9, 0, 0, true, 1), 5), -0.16, 0.085);
	var eyedrkss= move(rotate(zoom(meyedr, 21/22, 0.9, 0, 0, true, 1), -8), 0.15, 0.085);
	var matugelkss= move(rotate(zoom(zoom(matugelm, 1, 0.7, 0, -0.02, true, 1, 0, 4), 1, 0.7, 0, 0, false, 0, 0, 4), 5), -0.16, 0.085);
	var matugerkss= move(rotate(zoom(zoom(matugerm, 1, 0.7, 0, -0.02, true, 1, 0, 4), 1, 0.7, 0, 0, false, 0, 0, 4), -8), 0.15, 0.085);
	
	var eyelashlkss= rotate(zoom(rotate(eyelashl, -5, -0.16, 0.095, true), 1, 0.65, -0.16, 0.095), 5, -0.16, 0.095);
	var eyelashslkss= rotate(zoom(zoom(rotate(eyelashsl, -5, -0.16, 0.085, true), 1, 0.65, -0.16, 0.085, false, 0, 0, 4), 1, 0.65, -0.16, 0.085, false, 1, 0, 4), 5, -0.16, 0.085);
	var eyelashrkss= rotate(zoom(rotate(eyelashr, 8, 0.15, 0.095, true), 1, 0.65, 0.15, 0.095), -8, 0.15, 0.095);
	var eyelashsrkss= rotate(zoom(zoom(rotate(eyelashsr, 8, 0.15, 0.085, true), 1, 0.65, 0.15, 0.085, false, 0, 0, 4), 1, 0.65, 0.15, 0.085, false, 1, 0, 4), -8, 0.15, 0.085);
	
	eyeulks = linearAnimeBuff(gl, eyeul, eyeulkss, 12);
	eyeurks = linearAnimeBuff(gl, eyeur, eyeurkss, 12);
	eyedlks = linearAnimeBuff(gl, eyedl, eyedlkss, 12);
	eyedrks = linearAnimeBuff(gl, eyedr, eyedrkss, 12);
	matugelks = linearAnimeBuff(gl, matugel, matugelkss, 12);
	matugerks = linearAnimeBuff(gl, matuger, matugerkss, 12);

	eyelashlks = linearAnimeBuff(gl, eyelashl, eyelashlkss, 12);
	eyelashslks = linearAnimeBuff(gl, eyelashsl, eyelashslkss, 12);
	eyelashrks = linearAnimeBuff(gl, eyelashr, eyelashrkss, 12);
	eyelashsrks = linearAnimeBuff(gl, eyelashsr, eyelashsrkss, 12);
	
	eyeulksb = linearAnimeBuff(gl, eyeulkss, eyeulc, 10);
	eyeurksb = linearAnimeBuff(gl, eyeurkss, eyeurc, 10);
	eyedlksb = linearAnimeBuff(gl, eyedlkss, eyedlc, 10);
	eyedrksb = linearAnimeBuff(gl, eyedrkss, eyedrc, 10);
	matugelksb = linearAnimeBuff(gl, matugelkss, matugelc, 10);
	matugerksb = linearAnimeBuff(gl, matugerkss, matugerc, 10);

	eyelashlksb = linearAnimeBuff(gl, eyelashlkss, eyelashlc, 10);
	eyelashslksb = linearAnimeBuff(gl, eyelashslkss, eyelashslc, 10);
	eyelashrksb = linearAnimeBuff(gl, eyelashrkss, eyelashrc, 10);
	eyelashsrksb = linearAnimeBuff(gl, eyelashsrkss, eyelashsrc, 10);
	
	mayugelks = linearAnimeBuff(gl, mayugeL, rotate(oval(-0.17, 0.21, 0.1, 0.11, 150, 30, false, [-0.17, 0.26]), 202, -0.17, 0.275), 12);
	mayugerks = linearAnimeBuff(gl, mayugeR, rotate(oval(0.14, 0.22, 0.1, 0.11, 150, 30, false, [0.14, 0.27]), -200, 0.14, 0.285), 12);
	
	mouthks = linearAnimeBuff(gl, mouth, zoom(mouth, 0.8, -0.2, 0, -0.195, true), 12);
	
	
	var eyeullcs = rotate(eyeul, -13, -0.1, -0.4, true);
	var eyeurlcs = rotate(eyeur, -13, -0.1, -0.4, true);
	var eyedllcs = rotate(eyedl, -13, -0.1, -0.4, true);
	var eyedrlcs = rotate(eyedr, -13, -0.1, -0.4, true);
	var matugellcs = rotate(matugel, -13, -0.1, -0.4, true);
	var matugerlcs = rotate(matuger, -13, -0.1, -0.4, true);

	var eyelashllcs = rotate(eyelashl, -13, -0.1, -0.4, true);
	var eyelashsllcs = rotate(eyelashsl, -13, -0.1, -0.4, true);
	var eyelashrlcs = rotate(eyelashr, -13, -0.1, -0.4, true);
	var eyelashsrlcs = rotate(eyelashsr, -13, -0.1, -0.4, true);
	
	eyeullcb = linearAnimeBuff(gl, eyeullcs, rotate(eyeulc, -13, -0.1, -0.4, true), 12);
	eyeurlcb = linearAnimeBuff(gl, eyeurlcs, rotate(eyeurc, -13, -0.1, -0.4, true), 12);
	eyedllcb = linearAnimeBuff(gl, eyedllcs, rotate(eyedlc, -13, -0.1, -0.4, true), 12);
	eyedrlcb = linearAnimeBuff(gl, eyedrlcs, rotate(eyedrc, -13, -0.1, -0.4, true), 12);
	matugellcb = linearAnimeBuff(gl, matugellcs, rotate(matugelc, -13, -0.1, -0.4, true), 12);
	matugerlcb = linearAnimeBuff(gl, matugerlcs, rotate(matugerc, -13, -0.1, -0.4, true), 12);

	eyelashllcb = linearAnimeBuff(gl, eyelashllcs, rotate(eyelashlc, -13, -0.1, -0.4, true), 12);
	eyelashsllcb = linearAnimeBuff(gl, eyelashsllcs, rotate(eyelashslc, -13, -0.1, -0.4, true), 12);
	eyelashrlcb = linearAnimeBuff(gl, eyelashrlcs, rotate(eyelashrc, -13, -0.1, -0.4, true), 12);
	eyelashsrlcb = linearAnimeBuff(gl, eyelashsrlcs, rotate(eyelashsrc, -13, -0.1, -0.4, true), 12);
	
	eyeullc = linearAnimeBuff(gl, eyeul, rotate(eyeulns, -13, -0.1, -0.4, true), 10);//eyeullcs, 10);
	eyeurlc = linearAnimeBuff(gl, eyeur, rotate(eyeurns, -13, -0.1, -0.4, true), 10);//eyeurlcs, 10);
	eyedllc = linearAnimeBuff(gl, eyedl, rotate(eyedlns, -13, -0.1, -0.4, true), 10);//eyedllcs, 10);
	eyedrlc = linearAnimeBuff(gl, eyedr, rotate(eyedrns, -13, -0.1, -0.4, true), 10);//eyedrlcs, 10);
	matugellc = linearAnimeBuff(gl, matugel, rotate(matugelns, -13, -0.1, -0.4, true), 10);//matugellcs, 10);
	matugerlc = linearAnimeBuff(gl, matuger, rotate(matugerns, -13, -0.1, -0.4, true), 10);//matugerlcs, 10);

	eyelashllc = linearAnimeBuff(gl, eyelashl, rotate(eyelashlns, -13, -0.1, -0.4, true), 10);//eyelashllcs, 10);
	eyelashsllc = linearAnimeBuff(gl, eyelashsl, rotate(eyelashslns, -13, -0.1, -0.4, true), 10);//eyelashsllcs, 10);
	eyelashrlc = linearAnimeBuff(gl, eyelashr, rotate(eyelashrns, -13, -0.1, -0.4, true), 10);//eyelashrlcs, 10);
	eyelashsrlc = linearAnimeBuff(gl, eyelashsr, rotate(eyelashsrns, -13, -0.1, -0.4, true), 10);//eyelashsrlcs, 10);
	
	eyeullck = linearAnimeBuff(gl, eyeul, eyeullcs, 10);
	//eyeurlck = linearAnimeBuff(gl, eyeur, eyeurlcs, 10);
	eyedllck = linearAnimeBuff(gl, eyedl, eyedllcs, 10);
	//eyedrlck = linearAnimeBuff(gl, eyedr, eyedrlcs, 10);
	matugellck = linearAnimeBuff(gl, matugel, matugellcs, 10);
	//matugerlck = linearAnimeBuff(gl, matuger, matugerlcs, 10);

	eyelashllck = linearAnimeBuff(gl, eyelashl, eyelashllcs, 10);
	eyelashsllck = linearAnimeBuff(gl, eyelashsl, eyelashsllcs, 10);
	//eyelashrlck = linearAnimeBuff(gl, eyelashr, eyelashrlcs, 10);
	//eyelashsrlck = linearAnimeBuff(gl, eyelashsr, eyelashsrlcs, 10);
	
	maeHairClc = linearAnimeBuff(gl, maeHairC, rotate(maeHairC, -13, -0.1, -0.4, true), 10);
	faceLineDRlc = linearAnimeBuff(gl, faceLineDR, rotate(faceLineDR, -13, -0.1, -0.4, true), 10);
	faceLineDLlc = linearAnimeBuff(gl, faceLineDL, rotate(faceLineDL, -13, -0.1, -0.4, true), 10);

	maeHairURlc = linearAnimeBuff(gl, maeHairUR, rotate(maeHairUR, -13, -0.1, -0.4, true), 10);
	maeHairULlc = linearAnimeBuff(gl, maeHairUL, rotate(maeHairUL, -13, -0.1, -0.4, true), 10);

	maeHairDRlc = linearAnimeBuff(gl, maeHairDR, rotate(maeHairDR, -13, -0.1, -0.4, true), 10);
	maeHairDLlc = linearAnimeBuff(gl, maeHairDL, rotate(maeHairDL, -13, -0.1, -0.4, true), 10);

	shitaHairLlc = linearAnimeBuff(gl, shitaHairL, rotate(shitaHairL, -13, -0.1, -0.4, true), 10);
	shitaHairRlc = linearAnimeBuff(gl, shitaHairR, rotate(shitaHairR, -13, -0.1, -0.4, true), 10);

	maeHairUDLlc = linearAnimeBuff(gl, maeHairUDL, rotate(maeHairUDL, -13, -0.1, -0.4, true), 10);
	maeHairUDRlc = linearAnimeBuff(gl, maeHairUDR, rotate(maeHairUDR, -13, -0.1, -0.4, true), 10);

	mayugeLlck = linearAnimeBuff(gl, mayugeL, rotate(mayugeL, -13, -0.1, -0.4, true), 10);
	mayugeLlc = linearAnimeBuff(gl, mayugeL, rotate(move(mayugeL, 0, -0.03, true), -13, -0.1, -0.4), 10);
	mayugeRlc = linearAnimeBuff(gl, mayugeR, rotate(move(mayugeR, 0.01, -0.03, true), -13, -0.1, -0.4), 10);

	hairCliplc = linearAnimeBuff(gl, hairClip, rotate(hairClip, -13, -0.1, -0.4, true), 10);

	flowerlc = linearAnimeBuff(gl, flower, rotate(flower, -13, -0.1, -0.4, true), 10);

	flowerCorelc = linearAnimeBuff(gl, flowerCore, rotate(flowerCore, -13, -0.1, -0.4, true), 10);

	eyellc = linearAnimeBuff(gl, eyel, rotate(eyel, -13, -0.1, -0.4, true), 10);
	eyerlc = linearAnimeBuff(gl, eyer, rotate(eyer, -13, -0.1, -0.4, true), 10); 

	eyeballllc = linearAnimeBuff(gl, eyeballl, rotate(eyeballl, -13, -0.1, -0.4, true), 10);
	eyeballrlc = linearAnimeBuff(gl, eyeballr, rotate(eyeballr, -13, -0.1, -0.4, true), 10);

	pupilllc = linearAnimeBuff(gl, pupill, rotate(pupill, -13, -0.1, -0.4, true), 10);
	pupilrlc = linearAnimeBuff(gl, pupilr, rotate(pupilr, -13, -0.1, -0.4, true), 10);

	kirallc = linearAnimeBuff(gl, kiral, rotate(kiral, -13, -0.1, -0.4, true), 10);
	kirarlc = linearAnimeBuff(gl, kirar, rotate(kirar, -13, -0.1, -0.4, true), 10);

	
	faceDRlc = linearAnimeBuff(gl, faceDR, rotate(faceDR, -13, -0.1, -0.4, true), 10);
	faceDLlc = linearAnimeBuff(gl, faceDL, rotate(faceDL, -13, -0.1, -0.4, true), 10);
	faceUlc = linearAnimeBuff(gl, faceU, rotate(faceU, -13, -0.1, -0.4, true), 10);

	faceDULlc = linearAnimeBuff(gl, faceDUL, rotate(faceDUL, -13, -0.1, -0.4, true), 10);
	faceDURlc = linearAnimeBuff(gl, faceDUR, rotate(faceDUR, -13, -0.1, -0.4, true), 10);
	faceUULlc = linearAnimeBuff(gl, faceUUL, rotate(faceUUL, -13, -0.1, -0.4, true), 10);
	faceUURlc = linearAnimeBuff(gl, faceUUR, rotate(faceUUR, -13, -0.1, -0.4, true), 10);

	noselc = linearAnimeBuff(gl, nose, rotate(nose, -13, -0.1, -0.4, true), 10);

	mouthlc = linearAnimeBuff(gl, mouth, rotate(mouth, -13, -0.1, -0.4, true), 10);
	
	necklc = linearAnimeBuff(gl, neck, mattrans([1, 0.14, 0, 0.95], neck, 0, -0.43, true), 10);
	
	backHairlc = linearAnimeBuff(gl, backHair, move(rotate(backHair, -5, 0, 0.5, true), 0.12, -0.04), 10);
	
	var eyeulrcs = rotate(eyeul, 13, 0.1, -0.4, true);
	var eyeurrcs = rotate(eyeur, 13, 0.1, -0.4, true);
	var eyedlrcs = rotate(eyedl, 13, 0.1, -0.4, true);
	var eyedrrcs = rotate(eyedr, 13, 0.1, -0.4, true);
	var matugelrcs = rotate(matugel, 13, 0.1, -0.4, true);
	var matugerrcs = rotate(matuger, 13, 0.1, -0.4, true);

	var eyelashlrcs = rotate(eyelashl, 13, 0.1, -0.4, true);
	var eyelashslrcs = rotate(eyelashsl, 13, 0.1, -0.4, true);
	var eyelashrrcs = rotate(eyelashr, 13, 0.1, -0.4, true);
	var eyelashsrrcs = rotate(eyelashsr, 13, 0.1, -0.4, true);
	
	eyeulrcb = linearAnimeBuff(gl, eyeulrcs, rotate(eyeurc, 13, 0.1, -0.4, true), 12);
	eyeurrcb = linearAnimeBuff(gl, eyeurrcs, rotate(eyeurc, 13, 0.1, -0.4, true), 12);
	eyedlrcb = linearAnimeBuff(gl, eyedlrcs, rotate(eyedrc, 13, 0.1, -0.4, true), 12);
	eyedrrcb = linearAnimeBuff(gl, eyedrrcs, rotate(eyedrc, 13, 0.1, -0.4, true), 12);
	matugelrcb = linearAnimeBuff(gl, matugelrcs, rotate(matugerc, 13, 0.1, -0.4, true), 12);
	matugerrcb = linearAnimeBuff(gl, matugerrcs, rotate(matugerc, 13, 0.1, -0.4, true), 12);

	eyelashlrcb = linearAnimeBuff(gl, eyelashlrcs, rotate(eyelashrc, 13, 0.1, -0.4, true), 12);
	eyelashslrcb = linearAnimeBuff(gl, eyelashslrcs, rotate(eyelashsrc, 13, 0.1, -0.4, true), 12);
	eyelashrrcb = linearAnimeBuff(gl, eyelashrrcs, rotate(eyelashrc, 13, 0.1, -0.4, true), 12);
	eyelashsrrcb = linearAnimeBuff(gl, eyelashsrrcs, rotate(eyelashsrc, 13, 0.1, -0.4, true), 12);
	
	eyeulrc = linearAnimeBuff(gl, eyeul, rotate(eyeulns, 13, 0.1, -0.4, true), 10);//eyeulrcs, 10);
	eyeurrc = linearAnimeBuff(gl, eyeur, rotate(eyeurns, 13, 0.1, -0.4, true), 10);//eyeurrcs, 10);
	eyedlrc = linearAnimeBuff(gl, eyedl, rotate(eyedlns, 13, 0.1, -0.4, true), 10);//eyedlrcs, 10);
	eyedrrc = linearAnimeBuff(gl, eyedr, rotate(eyedrns, 13, 0.1, -0.4, true), 10);//eyedrrcs, 10);
	matugelrc = linearAnimeBuff(gl, matugel, rotate(matugelns, 13, 0.1, -0.4, true), 10);//matugelrcs, 10);
	matugerrc = linearAnimeBuff(gl, matuger, rotate(matugerns, 13, 0.1, -0.4, true), 10);//matugerrcs, 10);

	eyelashlrc = linearAnimeBuff(gl, eyelashl, rotate(eyelashlns, 13, 0.1, -0.4, true), 10);//eyelashlrcs, 10);
	eyelashslrc = linearAnimeBuff(gl, eyelashsl, rotate(eyelashslns, 13, 0.1, -0.4, true), 10);//eyelashslrcs, 10);
	eyelashrrc = linearAnimeBuff(gl, eyelashr, rotate(eyelashrns, 13, 0.1, -0.4, true), 10);//eyelashrrcs, 10);
	eyelashsrrc = linearAnimeBuff(gl, eyelashsr, rotate(eyelashsrns, 13, 0.1, -0.4, true), 10);//eyelashsrrcs, 10);
	
	//eyeulrck = linearAnimeBuff(gl, eyeul, eyeulrcs, 10);
	eyeurrck = linearAnimeBuff(gl, eyeur, eyeurrcs, 10);
	//eyedlrck = linearAnimeBuff(gl, eyedl, eyedlrcs, 10);
	eyedrrck = linearAnimeBuff(gl, eyedr, eyedrrcs, 10);
	//matugelrck = linearAnimeBuff(gl, matugel, matugelrcs, 10);
	matugerrck = linearAnimeBuff(gl, matuger, matugerrcs, 10);

	//eyelashlrck = linearAnimeBuff(gl, eyelashl, eyelashlrcs, 10);
	//eyelashslrck = linearAnimeBuff(gl, eyelashsl, eyelashslrcs, 10);
	eyelashrrck = linearAnimeBuff(gl, eyelashr, eyelashrrcs, 10);
	eyelashsrrck = linearAnimeBuff(gl, eyelashsr, eyelashsrrcs, 10);
	
	maeHairCrc = linearAnimeBuff(gl, maeHairC, rotate(maeHairC, 13, 0.1, -0.4, true), 10);
	faceLineDRrc = linearAnimeBuff(gl, faceLineDR, rotate(faceLineDR, 13, 0.1, -0.4, true), 10);
	faceLineDLrc = linearAnimeBuff(gl, faceLineDL, rotate(faceLineDL, 13, 0.1, -0.4, true), 10);

	maeHairURrc = linearAnimeBuff(gl, maeHairUR, rotate(maeHairUR, 13, 0.1, -0.4, true), 10);
	maeHairULrc = linearAnimeBuff(gl, maeHairUL, rotate(maeHairUL, 13, 0.1, -0.4, true), 10);

	maeHairDRrc = linearAnimeBuff(gl, maeHairDR, rotate(maeHairDR, 13, 0.1, -0.4, true), 10);
	maeHairDLrc = linearAnimeBuff(gl, maeHairDL, rotate(maeHairDL, 13, 0.1, -0.4, true), 10);

	shitaHairLrc = linearAnimeBuff(gl, shitaHairL, rotate(shitaHairL, 13, 0.1, -0.4, true), 10);
	shitaHairRrc = linearAnimeBuff(gl, shitaHairR, rotate(shitaHairR, 13, 0.1, -0.4, true), 10);

	maeHairUDLrc = linearAnimeBuff(gl, maeHairUDL, rotate(maeHairUDL, 13, 0.1, -0.4, true), 10);
	maeHairUDRrc = linearAnimeBuff(gl, maeHairUDR, rotate(maeHairUDR, 13, 0.1, -0.4, true), 10);

	mayugeLrc = linearAnimeBuff(gl, mayugeL, rotate(move(mayugeL, 0, -0.03, true), 13, 0.1, -0.4), 10);
	mayugeRrck = linearAnimeBuff(gl, mayugeR, rotate(mayugeR, 13, 0.1, -0.4, true), 10);
	mayugeRrc = linearAnimeBuff(gl, mayugeR, rotate(move(mayugeR, 0.01, -0.03, true), 13, 0.1, -0.4), 10);

	hairCliprc = linearAnimeBuff(gl, hairClip, rotate(hairClip, 13, 0.1, -0.4, true), 10);

	flowerrc = linearAnimeBuff(gl, flower, rotate(flower, 13, 0.1, -0.4, true), 10);

	flowerCorerc = linearAnimeBuff(gl, flowerCore, rotate(flowerCore, 13, 0.1, -0.4, true), 10);

	eyelrc = linearAnimeBuff(gl, eyel, rotate(eyel, 13, 0.1, -0.4, true), 10);
	eyerrc = linearAnimeBuff(gl, eyer, rotate(eyer, 13, 0.1, -0.4, true), 10); 

	eyeballlrc = linearAnimeBuff(gl, eyeballl, rotate(eyeballl, 13, 0.1, -0.4, true), 10);
	eyeballrrc = linearAnimeBuff(gl, eyeballr, rotate(eyeballr, 13, 0.1, -0.4, true), 10);

	pupillrc = linearAnimeBuff(gl, pupill, rotate(pupill, 13, 0.1, -0.4, true), 10);
	pupilrrc = linearAnimeBuff(gl, pupilr, rotate(pupilr, 13, 0.1, -0.4, true), 10);

	kiralrc = linearAnimeBuff(gl, kiral, rotate(kiral, 13, 0.1, -0.4, true), 10);
	kirarrc = linearAnimeBuff(gl, kirar, rotate(kirar, 13, 0.1, -0.4, true), 10);

	
	faceDRrc = linearAnimeBuff(gl, faceDR, rotate(faceDR, 13, 0.1, -0.4, true), 10);
	faceDLrc = linearAnimeBuff(gl, faceDL, rotate(faceDL, 13, 0.1, -0.4, true), 10);
	faceUrc = linearAnimeBuff(gl, faceU, rotate(faceU, 13, 0.1, -0.4, true), 10);

	faceDULrc = linearAnimeBuff(gl, faceDUL, rotate(faceDUL, 13, 0.1, -0.4, true), 10);
	faceDURrc = linearAnimeBuff(gl, faceDUR, rotate(faceDUR, 13, 0.1, -0.4, true), 10);
	faceUULrc = linearAnimeBuff(gl, faceUUL, rotate(faceUUL, 13, 0.1, -0.4, true), 10);
	faceUURrc = linearAnimeBuff(gl, faceUUR, rotate(faceUUR, 13, 0.1, -0.4, true), 10);

	noserc = linearAnimeBuff(gl, nose, rotate(nose, 13, 0.1, -0.4, true), 10);

	mouthrc = linearAnimeBuff(gl, mouth, rotate(mouth, 13, 0.1, -0.4, true), 10);
	
	neckrc = linearAnimeBuff(gl, neck, mattrans([1, -0.14, 0, 0.95], neck, 0, -0.43, true), 10);
	
	backHairrc = linearAnimeBuff(gl, backHair, move(rotate(backHair, 5, 0, 0.5, true), -0.12, -0.04), 10);
	
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
	
	var l = getQueryString("l");
	
	if(l == "cn") {
		addAction("blink", "正常");
		addAction("nico", "微笑");
		addAction("kanashii", "伤心");
		addAction("oko", "生气");
		addAction("crookl", "wink（右）");
		addAction("kiral", "wink（右）");
		addAction("crookr", "wink（左）");
		addAction("kirar", "wink（左）");
	} else if(l == "jp" || l == null) {
		addAction("blink", "普通");
		addAction("nico", "ニコ");
		addAction("kanashii", "悲しい");
		addAction("oko", "怒る");
		addAction("crookl", "ウインク（右）");
		addAction("kiral", "ウインク（右）");
		addAction("crookr", "ウインク（左）");
		addAction("kirar", "ウインク（左）");
	}
	document.getElementById("blink").setAttribute("checked", "checked");

	document.getElementById("blink").onclick=function(){action(bn)};
	document.getElementById("nico").onclick=function(){action(nn)};
	document.getElementById("kanashii").onclick=function(){action(ksn)};
	document.getElementById("oko").onclick=function(){action(on)};
	document.getElementById("crookl").onclick=function(){action(lcn)};
	document.getElementById("kiral").onclick=function(){action(lckn)};
	document.getElementById("crookr").onclick=function(){action(rcn)};
	document.getElementById("kirar").onclick=function(){action(rckn)};
	
	actionMarks[bn] = true;
	timeMark[bn] = setTimeout("blink()", Math.random() * 3000);
	
	drawAll();
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

var maeHairClc;
var faceLineDRlc;
var faceLineDLlc;
    
var maeHairURlc;
var maeHairULlc;
    
var maeHairDRlc;
var maeHairDLlc;
    
var shitaHairLlc;
var shitaHairRlc;
    
var maeHairUDLlc;
var maeHairUDRlc;
    
var mayugeLlc;
var mayugeRlc;
    
var hairCliplc;
    
var flowerlc;
    
var flowerCorelc;
    
var eyellc;
var eyerlc; 
    
var eyeballllc;
var eyeballrlc;
    
var pupilllc;
var pupilrlc;
    
var kirallc;
var kirarlc;
    
	 
var faceDRlc;
var faceDLlc;
var faceUlc;
    
var faceDULlc;
var faceDURlc;
var faceUULlc;
var faceUURlc;
    
var noselc;
    
var mouthlc;

var eyeullc;
var eyeurlc;
var eyedllc;
var eyedrlc;
var matugellc;
var matugerlc;

var eyelashllc;
var eyelashsllc;
var eyelashrlc;
var eyelashsrlc;

var necklc;

var backHairlc;

var lci = 0;
var lcb = false;
var lcn = register(false, 0, crookl, anticrookl);


function crookl() {
	if(!lcb) {
		maeHairC = maeHairClc[lci];
		faceLineDR = faceLineDRlc[lci];
		faceLineDL = faceLineDLlc[lci];
			
		maeHairUR = maeHairURlc[lci];
		maeHairUL = maeHairULlc[lci];
			
		maeHairDR = maeHairDRlc[lci];
		maeHairDL = maeHairDLlc[lci];
			
		shitaHairL = shitaHairLlc[lci];
		shitaHairR = shitaHairRlc[lci];
			
		maeHairUDL = maeHairUDLlc[lci];
		maeHairUDR = maeHairUDRlc[lci];
			
		mayugeL = mayugeLlc[lci];
		mayugeR = mayugeRlc[lci];
			
		hairClip = hairCliplc[lci];
			
		flower = flowerlc[lci];
			
		flowerCore = flowerCorelc[lci];
			
		eyel = eyellc[lci];
		eyer = eyerlc[lci]; 
			
		eyeballl = eyeballllc[lci];
		eyeballr = eyeballrlc[lci];
			
		pupill = pupilllc[lci];
		pupilr = pupilrlc[lci];
			
		kiral = kirallc[lci];
		kirar = kirarlc[lci];
			
			 
		faceDR = faceDRlc[lci];
		faceDL = faceDLlc[lci];
		faceU = faceUlc[lci];
			
		faceDUL = faceDULlc[lci];
		faceDUR = faceDURlc[lci];
		faceUUL = faceUULlc[lci];
		faceUUR = faceUURlc[lci];
			
		nose = noselc[lci];
			
		mouth = mouthlc[lci];
		
		backHair = backHairlc[lci];

		eyeul = eyeullc[lci];
		eyeur = eyeurlc[lci];
		eyedl = eyedllc[lci];
		eyedr = eyedrlc[lci];
		matugel = matugellc[lci];
		matuger = matugerlc[lci];
		eyelashl = eyelashllc[lci];
		eyelashsl = eyelashsllc[lci];
		eyelashr = eyelashrlc[lci];
		eyelashsr = eyelashsrlc[lci];
		
		neck = necklc[lci];
		
		if(++lci == eyeullc.length)
		{
			lcb = actionMarks[lcn] = true;
			lci -= 1;
			drawAll();
			//timeMark[lcn] = setTimeout("crooklblink()", Math.random() * 3000  + 200);
			return;
		}
		timeMark[lcn] = setTimeout("crookl()", 1000/60);
		drawAll();
	}
}

var eyeullcb;
var eyeurlcb;
var eyedllcb;
var eyedrlcb;
var matugellcb;
var matugerlcb;
var eyelashllcb;
var eyelashsllcb;
var eyelashrlcb;
var eyelashsrlcb;

var lcbi = 0;
var lcbb = false;

function crooklblink() {
	eyeul = eyeullcb[lcbi];
	//eyeur = eyeurlcb[lcbi];
	eyedl = eyedllcb[lcbi];
	//eyedr = eyedrlcb[lcbi];
	matugel = matugellcb[lcbi];
	//matuger = matugerlcb[lcbi];
	eyelashl = eyelashllcb[lcbi];
	eyelashsl = eyelashsllcb[lcbi];
	//eyelashr = eyelashrlcb[lcbi];
	//eyelashsr = eyelashsrlcb[lcbi];
	if(!lcbb) {
		if(++lcbi == matugellcb.length)
		{
			lcbb = true;
			lcbi-=1;
		}
	}
	else {
		if(--lcbi == -1)
		{
			lcbb = false;
			lcbi=0;
			timeMark[lckn] = setTimeout("crooklblink()", Math.random() * 3000  + 200);
			drawAll();
			return;
		}
	}
	timeMark[lckn] = setTimeout("crooklblink()", 1000/60);
	drawAll();
}

function anticrookl(callback) {
	lcb = false;
	maeHairC = maeHairClc[lci];
	faceLineDR = faceLineDRlc[lci];
	faceLineDL = faceLineDLlc[lci];
		
	maeHairUR = maeHairURlc[lci];
	maeHairUL = maeHairULlc[lci];
		
	maeHairDR = maeHairDRlc[lci];
	maeHairDL = maeHairDLlc[lci];
		
	shitaHairL = shitaHairLlc[lci];
	shitaHairR = shitaHairRlc[lci];
		
	maeHairUDL = maeHairUDLlc[lci];
	maeHairUDR = maeHairUDRlc[lci];
		
	mayugeL = mayugeLlc[lci];
	mayugeR = mayugeRlc[lci];
		
	hairClip = hairCliplc[lci];
		
	flower = flowerlc[lci];
		
	flowerCore = flowerCorelc[lci];
		
	eyel = eyellc[lci];
	eyer = eyerlc[lci]; 
		
	eyeballl = eyeballllc[lci];
	eyeballr = eyeballrlc[lci];
		
	pupill = pupilllc[lci];
	pupilr = pupilrlc[lci];
		
	kiral = kirallc[lci];
	kirar = kirarlc[lci];
		
		 
	faceDR = faceDRlc[lci];
	faceDL = faceDLlc[lci];
	faceU = faceUlc[lci];
		
	faceDUL = faceDULlc[lci];
	faceDUR = faceDURlc[lci];
	faceUUL = faceUULlc[lci];
	faceUUR = faceUURlc[lci];
		
	nose = noselc[lci];
	
	backHair = backHairlc[lci];
		
	mouth = mouthlc[lci];
	eyeul = eyeullc[lci];
	eyeur = eyeurlc[lci];
	eyedl = eyedllc[lci];
	eyedr = eyedrlc[lci];
	matugel = matugellc[lci];
	matuger = matugerlc[lci];
	eyelashl = eyelashllc[lci];
	eyelashsl = eyelashsllc[lci];
	eyelashr = eyelashrlc[lci];
	eyelashsr = eyelashsrlc[lci];
		
	neck = necklc[lci];
	
	if(--lci == -1)
	{
		actionMarks[lcn] = false;
		lci=0;
		drawAll();
		callback();
		return true;
	}
	drawAll();
	timeMark[lcn] = setTimeout("anticrookl(" + callback + ")", 1000/60);
	return false;
}

var eyeullck;
var eyedllck;
var matugellck;

var eyelashllck;
var eyelashsllck;

var mayugeLlck;

var lcki = 0;
var lckb = false;
var lckn = register(false, 0, croolkiral, antikiral);


function croolkiral() {
	if(!lckb) {
		maeHairC = maeHairClc[lcki];
		faceLineDR = faceLineDRlc[lcki];
		faceLineDL = faceLineDLlc[lcki];
			
		maeHairUR = maeHairURlc[lcki];
		maeHairUL = maeHairULlc[lcki];
		
		maeHairDR = maeHairDRlc[lcki];
		maeHairDL = maeHairDLlc[lcki];
			
		shitaHairL = shitaHairLlc[lcki];
		shitaHairR = shitaHairRlc[lcki];
			
		maeHairUDL = maeHairUDLlc[lcki];
		maeHairUDR = maeHairUDRlc[lcki];
			
		mayugeL = mayugeLlck[lcki];
		mayugeR = mayugeRlc[lcki];
			
		hairClip = hairCliplc[lcki];
			
		flower = flowerlc[lcki];
			
		flowerCore = flowerCorelc[lcki];
			
		eyel = eyellc[lcki];
		eyer = eyerlc[lcki]; 
			
		eyeballl = eyeballllc[lcki];
		eyeballr = eyeballrlc[lcki];
			
		pupill = pupilllc[lcki];
		pupilr = pupilrlc[lcki];
			
		kiral = kirallc[lcki];
		kirar = kirarlc[lcki];
			
			 
		faceDR = faceDRlc[lcki];
		faceDL = faceDLlc[lcki];
		faceU = faceUlc[lcki];
			
		faceDUL = faceDULlc[lcki];
		faceDUR = faceDURlc[lcki];
		faceUUL = faceUULlc[lcki];
		faceUUR = faceUURlc[lcki];
			
		nose = noselc[lcki];
			
		mouth = mouthlc[lcki];
		
		backHair = backHairlc[lcki];

		eyeul = eyeullck[lcki];
		eyeur = eyeurlc[lcki];
		eyedl = eyedllck[lcki];
		eyedr = eyedrlc[lcki];
		matugel = matugellck[lcki];
		matuger = matugerlc[lcki];
		eyelashl = eyelashllck[lcki];
		eyelashsl = eyelashsllck[lcki];
		eyelashr = eyelashrlc[lcki];
		eyelashsr = eyelashsrlc[lcki];
		
		neck = necklc[lcki];
		
		if(++lcki == eyeullc.length)
		{
			lckb = actionMarks[lckn] = true;
			lcki -= 1;
			drawAll();
			timeMark[lckn] = setTimeout("crooklblink()", Math.random() * 3000  + 200);
			return;
		}
		timeMark[lckn] = setTimeout("croolkiral()", 1000/60);
		drawAll();
	}
}

function antikiral(callback) {
	lckb = false;
	maeHairC = maeHairClc[lcki];
	faceLineDR = faceLineDRlc[lcki];
	faceLineDL = faceLineDLlc[lcki];
		
	maeHairUR = maeHairURlc[lcki];
	maeHairUL = maeHairULlc[lcki];
		
	maeHairDR = maeHairDRlc[lcki];
	maeHairDL = maeHairDLlc[lcki];
		
	shitaHairL = shitaHairLlc[lcki];
	shitaHairR = shitaHairRlc[lcki];
		
	maeHairUDL = maeHairUDLlc[lcki];
	maeHairUDR = maeHairUDRlc[lcki];
		
	mayugeL = mayugeLlck[lcki];
	mayugeR = mayugeRlc[lcki];
		
	hairClip = hairCliplc[lcki];
		
	flower = flowerlc[lcki];
		
	flowerCore = flowerCorelc[lcki];
		
	eyel = eyellc[lcki];
	eyer = eyerlc[lcki]; 
		
	eyeballl = eyeballllc[lcki];
	eyeballr = eyeballrlc[lcki];
		
	pupill = pupilllc[lcki];
	pupilr = pupilrlc[lcki];
		
	kiral = kirallc[lcki];
	kirar = kirarlc[lcki];
		
		 
	faceDR = faceDRlc[lcki];
	faceDL = faceDLlc[lcki];
	faceU = faceUlc[lcki];
		
	faceDUL = faceDULlc[lcki];
	faceDUR = faceDURlc[lcki];
	faceUUL = faceUULlc[lcki];
	faceUUR = faceUURlc[lcki];
		
	nose = noselc[lcki];
	
	backHair = backHairlc[lcki];
		
	mouth = mouthlc[lcki];
	eyeul = eyeullck[lcki];
	eyeur = eyeurlc[lcki];
	eyedl = eyedllck[lcki];
	eyedr = eyedrlc[lcki];
	matugel = matugellck[lcki];
	matuger = matugerlc[lcki];
	eyelashl = eyelashllck[lcki];
	eyelashsl = eyelashsllck[lcki];
	eyelashr = eyelashrlc[lcki];
	eyelashsr = eyelashsrlc[lcki];
		
	neck = necklc[lcki];
	
	if(--lcki == -1)
	{
		actionMarks[lckn] = false;
		lcki=0;
		drawAll();
		callback();
		return true;
	}
	drawAll();
	timeMark[lckn] = setTimeout("antikiral(" + callback + ")", 1000/60);
	return false;
}

var maeHairCrc;
var faceLineDRrc;
var faceLineDLrc;
    
var maeHairURrc;
var maeHairULrc;
    
var maeHairDRrc;
var maeHairDLrc;
    
var shitaHairLrc;
var shitaHairRrc;
    
var maeHairUDLrc;
var maeHairUDRrc;
    
var mayugeLrc;
var mayugeRrc;
    
var hairCliprc;
    
var flowerrc;
    
var flowerCorerc;
    
var eyelrc;
var eyerrc; 
    
var eyeballlrc;
var eyeballrrc;
    
var pupillrc;
var pupilrrc;
    
var kiralrc;
var kirarrc;
    
	 
var faceDRrc;
var faceDLrc;
var faceUrc;
    
var faceDULrc;
var faceDURrc;
var faceUULrc;
var faceUURrc;
    
var noserc;
    
var mouthrc;

var eyeulrc;
var eyeurrc;
var eyedlrc;
var eyedrrc;
var matugelrc;
var matugerrc;

var eyelashlrc;
var eyelashslrc;
var eyelashrrc;
var eyelashsrrc;

var neckrc;

var backHairrc;

var rci = 0;
var rcb = false;
var rcn = register(false, 0, crookr, anticrookr);


function crookr() {
	if(!rcb) {
		maeHairC = maeHairCrc[rci];
		faceLineDR = faceLineDRrc[rci];
		faceLineDL = faceLineDLrc[rci];
			
		maeHairUR = maeHairURrc[rci];
		maeHairUL = maeHairULrc[rci];
			
		maeHairDR = maeHairDRrc[rci];
		maeHairDL = maeHairDLrc[rci];
			
		shitaHairL = shitaHairLrc[rci];
		shitaHairR = shitaHairRrc[rci];
			
		maeHairUDL = maeHairUDLrc[rci];
		maeHairUDR = maeHairUDRrc[rci];
			
		mayugeL = mayugeLrc[rci];
		mayugeR = mayugeRrc[rci];
			
		hairClip = hairCliprc[rci];
			
		flower = flowerrc[rci];
			
		flowerCore = flowerCorerc[rci];
			
		eyel = eyelrc[rci];
		eyer = eyerrc[rci]; 
			
		eyeballl = eyeballlrc[rci];
		eyeballr = eyeballrrc[rci];
			
		pupill = pupillrc[rci];
		pupilr = pupilrrc[rci];
			
		kiral = kiralrc[rci];
		kirar = kirarrc[rci];
			
			 
		faceDR = faceDRrc[rci];
		faceDL = faceDLrc[rci];
		faceU = faceUrc[rci];
			
		faceDUL = faceDULrc[rci];
		faceDUR = faceDURrc[rci];
		faceUUL = faceUULrc[rci];
		faceUUR = faceUURrc[rci];
			
		nose = noserc[rci];
			
		mouth = mouthrc[rci];
		
		backHair = backHairrc[rci];

		eyeul = eyeulrc[rci];
		eyeur = eyeurrc[rci];
		eyedl = eyedlrc[rci];
		eyedr = eyedrrc[rci];
		matugel = matugelrc[rci];
		matuger = matugerrc[rci];
		eyelashl = eyelashlrc[rci];
		eyelashsl = eyelashslrc[rci];
		eyelashr = eyelashrrc[rci];
		eyelashsr = eyelashsrrc[rci];
		
		neck = neckrc[rci];
		
		if(++rci == eyeulrc.length)
		{
			rcb = actionMarks[rcn] = true;
			rci -= 1;
			drawAll();
			//timeMark[rcn] = setTimeout("crookrblink()", Math.random() * 3000  + 200);
			return;
		}
		timeMark[rcn] = setTimeout("crookr()", 1000/60);
		drawAll();
	}
}

var eyeulrcb;
var eyeurrcb;
var eyedlrcb;
var eyedrrcb;
var matugelrcb;
var matugerrcb;
var eyelashlrcb;
var eyelashslrcb;
var eyelashrrcb;
var eyelashsrrcb;

var rcbi = 0;
var rcbb = false;

function crookrblink() {
	//eyeul = eyeulrcb[rcbi];
	eyeur = eyeurrcb[rcbi];
	//eyedl = eyedlrcb[rcbi];
	eyedr = eyedrrcb[rcbi];
	//matugel = matugelrcb[rcbi];
	matuger = matugerrcb[rcbi];
	//eyelashl = eyelashlrcb[rcbi];
	//eyelashsl = eyelashslrcb[rcbi];
	eyelashr = eyelashrrcb[rcbi];
	eyelashsr = eyelashsrrcb[rcbi];
	if(!rcbb) {
		if(++rcbi == matugelrcb.length)
		{
			rcbb = true;
			rcbi-=1;
		}
	}
	else {
		if(--rcbi == -1)
		{
			rcbb = false;
			rcbi=0;
			timeMark[rckn] = setTimeout("crookrblink()", Math.random() * 3000  + 200);
			drawAll();
			return;
		}
	}
	timeMark[rckn] = setTimeout("crookrblink()", 1000/60);
	drawAll();
}

function anticrookr(callback) {
	rcb = false;
	maeHairC = maeHairCrc[rci];
	faceLineDR = faceLineDRrc[rci];
	faceLineDL = faceLineDLrc[rci];
		
	maeHairUR = maeHairURrc[rci];
	maeHairUL = maeHairULrc[rci];
		
	maeHairDR = maeHairDRrc[rci];
	maeHairDL = maeHairDLrc[rci];
		
	shitaHairL = shitaHairLrc[rci];
	shitaHairR = shitaHairRrc[rci];
		
	maeHairUDL = maeHairUDLrc[rci];
	maeHairUDR = maeHairUDRrc[rci];
		
	mayugeL = mayugeLrc[rci];
	mayugeR = mayugeRrc[rci];
		
	hairClip = hairCliprc[rci];
		
	flower = flowerrc[rci];
		
	flowerCore = flowerCorerc[rci];
		
	eyel = eyelrc[rci];
	eyer = eyerrc[rci]; 
		
	eyeballl = eyeballlrc[rci];
	eyeballr = eyeballrrc[rci];
		
	pupill = pupillrc[rci];
	pupilr = pupilrrc[rci];
		
	kiral = kiralrc[rci];
	kirar = kirarrc[rci];
		
		 
	faceDR = faceDRrc[rci];
	faceDL = faceDLrc[rci];
	faceU = faceUrc[rci];
		
	faceDUL = faceDULrc[rci];
	faceDUR = faceDURrc[rci];
	faceUUL = faceUULrc[rci];
	faceUUR = faceUURrc[rci];
		
	nose = noserc[rci];
	
	backHair = backHairrc[rci];
		
	mouth = mouthrc[rci];
	eyeul = eyeulrc[rci];
	eyeur = eyeurrc[rci];
	eyedl = eyedlrc[rci];
	eyedr = eyedrrc[rci];
	matugel = matugelrc[rci];
	matuger = matugerrc[rci];
	eyelashl = eyelashlrc[rci];
	eyelashsl = eyelashslrc[rci];
	eyelashr = eyelashrrc[rci];
	eyelashsr = eyelashsrrc[rci];
		
	neck = neckrc[rci];
	
	if(--rci == -1)
	{
		actionMarks[rcn] = false;
		rci=0;
		drawAll();
		callback();
		return true;
	}
	drawAll();
	timeMark[rcn] = setTimeout("anticrookr(" + callback + ")", 1000/60);
	return false;
}

var eyeurrck;
var eyedrrck;
var matugerrck;

var eyelashrrck;
var eyelashsrrck;

var mayugeRrck;

var rcki = 0;
var rckb = false;
var rckn = register(false, 0, croolkirar, antikirar);


function croolkirar() {
	if(!rckb) {
		maeHairC = maeHairCrc[rcki];
		faceLineDR = faceLineDRrc[rcki];
		faceLineDL = faceLineDLrc[rcki];
			
		maeHairUR = maeHairURrc[rcki];
		maeHairUL = maeHairULrc[rcki];
		
		maeHairDR = maeHairDRrc[rcki];
		maeHairDL = maeHairDLrc[rcki];
			
		shitaHairL = shitaHairLrc[rcki];
		shitaHairR = shitaHairRrc[rcki];
			
		maeHairUDL = maeHairUDLrc[rcki];
		maeHairUDR = maeHairUDRrc[rcki];
			
		mayugeL = mayugeLrc[rcki];
		mayugeR = mayugeRrck[rcki];
			
		hairClip = hairCliprc[rcki];
			
		flower = flowerrc[rcki];
			
		flowerCore = flowerCorerc[rcki];
			
		eyel = eyelrc[rcki];
		eyer = eyerrc[rcki]; 
			
		eyeballl = eyeballlrc[rcki];
		eyeballr = eyeballrrc[rcki];
			
		pupill = pupillrc[rcki];
		pupilr = pupilrrc[rcki];
			
		kiral = kiralrc[rcki];
		kirar = kirarrc[rcki];
			
			 
		faceDR = faceDRrc[rcki];
		faceDL = faceDLrc[rcki];
		faceU = faceUrc[rcki];
			
		faceDUL = faceDULrc[rcki];
		faceDUR = faceDURrc[rcki];
		faceUUL = faceUULrc[rcki];
		faceUUR = faceUURrc[rcki];
			
		nose = noserc[rcki];
			
		mouth = mouthrc[rcki];
		
		backHair = backHairrc[rcki];

		eyeul = eyeulrc[rcki];
		eyeur = eyeurrck[rcki];
		eyedl = eyedlrc[rcki];
		eyedr = eyedrrck[rcki];
		matugel = matugelrc[rcki];
		matuger = matugerrck[rcki];
		eyelashl = eyelashlrc[rcki];
		eyelashsl = eyelashslrc[rcki];
		eyelashr = eyelashrrck[rcki];
		eyelashsr = eyelashsrrck[rcki];
		
		neck = neckrc[rcki];
		
		if(++rcki == eyeulrc.length)
		{
			rckb = actionMarks[rckn] = true;
			rcki -= 1;
			drawAll();
			timeMark[rckn] = setTimeout("crookrblink()", Math.random() * 3000  + 200);
			return;
		}
		timeMark[rckn] = setTimeout("croolkirar()", 1000/60);
		drawAll();
	}
}

function antikirar(callback) {
	rckb = false;
	maeHairC = maeHairCrc[rcki];
	faceLineDR = faceLineDRrc[rcki];
	faceLineDL = faceLineDLrc[rcki];
		
	maeHairUR = maeHairURrc[rcki];
	maeHairUL = maeHairULrc[rcki];
		
	maeHairDR = maeHairDRrc[rcki];
	maeHairDL = maeHairDLrc[rcki];
		
	shitaHairL = shitaHairLrc[rcki];
	shitaHairR = shitaHairRrc[rcki];
		
	maeHairUDL = maeHairUDLrc[rcki];
	maeHairUDR = maeHairUDRrc[rcki];
		
	mayugeL = mayugeLrc[rcki];
	mayugeR = mayugeRrck[rcki];
		
	hairClip = hairCliprc[rcki];
		
	flower = flowerrc[rcki];
		
	flowerCore = flowerCorerc[rcki];
		
	eyel = eyelrc[rcki];
	eyer = eyerrc[rcki]; 
		
	eyeballl = eyeballlrc[rcki];
	eyeballr = eyeballrrc[rcki];
		
	pupill = pupillrc[rcki];
	pupilr = pupilrrc[rcki];
		
	kiral = kiralrc[rcki];
	kirar = kirarrc[rcki];
		
		 
	faceDR = faceDRrc[rcki];
	faceDL = faceDLrc[rcki];
	faceU = faceUrc[rcki];
		
	faceDUL = faceDULrc[rcki];
	faceDUR = faceDURrc[rcki];
	faceUUL = faceUULrc[rcki];
	faceUUR = faceUURrc[rcki];
		
	nose = noserc[rcki];
	
	backHair = backHairrc[rcki];
		
	mouth = mouthrc[rcki];
	eyeul = eyeulrc[rcki];
	eyeur = eyeurrck[rcki];
	eyedl = eyedlrc[rcki];
	eyedr = eyedrrck[rcki];
	matugel = matugelrc[rcki];
	matuger = matugerrck[rcki];
	eyelashl = eyelashlrc[rcki];
	eyelashsl = eyelashslrc[rcki];
	eyelashr = eyelashrrck[rcki];
	eyelashsr = eyelashsrrck[rcki];
		
	neck = neckrc[rcki];
	
	if(--rcki == -1)
	{
		actionMarks[rckn] = false;
		rcki=0;
		drawAll();
		callback();
		return true;
	}
	drawAll();
	timeMark[rckn] = setTimeout("antikirar(" + callback + ")", 1000/60);
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
	if(!ob) {
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
	ob = false;
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

var eyeulks;
var eyeurks;
var eyedlks;
var eyedrks;
var matugelks;
var matugerks;
var eyelashlks;
var eyelashslks;
var eyelashrks;
var eyelashsrks;
var mayugelks;
var mayugerks;
var mouthks;

var ksi = 0;
var ksb = false;
var ksn = register(false, 0, kanashii, antikanashii);

function kanashii() {
	if(!ksb) {
		eyeul = eyeulks[ksi];
		eyeur = eyeurks[ksi];
		eyedl = eyedlks[ksi];
		eyedr = eyedrks[ksi];
		matugel = matugelks[ksi];
		matuger = matugerks[ksi];
		eyelashl = eyelashlks[ksi];
		eyelashsl = eyelashslks[ksi];
		eyelashr = eyelashrks[ksi];
		eyelashsr = eyelashsrks[ksi];
		mayugeL = mayugelks[ksi];
		mayugeR = mayugerks[ksi];
		mouth = mouthks[ksi];
		if(++ksi == mayugelks.length)
		{
			ksb = actionMarks[ksn] = true;
			ksi -= 1;
			timeMark[ksn] = setTimeout("kanashiiblink()", Math.random() * 3000  + 200);
			drawAll();
			return;
		}
		timeMark[ksn] = setTimeout("kanashii()", 1000/60);
		drawAll();
	}
}

var eyeulksb;
var eyeurksb;
var eyedlksb;
var eyedrksb;
var matugelksb;
var matugerksb;
var eyelashlksb;
var eyelashslksb;
var eyelashrksb;
var eyelashsrksb;

var ksbi = 0;
var ksbb = false;

function kanashiiblink() {
	eyeul = eyeulksb[ksbi];
	eyeur = eyeurksb[ksbi];
	eyedl = eyedlksb[ksbi];
	eyedr = eyedrksb[ksbi];
	matugel = matugelksb[ksbi];
	matuger = matugerksb[ksbi];
	eyelashl = eyelashlksb[ksbi];
	eyelashsl = eyelashslksb[ksbi];
	eyelashr = eyelashrksb[ksbi];
	eyelashsr = eyelashsrksb[ksbi];
	if(!ksbb) {
		if(++ksbi == matugelksb.length)
		{
			ksbb = true;
			ksbi-=2;
		}
	}
	else {
		if(--ksbi == -1)
		{
			ksbb = false;
			ksbi=0;
			timeMark[ksn] = setTimeout("kanashiiblink()", Math.random() * 3000  + 200);
			drawAll();
			return;
		}
	}
	timeMark[ksn] = setTimeout("kanashiiblink()", 1000/60);
	drawAll();
}

function antikanashii(callback) {
	ksb = false;
	eyeul = eyeulks[ksi];
	eyeur = eyeurks[ksi];
	eyedl = eyedlks[ksi];
	eyedr = eyedrks[ksi];
	matugel = matugelks[ksi];
	matuger = matugerks[ksi];
	eyelashl = eyelashlks[ksi];
	eyelashsl = eyelashslks[ksi];
	eyelashr = eyelashrks[ksi];
	eyelashsr = eyelashsrks[ksi];
	mayugeL = mayugelks[ksi];
	mayugeR = mayugerks[ksi];
	mouth = mouthks[ksi];
	if(--ksi == -1)
	{
		actionMarks[ksn] = false;
		ksi=0;
		drawAll();
		callback();
		return true;
	}
	drawAll();
	timeMark[ksn] = setTimeout("antikanashii(" + callback + ")", 1000/60);
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
	
	//enableColorBuff(gl, program, line, "vColor");
	//render(enablePositionBuff(gl, program, positionBuff(gl, rotate(getPoints(function(x){return (9 * x) ** 10}, -0.18, -0.43, 0, 0.1, false), 10, -0.18, -0.43), "vPosition")), gl.LINE_STRIP, 0, 61);
	//render(enablePositionBuff(gl, program, positionBuff(gl, rotate(getPoints(function(x){return (9 * x) ** 10;}, 0.18, -0.43, 0, -0.1, false), -10, 0.18, -0.43), "vPosition")), gl.LINE_STRIP, 0, 61);
	
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
	//enableColorBuff(gl, program, black, "vColor");
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
	render(enablePositionBuff(gl, program, eyelashsl, "vPosition"), gl.LINES, 0, 6);
	render(enablePositionBuff(gl, program, eyelashr, "vPosition"), gl.LINE_STRIP, 0, 61);
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