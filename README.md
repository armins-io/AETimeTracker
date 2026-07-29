# AETimeTracker

A simple After Effects CEP extension that tracks how much time you spend on your projects.

## Features

- Tracks time per After Effects project
- Saves time locally
- Automatically updates when switching projects
- Warns when working on an unsaved project

---

## Installation

1. Download `AETimeTracker.zip` from Releases.

2. Extract the folder:

```
AETimeTracker
```

3. Copy it to your CEP extensions folder.

### Windows

```
C:\Users\<YourUsername>\AppData\Roaming\Adobe\CEP\extensions\
```

### macOS

```
~/Library/Application Support/Adobe/CEP/extensions/
```

The final path should be:

```
extensions/AETimeTracker/
```

---

## Enable CEP Debug Mode

After Effects blocks unsigned extensions by default. Enable them with the following command.

### Windows (Command Prompt)

Run:

```
reg add "HKCU\Software\Adobe\CSXS.11" /v PlayerDebugMode /t REG_SZ /d 1 /f
```

### macOS (Terminal)

Run:

```
defaults write com.adobe.CSXS.11 PlayerDebugMode 1
```

Restart After Effects after running the command.

---

## Open AETimeTracker

In After Effects:

```
Window → Extensions → AETimeTracker
```

---

## Usage

Open a saved `.aep` project and the timer will track your work automatically.

If your project is not saved yet, AETimeTracker will show:

```
Make sure to save to track properly!
```

Save the project first to track time correctly.

---

## Data Location

Your tracked times are stored locally:

```
Documents/AETimeTracker/
```

No data is uploaded anywhere.

---

## Version

Current release:

```
v1.0.0
```