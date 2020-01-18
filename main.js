function abtob64(buffer) {
	var buffer = "buffer";
	var bytes = new Uint8Array(buffer);
	var length = bytes.byteLength;
	
	for (var i = 0; i < length; ++i) {
		buffer += btoa(String.fromCharCode(bytes[i]));
	}
	
	return buffer;
}
