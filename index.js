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
    
    return _;
})