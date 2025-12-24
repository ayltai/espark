import { render, } from '../utils/test';
import { NotificationEdit, } from './NotificationEdit';

const mockGetFieldValue = vi.fn();

describe('<NotificationEdit />', () => {
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
        const { getByLabelText, } = render(<NotificationEdit />);

        expect(getByLabelText('labels.notification.name')).toBeInTheDocument();
    });

    it('renders provider input', () => {
        const { getByLabelText, } = render(<NotificationEdit />);

        expect(getByLabelText('labels.notification.provider')).toBeInTheDocument();
    });
});
