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