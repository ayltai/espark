import { render, } from '../utils/test';
import { TriggerShow, } from './TriggerShow';

const mockList   = vi.fn();

const mockData = {
    data : {
        id       : '1',
        name     : 'Email Notification',
        deviceId : '1',
        dataType : 'temperature',
        condition: '>=',
        value    : 30,
    },
};

vi.mock('@refinedev/core', () => ({
    useList       : () => ({
        data : {
            data : [],
        },
    }),
    useNavigation : () => ({
        list : mockList,
    }),
}));

vi.mock('./ResourceShow', () => ({
    ResourceShow : ({
        children,
    } : any) => (
        <div>
            {children({
                data : mockData,
            })}
        </div>
    ),
}));

describe('<TriggerShow />', () => {
    it('renders name input', () => {
        const { getByText, } = render(<TriggerShow />);

        expect(getByText('labels.trigger.name')).toBeInTheDocument();
    });

    it('renders deviceId input', () => {
        const { getByText, } = render(<TriggerShow />);

        expect(getByText('labels.trigger.deviceId')).toBeInTheDocument();
    });

    it('renders dataType input', () => {
        const { getByText, } = render(<TriggerShow />);

        expect(getByText('labels.trigger.dataType')).toBeInTheDocument();
    });

    it('renders condition input', () => {
        const { getByText, } = render(<TriggerShow />);

        expect(getByText('labels.trigger.condition')).toBeInTheDocument();
    });

    it('renders value input', () => {
        const { getByText, } = render(<TriggerShow />);

        expect(getByText('labels.trigger.value')).toBeInTheDocument();
    });
});
