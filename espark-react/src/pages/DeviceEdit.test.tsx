import { render, } from '../utils/test';
import { DeviceEdit, } from './DeviceEdit';

const mockGetFieldValue = vi.fn();

describe('<DeviceEdit />', () => {
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

    it('renders displayName input', () => {
        const { getByLabelText, } = render(<DeviceEdit />);

        expect(getByLabelText('labels.device.displayName')).toBeInTheDocument();
    });

    it('renders capabilities select', () => {
        const { getByLabelText, } = render(<DeviceEdit />);

        expect(getByLabelText('labels.device.capabilities')).toBeInTheDocument();
    });

    it('renders parameters text area', () => {
        const { getByLabelText, } = render(<DeviceEdit />);

        expect(getByLabelText('labels.device.parameters')).toBeInTheDocument();
    });

    it('renders children in ResourceEdit', () => {
        const { getByTestId, } = render(<DeviceEdit />);

        expect(getByTestId('resource-edit-form')).toBeInTheDocument();
    });
});
