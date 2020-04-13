'use strict';
const _ = require('lodash');

function Sequencer(sequence) {
    const _this = this;
    let resultStack = [];
    _this.currentStep = sequence[0]; // initialize with the first call

    function callStep() {
        let step = _this.currentStep;
        if (!step) {
            return;
        }

        let options = {};

        let f = step.call;
        if (step.input.node) {
            let params = _.find(resultStack, { node: step.input.node });
            if (params) {
                options = params.result;
            }
        }

        f(options).then(res => {
            // Find item index using _.findIndex
            let index = _.findIndex(resultStack, { node: step.node });
            if (index) {
                // Replace item at index using native splice
                resultStack.splice(index, 1, { node: step.node, result: res });
            }
            else {
                resultStack.push({ node: step.node, result: res });
            }
            _this.currentStep = _.find(sequence, { node: step.next });
            if (_this.currentStep) {
                return callStep();
            }
        })
    }

    callStep();
}


module.exports = Sequencer;
