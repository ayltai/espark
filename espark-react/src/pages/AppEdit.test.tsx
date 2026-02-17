import { render, } from '../utils/test';
import { AppEdit, } from './AppEdit';

const mockGetFieldValue = vi.fn();

vi.mock('@refinedev/core', () => ({
    useApiUrl : () => 'http://localhost:3000',
}));

vi.mock('./ResourceEdit', () => ({
    ResourceEdit : ({
        children,
        ...props
    } : any) => (
        <form data-testid='resource-edit-form'>
            {children({
                form : {
                    getFieldValue : mockGetFieldValue,
                },
                ...props,
            })}
        </form>
    ),
}));

describe('<AppEdit />', () => {
    it('renders name input', () => {
        const { getByLabelText, } = render(<AppEdit />);

        expect(getByLabelText('labels.app.appName')).toBeInTheDocument();
    });

    it('renders version input', () => {
        const { getByLabelText, } = render(<AppEdit />);

        expect(getByLabelText('labels.app.appVersion')).toBeInTheDocument();
    });
});
