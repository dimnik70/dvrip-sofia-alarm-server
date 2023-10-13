export function logging(message, moduleName) {
  let event = new Date();
  console.log(`${event.toLocaleString("en-GB")} ${moduleName} -> ${message}`);
}
