const canvas = document.getElementById('canvas');
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
    0, 0, 0, 0, 0, 0, 0, 0, 24025, 24025, 24025, 24025, 0, 0, 0, 0, 0, 0, 24025,
    24025, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 24025, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 24025, 24025, 0, 0, 0, 0, 24025, 24025, 24025,
    24025, 24025, 24025, 24025, 24025, 24025, 24025, 24025, 24025, 24025, 24025,
    24025, 24025, 24025, 24025, 24025, 24025, 0, 0, 0, 0, 24025, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 24025, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 24025, 24025, 24025, 24025, 24025, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 24025, 0, 24025, 24025, 24025, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 24025, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 24025, 24025, 0, 24025, 24025, 24025,
    24025, 24025, 24025, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 24025, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 24025, 0, 0, 0, 0,
    0, 0, 24025, 24025, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 24025, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 24025, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    24025, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 24025, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 24025, 24025, 0, 0, 0,
    24025, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 24025, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 24025, 24025, 0, 0, 0,
    24025, 0, 0, 0, 24025, 24025, 24025, 24025, 24025, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 24025, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    24025, 0, 0, 0, 0, 24025, 0, 0, 0, 24025, 0, 0, 0, 24025, 24025, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 24025,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 24025, 24025, 24025,
    24025, 24025, 24025, 24025, 24025, 24025, 24025, 24025, 0, 0, 0, 0, 24025,
    24025, 24025, 24025, 24025, 0, 0, 0, 0, 24025, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 24025, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 24025, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 24025,
    0, 0, 0, 0, 0, 0, 0, 24025, 0, 0, 0, 0, 24025, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 24025, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 24025, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    24025, 0, 0, 0, 0, 0, 0, 24025, 0, 0, 0, 0, 24025, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 24025, 24025, 24025, 24025, 24025, 24025, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 24025, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 24025, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 24025, 0, 0, 0, 0, 0, 0, 24025, 0, 0, 0, 0,
    24025, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 24025, 24025, 24025, 24025,
    24025, 24025, 0, 0, 0, 0, 0, 0, 0, 0, 0, 24025, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 24025, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 24025, 0, 0,
    0, 0, 0, 0, 24025, 0, 0, 0, 0, 24025, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    24025, 0, 0, 0, 24025, 0, 0, 0, 0, 0, 0, 0, 0, 0, 24025, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 24025, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    24025, 0, 0, 0, 0, 0, 0, 24025, 0, 0, 0, 0, 24025, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 24025, 0, 0, 0, 24025, 24025, 24025, 0, 0, 0, 0, 0, 0, 24025,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 24025, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 24025, 0, 0, 0, 0, 0, 0, 24025, 0, 0, 0, 0, 24025, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 24025, 0, 0, 0, 0, 0, 24025, 24025, 0, 0,
    0, 0, 24025, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 24025, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 24025, 0, 0, 0, 0, 0, 0, 24025, 0, 0, 0, 0,
    24025, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 24025, 0, 0, 0, 0, 0, 0,
    24025, 0, 0, 0, 0, 24025, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    24025, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 24025, 0, 0, 0, 0, 0, 0,
    24025, 0, 0, 0, 0, 24025, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 24025, 0,
    0, 0, 0, 0, 0, 24025, 0, 0, 0, 0, 24025, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 24025, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 24025, 0, 0, 0,
    0, 0, 0, 24025, 0, 0, 0, 0, 24025, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    24025, 0, 0, 0, 0, 0, 0, 24025, 24025, 0, 0, 0, 24025, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 24025, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    24025, 0, 0, 0, 0, 0, 0, 24025, 0, 0, 0, 0, 24025, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 24025, 0, 0, 0, 0, 0, 0, 0, 24025, 0, 0, 0, 24025, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 24025, 24025, 24025, 24025, 24025,
    24025, 24025, 24025, 24025, 24025, 24025, 24025, 24025, 24025, 24025, 24025,
    24025, 0, 0, 0, 0, 0, 0, 24025, 0, 0, 0, 0, 24025, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 24025, 0, 0, 0, 0, 0, 0, 0, 24025, 24025, 24025, 24025,
    24025, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 24025, 24025, 24025, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 24025, 24025, 24025, 24025, 24025,
    24025, 24025, 0, 0, 0, 0, 24025, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    24025, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 24025, 24025,
    24025, 24025, 24025, 24025, 24025, 0, 0, 0, 0, 24025, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 24025, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 24025, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 24025, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 24025, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    24025, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 24025, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 24025, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 24025, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 24025, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 24025, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 24025, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 24025,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 24025, 24025, 24025, 24025, 24025,
    24025, 24025, 24025, 24025, 24025, 24025, 24025, 24025, 24025, 24025, 24025,
    24025, 24025, 24025, 24025, 24025, 24025, 24025, 24025, 24025, 24025, 24025,
    24025, 24025, 24025, 24025, 24025, 24025, 24025, 24025, 24025, 24025, 24025,
    24025, 24025, 24025, 24025, 24025, 24025, 24025, 24025, 24025, 24025, 24025,
    24025, 24025, 24025, 24025, 24025, 24025, 24025, 24025, 0, 0, 0, 0, 0, 0, 0,
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
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
];

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
            ctx.fillStyle = 'rgba(255,0,0,0.4)';
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
        x: 10,
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

    const playerImage = new Image();
    playerImage.src = './assets/playerDown.png';

    class Sprite {
        constructor({position, velocity, image, frames = {max: 1}}) {
            this.position = position;
            this.image = image;
            this.frames = frames;
        }

        draw() {
            ctx.drawImage(
                this.image,
                0,
                0,
                this.image.width / this.frames.max,
                this.image.height,
                this.position.x,
                this.position.y,
                this.image.width / this.frames.max,
                this.image.height,
            );
        }
    }

    const player =  new Sprite({
        position: {
            x: canvas.width / 2 - 240 / 3,
            y: canvas.height / 2 - 80 / 2
        },
        image: playerImage,
        frames: {
            max: 3
        }
    })


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

    const testBoundary = new Boundary({
        position: {
            x: 200,
            y: 200,
        },
    });

    const movables = [background, testBoundary];
    // Animation loop
    function animate() {
        window.requestAnimationFrame(animate);

        // Draw Methods
        background.draw();

        player.draw()

        // Collision Detection
        if(player.position.x + player.width >= testBoundary.position.x) {
            console.log('Colliding');
        }

        // boundaries.forEach(boundary => {
        //     boundary.draw()
        // })

        testBoundary.draw();

        if (keys.w.pressed && lastKey === 'w') {
            movables.forEach((movable) => {
                movable.position.y += 3;
            });
        } else if (keys.a.pressed && lastKey === 'a') {
            movables.forEach((movable) => {
                movable.position.x += 3;
            });
        } else if (keys.s.pressed && lastKey === 's') {
            movables.forEach((movable) => {
                movable.position.y -= 3;
            });
        } else if (keys.d.pressed && lastKey === 'd') {
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
