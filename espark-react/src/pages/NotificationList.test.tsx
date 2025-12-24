import { render as customRender, } from '../utils/test';
import { NotificationList, } from './NotificationList';

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
        id       : 1,
        name     : 'Email Notification',
        provider : 'Email',
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

describe('<NotificationList />', () => {
    beforeEach(() => {
        resourceListData = [
            {
                id       : 1,
                name     : 'Email Notification',
                provider : 'Email',
            },
        ];
    });

    it('renders name column', () => {
        const { getByText, } = customRender(<NotificationList />);

        expect(getByText('labels.notification.name')).toBeInTheDocument();
    });

    it('renders provider column', () => {
        const { getByText, } = customRender(<NotificationList />);

        expect(getByText('labels.notification.provider')).toBeInTheDocument();
    });
});
