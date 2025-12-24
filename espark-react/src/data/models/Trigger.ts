export type Trigger = {
    id?              : string,
    name             : string,
    deviceId?        : string,
    dataType?        : string,
    condition?       : '==' | '<' | '<=' | '>' | '>=',
    value?           : number,
    notificationIds? : string,
};
