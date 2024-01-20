import { memo } from 'react';
import { useNavigate } from 'react-router-dom';
import Inner from './Inner';

const Wrapper = memo(() => {
    const navigate = useNavigate();
    return <Inner changeRoute={navigate} />;
});
Wrapper.displayName = 'MainLayout';

const MainLayout = Wrapper;

export default MainLayout;
