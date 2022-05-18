    //1 1)  - Создайте объект с 3 слоями влажности и клонируйте всеми 
    //способами которые знаете  -  сделайте примеры как глубокого так и 
    //поверхностного копирования - создайте функцию которая будет выполнять 
    //глубокое копирование обьекта
let user={
    name: 'Maria',
    age: 25,
    additionalInfo:{
        family: {
            children:[
                {name: 'Petro',
                age: 5},
                {name: 'Ivan',
                age: 3}
            ]},
        company:{
            name: 'Google',
            position: 'SMM'
        }
    }
};
let copyFirst = Object.assign({}, user);
let copySecond = Object.create(user);
let copyThird = new Object(user);

let copyFourth = {};
for(let key in user){
    copyFourth[key] = user[key]
}

let copyFive = JSON.parse(JSON.stringify(user));
copyFive.additionalInfo.company.name = 'Microsoft';


let copySix = deepClone(user);

function deepClone(obj){
    let cloneObj = {};
    for(let i in obj){
        if (obj[i] instanceof Object){
            cloneObj[i] = deepClone(obj[i]);
            continue;
        }
        cloneObj[i]= obj[i];
    }
    return cloneObj
}
copySix.additionalInfo.company.name = 'UKR';

//3 Создайте массив объектов - переберите этот маcсив с помощью for , for of, forEach

let pets=[
    {name: 'Borya', age: 7, type: 'guineaPig'},
    {name: 'Monyca', age: 3, type: 'guineaPig'},
    {name: 'Arkis', age:4, type: 'cat'},
    {name:'Skubi', age:1, type:'dog'}
]

for(let i =0; i< pets.length; i++){
    console.log(pets[i]);
}
for(let pet of pets){
    console.log(pet);
}
pets.forEach(pet=> console.log(pet));

for(let key in pets){
    console.log(key,pets[key].name, pets[key].age, pets[key].type);
};
for( let obj of pets){
    console.log(Object.keys(obj));
};
for( let obj of pets){
    console.log(Object.values(obj));
};
for(prop in pets){
    console.log(prop);
    console.log(pets[prop]);
};
// console.log(Object.getOwnPropertyNames(pets));
// console.log(Object.getOwnPropertyNames(user));
// console.log(user.hasOwnProperty('name'&& 'age'));

//5
//5.1 Дана строка 'aba aca aea abba adca abea'. 
//Напишите регулярку, которая найдет строки abba adca abea по 
//правилу: буква 'a', 2 любых символа, буква 'a'. 

let str = 'aba aca aea abba adca abea'.match(/a..a/g); 
console.log(str);

//5.2 Дана строка 'ab abab abab abababab abea'. Напишите регулярку, 
//которая найдет строки по правилу: строка 'ab' повторяется 1 или более раз.

let regStr='ab abab abab abababab abea'.match(/(ab)+/g);
console.log(regStr);

//5.3 Дана строка 'aba accca azzza wwwwa'. Напишите регулярку, 
//которая найдет все строки по краям которых стоят буквы 'a', и 
//заменит каждую из них на '!'. Между буквами a может быть любой символ (кроме a).

let strReplace= 'aba accca azzza wwwwa'.replace(/a.+?a/g, '!');
console.log(strReplace);

//4

 let componentA = {
         height: 10,
         weight:20,
         componentB:{
             height:20,
             weight:30
         },
         componentC:{
             height:40,
             weight:50,
             componentR:{
                 height:200,
                 weight:500
             },
             componentH:{
                 height:300,
                 weight:600
             }
         },
         componentD:{
            height:40,
            weight:50
        },
        componentJ:{
            height:40,
            weight:50,
            componentT:{
                height:367,
                weight:654,
                componentK:{
                    height:233,
                    width:543
                }
            }
        },
     };
     let componentData=deepClone(componentA);
    //  console.log(componentData);
     componentA.componentB.height=200;
     componentA.componentJ.weight=400;
     componentA.componentJ.componentT.weight=100;

     let updateData=deepClone(componentA);
     
    let diff = function (obj1, obj2) {
        let diffs = {};
        let key;
        let compare = function (item1, item2, key) {
            let type1 = Object.prototype.toString.call(item1);
            let type2 = Object.prototype.toString.call(item2);
            if (type1 !== type2) {
                diffs[key] = item2;
            }
            if (type1 === '[object Object]') {
                let objDiff = diff(item1, item2);
                if (Object.keys(objDiff).length > 0) {
                    diffs[key] = objDiff;
                }
                return;
            }
            if (type1 === '[object Function]') {
                if (item1.toString() !== item2.toString()) {
                    diffs[key] = item2;
                }
            } else {
                if (item1 !== item2 ) {
                    diffs[key] = item2;
                }
            }
        };
        for (key in obj1) {
            if (obj1.hasOwnProperty(key)) {
                compare(obj1[key], obj2[key], key);
            }
        };
        return diffs;
    };
    console.log(diff(componentData,updateData));



    //2

    // const executed = [];
       
    // const tasksMap = {
    //     taskName: () => "task1",
    //     taskName2: () => "task2",
    //     taskName3: () => "task3"
    //   };
      
    //   function taskExecute(taskName) {
    //     executed.push(taskName);
    //     return tasksMap[taskName]();
    //   };
      
    //   for (let key in tasksMap) {
    //     console.log(taskExecute(key));
    //     console.log(executed);
    //   };  

      
      let taskMap={
        tasks:{
            taskName: function callbackFunction1(){
                this.executed.push(callbackFunction1.name);
            },
            taskName2: function callbackFunction2(){
                this.executed.push(callbackFunction2.name);
            },
            taskName3: function callbackFunction3(){
                this.executed.push(callbackFunction3.name);
            }
        },
        executed:[],
        taskExecute(obj){
            for(let key in obj){
                obj[key].call(this, key)
            }
            return this.executed;
        }
      }
console.log(taskMap.taskExecute(taskMap.tasks));

let arrowTaskMap={
    executed:[],
    tasks:{
        taskName1: ()=>arrowTaskMap.executed.push('task1'),
        taskName2: ()=>arrowTaskMap.executed.push('task2'),
        taskName3: ()=> arrowTaskMap.executed.push('task3')
    },
    taskExecute(obj){
        for(let key in obj){
            obj[key].call(this,key);
        }
        return arrowTaskMap.executed;
    }
}
console.log(arrowTaskMap.taskExecute(arrowTaskMap.tasks));




















