var gl;
var points;

var program;

var black = getColors(0, 0, 0, 1, 1024);
var white = getColors(1, 1, 1, 1, 1024);
var line = getColors(203/255, 167/255, 133/255, 1, 1024);

var backColor = getColors(1, 184/255, 102/255, 1, 122);
var clothesBColor = getColors(0.6, 0.6, 0.8, 1, 122);

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

var faceDUL = rotate(oval(-0.19, -0.06, 0.1, 0.06), 5, -0.19, -0.06);
var faceDUR = rotate(oval(0.19, -0.06, 0.1, 0.06), -4, 0.19, -0.06);
var faceUUL = rotate(oval(-0.19, -0.06, 0.08, 0.04), 5, -0.19, -0.06);
var faceUUR = rotate(oval(0.19, -0.06, 0.08, 0.04), -4, 0.19, -0.06);

var faceDColor = getColors(251/255, 229/255, 205/255, 1, 62);
var faceUColor = getColors(251/255, 217/255, 200/255, 1, 62);

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

var mimiColor = getColors(230/255, 120/255, 120/255, 1, 122);

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

var hairClipColor = getColors(1, 184/255, 66/255, 1, 63);

var hairClip = oval(-0.28, 0.43, 0.11, 0.11, -40, -55, false, [-0.30, 0.41, -0.27, 0.44]);


var flowerColor = getColors(251/255, 213/255, 223/255, 1, 155, [1, 1, 1, 1]);

var flower = move(zoom(rotate(oval(0, 0.07, 0.05, 0.05, 0, 183, false, 
	rotate(oval(0, 0.07, 0.05, 0.05, 0, 180, false,
	rotate(oval(0, 0.07, 0.05, 0.05, 0, 180, false, 
	rotate(oval(0, 0.07, 0.05, 0.05, 0, 180, false,
	rotate(oval(0, 0.07, 0.05, 0.05, 0, 180, false,
	[0, 0], 30), -72), 30), -72), 30), -72), 30), -72), 30), 40), 0.75, 0.75), -0.28, 0.43);

var flowerCoreColor = getColors(1, 229/255, 194/255, 1, 61, [1, 184/255, 120/255, 1]);

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

var eyeColor = getColors(48/255, 152/255, 154/255, 1, 61, [174/255, 246/255, 209/255, 1]);

var eyeballl = oval(0, 0, 0.058, 0.088, -90, 270, false, [0, -0.04]);
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
	
	drawAll();
	
	setTimeout("blink()", Math.random() * 3000);
	
	document.getElementById("blink").onclick=function(){action(bn)};
	document.getElementById("nico").onclick=function(){action(nn)};
}

var actionMarks = [];
var timeMark = [];
var actions = [];
var antiActions = [];

function register(mark, tm, act, anti) {
	actionMarks.push(mark);
	timeMark.push(tm);
	actions.push(act);
	antiActions.push(anti);
	return actionMarks.length - 1;
}

function action(id) {
	for(var i = 0; i < actionMarks.length; ++i) {
		if(actionMarks[i]) {
			if(i == id)
				return;
			clearTimeout(timeMark[i]);
			actionMarks[i] = false;
			actionMarks[id] = true;
			antiActions[i](actions[id]);
			return;
		}
	}
	actionMarks[id] = true;
	actions[id];
}

var eyeulb = linearAnime(move(rotate(meyeul, 5, 0, 0, true), -0.16, 0.085), move(rotate(zoom(meyeul, 1, -0.4, 0, 0, true, 1), 5), -0.16, 0.085), 6);
var eyeurb = linearAnime(move(rotate(meyeur, -8, 0, 0, true), 0.15, 0.085), move(rotate(zoom(meyeur, 1, -0.4, 0, 0, true, 1), -8), 0.15, 0.085), 6);
var eyedlb = linearAnime(move(rotate(meyedl, 5, 0, 0, true), -0.16, 0.085), move(rotate(zoom(meyedl, 1, 0, 0, 0, true, 1), 5), -0.16, 0.085), 6);
var eyedrb = linearAnime(move(rotate(meyedr, -8, 0, 0, true), 0.15, 0.085), move(rotate(zoom(meyedr, 1, 0, 0, 0, true, 1), -8), 0.15, 0.085), 6);
var matugelb = linearAnime(move(rotate(matugelm, 5, 0, 0, true), -0.16, 0.085), move(rotate(zoom(zoom(matugelm, 1, -0.4, 0, -0.02, true, 1, 0, 4), 1, -0.4, 0, 0, false, 0, 0, 4), 5), -0.16, 0.085), 6);
var matugerb = linearAnime(move(rotate(matugerm, -8, 0, 0, true), 0.15, 0.085), move(rotate(zoom(zoom(matugerm, 1, -0.4, 0, -0.02, true, 1, 0, 4), 1, -0.4, 0, 0, false, 0, 0, 4), -8), 0.15, 0.085), 6);

