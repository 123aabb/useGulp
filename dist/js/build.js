(function(){
    function  foo(num1,num2) {

        return num1+num2
    }
    console.log(foo(1,2)+85)
})();

(function () {
   var result= [1,2,3,4].map(function(item,index){
       //console.log(index)
        return item+100
    })
    console.log(result)
})()
