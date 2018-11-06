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