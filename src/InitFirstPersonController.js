async function InitFirstPersonController(charCtlSceneUUID) {
    // To spawn an entity we need to create an EntityTempllate and specify the
    // components we want to attach to it. In this case we only want a scene_ref
    // that points to the character controller scene.
    const playerTemplate = new SDK3DVerse.EntityTemplate();
    playerTemplate.attachComponent("scene_ref", { value: charCtlSceneUUID });
  
    // Passing null as parent entity will instantiate our new entity at the root
    // of the main scene.
    const parentEntity = null;
    // Setting this option to true will ensure that our entity will be destroyed
    // when the client is disconnected from the session, making sure we don't
    // leave our 'dead' player body behind.
    const deleteOnClientDisconnection = true;
    // We don't want the player to be saved forever in the scene, so we
    // instantiate a transient entity.
    // Note that an entity template can be instantiated multiple times.
    // Each instantiation results in a new entity.

    const clientUUID = await SDK3DVerse.getClientUUID() 
    const playerName = `Player_${clientUUID}`;

    console.log(playerName)

    const playerSceneEntity = await playerTemplate.instantiateTransientEntity(
      playerName,
      parentEntity,
      deleteOnClientDisconnection
    );
    

    // Quentin help to know transform of camera
    // playerSceneEntity.setComponent('local_transform', { position: [-3, 0, 0] })
  
    // The character controller scene is setup as having a single entity at its
    // root which is the first person controller itself.
    const firstPersonController = (await playerSceneEntity.getChildren())[0];
    // Look for the first person camera in the children of the controller.
    const children = await firstPersonController.getChildren();
    const firstPersonCamera = children.find((child) =>
      child.isAttached("camera")
    );
  
    // We need to assign the current client to the first person controller
    // script which is attached to the firstPersonController entity.
    // This allows the script to know which client inputs it should read.
    SDK3DVerse.engineAPI.assignClientToScripts(firstPersonController);
  
    // Finally set the first person camera as the main camera.
    const transform =
      {
        position : [30,0,20],
        orientation : [ 0, 0.8509035, 0, 0.525322 ],
        scale : [1,1,1]
      };
      firstPersonController.setGlobalTransform(transform);
    SDK3DVerse.setMainCamera(firstPersonCamera);
}

export { InitFirstPersonController  };