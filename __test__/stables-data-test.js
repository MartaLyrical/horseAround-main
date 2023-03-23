const { Stables } = require('../Schema/stables');




const stablesTestData = [{
        _id: '640cac644be6e1bbfa31a31f',
        name: 'Stable A',
        location: 'asd',
        owner: 'Marta',
        numberOfHorses: 100
    },
    {
        _id: '640cac644be6e1bbfa31a320',
        name: 'Stable B',
        location: 'asd',
        owner: 'Matt',
        numberOfHorses: 200
    },
    {
        _id: '640cac644be6e1bbfa31a321',
        name: 'Stable C',
        location: 'asd',
        owner: 'Marta',
        numberOfHorses: 10
    }
];

async function loadTestData() {
    await Stables.deleteMany();
    await Stables.insertMany(stablesTestData);
}

function getAllStables() {
    return stablesTestData;
}

module.exports = { loadTestData, getAllStables };