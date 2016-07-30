Install
=======

To install the latest official version, use NPM
```
npm i alQlagin/code-factory --save
```


Dependencies 
============

Code factory requires native Promise support and mongoose version ~4 support

Basic usage
===========

Create new controller by passing model into controllerFactory

```javascript
let controllerFactory = require('code-factory').controllerFactory;

let controller = controllerFactory(MyModel);
```

New controller has 5 basic actions:

* List - find items by condition
* View - find one item by condition
* Create - create new item with passed data
* Update - find one item by condition and update fields
* Remove - remove item by condition

To run action get in from controller actions and call method run

```javascript
controller.actions.list.run({my_field: 'my_field_value'})
    .then(list => console.log(list) )
```

Actions
=======
 
All actions have main method `run()` which returns Promise
Method `run()` resolves with method result and rejects when error occurred

List
----
`ListAction.run(condition)` returns all items by specified condition 

```javascript
let condition = {};
controller.actions.list.run(condition)
    .then(list=> console.log(list))
    .catch(err => console.error(err))
```

ListAction has special method ```paginate(condition, currentPage=1, perPage=10)``` which returns specific object

```javascript
{
    data: data,
    pagination: PaginationObject
}
```

In this object:

* `data` contains all items by specified condition and passed pagination settings
* [pagination](#pagination) is special object which contain metadata

Example

```javascript
let condition = {};
/**
 * log items in range 0-19
 */ 
controller.actions.list.paginate(condition, 1, 20)
    .then(result => console.log(result.data))
    .catch(err => console.error(err))
```


View
----
`ViewAction.run(condition)` returns one element by specified condition 

```javascript
/**
 * display item with title code-factory
 */
let condition = {title: 'code-factory'};
controller.actions.view.run(condition)
    .then(item => console.log(item))
    .catch(err => console.error(err))
```

`ViewAction.run(condition)` can be rejected with `Error('nothing found')`
 if no one element found

Update
------
`UpdateAction.run(condition, data [,deepMerge=false])` finds one element by specified condition and updates it
 

```javascript
/**
 * display item with title Code factory
 */
 
let condition = {title: 'code-factory'};
controller.actions.update.run(condition, {title: 'Code factory'})
    .then(item => console.log(item))
    .catch(err => console.error(err))
```

`UpdateAction.run(condition)` can be rejected with `Error('nothing found')`
 if no one element found

**Deep merge**

This feature allows to extend hierarchical fields when true

```javascript
/**
 * let we have Schema like 
 * {
 *      title: String.
 *      mixed: mongoose.Types.Mixed
 * }
 * and record 
 * {
 *      title: 'code-facory',
 *      mixed: {
 *          meta: '#github'          
 *      }
 * } 
 */
 
let condition = {title: 'code-factory'};

// by default deepMerge is disabled
controller.actions.update.run(condition, {meta: {description: 'UpdateAction.run()' }})
    .then(item => {
        /**
         * this out {
         *  title: 'code-factory',
         *  meta: {description: 'UpdateAction.run()' }
         * }
         */
        console.log(item)
    })
    .catch(err => console.error(err))
    
// when deepMerge is true    
controller.actions.update.run(condition, {meta: {description: 'UpdateAction.run()' }, true})
    .then(item => {
        /**
         * this out {
         *  title: 'code-factory',
         *  meta: {description: 'UpdateAction.run()', meta: '#github' }
         * }
         */
        console.log(item)
    })
    .catch(err => console.error(err))

```

By default `UpdateAction.run(condition)` uses [lodash.assign](https://lodash.com/docs#assign) 
Merge algorithm uses [lodash.merge](https://lodash.com/docs#merge)
Be careful with complex models and [overload](#extended) method if needed. 

Create
------
`CreateAction.run(data)` create and returns one element with specified data

```javascript
/**
 * display item with title code-factory
 */
let data = {title: 'code-factory'};
controller.actions.create.run(data)
    .then(item => console.log(item))
    .catch(err => console.error(err))
```

`CreateAction.run(data)` can be rejected with `ValidationError`

Remove
------
`RemoveAction.run(condition)` removes elements with specified data

```javascript
/**
 * display item with title code-factory
 */
let data = {title: 'code-factory'};
controller.actions.create.run(data)
    .then(item => console.log(item))
    .catch(err => console.error(err))
```

`RemoveAction.run(condition)` can be rejected with `Error('nothing found')` if no one element found


Pagination
----------

Pagination is the special object which returned by `ListAction.paginate()`

This object contains next fields:

* totalItems - total items by condition
* pageCount - page number according requested currentPage & perPage 
* currentPage (begins from 1)
* perPage

Also it has [express](http://expressjs.com) compatible method `Pagination.setHeaders(res, [headers])` to set up pagination headers

First argument is an **express** response object

Second argument is header titles settings (options)

Default headers object is ```javascript
{
    totalCount: 'pagination-totalCount',
    perPage: 'pagination-perPage',
    pageCount: 'pagination-pageCount',
    currentPage: 'pagination-currentPage',
}
```

Extended usage
==============

Controller factory allows to define your own actions and overload default actions

All actions has BaseAction context and `BaseAction#Model` can be accessed.
This can be used to provide model independent actions
 
Use `run()` method to execute custom action


```javascript
let controllerFactory = require('code-factory').controllerFactory;

// define
let controller = controllerFactory(MyModel, {
    // custom action
    searchInPeriod: function(start, end){
        let condition = {
            createdAt: {$gte: start, $lt: end}
        }
        return this.Model.find(condition)
    }, 
    // overload view action to find by ObjectID and not reject if nothing found
    view: function(objectID){
        return this.Model.findById(objectID)
    }
});

// use

controller.actions
    .searchInPeriod
    .run(new Date(2016, 0, 1), new Date())
    .then(....);
    
contoller.actions
    .view
    .run(someObjectId)
    .then(....)
```
