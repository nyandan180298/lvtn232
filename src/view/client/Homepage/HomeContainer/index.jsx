import { Button } from 'antd';
import CheckIcon from 'assets/icon/CheckIcon';
import { memo } from 'react';

const Wrapper = memo(() => {
    return (
        <div id="home" className="about-container">
            <div className="home-text-container">
                <div className="home-text-intro">
                    Phần mềm quản lý kho, hàng hóa cho cửa hàng và bán online
                </div>
                <div className="home-attr">
                    <CheckIcon />
                    <div className="home-attr-text">Đơn giản & Dễ sử dụng</div>
                </div>
                <div className="home-attr">
                    <CheckIcon />
                    <div className="home-attr-text">
                        Quản lý số lượng chính xác
                    </div>
                </div>
                <div className="home-attr">
                    <CheckIcon />
                    <div className="home-attr-text">Tiết kiệm chi phí</div>
                </div>
                <Button
                    className="start-now-button"
                    href='#/login'
                >
                    Bắt đầu ngay
                </Button>
            </div>
            <div className="home-background">
                <img
                    src={'home.jpg'}
                    alt="Homepage Background"
                    height={700}
                />
            </div>
        </div>
    );
});
Wrapper.displayName = 'HomepageContainer';

const HomepageContainer = Wrapper;

export default HomepageContainer;
