import React from 'react';

import './Backdrop.css';

const backdrop = (props) => {
    const cssClasss = ['Backdrop', props.show ? 'BackdropOpen' : 'BackdropClosed'];
    return <div className={cssClasss.join(' ')}></div>
};

export default backdrop;