var eyelashlb = linearAnime(eyelashl, rotate(zoom(rotate(eyelashl, -5, -0.16, 0.095, true), 1, -0.3, -0.16, 0.095), 5, -0.16, 0.095), 6);
var eyelashslb = linearAnime(eyelashsl, rotate(zoom(zoom(rotate(eyelashsl, -5, -0.16, 0.085, true), 1, -0.4, -0.16, 0.085, false, 0, 0, 4), 1, -0.8, -0.16, 0.085, false, 1, 0, 4), 5, -0.16, 0.085), 6);
var eyelashrb = linearAnime(eyelashr, rotate(zoom(rotate(eyelashr, 8, 0.15, 0.095, true), 1, -0.3, 0.15, 0.095), -8, 0.15, 0.095), 6);
var eyelashsrb = linearAnime(eyelashsr, rotate(zoom(zoom(rotate(eyelashsr, 8, 0.15, 0.085, true), 1, -0.4, 0.15, 0.085, false, 0, 0, 4), 1, -0.8, 0.15, 0.085, false, 1, 0, 4), -8, 0.15, 0.085), 6);

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
		if(++bi == 6)
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

var eyeuln = linearAnime(move(rotate(meyeul, 5, 0, 0, true), -0.16, 0.085), move(rotate(zoom(meyeul, 1, 0, 0, 0, true, 1), 5), -0.16, 0.085), 6);
var eyeurn = linearAnime(move(rotate(meyeur, -8, 0, 0, true), 0.15, 0.085), move(rotate(zoom(meyeur, 1, 0, 0, 0, true, 1), -8), 0.15, 0.085), 6);
var eyedln = linearAnime(move(rotate(meyedl, 5, 0, 0, true), -0.16, 0.085), move(rotate(zoom(meyedl, 1, -0.5, 0, 0, true, 1), 5), -0.16, 0.085), 6);
var eyedrn = linearAnime(move(rotate(meyedr, -8, 0, 0, true), 0.15, 0.085), move(rotate(zoom(meyedr, 1, -0.5, 0, 0, true, 1), -8), 0.15, 0.085), 6);
var matugeln = linearAnime(move(rotate(matugelm, 5, 0, 0, true), -0.16, 0.085), move(rotate(rotate(zoom(zoom(matugelm, 0.95, 0.30, 0, -0.002, true, 1, 0, 4), 0.9, 0.5, 0, 0, false, 0, 0, 4), 5), -11, -0.105, 0), -0.16, 0.06), 6);
var matugern = linearAnime(move(rotate(matugerm, -8, 0, 0, true), 0.15, 0.085), move(rotate(rotate(zoom(zoom(matugerm, 0.95, 0.30, 0, -0.002, true, 1, 0, 4), 0.9, 0.5, 0, 0, false, 0, 0, 4), -8), 12, 0.105, 0), 0.15, 0.065), 6);

var eyelashln = linearAnime(eyelashl, rotate(rotate(zoom(rotate(eyelashl, -5, -0.16, 0.095, true), 0.9, 0.3, -0.16, 0.095), 5, -0.16, 0.095), -10, -0.265, 0.06), 6);
var eyelashsln = linearAnime(eyelashsl, rotate(rotate(zoom(zoom(rotate(eyelashsl, -5, -0.16, 0.085, true), 0.9, 0.25, -0.16, 0.085, false, 0, 0, 4), 0.9, 0.4, -0.16, 0.085, false, 1, 0, 4), 5, -0.16, 0.085), -15, -0.265, -0.02), 6);
var eyelashrn = linearAnime(eyelashr, rotate(rotate(zoom(rotate(eyelashr, 8, 0.15, 0.095, true), 0.9, 0.3, 0.15, 0.095), -8, 0.15, 0.095), 12, 0.255, 0.06), 6);
var eyelashsrn = linearAnime(eyelashsr, rotate(rotate(zoom(zoom(rotate(eyelashsr, 8, 0.15, 0.085, true), 0.9, 0.25, 0.15, 0.085, false, 0, 0, 4), 0.9, 0.4, 0.15, 0.085, false, 1, 0, 4), -8, 0.15, 0.085), 14, 0.26, 0.02), 6);

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
		if(++ni == 6)
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

