import {connect} from 'react-redux';
import {compose} from 'redux';
import {createStructuredSelector} from 'reselect';

import Collections from './collections.component';

import {selectIsCollectionsLoaded} from '../../redux/shop/shop.selector'; 
import WithSpinner from '../../components/with-spinner/with-spinner.component';



const mstp = createStructuredSelector({
    isCollectionsLoaded: selectIsCollectionsLoaded
    
})

// compose evaluates multiple curried functions right to left, so WithSpinner first then connect
const CollectionsContainer = compose(
    connect(mstp),
    WithSpinner
)(Collections)

export default CollectionsContainer;