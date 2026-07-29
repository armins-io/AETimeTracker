var cs = new CSInterface();
var currentProjectPath = null;
var overallSeconds = 0;
var sessionSeconds = 0;

function evalScript(script) {
    return new Promise(function(resolve) {
        cs.evalScript(script, resolve);
    });
}

function pad(v) {
    return (v < 10 ? "0" : "") + v;
}

function formatTime(seconds) {
    seconds = Math.floor(seconds);
    var h = Math.floor(seconds / 3600);
    var m = Math.floor((seconds % 3600) / 60);
    var s = seconds % 60;
    return pad(h) + ":" + pad(m) + ":" + pad(s);
}

function updateUI() {
    document.getElementById("sessionTimer").textContent = formatTime(sessionSeconds);
    document.getElementById("overallTimer").textContent = formatTime(overallSeconds + sessionSeconds);
}
async function loadProject() {
    currentProjectPath = await evalScript("getCurrentProjectPath()");
    overallSeconds = 0;
    sessionSeconds = 0;
    if (currentProjectPath) {
        var content = await evalScript("loadTrackedTimes()");
        if (content && content !== "null") {
            var lines = content.split(/\r?\n/);
            for (var i = 0; i < lines.length; i++) {
                var line = lines[i];
                var index = line.lastIndexOf(":");
                if (index === -1) {
                    continue;
                }
                var path = line.substring(0, index);
                var seconds = parseInt(line.substring(index + 1), 10);
                if (path === currentProjectPath) {
                    overallSeconds = isNaN(seconds) ? 0 : seconds;
                    break;
                }
            }
        }
    }
    updateUI();
}
async function saveTime() {
    if (!currentProjectPath) {
        return;
    }
    var total = overallSeconds + sessionSeconds;
    var content = await evalScript("loadTrackedTimes()");
    var lines = [];
    if (content && content !== "null") {
        lines = content.split(/\r?\n/);
    }
    var found = false;
    for (var i = 0; i < lines.length; i++) {
        var index = lines[i].lastIndexOf(":");
        if (index === -1) {
            continue;
        }
        var path = lines[i].substring(0, index);
        if (path === currentProjectPath) {
            lines[i] = path + ":" + total;
            found = true;
            break;
        }
    }
    if (!found) {
        lines.push(currentProjectPath + ":" + total);
    }
    await evalScript("saveTrackedTimes(" + JSON.stringify(lines.join("\n")) + ")");
}
async function checkProjectChanged() {
    var newPath = await evalScript("getCurrentProjectPath()");
    if (newPath === currentProjectPath) {
        return;
    }
    await saveTime();
    await loadProject();
}
async function init() {
    await loadProject();
    setInterval(function() {
        sessionSeconds++;
        updateUI();
    }, 1000);
    setInterval(saveTime, 5000);
    setInterval(checkProjectChanged, 1000);
    window.addEventListener("beforeunload", saveTime);
}
init();