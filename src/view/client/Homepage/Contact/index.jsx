import { memo } from 'react';

const Wrapper = memo(() => {

    return (
        <div id="contact" className="contact-container">
            <div className="home-text-container">
                <div className="home-text-intro">Liên hệ chúng tôi:</div>
                <div className="home-attr">
                    <div className="home-attr-text">
                        Email: smartInventoryBK@gmail.com
                    </div>
                </div>
                <div className="home-attr">
                    <div className="home-attr-text">
                        Số điện thoại: 0908xxxxxx
                    </div>
                </div>
                <div className="home-attr">
                    <div className="home-attr-text">
                        Địa chỉ: Cơ sở Lý Thường Kiệt: 268 Lý Thường Kiệt,
                        Phường 14, Quận 10, TP. HCM
                    </div>
                </div>
                <div className="home-attr">
                    <div className="home-attr-text">
                        Cơ sở Dĩ An: Khu phố Tân Lập, Phường Đông Hòa, TP. Dĩ
                        An, Tỉnh Bình Dương
                    </div>
                </div>
            </div>
        </div>
    );
});
Wrapper.displayName = 'Contact';

const Contact = Wrapper;

export default Contact;
