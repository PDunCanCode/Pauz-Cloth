import React from 'react';

import { SpinnerContainer, SpinnerOverlay } from './with-spinner.styles';

const WithSpinner = WrappedContainer => ({ isLoading, ...otherProps}) {
    return isLoading ? (
        <SpinnerOverlay>
            <SpinnerContainer />
        </SpinnerOverlay>

    ) : (
        <WrappedComponent {...otherProps} />
    );
};

export default WithSpinner;