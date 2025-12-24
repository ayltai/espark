import { render, } from '../utils/test';
import { NotificationShow, } from './NotificationShow';

const mockData = {
    data : {
        id       : 1,
        name     : 'Email Notification',
        provider : 'Email',
    },
};

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

describe('<NotificationShow />', () => {
    it('renders name input', () => {
        const { getByText, } = render(<NotificationShow />);

        expect(getByText('labels.notification.name')).toBeInTheDocument();
    });

    it('renders provider input', () => {
        const { getByText, } = render(<NotificationShow />);

        expect(getByText('labels.notification.provider')).toBeInTheDocument();
    });
});
