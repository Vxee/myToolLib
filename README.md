# myToolLib
个人编写的一个js工具库，有模拟一些原生方法的实现，排序算法和一些使用的方法。

## 介绍
这个工具库暴露出了一个接口`_`, 通过_.xxx可以访问内部的方法。

## 用法
兼容Node、AMD、CMD以及常见的浏览器环境。
* Node  
```
import _ from './myTool.js';
```
* AMD
```
```
* other
```
<script type="text/javascript" src="./myTool.js"></script>
```

## API
### `_.isArray` `_.isObject` `_.isString`
接受一个参数，返回一个布尔类型值
```
_.isArray([]); // true
_.isObject({}); // true
_.isString(''); // true
```

### `_.bubbleSort`
#### 冒泡排序  
遍历访问要排序的数列，一次比较两个元素，如果他们的位置错误，就将他们的位置交换。  
#### 算法步骤
1. 比较相邻的元素。如果第一个比第二个大，就交换他们两个。
2. 对每一对相邻元素做同样的比较，从开始到最后，这样每一次循环遍历最后的元素会是最大的数。
3. 针对所有元素重复以上步骤，除了最后一个。

#### 算法复杂度分析
    
* 最快
当输入的元素都是正序时 O(n)

* 最慢
当输入的数据时反序的 O(n^2)

* 平均时间复杂度 O(n^2)  
(n-1)+(n-2)+...+1 = n*(n-2)/2 近似 n^2

* 空间复杂度
    O(1)
```
_.bubbleSort([1,3,2,5,4]); // [1,2,3,4,5];
```

### ` _.selectionSort`
#### 选择排序
选择排序无论什么数据都是O(n^2)的时间复杂度。因此使用时，数据规模越小越好。唯一的好处是不占用额外的内存空间

#### 算法步骤
1. 首先在未排序序列中找到最小（大），然后存放在排序序列的起始位置
2. 然后在剩余未排序的序列中找到最小（大），然后存放在已排序序列的末尾。
3. 重复第二步，知道所有元素均排序完毕。

#### 复杂度分析
* 平均时间复杂度O(n^2)
* 最好情况O(n^2)
* 最坏情况O(n^2)
* 空间复杂度O(1)
```
_.selectionSort([1,3,2,5,4]); // [1,2,3,4,5];
```

### `_.insertionSort`
#### 插入排序
插入排序的工作原理是通过构建有序序列，对于未排序数据，在已排序序列中从后向前扫描，找到相应位置并插入。  
插入排序和冒泡排序一样，也有一种优化算法，叫做拆半插入。 
#### 算法步骤
1. 将第一待排序序列第一个元素看做一个有序序列，把第二个元素到最后一个元素当成是未排序序列。
2. 从头到尾依次扫描未排序序列，将扫描到的每个元素插入有序序列的适当位置。（如果待插入的元素与有序序列中的某个元素相等，则将待插入元素插入到相等元素的后面。）

#### 复杂度分析
* 平均时间复杂度 O(n^2)
* 最好情况 O(n) 整个数组都是已排好序
* 最坏情况 O(n^2)
* 空间复杂度 O(1)
```
_.insertionSort([1,3,2,5,4]); // [1,2,3,4,5];
```

### `_.quickSort`

#### 快速排序
快速排序使用分治法策略把一个串行分为两个子串行。 

#### 算法步骤
1. 从数列中挑出一个基准。
2. 重新排序数列，所有元素比基准小的摆在基准前，所有元素比基准值大的摆在基准后（相同的数可以在任意一边）。在这个分区退出后，该基准就处于数列的中间位置，这个成为分区操作。
3. 递归地把小于基准值元素的子数列和大于基准值元素的子数列排序。

#### 复杂度分析
* 平均时间复杂度 O(n log n)
* 最好情况 O(n log n)
* 最坏情况 O(n^2)
* 空间复杂度O(log n)
```
_.quickSort([1,3,2,5,4]); // [1,2,3,4,5];
```

### `_.throttle`
函数节流

### `_.debounce`
函数防抖

