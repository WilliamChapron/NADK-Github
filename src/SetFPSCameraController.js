async function SetFPSCameraController(canvas){
    const SDK3DVerse = window.SDK3DVerse

    SDK3DVerse.actionMap.values["LOOK_LEFT"][0] = ["MOUSE_AXIS_X_POS"];
    SDK3DVerse.actionMap.values["LOOK_RIGHT"][0] = ["MOUSE_AXIS_X_NEG"];
    SDK3DVerse.actionMap.values["LOOK_DOWN"][0] = ["MOUSE_AXIS_Y_NEG"];
    SDK3DVerse.actionMap.values["LOOK_UP"][0] = ["MOUSE_AXIS_Y_POS"];
    SDK3DVerse.actionMap.propagate();

    console.log("We set moving mouse")

    // Lock the mouse pointer.
    canvas.requestPointerLock = (
      canvas.requestPointerLock 
      || canvas.mozRequestPointerLock 
      || canvas.webkitPointerLockElement
    );
    canvas.requestPointerLock();
};


async function ResetFPSCameraController(canvas) {
    const SDK3DVerse = window.SDK3DVerse
    // console.log(SDK3DVerse)
    console.log("We set moving stay")
    // Restore the default actions for LOOK_LEFT, LOOK_RIGHT, LOOK_UP, and LOOK_DOWN.

    SDK3DVerse.actionMap.values["LOOK_LEFT"][0] = ["MOUSE_BTN_LEFT"];
    SDK3DVerse.actionMap.values["LOOK_RIGHT"][0] = ["MOUSE_BTN_LEFT"];
    SDK3DVerse.actionMap.values["LOOK_DOWN"][0] = ["MOUSE_BTN_LEFT"];
    SDK3DVerse.actionMap.values["LOOK_UP"][0] = ["MOUSE_BTN_LEFT"];
    SDK3DVerse.actionMap.propagate();


  
    // Release the pointer lock.
    document.exitPointerLock = (
        document.exitPointerLock
        || document.mozExitPointerLock
        || document.webkitExitPointerLock
    );
    document.exitPointerLock();
}

export { SetFPSCameraController, ResetFPSCameraController  };