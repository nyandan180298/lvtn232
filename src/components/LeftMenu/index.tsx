import { memo, useCallback } from 'react';
import { Checkbox } from 'antd';

const LeftMenu = memo(() => {
    const handleClick = useCallback(() => {}, []);

    return (
        <>
            <div className="left-menu-container">
                <div className=''> </div>
            </div>
            <div className="left-menu">
                <Checkbox.Group
                />
            </div>
        </>
    );
});

export default LeftMenu;
