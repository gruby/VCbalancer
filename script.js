let inputwindow = document.getElementById('invalues');
let action = document.getElementById('action');
let outcomewindow = document.getElementById('outcome');
let expertWorkload = [];
let vcs = [];
let numberOfVCs = 7;

function populateVCs(a) {
    for (i=1;i<=a;i++) {
        let vc = [];
        vcs.push(vc);
    }}

function by_crs(a,b) {
    if (a.crs>b.crs) {
        return -1;
    }
    if (a.crs<b.crs) {
        return 1;
    }
    return 0;
}

function by_iers(a,b) {
    if (a.iers>b.iers) {
        return -1;
    }
    if (a.iers<b.iers) {
        return 1;
    }
    return 0;
}

function by_total(a,b) {
    if (a.total>b.total) {
        return -1;
    }
    if (a.total<b.total) {
        return 1;
    }
    return 0;
}

function processInput(indata) {
    indata.trim().split('\n').forEach(element => {
        let here = {}
        let splited = element.split(/\t/, 3);  
        here.expid = splited[0];
        here.iers = Number(splited[1]);
        here.crs = Number(splited[2]);
        here.total = here.crs*2 + here.iers;
        expertWorkload.push(here);
    });
    return expertWorkload.sort(by_iers).sort(by_crs)
}

numberOfTasks = function(items, prop){
    return items.reduce( function(a,b){
        return a + b[prop];
    },0);
}

function findLeastBusyVC() {
    minVal = 100
    minVC = 0
    vcs.forEach((vc) => {
        if (numberOfTasks(vc,'crs') < minVal) {
            minVal = numberOfTasks(vc,'crs');
            minVC = vc
        }
    }        
    );
    return minVC
};
    

action.onclick = () => {
    //console.log(expertWorkload.length)
    populateVCs(numberOfVCs);
    processInput(inputwindow.value);
    //console.log(expertWorkload.length)
    //console.log(JSON.stringify(inputwindow.value.trim()))
    //console.log(expertWorkload);
    //outcomewindow.innerHTML = expertWorkload;
    vcs.forEach((vc) => vc.push(expertWorkload.shift()));
    while (expertWorkload.length > 0) {
        findLeastBusyVC().push(expertWorkload.shift());
    }
    console.log(vcs);
    //console.log(findLeastBusyVC())
    //findLeastBusyVC().push(expertWorkload.shift());
    //console.log(expertWorkload)
    //inputwindow.value = "hello\tbaba\thellooo"
}