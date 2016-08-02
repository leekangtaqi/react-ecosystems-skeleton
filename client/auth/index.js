import { UserAuthWrapper } from 'redux-auth-wrapper'
import { routerActions } from 'react-router-redux'

const UserIsAuthenticated = UserAuthWrapper({
  authSelector: state => state.user, // how to get the user state
  redirectAction: routerActions.replace, // the redux action to dispatch for redirect
  wrapperDisplayName: 'UserIsAuthenticated' // a nice name for this auth check
})

export {
	UserIsAuthenticated
}