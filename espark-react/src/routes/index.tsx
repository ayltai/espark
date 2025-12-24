import { faBell, faBoltLightning, faCloudArrowUp, faMicrochip, faTemperatureFull, } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon, } from '@fortawesome/react-fontawesome';

import { AppEdit, AppList, AppShow, DeviceEdit, DeviceList, DeviceShow, NotificationCreate, NotificationEdit, NotificationList, NotificationShow, TelemetryList, TriggerCreate, TriggerEdit, TriggerList, TriggerShow, } from '../pages';

export const resources = [
    {
        name : 'devices',
        meta : {
            icon  : <FontAwesomeIcon icon={faMicrochip} />,
            label : 'resources.devices',
        },
        list : '/devices',
        edit : '/devices/edit/:id',
        show : '/devices/show/:id',
    }, {
        name : 'telemetry',
        meta : {
            icon  : <FontAwesomeIcon icon={faTemperatureFull} />,
            label : 'resources.telemetry',
        },
        list : '/telemetry',
    }, {
        name : 'apps',
        meta : {
            icon  : <FontAwesomeIcon icon={faCloudArrowUp} />,
            label : 'resources.apps',
        },
        list : '/apps',
        edit : '/apps/edit/:id',
        show : '/apps/show/:id',
    }, {
        name : 'notifications',
        meta : {
            icon  : <FontAwesomeIcon icon={faBell} />,
            label : 'resources.notifications',
        },
        list   : '/notifications',
        create : '/notifications/create',
        edit   : '/notifications/edit/:id',
        show   : '/notifications/show/:id',
    }, {
        name : 'triggers',
        meta : {
            icon  : <FontAwesomeIcon icon={faBoltLightning} />,
            label : 'resources.triggers',
        },
        list   : '/triggers',
        create : '/triggers/create',
        edit   : '/triggers/edit/:id',
        show   : '/triggers/show/:id',
    },
];

export const createRoutes = (transformer? : (value : number, dataType : string) => string) => [
    {
        path     : 'devices',
        children : [
            {
                index     : true,
                Component : DeviceList,
            }, {
                path      : 'edit/:id',
                Component : DeviceEdit,
            }, {
                path      : 'show/:id',
                Component : DeviceShow,
            },
        ],
    }, {
        path     : 'telemetry',
        children : [
            {
                index   : true,
                element : <TelemetryList dataTransformer={transformer} />,
            },
        ],
    }, {
        path     : 'apps',
        children : [
            {
                index     : true,
                Component : AppList,
            }, {
                path      : 'edit/:id',
                Component : AppEdit,
            }, {
                path      : 'show/:id',
                Component : AppShow,
            },
        ],
    }, {
        path     : 'notifications',
        children : [
            {
                index     : true,
                Component : NotificationList,
            }, {
                path      : 'create',
                Component : NotificationCreate,
            }, {
                path      : 'edit/:id',
                Component : NotificationEdit,
            }, {
                path      : 'show/:id',
                Component : NotificationShow,
            },
        ],
    }, {
        path     : 'triggers',
        children : [
            {
                index     : true,
                Component : TriggerList,
            }, {
                path      : 'create',
                Component : TriggerCreate,
            }, {
                path      : 'edit/:id',
                Component : TriggerEdit,
            }, {
                path      : 'show/:id',
                Component : TriggerShow,
            },
        ],
    },
];
