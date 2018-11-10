function oval(x, y, a, b, s = 0, e = 360, o = true, point = [], pre = 60, re = false) {
	var angel = (e - s) / pre;
	var points = [];
	if(re)
		for(var i = 0; i < point.length; points.push(point[i++]));
	else
		points = point;
	if(o) {
		points.push(x);
		points.push(y);
	}
	for(var i = 0; i <= pre; ++i) {
		points.push(a * Math.cos((s + angel * i) * Math.PI /180) + x);
		points.push(b * Math.sin((s + angel * i) * Math.PI /180) + y);
	}
	return points;
}

function copy(p) {
	var p_ = [];
	for(var i = 0; i < p.length; p_.push(p[i++]));
	return p_;
}

function getPoints(f, x, y, x_, x__, o = true, point = [], pre = 60, re = false) {
	var offset = (x__ - x_) / pre;
	var points = [];
	if(re)
		for(var i = 0; i < point.length; points.push(point[i++]));
	else
		points = point;
	if(o) {
		points.push(x);
		points.push(y);
	}
	for(var i = 0; i <= pre; ++i) {
		points.push(x + x_ + offset * i);
		points.push(y + f(x_ + offset * i));
	}
	return points;
}

function unionOval(x1, y1, a1, b1, e1, s1, x2, y2, a2, b2, e2, s2, o = false, point = [], pre = 60, re = false) {
	var angel1 = (e1 - s1) / pre;
	var angel2 = (e2 - s2) / pre;
	var points = [];
	if(re)
		for(var i = 0; i < point.length; points.push(point[i++]));
	else
		points = point;
	if(o) {
		points.push(x1);
		points.push(y1);
	}
	for(var i = 0; i <= pre; ++i) {
		points.push(a1 * Math.cos((s1 + angel1 * i) * Math.PI /180) + x1);
		points.push(b1 * Math.sin((s1 + angel1 * i) * Math.PI /180) + y1);
		points.push(a2 * Math.cos((s2 + angel2 * i) * Math.PI /180) + x2);
		points.push(b2 * Math.sin((s2 + angel2 * i) * Math.PI /180) + y2);
	}
	return points;
}

function union(a1, a2, point = [], re = false) {
	var points = [];
	if(re)
		for(var i = 0; i < point.length; points.push(point[i++]));
	else
		points = point;
	var an = a1.length < a2.length ? a1.length : a2.length;
	for(var i = 0; i <= an; i += 2) {
		points.push(a1[i]);
		points.push(a1[i + 1]);
		points.push(a2[i]);
		points.push(a2[i + 1]);
	}
	return points;
}

function getColors(r, g, b, alpha, num, colors_ = [], re = false, f = function(x){return [0, 0, 0, 0];}) {
	var colors = [];
	if(re)
		for(var i = 0; i < colors_.length; colors.push(colors_[i++]));
	else
		colors = colors_;
	var offset;
	for(var i = 0; i < num; ++i) {
		offset = f(i);
		colors.push(r + offset[0]);
		colors.push(g + offset[1]);
		colors.push(b + offset[2]);
		colors.push(alpha + offset[3]);
	}
	return colors;
}

function mattrans(mat, vec_, x0 = 0, y0 = 0, re = false, s = 0, e = 0, step = 2) {
	var vec = [];
	if(re)
		for(var i = 0; i < vec_.length; vec.push(vec_[i++]));
	else
		vec = vec_;
	if(mat.length < 4)
		return vec;
	if(e == 0)
		e = vec.length / 2;
	var x, y;
	for(var i = s * 2; i < e * 2; i += step) {
		x = vec[i];
		y = vec[i + 1];
		vec[i] = (mat[0] * (x - x0) + mat[1] * (y - y0) + x0);
		vec[i + 1] = (mat[2] * (x - x0) + mat[3] * (y - y0) + y0);
	}
	return vec;
}

function zoom(vec_, zoomx, zoomy, x0 = 0, y0 = 0, re = false, s = 0, e = 0, step = 2) {
	return mattrans([zoomx, 0, 0, zoomy], vec_, x0, y0, re, s, e, step);
}

function rotate(vec_, theta, x0 = 0, y0 = 0, re = false, s = 0, e = 0, step = 2) {
	var angel = theta / 180 * Math.PI;
	return mattrans([Math.cos(angel), -Math.sin(angel), Math.sin(angel), Math.cos(angel)], vec_, x0, y0, re, s, e, step);
}

function move(vec_, x, y, re = false) {
	var vec = [];
	if(re)
		for(var i = 0; i < vec_.length; vec.push(vec_[i++]));
	else
		vec = vec_;
	for(var i = 0; i < vec.length; i += 2) {
		vec[i] += x;
		vec[i + 1] += y;
	}
	return vec;
}