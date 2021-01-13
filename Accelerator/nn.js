class NeuralNetwork {
    constructor(_input, _hidden, _output, _model) {
        if (_model && _model instanceof tf.Sequential) {
            this.model = _model;
        }
        this.input_nodes = _input;
        this.hidden_nodes = _hidden;
        this.output_nodes = _output;

        this.model = this.createModel();
    }

    dispose() {
        this.model.dispose();
    }

    createModel() {
        const model = tf.sequential();
        const hidden = tf.layers.dense({
            units: this.hidden_nodes,
            inputShape: [this.input_nodes],
            activation: 'sigmoid'
        });
        model.add(hidden);
        const output = tf.layers.dense({
            units: this.output_nodes,
            activation: 'softmax'
        });
        model.add(output);
        return model;
    }

    predict(inputs) {
        return tf.tidy(() => {
            const input_tensor = tf.tensor2d([inputs]);
            const output_tensor = this.model.predict(input_tensor);
            input_tensor.dispose();
            const outputs = output_tensor.dataSync();
            output_tensor.dispose();
            //console.log(outputs);
            return outputs;
        });
    }

    copy() {
        return tf.tidy(() => {
            const modelCopy = this.createModel();
            //add crossover later...
            const weights = this.model.getWeights();
            const weightCopies = [];
            for (let i = 0; i < weights.length; i++) {
                weightCopies[i] = weights[i].clone();
            }
            modelCopy.setWeights(weightCopies);
            return new NeuralNetwork(this.input_nodes, this.hidden_nodes, this.output_nodes, modelCopy);
        });
    }

    mutate(rate) {
        tf.tidy(() => {
            const weights = this.model.getWeights();
            const mutatedWeights = [];
            for (let i = 0; i < weights.length; i++) {
                let tensor = weights[i];
                let shape = weights[i].shape;
                let values = tensor.dataSync().slice(); // try with arraySync()
                for (let j = 0; j < values.length; j++) {
                    let w = values[j];
                    if (random(1) < rate) {
                        values[j] = w + randomGaussian();
                    }
                }
                let mutatedTensor = tf.tensor(values, shape);
                mutatedWeights[i] = mutatedTensor;
            }
            this.model.setWeights(mutatedWeights);
        });
    }
}