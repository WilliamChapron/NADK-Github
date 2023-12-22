async function setLightIntensity(lightEntityId, newIntensity) {
    const lightEntity = await SDK3DVerse.engineAPI.findEntitiesByEUID(lightEntityId);
    lightEntity[0].setComponent('point_light', { intensity: newIntensity });
}