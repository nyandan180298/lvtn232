import { memo } from 'react';

const Wrapper = memo(() => {
    return (
        <div id="/about" className="home-container">
            <div className="home-text-container">
                <div className="about-text-intro">Giới thiệu về sản phẩm</div>
                <div className="home-attr">
                    <div className="home-attr-text">
                        Sự phát triển của công nghệ tiên tiến và ảnh hưởng của
                        dịch bệnh đã thay đổi hoàn toàn ngành dịch vụ truyền
                        thống ở xã hội ngày này, điển hình là sự bùng nổ của các
                        ứng dụng “thương mại điện tử, quản lý kho hàng” mang đến
                        lợi ích to lớn cho kinh tế, sự phát triển của xã hội
                        trong tình hình dịch bệnh hoành hành.
                    </div>
                </div>
                <div className="home-attr">
                    <div className="home-attr-text">
                        Các chuỗi nhỏ hơn hay cửa hàng đơn lẻ thì không sở hữu
                        cho mình 1 hệ thống để quản lý kho và phân phối hàng cho
                        riêng mình sẽ phù hợp với dự án này.
                    </div>
                </div>
                <div className="home-attr">
                    <div className="home-attr-text">
                        Với mong muốn mang đến sự tiện lợi, cùng trải nghiệm
                        tuyệt vời nhất cho người dùng, người quản lý cửa hàng
                        khi họ có nhu cầu quản lý cửa hàng một cách dễ dàng.
                    </div>
                </div>
            </div>
            <div className="home-background">
                <img
                    src={'about.png'}
                    alt="About Background"
                    height={700}
                ></img>
            </div>
        </div>
    );
});
Wrapper.displayName = 'About';

const About = Wrapper;

export default About;
