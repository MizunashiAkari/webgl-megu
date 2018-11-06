function positionBuff(gl, points) {
	var paff = gl.createBuffer();
	gl.bindBuffer(gl.ARRAY_BUFFER, paff);
	gl.bufferData(gl.ARRAY_BUFFER, flatten(points), gl.STATIC_DRAW);
	
	return paff;
}

function enablePositionBuff(gl, program, buff, pName, dimesion = 2, pType = gl.FLOAT) {
	gl.bindBuffer(gl.ARRAY_BUFFER, buff);
	var vPosition = gl.getAttribLocation(program, pName);
	gl.vertexAttribPointer(vPosition, dimesion, pType, false, 0, 0);
	gl.enableVertexAttribArray(vPosition);
	return vPosition;
}

function colorBuff(gl, color) {
	var cBuff = gl.createBuffer();
	gl.bindBuffer(gl.ARRAY_BUFFER, cBuff);
	gl.bufferData(gl.ARRAY_BUFFER, flatten(color), gl.STATIC_DRAW);
	
	return cBuff;
}

function enableColorBuff(gl, program, buff, cName, cNum = 4, cType = gl.FLOAT) {
	gl.bindBuffer(gl.ARRAY_BUFFER, buff);
	var vColor = gl.getAttribLocation(program, cName);
	gl.vertexAttribPointer(vColor, cNum, cType, false, 0, 0);
	gl.enableVertexAttribArray(vColor);
	return vColor;
}