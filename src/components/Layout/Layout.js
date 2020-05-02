import React from 'react';

import Aux from '../../hoc/Auxiliary';
const layout = (props) => (
    <Aux>
        <div>Toolbar, SideDrawer, Backdrop...</div>
        <div>
            {props.children}
        </div>
    </Aux>
);

export default layout;