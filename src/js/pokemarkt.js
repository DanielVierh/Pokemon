const canvas3 = document.getElementById('canvas3');
const collisions = [
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    24377, 24377, 24377, 24377, 24377, 24377, 24377, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    24377, 0, 0, 0, 0, 0, 0, 24377, 24377, 24377, 24377, 24377, 24377, 24377,
    24377, 24377, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 24377, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 24377, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 24377, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 24377, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 24377, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 24377, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 24377, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    24377, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 24377,
    24377, 24377, 24377, 24377, 24377, 24377, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 24377, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    24377, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 24377, 24377, 0, 0, 0, 0, 0,
    24377, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 24377, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 24377, 24377, 24377, 24377, 0, 0, 0, 0, 24377,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 24377, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 24377, 24377, 24377, 24377, 0, 0, 0, 0, 24377, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 24377, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 24377, 24377, 24377, 24377, 0, 0, 0, 0, 24377, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 24377, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 24377, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 24377, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 24377, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 24377, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 24377,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 24377, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 24377, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 24377, 24377, 24377, 24377, 24377,
    24377, 24377, 0, 0, 0, 0, 24377, 24377, 24377, 24377, 24377, 24377, 24377,
    24377, 24377, 24377, 24377, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0,
];

const buyingZoneData = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 24378, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 24378, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 24378, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

const exitData = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 243781, 243781, 243781, 243781, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]

const buyingEffect = document.getElementById('buyingEffect');
let infoBox = document.getElementById('infoBox');
const pokeballPrice = 20;
const trankPrice = 50;
const beleberPrice = 70;
const bonbonPrice = 100;

const lbl_Money = document.getElementById("lbl_Money");
const lbl_Shop_Money = document.getElementById("lbl_Shop_Money");
const shopWindow = document.getElementById("shopWindow");
const btnCloseShop = document.getElementById("btnCloseShop");
const btn_open_Shop = document.getElementById("btn_open_Shop");
const btn_Pokeball = document.getElementById("btn_Pokeball");
const btn_Trank = document.getElementById("btn_Trank");
const lbl_Amount_Pokeballs = document.getElementById("lbl_Amount_Pokeballs");
const lbl_Amount_Tranks = document.getElementById("lbl_Amount_Tranks");
const btn_Buy = document.getElementById("btn_Buy");

let save_Object = {
    today_Date: '',
    myPokemonTeam: [],
    myCatchedPokemons: [],
    allFacedPokemons: [],
    allPokemonMoves: [],
    today_Pokemons: [],
    items: {
        pokeballs: 60,
        money: 100,
        beleber: 5,
        trank: 5,
        bonbon: 3,
    },
    gen: 'all',
};

let myTeam = [];
let myCatchedPokemons = [];

