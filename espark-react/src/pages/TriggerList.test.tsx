import { render as customRender, } from '../utils/test';
import { TriggerList, } from './TriggerList';

const mockList   = vi.fn();
const mockShow   = vi.fn();

vi.mock('@refinedev/core', () => ({
    useList       : () => ({
        data : {
            data : [],
        },
    }),
    useNavigation : () => ({
        list : mockList,
        show : mockShow,
    }),
}));

let resourceListData : Record<string, boolean | string | number>[] = [
    {
        id       : '1',
        name     : 'Email Notification',
        deviceId : '1',
        dataType : 'temperature',
        condition: '>=',
        value    : 30,
    },
];

vi.mock('./ResourceList', () => ({
    ResourceList : ({
        children,
    } : any) => (
        <div data-testid='resource-list'>
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
    Button : (props : any) => (
        <button {...props}>
            {props.children}
        </button>
    ),
    Table  : {
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
    Tag    : ({
        children,
    } : any) => (
        <span>
            {children}
        </span>
    ),
}));

describe('<TriggerList />', () => {
    beforeEach(() => {
        resourceListData = [
            {
                id       : '1',
                name     : 'Email Notification',
                deviceId : '1',
                dataType : 'temperature',
                condition: '>=',
                value    : 30,
            },
        ];
    });

    it('renders name column', () => {
        const { getByText, } = customRender(<TriggerList />);

        expect(getByText('labels.trigger.name')).toBeInTheDocument();
    });

    it('renders deviceId column', () => {
        const { getByText, } = customRender(<TriggerList />);

        expect(getByText('labels.trigger.deviceId')).toBeInTheDocument();
    });

    it('renders dataType column', () => {
        const { getByText, } = customRender(<TriggerList />);

        expect(getByText('labels.trigger.dataType')).toBeInTheDocument();
    });

    it('renders condition column', () => {
        const { getByText, } = customRender(<TriggerList />);

        expect(getByText('labels.trigger.condition')).toBeInTheDocument();
    });

    it('renders value column', () => {
        const { getByText, } = customRender(<TriggerList />);

        expect(getByText('labels.trigger.value')).toBeInTheDocument();
    });
});
