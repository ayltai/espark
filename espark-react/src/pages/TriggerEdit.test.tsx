import { render, } from '../utils/test';
import { TriggerEdit, } from './TriggerEdit';

const mockGetFieldValue = vi.fn();

vi.mock('@refinedev/core', () => ({
    useList       : () => ({
        data : {
            data : [],
        },
    }),
}));

describe('<TriggerEdit />', () => {
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
        const { getByLabelText, } = render(<TriggerEdit />);

        expect(getByLabelText('labels.trigger.name')).toBeInTheDocument();
    });

    it('renders deviceId input', () => {
        const { getByLabelText, } = render(<TriggerEdit />);

        expect(getByLabelText('labels.trigger.deviceId')).toBeInTheDocument();
    });

    it('renders dataType input', () => {
        const { getByLabelText, } = render(<TriggerEdit />);

        expect(getByLabelText('labels.trigger.deviceId')).toBeInTheDocument();
    });

    it('renders condition input', () => {
        const { getByLabelText, } = render(<TriggerEdit />);

        expect(getByLabelText('labels.trigger.condition')).toBeInTheDocument();
    });

    it('renders value input', () => {
        const { getByLabelText, } = render(<TriggerEdit />);

        expect(getByLabelText('labels.trigger.value')).toBeInTheDocument();
    });
});
