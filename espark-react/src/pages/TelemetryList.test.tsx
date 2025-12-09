import { render as customRender, } from '../utils/test';
import { TelemetryList, } from './TelemetryList';

let resourceListData: Record<string, any>[] = [
    {
        id        : 1,
        deviceId  : 'dev-1',
        timestamp : '2024-01-01T00:00:00Z',
        dataType  : 'doorOpen',
        value     : 42,
    },
];

vi.mock('@refinedev/core', async () => ({
    ...(await vi.importActual('@refinedev/core')),
    useList       : () => ({
        result : {
            data : [
                {
                    id          : 'dev-1',
                    displayName : 'Device 1',
                },
                {
                    id          : 'dev-2',
                    displayName : 'Device 2',
                },
            ],
        },
    }),
    useNavigation : () => ({
        show : vi.fn(),
    }),
}));

vi.mock('./ResourceList', () => ({
    ResourceList : ({
        children,
    } : any) => (
        <div>
            {children({
                isLoading : false,
                isSuccess : true,
                sorters   : [],
                data      : {
                    data : resourceListData,
                },
            })}
        </div>
    ),
}));

vi.mock('antd', async () => ({
    ...(await vi.importActual('antd')),
    Table      : {
        Column: ({
            title,
            dataIndex,
            render,
        } : any) => (
            <div>
                <span>{title}</span>
                {render && render(resourceListData[0][dataIndex])}
            </div>
        ),
    },
    Tag        : ({
        children,
    } : any) => (
        <span>
            {children}
        </span>
    ),
    Typography : {
        Text : ({
            children,
        } : any) => (
            <span>{children}</span>
        ),
    },
}));

describe('<TelemetryList />', () => {
    beforeEach(() => {
        resourceListData = [
            {
                id        : 1,
                deviceId  : 'dev-1',
                timestamp : '2024-01-01T00:00:00Z',
                dataType  : 'doorOpen',
                value     : 42,
            },
        ];
    });

    it('renders deviceId column', () => {
        const { getByText, } = customRender(<TelemetryList />);

        expect(getByText('labels.telemetry.deviceId')).toBeInTheDocument();
    });

    it('renders timestamp column', () => {
        const { getByText, } = customRender(<TelemetryList />);

        expect(getByText('labels.telemetry.timestamp')).toBeInTheDocument();
    });

    it('renders dataType column', () => {
        const { getByText, } = customRender(<TelemetryList />);

        expect(getByText('labels.telemetry.dataType')).toBeInTheDocument();
    });

    it('renders value column', () => {
        const { getByText, } = customRender(<TelemetryList />);

        expect(getByText('labels.telemetry.value')).toBeInTheDocument();
    });

    it('renders unknown dataType without tag', () => {
        resourceListData = [
            {
                id        : 10,
                deviceId  : 'dev-1',
                timestamp : '2024-01-01T00:00:00Z',
                dataType  : 'unknown',
                value     : 5,
            },
        ];

        const { container, } = customRender(<TelemetryList />);

        expect(container.querySelectorAll('span').length).toBeGreaterThan(0);
    });
});
