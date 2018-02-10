function main() {
	if (!activeDocument.activeLayer) return;

	var doc = activeDocument,
		active = doc.activeLayer,
		myName = active.name;
	
	for (var i = 2; i < 999; i++) {
		if (new File(doc.path + "/" + myName + ".jpg").exists) {
			myName = active.name + "-" + i;
		} else break;
	}
		
	var file = new File(doc.path + "/" + myName + ".jpg");

	trace();
	SaveForWeb(file);
	app.activeDocument.close(SaveOptions.DONOTSAVECHANGES);
}

function trace() {
	var desc = new ActionDescriptor(),
		ref1 = new ActionReference(),
		ref2 = new ActionReference();
	
	ref1.putClass(charIDToTypeID("Dcmn"));
	desc.putReference(charIDToTypeID("null"), ref1);
	desc.putString(
		charIDToTypeID("Nm  "), 
		activeDocument.activeLayer.name);
	ref2.putEnumerated(
		charIDToTypeID("Lyr "),
		charIDToTypeID("Ordn"),
		charIDToTypeID("Trgt"));
	desc.putReference(
		charIDToTypeID("Usng"), 
		ref2);
	executeAction(charIDToTypeID("Mk  "),
		desc, 
		DialogModes.NO);
}

function SaveForWeb(file) {
	var opts = new ExportOptionsSaveForWeb();
	
	opts.format = SaveDocumentType.JPEG;
	opts.includeProfile = false;
	opts.interlaced = 0;
	opts.optimized = true;
	opts.quality = 80;
	activeDocument.exportDocument(file, ExportType.SAVEFORWEB, opts);
}

main();
