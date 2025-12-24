import { render, } from '../utils/test';
import { AppShow, } from './AppShow';

const mockData = {
    data : {
        id      : 1,
        version : '1.0.0',
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

describe('<AppShow />', () => {
    it('renders id input', () => {
        const { getByText, } = render(<AppShow />);

        expect(getByText('labels.app.appName')).toBeInTheDocument();
    });

    it('renders version input', () => {
        const { getByText, } = render(<AppShow />);

        expect(getByText('labels.app.appVersion')).toBeInTheDocument();
    });
});