function drawAll() {
    gl.clearColor(0.0, 1.0, 1.0, 1.0);
    gl.clear(gl.COLOR_BUFFER_BIT);
	
	render(colorBuff(gl, program, backColor, "vColor"), positionBuff(gl, program, backHair, "vPosition"), gl.TRIANGLE_STRIP, 0, 122);
	render(colorBuff(gl, program, clothesBColor, "vColor"), positionBuff(gl, program, clothesB, "vPosition"), gl.TRIANGLE_STRIP, 0, 122);
	render(colorBuff(gl, program, black, "vColor"), positionBuff(gl, program, clothesBack, "vPosition"), gl.TRIANGLE_STRIP, 0, 122);
	//render(colorBuff(gl, program, black, "vColor"), positionBuff(gl, program, clothesLineB, "vPosition"), gl.LINES, 0, 2);
		
	var hairColor = colorBuff(gl, program, getColors(253/255, 230/255, 154/255, 1, 123), "vColor");
	render(hairColor, positionBuff(gl, program, maeHairC, "vPosition"), gl.TRIANGLE_FAN, 0, 62);
	
	var faceColor = colorBuff(gl, program, getColors(251/255, 239/255, 217/255, 1, 122), "vColor");
	render(faceColor, positionBuff(gl, program, neck, "vPosition"), gl.TRIANGLE_STRIP, 0, 122);
	render(faceColor, positionBuff(gl, program, neckIn, "vPosition"), gl.TRIANGLE_FAN, 0, 62);
	//render(colorBuff(gl, program, getColors(152/255, 100/255, 69/255, 1, 244), "vColor"), positionBuff(gl, program, neckShade, "vPosition"), gl.TRIANGLE_STRIP, 0, 244);
	render(colorBuff(gl, program, getColors(120/255, 110/255, 90/255, 1, 61), "vColor"), positionBuff(gl, program, neckLineL, "vPosition"), gl.LINE_STRIP, 0, 61);
	render(colorBuff(gl, program, getColors(120/255, 110/255, 90/255, 1, 61), "vColor"), positionBuff(gl, program, neckLineR, "vPosition"), gl.LINE_STRIP, 0, 61);
	
	render(colorBuff(gl, program, line, "vColor"), positionBuff(gl, program, rotate(getPoints(function(x){return (9 * x) ** 10}, -0.18, -0.43, 0, 0.1, false), 10, -0.18, -0.43), "vPosition"), gl.LINE_STRIP, 0, 61);
	render(colorBuff(gl, program, line, "vColor"), positionBuff(gl, program, rotate(getPoints(function(x){return (9 * x) ** 10;}, 0.18, -0.43, 0, -0.1, false), -10, 0.18, -0.43), "vPosition"), gl.LINE_STRIP, 0, 61);
	
	faceColor = colorBuff(gl, program, getColors(251/255, 239/255, 217/255, 1, 122), "vColor");
	render(faceColor, positionBuff(gl, program, faceDL, "vPosition"), gl.TRIANGLE_FAN, 0, 62);
	render(faceColor, positionBuff(gl, program, faceDR, "vPosition"), gl.TRIANGLE_FAN, 0, 62);
	render(faceColor, positionBuff(gl, program, faceU, "vPosition"), gl.TRIANGLE_FAN, 0, 4);
		
	render(colorBuff(gl, program, white, "vColor"), positionBuff(gl, program, clothesFrontUL, "vPosition"), gl.TRIANGLE_STRIP, 0, 122);
	render(colorBuff(gl, program, white, "vColor"), positionBuff(gl, program, clothesFrontUR, "vPosition"), gl.TRIANGLE_STRIP, 0, 122);
	
	render(colorBuff(gl, program, white, "vColor"), positionBuff(gl, program, clothesFrontDL, "vPosition"), gl.TRIANGLE_STRIP, 0, 122);
	render(colorBuff(gl, program, white, "vColor"), positionBuff(gl, program, clothesFrontDR, "vPosition"), gl.TRIANGLE_STRIP, 0, 122);
	render(colorBuff(gl, program, white, "vColor"), positionBuff(gl, program, usamimiL, "vPosition"), gl.TRIANGLE_STRIP, 0, 122);
	render(colorBuff(gl, program, mimiColor, "vColor"), positionBuff(gl, program, usamimiIL, "vPosition"), gl.TRIANGLE_FAN, 0, 62);
	
	render(colorBuff(gl, program, white, "vColor"), positionBuff(gl, program, usamimiR, "vPosition"), gl.TRIANGLE_STRIP, 0, 122);
	render(colorBuff(gl, program, mimiColor, "vColor"), positionBuff(gl, program, usamimiIR, "vPosition"), gl.TRIANGLE_FAN, 0, 62);
	
	
	render(colorBuff(gl, program, white, "vColor"), positionBuff(gl, program, clothesD, "vPosition"), gl.TRIANGLE_FAN, 0, 61);
	//render(colorBuff(gl, program, black, "vColor"), positionBuff(gl, program, clothesD, "vPosition"), gl.LINE_STRIP, 0, 61);
	
	
	//render(colorBuff(gl, program, black, "vColor"), positionBuff(gl, program, clothesLineF, "vPosition"), gl.LINE_STRIP, 0, 61);
	
	render(colorBuff(gl, program, white, "vColor"), positionBuff(gl, program, eyel, "vPosition"), gl.TRIANGLE_FAN, 0, 62);
	render(colorBuff(gl, program, white, "vColor"), positionBuff(gl, program, eyer, "vPosition"), gl.TRIANGLE_FAN, 0, 62);
	
	render(colorBuff(gl, program, eyeColor, "vColor"), positionBuff(gl, program, eyeballl, "vPosition"), gl.TRIANGLE_FAN, 0, 62);
	render(colorBuff(gl, program, eyeColor, "vColor"), positionBuff(gl, program, eyeballr, "vPosition"), gl.TRIANGLE_FAN, 0, 62);
	
	render(colorBuff(gl, program, black, "vColor"), positionBuff(gl, program, pupill, "vPosition"), gl.TRIANGLE_FAN, 0, 62);
	render(colorBuff(gl, program, black, "vColor"), positionBuff(gl, program, pupilr, "vPosition"), gl.TRIANGLE_FAN, 0, 62);
	
	render(colorBuff(gl, program, white, "vColor"), positionBuff(gl, program, kiral, "vPosition"), gl.TRIANGLE_FAN, 0, 62);
	render(colorBuff(gl, program, white, "vColor"), positionBuff(gl, program, kirar, "vPosition"), gl.TRIANGLE_FAN, 0, 62);
	
	faceColor = colorBuff(gl, program, getColors(251/255, 239/255, 217/255, 1, 62), "vColor");
	render(faceColor, positionBuff(gl, program, eyeul, "vPosition"), gl.TRIANGLE_FAN, 0, 62);
	render(faceColor, positionBuff(gl, program, eyeur, "vPosition"), gl.TRIANGLE_FAN, 0, 62);
	render(faceColor, positionBuff(gl, program, eyedl, "vPosition"), gl.TRIANGLE_FAN, 0, 62);
	render(faceColor, positionBuff(gl, program, eyedr, "vPosition"), gl.TRIANGLE_FAN, 0, 62);
	
	render(colorBuff(gl, program, faceDColor, "vColor"), positionBuff(gl, program, faceDUL, "vPosition"), gl.TRIANGLE_FAN, 0, 62);
	render(colorBuff(gl, program, faceDColor, "vColor"), positionBuff(gl, program, faceDUR, "vPosition"), gl.TRIANGLE_FAN, 0, 62);
	render(colorBuff(gl, program, faceUColor, "vColor"), positionBuff(gl, program, faceUUL, "vPosition"), gl.TRIANGLE_FAN, 0, 62);
	render(colorBuff(gl, program, faceUColor, "vColor"), positionBuff(gl, program, faceUUR, "vPosition"), gl.TRIANGLE_FAN, 0, 62);
	
	render(colorBuff(gl, program, black, "vColor"), positionBuff(gl, program, matugel, "vPosition"), gl.TRIANGLE_STRIP, 0, 122);
	render(colorBuff(gl, program, black, "vColor"), positionBuff(gl, program, matuger, "vPosition"), gl.TRIANGLE_STRIP, 0, 122);

	render(colorBuff(gl, program, black, "vColor"), positionBuff(gl, program, eyelashl, "vPosition"), gl.LINE_STRIP, 0, 61);
	render(colorBuff(gl, program, black, "vColor"), positionBuff(gl, program, eyelashr, "vPosition"), gl.LINE_STRIP, 0, 61);
	render(colorBuff(gl, program, black, "vColor"), positionBuff(gl, program, eyelashsl, "vPosition"), gl.LINES, 0, 6);
	render(colorBuff(gl, program, black, "vColor"), positionBuff(gl, program, eyelashsr, "vPosition"), gl.LINES, 0, 6);
	
	render(colorBuff(gl, program, black, "vColor"), positionBuff(gl, program, nose, "vPosition"), gl.TRIANGLE_FAN, 0, 62);
	
	render(colorBuff(gl, program, black, "vColor"), positionBuff(gl, program, mouth, "vPosition"), gl.LINE_STRIP, 0, 61);
	
	render(colorBuff(gl, program, line, "vColor"), positionBuff(gl, program, faceLineDL, "vPosition"), gl.LINE_STRIP, 0, 61);
	render(colorBuff(gl, program, line, "vColor"), positionBuff(gl, program, faceLineDR, "vPosition"), gl.LINE_STRIP, 0, 61);
	
	//render(colorBuff(gl, program, line, "vColor"), positionBuff(gl, program, [0.2, 0.595, -0.36, 0.265], "vPosition"), gl.LINES, 0, 2);
	//render(colorBuff(gl, program, line, "vColor"), positionBuff(gl, program, [0.1, 0.595, 0.35, 0.195], "vPosition"), gl.LINES, 0, 2);
	
	hairColor = colorBuff(gl, program, getColors(253/255, 230/255, 154/255, 1, 123), "vColor");
	render(hairColor, positionBuff(gl, program, maeHairUR, "vPosition"), gl.TRIANGLE_FAN, 0, 62);
	render(hairColor, positionBuff(gl, program, maeHairUL, "vPosition"), gl.TRIANGLE_FAN, 0, 62);
	
	render(hairColor, positionBuff(gl, program, maeHairDR, "vPosition"), gl.TRIANGLE_STRIP, 0, 122);
	render(hairColor, positionBuff(gl, program, maeHairDL, "vPosition"), gl.TRIANGLE_STRIP, 0, 122);
	render(hairColor, positionBuff(gl, program, shitaHairL, "vPosition"), gl.TRIANGLE_FAN, 0, 123);
	render(hairColor, positionBuff(gl, program, shitaHairR, "vPosition"), gl.TRIANGLE_FAN, 0, 123);
	
	render(hairColor, positionBuff(gl, program, maeHairUDL, "vPosition"), gl.TRIANGLES, 0, 3);
	render(hairColor, positionBuff(gl, program, maeHairUDR, "vPosition"), gl.TRIANGLES, 0, 3);
	
	render(hairColor, positionBuff(gl, program, mayugeL, "vPosition"), gl.TRIANGLE_FAN, 0, 62);
	render(hairColor, positionBuff(gl, program, mayugeR, "vPosition"), gl.TRIANGLE_FAN, 0, 62);
	
	//render(colorBuff(gl, program, line, "vColor"), positionBuff(gl, program, rotate(oval(0.62, 0.2, 0.32, 0.9, 200, 175, false), -6, 0.03, 0.18), "vPosition"), gl.LINE_STRIP, 0, 61);
	//render(colorBuff(gl, program, line, "vColor"), positionBuff(gl, program, rotate(oval(-0.6, 0.2, 0.3, 0.9, 8, -20, false), 7, 0.03, 0.18), "vPosition"), gl.LINE_STRIP, 0, 61);
	
	render(colorBuff(gl, program, hairClipColor, "vColor"), positionBuff(gl, program, hairClip, "vPosition"), gl.TRIANGLE_FAN, 0, 63);
	
	render(colorBuff(gl, program, flowerColor, "vColor"), positionBuff(gl, program, flower, "vPosition"), gl.TRIANGLE_FAN, 0, 156);
	
	render(colorBuff(gl, program, flowerCoreColor, "vColor"), positionBuff(gl, program, flowerCore, "vPosition"), gl.TRIANGLE_FAN, 0, 62);
	
}

function render(vColor, vPosition, func, ps, pe) {
	gl.enableVertexAttribArray(vColor);
	gl.enableVertexAttribArray(vPosition);
	gl.drawArrays(func, ps, pe);
}