;(function(root, factory){
    'use strict';
    if(typeof exports === 'object' && typeof module !== 'undefined' && module.exports){
        module.exports._ = factory(); // CommonJS
        exports._ = factory();
    } 
    else if(typeof define === 'function' && define.amd)
        define(factory) // AMD
    else
        root._ = factory();

})(this, function(){
    var root = this;

    var ArrayProto = Array.prototype, FunctionProto = Function.prototype, ObjProto = Object.prototype;

    var _ = {};

    _.swapArray = function(arr,i,j){
        var temp = arr[i];
        arr[i] = arr[j];
        arr[j] = temp;
    }

    // 冒泡排序
    _.bubbleSort = function(arr){
        if(!Array.isArray(arr)) return;
        var len = arr.length;
        for(var i = 0; i < len - 1; i++){
            for(var j = 0; j < len - i - 1; j++){
                if(arr[j] > arr[j+1]){
                    this.swapArray(arr,j,j+1);
                }
            }
        }
        return arr;
    }

    // 选择排序
    _.selectionSort = function(arr){
        if(!Array.isArray(arr)) return;
        var len = arr.length;
        for(var i = 0; i < len; i++){
            var minIndex = i;
            for(var j = i + 1; j < len; j++){
                if(arr[j] < arr[minIndex]) 
                    minIndex = j; 
            }
            this.swapArray(arr, minIndex, i);
        }
        return arr;
    }
    
    // 插入排序
    _.insertionSort = function(arr){
        if(!Array.isArray(arr)) return;
        var len = arr.length;
        for(var i = 1; i < len; i++){
            var preIndex = i-1,
                current = arr[i];
            while(preIndex > 0 && current < arr[preIndex]){
                arr[preIndex+1] = arr[preIndex];
                preIndex--;
            }
            arr[preIndex+1] = current;
        }
        return arr;
    }

    // 快速排序
    _.quickSort = function(arr, left, right){
        left = typeof left !== 'number' ? 0 : left;
        right = typeof right !== 'number' ? arr.length-1 : right;
        if(left < right){
            position = getPos(arr, left, right);
            this.quickSort(arr, left, position - 1);
            this.quickSort(arr, position + 1, right);
        }
        return arr;
    }
    
    function getPos(arr,left,right){
        var pivot = left+1,
            current = arr[left];
        for(var i = pivot; i <= right; i++){
            if(current > arr[i]){
                _.swapArray(arr, pivot, i);
                pivot++;
            }
        }
        _.swapArray(arr,pivot-1,left);
        return pivot-1;
    }

    // 节流
    _.throttle = function(fn, delay){
        var last,
            timer,
            interval = delay || 200; 
        return function(){
            var now = new Date();
                th = this,
                args = arguments;
            
            if(last && now - last < interval){
                clearTimeout(timer);
                timer = setTimeout(function(){
                    last = now;
                    fn.apply(th,args);
                },interval);
            }else{
                last = now;
                fn.apply(th,args);
            }
        }
    }

    // 函数防抖
    _.debounce = function(fn, delay){
        var last,
            timer,
            interval = delay || 200;
        return function(){
            var th = this,
                args = arguments;
            if(timer){
                clearTimeout(timer);
            }
            timer = setTimeout(function(){
                timer = null;
                fn.apply(th,args);
            },interval);
        }
    }

    // 浅拷贝
    _.shallowCopy = function(obj){
        if(typeof obj === null || typeof obj !== 'object') return;
        var result;
        if(Array.isArray(obj)){  // array
            result = obj;
        }else{  // object
            result = {};
            for(var key in obj){
                if(obj.hasOwnProperty(key)) result[key] = obj[key];
            }
        }
        return obj;
    }

    // 深拷贝
    _.deepCopy = function(obj1,obj2){
        if(JSON.parse){ // 这种方法的缺陷是会破坏原型链 并且无法拷贝属性值为function的属性
            obj2 = JSON.parse(JSON.stringify(obj1));
            return obj2;
        }else{
            obj2 = obj2 || {};
            for(var key in obj){
                if(typeof obj[key] === 'object'){
                    obj2[key] = (obj[key].constructor === 'array') ? [] : {};
                    this.deepCopy(obj2[key],obj1[key]);
                }else{
                    obj2[key] = obj1[key];
                }
            }
        }
        return obj2;
    }

    return _;
})