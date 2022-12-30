const canvas = document.getElementById('canvas');
const collisions = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 24025, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 24025, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 24025, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 24025, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 24025, 24025, 24025, 24025, 24025, 24025, 24025, 24025, 24025, 24025, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 24025, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 24025, 24025, 0, 0, 0, 0, 0, 0, 0, 0, 24025, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 24025, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 24025, 0, 0, 0, 0, 0, 0, 0, 0, 0, 24025, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 24025, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 24025, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 24025, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 24025, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 24025, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 24025, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 24025, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 24025, 24025, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 24025, 24025, 24025, 24025, 24025, 24025, 24025, 24025, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 24025, 0, 0, 0, 24025, 24025, 24025, 24025, 24025, 24025, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 24025, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 24025, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 24025, 0, 0, 0, 24025, 0, 0, 0, 0, 24025, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 24025, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 24025, 24025, 24025, 24025, 24025, 24025, 24025, 24025, 24025, 24025, 0, 0, 0, 0, 0, 24025, 24025, 24025, 24025, 24025, 0, 0, 0, 0, 24025, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 24025, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 24025, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 24025, 0, 0, 0, 0, 24025, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 24025, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 24025, 0, 0, 0, 0, 0, 0, 24025, 0, 0, 0, 0, 24025, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 24025, 24025, 24025, 24025, 24025, 24025, 0, 0, 0, 0, 0, 0, 0, 0, 0, 24025, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 24025, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 24025, 0, 0, 0, 0, 0, 0, 24025, 0, 0, 0, 0, 24025, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 24025, 24025, 24025, 24025, 24025, 24025, 0, 0, 0, 0, 0, 0, 0, 0, 0, 24025, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 24025, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 24025, 0, 0, 0, 0, 0, 0, 24025, 0, 0, 0, 0, 24025, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 24025, 0, 0, 0, 0, 24025, 0, 0, 0, 0, 0, 0, 0, 24025, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 24025, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 24025, 0, 0, 0, 0, 0, 0, 24025, 0, 0, 0, 0, 24025, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 24025, 0, 0, 0, 0, 0, 24025, 0, 0, 0, 0, 0, 24025, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 24025, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 24025, 0, 0, 0, 0, 0, 0, 24025, 0, 0, 0, 0, 24025, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 24025, 0, 0, 0, 0, 0, 0, 24025, 0, 0, 0, 0, 24025, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 24025, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 24025, 0, 0, 0, 0, 0, 0, 24025, 0, 0, 0, 0, 24025, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 24025, 0, 0, 0, 0, 0, 0, 24025, 0, 0, 0, 0, 24025, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 24025, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 24025, 0, 0, 0, 0, 0, 0, 24025, 0, 0, 0, 0, 24025, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 24025, 0, 0, 0, 0, 0, 0, 0, 24025, 0, 0, 24025, 24025, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 24025, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 24025, 0, 0, 0, 0, 0, 0, 24025, 0, 0, 0, 0, 24025, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 24025, 0, 0, 0, 0, 0, 0, 0, 24025, 0, 0, 24025, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 24025, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 24025, 0, 0, 0, 0, 0, 0, 24025, 0, 0, 0, 0, 24025, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 24025, 0, 0, 0, 0, 0, 0, 0, 24025, 24025, 24025, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 24025, 24025, 24025, 24025, 24025, 24025, 24025, 24025, 24025, 24025, 24025, 24025, 24025, 24025, 24025, 24025, 24025, 0, 0, 0, 0, 0, 0, 24025, 0, 0, 0, 0, 24025, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 24025, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 24025, 24025, 24025, 24025, 24025, 24025, 24025, 24025, 24025, 0, 0, 24025, 24025, 24025, 24025, 24025, 24025, 24025, 24025, 24025, 24025, 24025, 24025, 24025, 0, 0, 0, 0, 24025, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 24025, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 24025, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 24025, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 24025, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 24025, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 24025, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 24025, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 24025, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 24025, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 24025, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 24025, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 24025, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 24025, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 24025, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 24025, 24025, 24025, 24025, 24025, 24025, 24025, 24025, 24025, 24025, 24025, 24025, 24025, 24025, 24025, 24025, 24025, 24025, 24025, 24025, 24025, 24025, 24025, 24025, 24025, 24025, 24025, 24025, 24025, 24025, 24025, 24025, 24025, 24025, 24025, 24025, 24025, 24025, 24025, 24025, 24025, 24025, 24025, 24025, 24025, 24025, 24025, 24025, 24025, 24025, 24025, 24025, 24025, 24025, 24025, 24025, 24025, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

