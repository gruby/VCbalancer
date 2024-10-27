let inputwindow = document.getElementById('wlin');
let nbvc = document.getElementById('vcin');
let action = document.getElementById('action');
let outcomewindow = document.getElementById('outcome');
let expertWorkload = [];
let numberOfVCs = Number(nbvc.value)
let vcs = [];


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

function processInput(indata) {
    indata.trim().split('\n').forEach(element => {
        let here = {}
        let splited = element.split(/\t/, 3);  
        here.expid = splited[0];
        here.iers = Number(splited[1]);
        here.crs = Number(splited[2]);
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
    let minVal = 10000
    let minVC = []
    if (expertWorkload[0].crs > 0) {
        vcs.forEach((vc) => {
            if (numberOfTasks(vc,'crs') < minVal) {
                minVal = numberOfTasks(vc,'crs');
                minVC = vc
            }
        }        
        );
    } else {
        vcs.forEach((vc) => {
            if (numberOfTasks(vc,'iers') < minVal) {
                minVal = numberOfTasks(vc,'iers');
                minVC = vc
            }
        }        
        );
    }    
    return minVC
};

function stringifyOutcome(a) {
    t = "";
    a.forEach(vcc => {
        vcc.forEach(ex => {
            //t = t+ex.expid+"\t"+"VC_"+String(Number(a.indexOf(vcc)+1))+"\n"
            t = t+"VC_"+String(Number(a.indexOf(vcc)+1))+"\t"+ex.expid+"\n"
        });
        t=t+"\n"
    });
    return t
}

function stringifyStatistics(aa) {
    tt = "<table><tr><th>VCs</th><th>Total of IERs</th><th>Total of CRs</th><th>Total of experts to follow</th></tr>"
    aa.forEach(vvc => {
        tt=tt+"<tr><td>VC_"+String(Number(aa.indexOf(vvc)+1))+"</td><td>"+numberOfTasks(vvc,"iers")+"</td><td>"+numberOfTasks(vvc,"crs")+"</td><td>"+vvc.length+"</td></tr>"
    });
    tt = tt+"</tr></table>"
    return tt;
}

action.onclick = () => {    
    populateVCs(numberOfVCs);
    processInput(inputwindow.value);
    console.log(vcs)
    //console.log(expertWorkload)
    //console.log(numberOfTasks(expertWorkload,'crs'))
    //console.log(expertWorkload)
    //console.log(expertWorkload[0].crs)
    //console.log(JSON.stringify(inputwindow.value.trim()))
    //console.log(expertWorkload);
    //outcomewindow.innerHTML = "Here are some statistics:"+" and here :)";
    vcs.forEach((vc) => vc.push(expertWorkload.shift()));
    while (expertWorkload.length > 0) {
        findLeastBusyVC().push(expertWorkload.shift());
        //console.log(findLeastBusyVC());
        //expertWorkload.shift();
    }
    console.log(stringifyOutcome(vcs));
    vcs.forEach(ee => {
        console.log([numberOfTasks(ee,"iers"), numberOfTasks(ee,"crs")])
    });
    //console.log(findLeastBusyVC())
    //findLeastBusyVC().push(expertWorkload.shift());
    //console.log(expertWorkload)
    inputwindow.value = stringifyOutcome(vcs)
    outcomewindow.innerHTML = stringifyStatistics(vcs)
    action.style.display = 'none';
}