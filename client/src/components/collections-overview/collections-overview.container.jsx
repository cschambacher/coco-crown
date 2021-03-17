
import {connect} from 'react-redux';
import {compose} from 'redux';
import {createStructuredSelector} from 'reselect';

import CollectionsOverview from './collections-overview.component';

import {selectIsCollectionFetching} from '../../redux/shop/shop.selector'; 
import WithSpinner from '../../components/with-spinner/with-spinner.component';



const mstp = createStructuredSelector({
    isCollectionFetching: selectIsCollectionFetching,
    
})

// compose evaluates multiple curried functions right to left, so WithSpinner first then connect
const CollectionsOverviewContainer = compose(
    connect(mstp),
    WithSpinner
)(CollectionsOverview)

export default CollectionsOverviewContainer;