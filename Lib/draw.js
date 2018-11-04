function positionBuff(gl, program, points, pName, dimesion = 2, pType = gl.FLOAT) {
	var pBuff = gl.createBuffer();
	gl.bindBuffer(gl.ARRAY_BUFFER, pBuff);
	gl.bufferData(gl.ARRAY_BUFFER, flatten(points), gl.STATIC_DRAW);

	var vPosition = gl.getAttribLocation(program, pName);
	gl.vertexAttribPointer(vPosition, dimesion, pType, false, 0, 0);
	return vPosition;
}

function colorBuff(gl, program, color, cName, cNum = 4, cType = gl.FLOAT) {
	var cBuff = gl.createBuffer();
	gl.bindBuffer(gl.ARRAY_BUFFER, cBuff);
	gl.bufferData(gl.ARRAY_BUFFER, flatten(color), gl.STATIC_DRAW);

	var vColor = gl.getAttribLocation(program, cName);
	gl.vertexAttribPointer(vColor, cNum, cType, false, 0, 0);
	return vColor;
}