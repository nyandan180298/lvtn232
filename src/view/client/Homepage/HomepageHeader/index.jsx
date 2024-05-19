import { Anchor, Button } from 'antd';
import { memo } from 'react';
import { useNavigate } from 'react-router-dom';

const Wrapper = memo(() => {
    const navigate = useNavigate();
    return (
        <div className="homepage-header">
            <div className="header-logo">
            <img
            src={"webicon_remove_background.png"}
            alt="Web Logo"
            height={80}
          ></img>
            </div>
            <div className="homepage-header-tabs-container">
                <Anchor
                    direction="horizontal"
                    replace
                    items={[
                        {
                            key: 'home-anchor',
                            href: '#/home',
                            title: 'Trang chủ',
                        },
                        {
                            key: 'about-anchor',
                            href: '#/about',
                            title: 'Giới thiệu',
                        },
                        // {
                        //     key: 'news-anchor',
                        //     href: '#part-3',
                        //     title: 'Tin tức',
                        // },
                        {
                            key: 'contact-anchor',
                            href: '#/contact',
                            title: 'Liên hệ',
                        },
                    ]}
                />
            </div>
            <div className="homepage-header-buttons-container">
                <Button
                    className="homepage-button reg"
                    onClick={() => navigate('/register')}
                >
                    Đăng ký
                </Button>
                <Button
                    className="homepage-button log"
                    onClick={() => navigate('/login')}
                >
                    Đăng nhập
                </Button>
            </div>
        </div>
    );
});
Wrapper.displayName = 'HomepageHeader';

const HomepageHeader = Wrapper;

export default HomepageHeader;
