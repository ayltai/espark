import { render, } from '../utils/test';
import { ResourceCreate, } from './ResourceCreate';

vi.mock('@refinedev/antd', async () => ({
    ...(await vi.importActual('@refinedev/antd')),
    Create        : ({
        children,
        ...props
    } : any) => (
        <div data-testid='create'>
            {props.headerButtons}
            {props.title}
            {children}
        </div>
    ),
    useForm       : () => ({
        form      : {
            getFieldValue : () => undefined,
        },
        formProps : {},
    }),
}));

vi.mock('antd', async () => ({
    ...(await vi.importActual('antd')),
    Form : (props : any) => (
        <form data-testid='form-layout'>{props.children}</form>
    ),
}));

describe('<ResourceCreate />', () => {
    it('renders create with initial values and children', () => {
        const { getByTestId, getByText, } = render(
            <ResourceCreate resource='test'>
                {() => <div>ChildContent</div>}
            </ResourceCreate>
        );

        expect(getByTestId('create')).toBeInTheDocument();
        expect(getByText('ChildContent')).toBeInTheDocument();
    });
});
