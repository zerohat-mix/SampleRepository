let json = JSON.stringify(files);
const buttonMonth = ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12'];

for (let i = 0; i < buttonYear.length; i++){
    let newBtn = document.createElement('button');
    newBtn.type = "button";
    newBtn.innerText = String(buttonYear[i]);
    newBtn.id = String(buttonYear[i]) ;
    newBtn.style.cssText = 'display: inline-block;\n' +
        ' text-decoration: none;\n' +
        ' font-size: 17px;\n' +
        'width:100px;\n' +
        ' outline: none;\n' +
        ' border-width: 2px 0;\n' +
        ' border-style: solid none;\n' +
        ' color: #fff;\n' +
        ' background-color: #3c763d;\n' +
        ' border-color: #3c763d;\n' +
        ' border-radius: 4px;\n' +
        ' transition: 0.2s;\n' +
        ' position: relative;' +
        ' margin: 5px;' +
        ' display: block;';
    document.body.appendChild(newBtn);
    year();
}

function Create2DArray(quantity) {
    let arr = [];
    for (let i = 0;i < quantity;i++) {
        arr[i] = [];
    }
    return arr;
}

let arrayMonth = Create2DArray(buttonYear.length);

function setArrayName() {
    function getNamePdfFile(point1, point2){
        let array = new Array(12);
        let count = 0;
        for (let i = point1; i < point2; i++){
            if (json[i] === '-'){
                array[count] = json[i + 1] + json[i + 2];
                count = count + 1;
            }
        }
        return array;
    }

    let point1 = 0;
    let point2 = 0;
    let count = 0;

    for (let i = 0; i < json.length; i++){
        if (json[i] === ':' && json[i + 1] === '{'){
            point1 = i;
            for (let j = point1; j < json.length; j++){
                if ((json[j] === '}' && json[j + 1] === ',') || (json[j] === '}' && json[j + 1] === '}')){
                    point2 = j;
                    break;
                }
            }
            arrayMonth[count] = getNamePdfFile(point1, point2);
            count = count + 1;
        }
    }
}

setArrayName();

function blockingMonth(arrayName, ev) {

    function indexYear(ev){
        for (let i = 0; i < buttonYear.length; i++){
            if (String(buttonYear[i]) === ev){
                return i;
            }
        }
    }

    let arrayBool = new Array(buttonMonth.length);

    for (let i = 0; i < arrayBool.length; i++){
        arrayBool[i] = false;
    }

    for (let i = 0; i < buttonMonth.length; i++ ){
        for (let j = 0; j < buttonMonth.length; j++){
            if (arrayMonth[indexYear(ev)][i] === buttonMonth[j] ){
                arrayBool[j] = true;
            }
        }
    }

    for (let i = 0; i < arrayBool.length; i++){
        if (arrayBool[i] === false){
            document.getElementById(buttonMonth[i]).style.background = '#969b96';
            document.getElementById(buttonMonth[i]).disabled = true;
        }else {
            document.getElementById(buttonMonth[i]).style.background = '#a94442';
            document.getElementById(buttonMonth[i]).disabled = false;
        }
    }
}

function month(s) {
    document.onclick = function choiceMonth (event) {
        for (let i = 0; i < 12; i++) {
            if (event.target.id === buttonMonth[i] ) {
                let a = s + name + "-" + buttonMonth[i] + ".pdf";
                window.open(a);
                month(s);
                choiceMonth();
            }else {
                year(event.target.id);
            }
        }
    }
}

function choiceYear(ev) {
    for (let i = 0; i < buttonYear.length; i++){
        document.getElementById(String(buttonYear[i])).style.background = '#3c763d';
    }
    document.getElementById(ev).style.background = '#1ee336';
}

function url(ev) {
    for (let i = 0; i < buttonYear.length; i++) {
        if (ev === String(buttonYear[i])) {
            let s = "./" + name + "/" + buttonYear[i] + "/";
            choiceYear(ev);
            blockingMonth(arrayMonth, ev);
            month(s);
        }
    }
}

function year(ev) {
    if (ev == null){
        document.onclick = function (event) {
            url(event.target.id);
        }
    }else {
        url(ev);
    }
}