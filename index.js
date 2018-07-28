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

    var ArrayProto = Array.prototype, 
        FunctionProto = Function.prototype, 
        ObjProto = Object.prototype,
        StringProto = String.prototype;

    isType = function(type){
        return function(obj){
            return Object.prototype.toString.call(obj) === '[object ' + type + ']';
        }
    }
    _.isArray = isType('String');
    _.isObject = isType('Array');
    _.isString = isType('String');

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

    _.throttle2 = function(fn, interval){
        var __self = fn,
            timer,              // 定时器
            firstTime = true;   // 是否是第一次调用
        
        return function(){
            var args = arguments,
                __me = this;
            
            if(firstTime){
                fn.apply(__me, args);
                return firstTime = false;
            }
            if(timer){
                return false;
            }

            timer = setTimeout(function(){
                clearTimeout(timer);
                timer = null;
                __self.apply(__me, args);
            }, interval || 500);
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
            if(!obj2) {
                obj2 = obj1 instanceof Array ? [] : {};
            }
            for (var key in obj1) {
                if (typeof obj1[key] === 'object') {
                    obj2[key] = obj1[key] instanceof Array ? [] : {};
                    _.deepCopy(obj1[key], obj2[key]);
                } else {
                    obj2[key] = obj1[key];
                }
            }
        }
        return obj2;
    }

    // 跨浏览器事件处理工具。只支持冒泡。
    _.eventUtil = {
        getEvent : function(event){
            return event || window.event;
        },
        getTarget: function(event){
            return event.target || event.srcElement;
        },
        // 返回注册成功的监听器 IE中需要用返回值来移除监听器
        on: function(elem, type, handler){
            if(elem.addEventListener){
                elem.addEventListener(type, handler, false);
                return handler;
            }else if(elem.attachEvent){
                var wrapper = function(){
                    var event = window.event;
                    event.target = event.srcElement;
                    handler.call(elem, event);
                }
                elem.attachEvent('on'+type, wrapper);
                return wrapper;
            }
        },
        off: function(elem, type, handler){
            if(elem.removeEventListener){
                elem.removeEventListener(type, handler, false);
            }else if(elem.detachEvent){
                elem.detachEvent('on' + type, handler);
            }
        },
        preventDefault: function(event){
            if(event.preventDefault){
                event.preventDefault();
            }else if('returnValue' in event){
                event.returnValue = false;
            }
        },
        stopPropagation: function(event){
            if(event.stopPropagation){
                event.stopPropagation();
            }else if('cancelBubble' in event){
                event.cancelBubble = true;
            }
        }
    }

    // 斐波那契数列取i项 1 1 2 3 5 8 13 ...
    _.fibonacci = function(index) { 
        var memo = [];  // 利用缓存 空间换时间
        if(typeof index !== 'number' || index <= 0 || parseInt(index, 10) !== index) return 'error';
        return (function fib(x) {
            if(memo[x]) {
                return memo[x];
            } else if(x <= 2) {
                memo[x] = 1;
                return 1;
            } else {
                memo[x-1] = fib(x-1);
                memo[x-2] = fib(x-2);
                memo[x] = memo[x-1] + memo[x-2];
                return memo[x];
            }
        }(index));
        
    }

    fakeBind = function(obj,arg){
        var context = this;
        var arg = ArrayProto.slice.call(arguments,1);
        F = function(){};
        fBound = function(){
            arg = arg.concat(ArrayProto.slice.call(arguments));
            return context.apply(obj instanceof F ? this : context, arg);
        }
        F.prototype  = context.prototype;
        fBound.prototype = new F();
        return fBound;
    }

    // 观察者模式
    /**
     *  var events=new _.Events();
        events.on('say',function(name){
            console.log('Hello',nama)
        });
        events.emit('say','Jony yu');
     */
    _.Events = function(){
        this.on = function(eventName, callback){
            this.handler = this.handler || {};
            this.handler[eventName] = this.handler[eventName] || [];
            this.handler[eventName].push(callback);
        }
        this.emit = function(eventName, obj){
            if(this.handler[eventName]){
                for(var i = 0; i < this.handler.length; i++){
                    this.handler[eventName][i](obj);
                }
            }
        }
    }

    // 模拟实现new方法
    _.ObjectFactory = function(){
        var obj = new Object();
        Constructor = [].shift.apply(arguments);
        Object.setPrototypeOf(obj, Constructor.prototype);
        result = Constructor.apply(obj, arguments);
        return result !== null && typeof result === 'object' ? result : obj;
    }

    // 模拟实现call方法
    fakeCall = function(context, ...args){
        context = context || window;
        context.fn = this;
        result = context.fn(...args);
        delete context.fn;
        return result;
    }

    // 模拟实现apply方法
    fakeApply = function(context, ...args){
        context = context || window;
        context.fn = this;
        if(!args){
            result = context.fn();
        } else {
            result = context.fn(...args);
        }
        delete context.fn;
        return result;
    }

    // 分时函数 解决进行某些操作时数据量过大影响性能的问题 通过采用分批处理
    // arr: 数据  fn: 业务逻辑  count: 每次执行的数量
    _.timeChunk = function(arr, fn, count){
        var t;

        var start = function(){
            for(var i = 0; i < Math.min(count || 1, arr.length); i++){
                var obj = arr.shift();
                fn(obj);
            }
        }
        return function(){
            t = setInterval(function(){
                if(arr.length === 0){
                    return clearInterval(t);
                }
                start();
            }, 200);
        }
    }

    // 模拟push方法
    ArrayProto.push2 = function(){
        ArrayProto.splice(this,[this.length, 0].concat(ArrayProto.slice(argument)));
        return this.length;
    }

    // 模拟pop方法
    ArrayProto.pop2 = function(){
        return ArrayProto.splice(this, [this.length - 1, 1])[0];
    }

    // 字符串repeat实现
    StringProto.repeatString = function(n){
        return this.repeat(n);  // 原生方法
    }

    StringProto.repeatString2 = function(n){
        return Array(n+1).join(this);
    }

    StringProto.repeatString3 = function(n){
        return Array(n).fill(this).join("");
    }

    // 数组展平
    _.flatten = function(arr){
        return [].concat(...arr.map(x => Array.isArray(x) ? _.flatten(x) : x));
    }

    // 数组去重
    _.arrayDeduplicate = function(arr){
        //return [...new Set(arr)];
        return Array.from(new Set(arr));
    }

    _.arrayDeduplicate2 = function(arr){
        arr.filter(function(ele, index, array){
            return array.indexOf(ele) === index;
        })
    }

    return _;
})