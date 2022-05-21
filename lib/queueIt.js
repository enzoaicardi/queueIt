function queue(params, vars){

    var inc = 1;
    var index = 0;
    var paused = true;
    var reversed = false;
    var intervaled = 0;
    var waited = true;
    var finish = function(){}, args = [];
    vars = vars || [];

    if(params.length%2) throw 'QueueIt -> Missing something in queue parameters';
    function isEnd(){return reversed?index<0:index>=params.length; }

    function playqueue(){

        // verif
        if(typeof params[index] !== 'function') throw 'QueueIt -> First argument must be a function';
        if(!params[index+1] || !Array.isArray(params[index+1])) throw 'QueueIt -> Missing argument after function in queue';

        // next
        function next(i){
            index += (i || 1)*2*(inc);

            if(isEnd()) { finish(...args); return; }
            if(!intervaled) {playqueue(); return;}
            setTimeout(playqueue, intervaled);
        }

        // play the function
        if(paused) return;
        if(waited) { params[index](...params[index+1], next, ...vars); return; }

        // if we don't wait we pass the function and a blank next
        params[index](...params[index+1], function(){}, ...vars);
        next();

    }

    function play(i){ if(paused) { paused = false; index = i != null ? (i*2) : !index?reversed?(params.length-2):0:index; playqueue(); } }
    function pause(){ paused = true; }
    function jumpTo(i){ index = i != null ? (i*2) : index; }
    function reverse(b){ reversed = b != null ?b:reversed?false:true; inc = reversed?(-1):1; }
    function interval(i){ intervaled = i || 0; }
    function wait(b){ waited = b ? true : false; }
    function variables(a, push){ if(push) { vars.push(...a); } else { vars = a || []; } }
    function onfinish(f, a){ finish = f; args = a || args; }

    function status(){
        return {
            index:       index,
            play:        paused?false:true,
            reverse:     reversed,
            interval:    intervaled,
            wait:        waited,
            variables:   vars,
            onfinish:    finish,
            args:        args,
            parameters:  params
        };
    }

    function change(o){
        if(o.reverse){ reversed = o.reverse }
        if(o.interval != null){ intervaled = o.interval || 0; }
        if(o.wait != null){ waited = o.wait; }
        if(o.variables){ vars = o.variables; }
        if(o.onfinish){ finish = o.onfinish; }
        if(o.args){ args = o.args; }
    }

    return {play: play, pause: pause, jumpTo: jumpTo, reverse: reverse, interval: interval, wait: wait, variables: variables, onfinish: onfinish, status: status, change: change };

}

function every(items, array, options){

    var itemQ = [];

    function qfn(q, next){

        function nextIt(){
            next();
        }

        var ofnfn = q.status().onfinish;

        q.onfinish(function(){ ofnfn(...arguments); nextIt(); });
        q.play();

    }

    for(var i=0; i<items.length; i++){

        var q = queue(array);
        if(options) q.change(options);
        q.variables([items[i]], true);

        itemQ.push(qfn, [q]);

    }

    return queue(itemQ);
}