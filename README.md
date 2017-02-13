# insert-resource

快速向指定html插入想要的css或js

## Installing

```
$ npm install insert-resource --save-dev
```

## Usage
html
```html
<!-- {{css}} -->
<!-- {{script}} -->
```
js
```js
var insert=require('insert-resource')
insert({
  baseUrl:'./',//根路径，默认'./'
  common:{//每个页面都进行插入的资源
    js:[
      './3.js',
      './4.js'
    ],
    css:[
      './1.css',
      './2.css'
    ]
  },
  html:{//要插入的页面
    index:{
      js:[
        './1.js',
        './2.js'
      ],
      css:[
        './5.css',
        './6.css'
      ]
    }
  }
})
```

## License:
wzx
