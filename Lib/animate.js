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

function linearAnime(point1, point2, num) {
	var points = [];
	var c = [];
	for(var j = 0; j < point1.length; ++j) {
		c.push((point2[j] - point1[j]) / num);
	}
	--num;
	for(var i = 0; i <= num; ++i) {
		var pn = [];
		for(var j = 0; j < point1.length; ++j) {
			pn.push(point1[j] + c[j] * i);
		}
		points.push(pn);
	}
	return points;
}

function linearAnimeBuff(gl, point1, point2, num) {
	var points = [];
	var c = [];
	--num;
	for(var j = 0; j < point1.length; ++j) {
		c.push((point2[j] - point1[j]) / num);
	}
	for(var i = 0; i <= num; ++i) {
		var pn = [];
		for(var j = 0; j < point1.length; ++j) {
			pn.push(point1[j] + c[j] * i);
		}
		points.push(positionBuff(gl, pn));
	}
	return points;
}