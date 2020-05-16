# bsr-gm
A Image processing module for browser

## Getting started

### hello world

```js
    import BsrGm from 'bsr-gm'

    // load images from server
    let gmIm = BsrGm.Texture.fromImg('./sompngfromserver.png')

    // resize the img to a special size
    // if not rezise it will use the width and height from the loaded img
    gmIm.resize(800, 500);

    // scale the images to special size
    gmIm.scale(2, 2);

    // rotate the image by 50 rad
    gmIm.rotate(Math.PI / 3);

    let canvas = document.createElement("canvas");

    // render the result img to tagret canvas
    gmIm.renderTo(canvas);
```

### 如何在图片上面使用遮罩

```js
    // 创建一个圆形遮罩
    let circleMask = BsrGm.Mask.circle(50, 50, 20);
    // 创建一个举行遮罩
    let rectMask = BsrGm.Mask.rect(0, 0, 100, 100);

    // 将两个形状遮罩并集融合
    let circleRect = BsrGm.Mask.union(circleMask, rectMask);
    // 你也可以用一个遮罩去融合另外一个遮罩
    // let circleRect = circleMask.unionOther(rectMask);

    // 你也可以减去另外一个遮罩
    let circleMask2 = BsrGm.Mask.circle(50, 50, 10);
    let bigCircleCutSmallCircle = BsrGm.Mask.diffMask(circleMask, circleMask2);
    // 你也可以用一个遮罩去减去另外一个遮罩
    // let bigCircleCutSmallCircle = circleMask.diffOther(circleMask2);

    let gmIm = BsrGm.Texture.fromImg('./sompngfromserver.png');
    let canvas = document.createElement("canvas");

    gmIm.applyMask(bigCircleCutSmallCircle);
    gmIm.rotate(Math.PI / 3);
    gmIm.renderTo(canvas);
```

### 如何使用滤镜

```js
import BsrGm from 'bsr-gm'
import {woolden, monnBean} from 'bsr-gm/filters';

let gmIm = BsrGm.Texture.fromImg('./sompngfromserver.png');
gmIm.applyFilter(monnBean).applyFilter(woolden);

let canvas = document.createElement("canvas");
// 你可以直接应用多个滤镜
// gmIm.applyFilters([woolden, monnBean]);
gmIm.renderTo(canvas);
```

### 如何使用图像混合模式

```js

// 引入柔光混合模式
import {softLight} from 'bsr-gm/mixing'

let gmIm = BsrGm.Texture.fromImg('./sompngfromserver.png');
let gmIm2 = BsrGm.Texture.fromImg('./sompngfromserver2.png');


// 应用柔光混合模式到另外一个图像
gmIm.applyMixingModeOn(gmIm2, softLight);

// 图像输出到画布
let canvas = document.createElement("canvas");
gmIm.renderTo(canvas);


```

### 使用曲线

```js
// 导入rgba曲线模块
import {rgb} from 'bsr-gm/curve'

let gmIm = BsrGm.Texture.fromImg('./sompngfromserver.png');

let rgbaCurve = new rgb();
rgbaCurve.setR(120);
rgbaCurve.setG(130);

gmIm.applyCurve(rgbaCurve);

// 图像输出到画布
let canvas = document.createElement("canvas");
gmIm.renderTo(canvas);
```


### 使用卷积核
```js
import {mat4Conv, mat3Conv, gussianBlur} from 'bsr-gm/convolution';

// 高斯模糊卷积核
let gb = new gussianBlur();
let gmIm = BsrGm.Texture.fromImg('./sompngfromserver.png');

gmIm.applyConvolution(gb);

let canvas = document.createElement("canvas");
gmIm.renderTo(canvas);

```

### 使用画笔
```js
// 导入一个模糊画笔
import {blurBrush} from 'bsr-gm/brush'
let brush = new blurBrush();
// 设置画笔的大小
brush.setSize(10);
//设置画笔的强度
brush.setStrength(80);

// 绘制画笔效果
brush.draw([1,2,3,4,3,2,5,6,6,7,8,9]);

```

 