if (canvas) {
    canvas.width = 400;
    canvas.height = 400;
    const ctx = canvas.getContext('2d');

    ////////////////////////////////////////////////////////
    // Create Collision map
    const collisionMap = [];
    for (let i = 0; i < collisions.length; i += 70) {
        collisionMap.push(collisions.slice(i, 70 + i));
    }

    console.log(collisionMap);
    ////////////////////////////////////////////////////////

    class Boundary {
        static width = 28;
        static height = 28;
        constructor({position}) {
            this.position = position;
            this.width = 28;
            this.height = 28; // Weil 8 + 3.5 Zoomstufe bei TileMap
        }

        draw() {
            ctx.fillStyle = 'rgba(255,0,0,0.1)';
            ctx.fillRect(
                this.position.x,
                this.position.y,
                this.width,
                this.height,
            );
        }
    }

    const boundaries = [];
    const offset = {
        x: -5,
        y: -400,
    };
    collisionMap.forEach((row, i) => {
        row.forEach((symbol, j) => {
            if (symbol === 24025) {
                boundaries.push(
                    new Boundary({
                        position: {
                            x: j * Boundary.width + offset.x,
                            y: i * Boundary.height + offset.y,
                        },
                    }),
                );
            }
        });
    });

    console.log(boundaries);

    ctx.fillStyle = 'white';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    const image = new Image();
    image.src = './assets/main-map.png';

    const playerDownImage = new Image();
    playerDownImage.src = './assets/playerDown.png';

    const playerUpImage = new Image();
    playerUpImage.src = './assets/playerUp.png';

    const playerLeftImage = new Image();
    playerLeftImage.src = './assets/playerLeft.png';

    const playerRightImage = new Image();
    playerRightImage.src = './assets/playerRight.png';

    class Sprite {
        constructor({position, velocity, image, frames = {max: 1}, sprites = []}) {
            this.position = position;
            this.image = image;
            this.frames = {...frames, val: 0, elapsed: 0};

            this.image.onload = () => {
                this.width = this.image.width / this.frames.max;
                this.height = this.image.height;
            };
            this.moving = false;
            this.sprites = sprites
        }

        draw() {
            ctx.drawImage(
                this.image,
                this.frames.val * this.width,
                0,
                this.image.width / this.frames.max,
                this.image.height,
                this.position.x,
                this.position.y,
                this.image.width / this.frames.max,
                this.image.height,
            );
            if (this.moving === true) {
                if (this.frames.max > 1) {
                    this.frames.elapsed++;
                }
                if (this.frames.elapsed % 10 === 0) {
                    if (this.frames.val < this.frames.max - 1) {
                        this.frames.val++;
                    } else {
                        this.frames.val = 0;
                    }
                }
            }
        }
    }

    const player = new Sprite({
        position: {
            x: canvas.width / 2 - 183 / 3,
            y: canvas.height / 2 - 62 / 2,
        },
        image: playerDownImage,
        frames: {
            max: 3,
        },
        sprites: {
            up: playerUpImage,
            left: playerLeftImage,
            down: playerDownImage,
            right: playerRightImage
        }
    });

    const background = new Sprite({
        position: {
            x: offset.x,
            y: offset.y,
        },
        image: image,
    });

    const keys = {
        w: {
            pressed: false,
        },
        a: {
            pressed: false,
        },
        s: {
            pressed: false,
        },
        d: {
            pressed: false,
        },
    };

    const movables = [background, ...boundaries];

    function rectangularCollision({rectangle1, rectangle2}) {
        return (
            rectangle1.position.x + rectangle1.width >= rectangle2.position.x &&
            rectangle1.position.x <= rectangle2.position.x + rectangle2.width &&
            rectangle1.position.y <=
                rectangle2.position.y + rectangle2.height &&
            rectangle1.position.y + rectangle1.height >= rectangle2.position.y
        );
    }

    // Animation loop
    function animate() {
        window.requestAnimationFrame(animate);

        // Draw Methods
        background.draw();

        player.draw();

        boundaries.forEach((boundary) => {
            boundary.draw();
            // Collision Detection
        });
        let moving = true;
        player.moving = false
        if (keys.w.pressed && lastKey === 'w') {
            player.moving = true
            player.image = player.sprites.up
            for (let i = 0; i < boundaries.length; i++) {
                const boundary = boundaries[i];
                if (
                    rectangularCollision({
                        rectangle1: player,
                        rectangle2: {
                            ...boundary,
                            position: {
                                x: boundary.position.x,
                                y: boundary.position.y + 3,
                            },
                        },
                    })
                ) {
                    moving = false;
                    break;
                }
            }
            if (moving)
                movables.forEach((movable) => {
                    movable.position.y += 3;
                });
        } else if (keys.a.pressed && lastKey === 'a') {
            player.moving = true
            player.image = player.sprites.left
            for (let i = 0; i < boundaries.length; i++) {
                const boundary = boundaries[i];
                if (
                    rectangularCollision({
                        rectangle1: player,
                        rectangle2: {
                            ...boundary,
                            position: {
                                x: boundary.position.x + 3,
                                y: boundary.position.y,
                            },
                        },
                    })
                ) {
                    moving = false;
                    break;
                }
            }
            if (moving)
                movables.forEach((movable) => {
                    movable.position.x += 3;
                });
        } else if (keys.s.pressed && lastKey === 's') {
            player.moving = true
            player.image = player.sprites.down
            for (let i = 0; i < boundaries.length; i++) {
                const boundary = boundaries[i];
                if (
                    rectangularCollision({
                        rectangle1: player,
                        rectangle2: {
                            ...boundary,
                            position: {
                                x: boundary.position.x,
                                y: boundary.position.y - 3,
                            },
                        },
                    })
                ) {
                    moving = false;
                    break;
                }
            }
            if (moving)
                movables.forEach((movable) => {
                    movable.position.y -= 3;
                });
        } else if (keys.d.pressed && lastKey === 'd') {
            player.moving = true
            player.image = player.sprites.right
            for (let i = 0; i < boundaries.length; i++) {
                const boundary = boundaries[i];
                if (
                    rectangularCollision({
                        rectangle1: player,
                        rectangle2: {
                            ...boundary,
                            position: {
                                x: boundary.position.x - 3,
                                y: boundary.position.y,
                            },
                        },
                    })
                ) {
                    moving = false;
                    break;
                }
            }
            if (moving)
                movables.forEach((movable) => {
                    movable.position.x -= 3;
                });
        }
    }

    animate();

    let lastKey = '';
    window.addEventListener('keydown', (e) => {
        switch (e.key) {
            case 'w':
                keys.w.pressed = true;
                lastKey = 'w';
                break;
            case 'a':
                keys.a.pressed = true;
                lastKey = 'a';
                break;
            case 's':
                keys.s.pressed = true;
                lastKey = 's';
                break;
            case 'd':
                keys.d.pressed = true;
                lastKey = 'd';
                break;

            default:
                break;
        }
    });

    ////////////////////////////////////////////////////////
    // Klasse um gedrückte Taste triggern
    class ClickAndHold {
        constructor(EventTarget, callback) {
            this.EventTarget = EventTarget;
            this.callback = callback;
            this.isHeld = false;
            this.activeHoldTimeoutId = null;

            ['mousedown', 'touchstart'].forEach((type) => {
                this.EventTarget.addEventListener(
                    type,
                    this._onHoldStart.bind(this),
                );
            });

            [
                'mouseup',
                'mouseleave',
                'mouseout',
                'touchend',
                'touchcancel',
            ].forEach((type) => {
                this.EventTarget.addEventListener(
                    type,
                    this._onHoldEnd.bind(this),
                );
            });
        }

        _onHoldStart() {
            this.isHeld = true;

            this.activeHoldTimeoutId = setTimeout(() => {
                if (this.isHeld) {
                    this.callback();
                }
            }, 200);
        }

        _onHoldEnd() {
            this.isHeld = false;
            clearTimeout(this.activeHoldTimeoutId);
            keys.w.pressed = false;
            keys.a.pressed = false;
            keys.s.pressed = false;
            keys.d.pressed = false;
        }
    }

    const upBtn = document.getElementById('up');
    const leftBtn = document.getElementById('left');
    const downBtn = document.getElementById('down');
    const rightBtn = document.getElementById('right');

    document.addEventListener('DOMContentLoaded', function () {
        document.querySelector('div').addEventListener(
            'contextmenu',
            function (e) {
                // Alternative
                e.preventDefault();
            },
            false,
        );
    });

    new ClickAndHold(upBtn, () => {
        keys.w.pressed = true;
        lastKey = 'w';
    });
    new ClickAndHold(leftBtn, () => {
        keys.a.pressed = true;
        lastKey = 'a';
    });
    new ClickAndHold(downBtn, () => {
        keys.s.pressed = true;
        lastKey = 's';
    });
    new ClickAndHold(rightBtn, () => {
        keys.d.pressed = true;
        lastKey = 'd';
    });

    ////////////////////////////////////////////////////////

    window.addEventListener('keyup', (e) => {
        switch (e.key) {
            case 'w':
                keys.w.pressed = false;
                break;
            case 'a':
                keys.a.pressed = false;
                break;
            case 's':
                keys.s.pressed = false;
                break;
            case 'd':
                keys.d.pressed = false;
                break;

            default:
                break;
        }
    });
}
