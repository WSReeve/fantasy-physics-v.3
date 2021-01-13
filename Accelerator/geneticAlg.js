
function nextGen() {

    calcFitness();

    for (let i = 0; i < population; i++) {
        protons[i] = chooseParent();
    }
    for (let i = 0; i < population; i++) {
        oldProtons[i].dispose();
    }
    oldProtons = [];
    console.log("next gen");
}

function calcFitness() {
    let sum = 0;
    for (let proton of oldProtons) {
        sum += proton.score;
    }
    for (let proton of oldProtons) {
        proton.fitness = proton.score / sum;
    }
}

function chooseParent() {
    let i = 0;
    let n = random(1);

    while (n > 0) {
        n -= oldProtons[i].fitness;
        i++
    }
    i--;

    let parent = oldProtons[i];
    //console.log(parent.score + " vs " + oldProtons[oldProtons.length - 1].score);
    let child = new Proton(parent.brain);
    child.brain.mutate(0.1);
    return child;
}

// function mutate(_proton, _amount) {
//     _proton.brain.mutate(_amount);
// }