if (canvas3) {
    window.onload = init();

    function init() {
        if (document.getElementById('pokeMarktTag')) {
            load_SaveObj();
        }
    }

    function load_SaveObj() {
        if (localStorage.getItem('stored_save_Object') != null) {
            save_Object = JSON.parse(
                localStorage.getItem('stored_save_Object'),
            );
            myTeam = save_Object.myPokemonTeam;
            myCatchedPokemons = save_Object.myCatchedPokemons;

            try {
                renderTeam();
            } catch (error) {}
        }
    }

    function save_SaveObj() {
        localStorage.setItem('stored_save_Object', JSON.stringify(save_Object));
        console.log('SaveObj', save_Object);
    }

    function renderTeam() {
        for (let i = 0; i < myTeam.length; i++) {
            document.getElementById(`teamPoke_${i}`).src =
                myTeam[i].spriteFront;
                document.getElementById(`teamPokeName_${i}`).innerHTML = makeFirstLetterBig(myTeam[i].name)
                let hpInPercent = myTeam[i].hp * 100 / myTeam[i].maxHp
                document.getElementById(`teamPokeProgress_${i}`).value = hpInPercent
            if (myTeam[i].isDefeated === true) {
                document
                    .getElementById(`teamPoke_${i}`)
                    .classList.add('defeat');
            }
        }
    }

    canvas3.width = 400;
    canvas3.height = 400;
    const ctx = canvas3.getContext('2d');

    ////////////////////////////////////////////////////////
    // Create Collision map
    const collisionMap = [];
    for (let i = 0; i < collisions.length; i += 41) {
        collisionMap.push(collisions.slice(i, 41 + i));
    }

    ////////////////////////////////////////////////////////

    ////////////////////////////////////////////////////////
    // buyingzone Map
    const buyingzoneMap = [];
    for (let i = 0; i < buyingZoneData.length; i += 41) {
        buyingzoneMap.push(buyingZoneData.slice(i, 41 + i));
    }

    // Exit Map
    const exitDataMap = [];
    for (let i = 0; i < exitData.length; i += 41) {
        exitDataMap.push(exitData.slice(i, 41 + i));
    }


    class Boundary {
        static width = 28;
        static height = 28;
        constructor({position}) {
            this.position = position;
            this.width = 28;
            this.height = 28; // Weil 8 x 3.5 Zoomstufe bei TileMap
        }

        draw() {
            ctx.fillStyle = 'rgba(255,0,0,0.0)';
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
        x: -350,
        y: -450,
    };
    collisionMap.forEach((row, i) => {
        row.forEach((symbol, j) => {
            if (symbol === 24377) {
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

    const buyingZones = [];
    buyingzoneMap.forEach((row, i) => {
        row.forEach((symbol, j) => {
            if (symbol === 24378) {
                buyingZones.push(
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

    const exitZones = [];
    exitDataMap.forEach((row, i) => {
        row.forEach((symbol, j) => {
            if (symbol === 243781) {
                exitZones.push(
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


    const image = new Image();
    image.src = './assets/pokemarkt.png';

    const playerDownImage = new Image();
    playerDownImage.src = './assets/playerDown.png';

    const playerUpImage = new Image();
    playerUpImage.src = './assets/playerUp.png';

    const playerLeftImage = new Image();
    playerLeftImage.src = './assets/playerLeft.png';

    const playerRightImage = new Image();
    playerRightImage.src = './assets/playerRight.png';

    class Sprite {
        constructor({
            position,
            velocity,
            image,
            frames = {max: 1},
            sprites = [],
        }) {
            this.position = position;
            this.image = image;
            this.frames = {...frames, val: 0, elapsed: 0};

            this.image.onload = () => {
                this.width = this.image.width / this.frames.max;
                this.height = this.image.height;
            };
            this.moving = false;
            this.sprites = sprites;
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
            x: canvas3.width / 2 - 183 / 3,
            y: canvas3.height / 2 - 62 / 2,
        },
        image: playerUpImage,
        frames: {
            max: 3,
        },
        sprites: {
            up: playerUpImage,
            left: playerLeftImage,
            down: playerDownImage,
            right: playerRightImage,
        },
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

    const movables = [background, ...boundaries, ...buyingZones, ...exitZones];

    function rectangularCollision({rectangle1, rectangle2}) {
        return (
            rectangle1.position.x + rectangle1.width >= rectangle2.position.x &&
            rectangle1.position.x <= rectangle2.position.x + rectangle2.width &&
            rectangle1.position.y <=
                rectangle2.position.y + rectangle2.height &&
            rectangle1.position.y + rectangle1.height >= rectangle2.position.y
        );
    }

    const buying = {
        initiated: false,
    };

    // Animation loop
    function animate() {
        window.requestAnimationFrame(animate);

        // Draw Methods
        background.draw();

        buyingZones.forEach((buyingzone) => {
            buyingzone.draw();
        });

        exitZones.forEach((exitZone) => {
            exitZone.draw();
        });

        player.draw();

        boundaries.forEach((boundary) => {
            boundary.draw();
        });

        let moving = true;
        player.moving = false;

        if (buying.initiated) return;
        if (keys.w.pressed && lastKey === 'w') {
            player.moving = true;
            player.image = player.sprites.up;
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

            // Collision Detection for buyingzone
            for (let i = 0; i < buyingZones.length; i++) {
                const buyingZone = buyingZones[i];
                if (
                    rectangularCollision({
                        rectangle1: player,
                        rectangle2: buyingZone,
                    })
                ) {
                    healFunc();
                    break;
                }
            }
            // Collision Detection for EXITzone
            for (let i = 0; i < exitZones.length; i++) {
                const exitZone = exitZones[i];
                if (
                    rectangularCollision({
                        rectangle1: player,
                        rectangle2: exitZone,
                    })
                ) {
                    window.location = 'map1.html';
                    break;
                }
            }
            if (moving)
                movables.forEach((movable) => {
                    movable.position.y += 3;
                });
        } else if (keys.a.pressed && lastKey === 'a') {
            player.moving = true;
            player.image = player.sprites.left;
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
            // Collision Detection for buyingzone
            for (let i = 0; i < buyingZones.length; i++) {
                const buyingZone = buyingZones[i];
                if (
                    rectangularCollision({
                        rectangle1: player,
                        rectangle2: buyingZone,
                    })
                ) {
                    healFunc();
                    break;
                }
            }
            // Collision Detection for EXITzone
            for (let i = 0; i < exitZones.length; i++) {
                const exitZone = exitZones[i];
                if (
                    rectangularCollision({
                        rectangle1: player,
                        rectangle2: exitZone,
                    })
                ) {
                    window.location = 'map1.html';
                    break;
                }
            }
            if (moving)
                movables.forEach((movable) => {
                    movable.position.x += 3;
                });
        } else if (keys.s.pressed && lastKey === 's') {
            player.moving = true;
            player.image = player.sprites.down;
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
            // Collision Detection for buyingzone
            for (let i = 0; i < buyingZones.length; i++) {
                const buyingZone = buyingZones[i];
                if (
                    rectangularCollision({
                        rectangle1: player,
                        rectangle2: buyingZone,
                    })
                ) {
                    healFunc();
                    break;
                }
            }
            // Collision Detection for EXITzone
            for (let i = 0; i < exitZones.length; i++) {
                const exitZone = exitZones[i];
                if (
                    rectangularCollision({
                        rectangle1: player,
                        rectangle2: exitZone,
                    })
                ) {
                    window.location = 'map1.html';
                    break;
                }
            }
            if (moving)
                movables.forEach((movable) => {
                    movable.position.y -= 3;
                });
        } else if (keys.d.pressed && lastKey === 'd') {
            player.moving = true;
            player.image = player.sprites.right;
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
            // Collision Detection for buyingzone
            for (let i = 0; i < buyingZones.length; i++) {
                const buyingZone = buyingZones[i];
                if (
                    rectangularCollision({
                        rectangle1: player,
                        rectangle2: buyingZone,
                    })
                ) {
                    healFunc();
                    break;
                }
            }
            // Collision Detection for EXITzone
            for (let i = 0; i < exitZones.length; i++) {
                const exitZone = exitZones[i];
                if (
                    rectangularCollision({
                        rectangle1: player,
                        rectangle2: exitZone,
                    })
                ) {
                    window.location = 'map1.html';
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

    function healFunc() {
        // buying.initiated = true;
        // player.moving = false;
        // for (let i = 0; i < myTeam.length; i++) {
        //     myTeam[i].isDefeated = false;
        //     myTeam[i].hp = myTeam[i].maxHp;
        // }
        // for (let i = 0; i < myCatchedPokemons.length; i++) {
        //     myCatchedPokemons[i].isDefeated = false;
        //     myCatchedPokemons[i].hp = myCatchedPokemons[i].maxHp;
        // }

        // for (let i = 0; i < save_Object.myCatchedPokemons.length; i++) {
        //     save_Object.myCatchedPokemons[i].hp =
        //         save_Object.myCatchedPokemons[i].maxHp;
        // }

        // for (let i = 0; i < save_Object.myPokemonTeam.length; i++) {
        //     save_Object.myPokemonTeam[i].hp =
        //         save_Object.myPokemonTeam[i].maxHp;
        //     save_Object.myPokemonTeam[i].isDefeated = false;
        //     document.getElementById(`teamPoke_${i}`).classList.remove('defeat');
        // }
        // save_SaveObj();
        // setTimeout(() => {
        //     showInfoBox('Deine Pokemon werden geheilt');
        // }, 100);
        // setTimeout(() => {
        //     window.location = 'map1.html';
        // }, 4000);

        shopWindow.classList.add("active");
        shopMoney = save_Object.items.money;
        pokeballBuyAmount = 0;
        trankBuyAmount = 0;
        btn_Pokeball.innerHTML = `Pokeball - ${pokeballPrice}$`
        btn_Trank.innerHTML = `Supertrank - ${trankPrice}$`
        updateShop();

    }



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

    function showInfoBox(text) {
        infoBox.hidden = false;
        infoBox.innerHTML = text;
        setTimeout(() => {
            infoBox.hidden = true;
        }, 4000);
    }
}


// #####################################################################
// Shop
let pokeballBuyAmount = 0;
let trankBuyAmount = 0;
let shopMoney = 0;


// Öffnen
if(btn_open_Shop) {
    console.log('Bin im Shop');
    btn_open_Shop.addEventListener("click", ()=> {
        shopWindow.classList.add("active");
        shopMoney = save_Object.items.money;
        pokeballBuyAmount = 0;
        trankBuyAmount = 0;
        btn_Pokeball.innerHTML = `Pokeball - ${pokeballPrice}$`
        btn_Trank.innerHTML = `Supertrank - ${trankPrice}$`
        updateShop();
    })
}


// Close
if(btnCloseShop) {
    btnCloseShop.addEventListener("click", ()=> {
        shopWindow.classList.remove("active");
        window.location = 'map1.html'
    })
}

// Increase Pokeball
if(btn_Pokeball) {
    btn_Pokeball.addEventListener("click", ()=> {
        if(shopMoney >= pokeballPrice) {
            pokeballBuyAmount++;
            shopMoney -= pokeballPrice;
            updateShop()
        }
    })
}
// Increase Trank
if(btn_Trank) {
    btn_Trank.addEventListener("click", ()=> {
        if(shopMoney >= trankPrice) {
            trankBuyAmount++;
            shopMoney -= trankPrice;
            updateShop()
        }
    })
}


if(btn_Buy) {
    btn_Buy.addEventListener("click", ()=> {
        if(pokeballBuyAmount > 0) {
            save_Object.items.money = shopMoney;
            save_Object.items.pokeballs += pokeballBuyAmount;
            save_SaveObj();
            if(pokeballBuyAmount === 1) {
                alert(`Du hast erfolgreich ${pokeballBuyAmount} Pokeball gekauft.`)
            }else {
                alert(`Du hast erfolgreich ${pokeballBuyAmount} Pokebälle gekauft.`)
            }
        }
        if(trankBuyAmount > 0) {
            save_Object.items.money = shopMoney;
            save_Object.items.trank += trankBuyAmount;
            save_SaveObj();
            if(trankBuyAmount === 1) {
                alert(`Du hast erfolgreich ${trankBuyAmount} Supertrank gekauft.`)
            }else {
                alert(`Du hast erfolgreich ${trankBuyAmount} Supertränke gekauft.`)
            }
        }
        if(pokeballBuyAmount > 0 || trankBuyAmount > 0) {
            shopWindow.classList.remove("active");
            window.location = 'map1.html'
        }
    })
}

function updateShop() {
    lbl_Shop_Money.innerHTML = `$ - ${shopMoney}`;
    lbl_Amount_Pokeballs.innerHTML = pokeballBuyAmount;
    lbl_Amount_Tranks.innerHTML = trankBuyAmount;
}



//######################################################
// Macht den Anfangsbuchstaben groß
//######################################################
function makeFirstLetterBig(word) {
    const firstLetter = word[0];
    let exportword = firstLetter.toUpperCase();
    for (let i = 1; i < word.length; i++) {
        exportword += word[i];
    }
    return exportword;
}
