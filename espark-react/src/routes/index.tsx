import { faCircleUp, faMicrochip, faTemperatureFull, } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon, } from '@fortawesome/react-fontawesome';

import { AppEdit, AppList, AppShow, DeviceEdit, DeviceList, DeviceShow, TelemetryList, } from '../pages';

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
            icon  : <FontAwesomeIcon icon={faCircleUp} />,
            label : 'resources.apps',
        },
        list : '/apps',
        edit : '/apps/edit/:id',
        show : '/apps/show/:id',
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
    },
];
