export default function (driverId) {
  try {
    return require(`@/assets/images/drivers/${driverId}.png`);
  } catch (e) {
    return require(`@/assets/images/drivers/no-driver-image.png`);
  }
}
