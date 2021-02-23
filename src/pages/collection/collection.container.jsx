import {connect} from 'react-redux';
import {compose} from 'redux';
import {createStructuredSelector} from 'reselect';

import CollectionPage from './collection.component';

import {selectIsCollectionsLoaded} from '../../redux/shop/shop.selector'; 
import WithSpinner from '../../components/with-spinner/with-spinner.component';



const mstp = createStructuredSelector({
    isLoading: (state)=> !selectIsCollectionsLoaded(state)
    
})

// compose evaluates multiple curried functions right to left, so WithSpinner first then connect
const CollectionPageContainer = compose(
    connect(mstp),
    WithSpinner
)(CollectionPage)

export default CollectionPageContainer;