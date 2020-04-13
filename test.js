'use strict';
const Sequencer = require('./index.js');

const prefix = 'test';

const dbg = function(obj, ...argumentArray) {
    argumentArray.unshift(obj);
    argumentArray.unshift('[' + prefix + ']');
    return console.log.apply(this, argumentArray);
};

const dbgE = function(obj, ...argumentArray) {
    argumentArray.unshift(obj);
    argumentArray.unshift('[' + prefix + ']');
    return console.error.apply(this, argumentArray);
};


function step1(params) {
    const _this = this;
    return new Promise(function(fulfilled, rejected) {
        const handlerName = 'step1';
        dbg(handlerName, 'input', params);
        let add;
        if (!params.val) {
            add = 0;
        }
        else {
            add = params.val;
        }

        setTimeout(() => {
            add = add + 10
            fulfilled({ val: add });
        }, 100)
    });
}

function step2(params) {
    const _this = this;
    return new Promise(function(fulfilled, rejected) {
        const handlerName = 'step2';
        dbg(handlerName, 'input', params);
        let add;
        if (!params.val) {
            add = 0;
        }
        else {
            add = params.val;
        }

        setTimeout(() => {
            add = add + 10
            fulfilled({ val: add });
        }, 100)
    });
}

function step3(params) {
    const _this = this;
    return new Promise(function(fulfilled, rejected) {
        const handlerName = 'step3';
        dbg(handlerName, 'input', params);
        let add;
        if (!params.val) {
            add = 0;
        }
        else {
            add = params.val;
        }

        setTimeout(() => {
            add = add + 10
            fulfilled({ val: add });
        }, 100)
    });
}


const sequence = [{
    node: 'step1',
    call: step1,
    input: { value: null },
    next: 'step3',
}, {
    node: 'step2',
    call: step2,
    input: { node: 'step3' },
    next: 'step3'
}, {
    node: 'step3',
    call: step3,
    input: { node: 'step2' },
    next: 'step2'
}]

const s = new Sequencer(sequence);
