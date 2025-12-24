import { render as customRender, } from '../utils/test';
import { AppList, } from './AppList';

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
        id      : 1,
        version : '1.0.0',
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

describe('<AppList />', () => {
    beforeEach(() => {
        resourceListData = [
            {
                id      : 1,
                version : '1.0.0',
            },
        ];
    });

    it('renders id column', () => {
        const { getByText, } = customRender(<AppList />);

        expect(getByText('labels.app.appName')).toBeInTheDocument();
    });

    it('renders version column', () => {
        const { getByText, } = customRender(<AppList />);

        expect(getByText('labels.app.appVersion')).toBeInTheDocument();
    });
});
