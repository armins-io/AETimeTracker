/*
    TODO: Save the tracked times in a JSON file in the user's Documents folder, as opposed to a .txt file.
*/
// Return the path to the currently open project, or null if no project is open.
function getCurrentProjectPath() {
    if (!app.project) {
        return "";
    }
    if (!app.project.file) {
        return "";
    }
    return app.project.file.fsName;
}
// Return the tracked_times.txt file.
// If createIfMissing is false, do not create folders/files.
function getTrackedTimesFile(createIfMissing) {
    var dir = new Folder(Folder.myDocuments.fsName + "/AETimeTracker");
    // Read-only mode: do not create anything
    if (!createIfMissing) {
        if (!dir.exists) {
            return null;
        }
        var existingFile = new File(dir.fsName + "/tracked_times.txt");
        if (!existingFile.exists) {
            return null;
        }
        return existingFile;
    }
    // Save mode: create folder if needed
    if (!dir.exists) {
        dir.create();
    }
    return new File(dir.fsName + "/tracked_times.txt");
}
// Return the tracked times as a string,
// or null if the file doesn't exist/if the file is empty.
function loadTrackedTimes() {
    var file = getTrackedTimesFile(false);
    if (file == null || !file.exists) {
        return null;
    }
    if (!file.open("r")) {
        return null;
    }
    var content = file.read();
    file.close();
    return content;
}
// Save the tracked times to the tracked_times.txt file.
function saveTrackedTimes(data) {
    var file = getTrackedTimesFile(true);
    if (file == null) {
        return false;
    }
    if (!file.open("w")) {
        return false;
    }
    file.write(data);
    file.close();
    return true;
}