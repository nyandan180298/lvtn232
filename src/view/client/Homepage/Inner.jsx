import { memo } from 'react';
import HomepageHeader from './HomepageHeader';
import HomepageContainer from './HomeContainer';
import Contact from './Contact';
import About from './About';

const Inner = memo(() => {
    return (
        <div className="homepage">
            <HomepageHeader />
            <HomepageContainer />
            <About />
            <Contact />
        </div>
    );
});

export default Inner;
