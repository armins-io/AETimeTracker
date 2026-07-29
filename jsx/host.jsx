/*
    TODO: Save the tracked times in a JSON file in the user's Documents folder, as opposed to a .txt file.
*/

// Return the path to the currently open project, or null if no project is open.
function getCurrentProjectPath() {
    if (!app.project || !app.project.file) {
        return null;
    }
    return app.project.file.fsName;
}

// Return the "tracked_times.txt" file in the user's Documents folder.
function getTrackedTimesFile() {
    var documentsFolder = Folder.myDocuments;
    var dir = new Folder(documentsFolder.fsName + "/AETimeTracker");
    if (!dir.exists) {
        dir.create();
    }
    return new File(dir.fsName + "/tracked_times.txt");
}

// Return the tracked times as a string, or null if the file doesn't exist/if the file is empty.
function loadTrackedTimes() {
    var file = getTrackedTimesFile();
    if (file == null || !file.exists) {
        return null;
    }

    file.open("r");
    var content = file.read();
    file.close();

    return content;
}

// Save the tracked times to the "tracked_times.txt" file in the user's Documents folder.
function saveTrackedTimes(data) {
    var file = getTrackedTimesFile();
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