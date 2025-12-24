import { render, } from '../utils/test';
import { AppEdit, } from './AppEdit';

const mockGetFieldValue = vi.fn();

describe('<AppEdit />', () => {
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

    it('renders name input', () => {
        const { getByLabelText, } = render(<AppEdit />);

        expect(getByLabelText('labels.app.appName')).toBeInTheDocument();
    });

    it('renders version input', () => {
        const { getByLabelText, } = render(<AppEdit />);

        expect(getByLabelText('labels.app.appVersion')).toBeInTheDocument();
    });
});
