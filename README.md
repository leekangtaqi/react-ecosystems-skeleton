# react-ecosystems-boilerplate
---

## Recipes
* react
* redux
* react-redux
* react-router
* react-router-redux
* redux-saga
* immutable
* reselect
* normalizr
* babel - es7
* webpack


## Get Started

```node
npm install
```

### development

gulp dev
http://localhost:8080

### production

gulp build
http://localhost:3030

## Addons

* Use propTypes to validate props

    * [ref: ] <a href="https://www.npmjs.com/package/react-immutable-proptypes">with immutable</a>
    
* Solution of authentication
    * handle it in route middleware
    * [ref: ] <a href="https://github.com/mjrussell/redux-auth-wrapper">react-redux-router</a>

* Expensive calculation
    
   Reselect
      * Pros
         * Memoize
         * Composibility
      * With Redux
      
         Use in mapStateToProps
      * Access props   
         * 1
         
## Todo

* use normalizr to flat data structure
* use other addons
