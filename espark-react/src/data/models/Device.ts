export type Device = {
    id            : string,
    displayName?  : string,
    appName?      : string,
    appVersion?   : string,
    capabilities? : string,
    parameters?   : Record<string, string | number | boolean>,
    lastSeen      : string,
    battery?      : number,
};
