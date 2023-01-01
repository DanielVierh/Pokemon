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
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 24025, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 24025, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 24025, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 24025, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 24025, 24025,
    24025, 24025, 24025, 24025, 24025, 24025, 24025, 24025, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 24025, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 24025, 24025, 0, 0, 0, 0, 0, 0, 0, 0, 24025, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 24025, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 24025, 0, 0, 0, 0, 0, 0, 0, 0, 0, 24025, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 24025, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    24025, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 24025, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 24025, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 24025,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 24025, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 24025, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 24025, 24025, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 24025, 24025, 24025, 24025, 24025, 24025,
    24025, 24025, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 24025, 0, 0, 0, 24025,
    24025, 24025, 24025, 24025, 24025, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 24025, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 24025, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 24025,
    0, 0, 0, 24025, 0, 0, 0, 0, 24025, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 24025, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 24025, 24025, 24025, 24025, 24025, 24025, 24025, 24025,
    24025, 24025, 0, 0, 0, 0, 0, 24025, 24025, 24025, 24025, 24025, 0, 0, 0, 0,
    24025, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 24025, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 24025, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 24025, 0, 0, 0, 0,
    24025, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 24025, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 24025, 0, 0, 0, 0, 0, 0, 24025, 0, 0, 0, 0,
    24025, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 24025, 24025, 24025, 24025,
    24025, 24025, 0, 0, 0, 0, 0, 0, 0, 0, 0, 24025, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 24025, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 24025, 0, 0,
    0, 0, 0, 0, 24025, 0, 0, 0, 0, 24025, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    24025, 24025, 24025, 24025, 24025, 24025, 0, 0, 0, 0, 0, 0, 0, 0, 0, 24025,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 24025, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 24025, 0, 0, 0, 0, 0, 0, 24025, 0, 0, 0, 0, 24025, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 24025, 0, 0, 0, 0, 24025, 0, 0, 0, 0, 0, 0, 0,
    24025, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 24025, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 24025, 0, 0, 0, 0, 0, 0, 24025, 0, 0, 0, 0, 24025,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 24025, 0, 0, 0, 0, 0, 24025, 0, 0, 0,
    0, 0, 24025, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 24025, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 24025, 0, 0, 0, 0, 0, 0, 24025, 0, 0, 0, 0,
    24025, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 24025, 0, 0, 0, 0, 0, 0,
    24025, 0, 0, 0, 0, 24025, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    24025, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 24025, 0, 0, 0, 0, 0, 0,
    24025, 0, 0, 0, 0, 24025, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 24025, 0,
    0, 0, 0, 0, 0, 24025, 0, 0, 0, 0, 24025, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 24025, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 24025, 0, 0, 0,
    0, 0, 0, 24025, 0, 0, 0, 0, 24025, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    24025, 0, 0, 0, 0, 0, 0, 0, 24025, 0, 0, 24025, 24025, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 24025, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    24025, 0, 0, 0, 0, 0, 0, 24025, 0, 0, 0, 0, 24025, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 24025, 0, 0, 0, 0, 0, 0, 0, 24025, 0, 0, 24025, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 24025, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 24025, 0, 0, 0, 0, 0, 0, 24025, 0, 0, 0, 0, 24025, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 24025, 0, 0, 0, 0, 0, 0, 0, 24025, 24025, 24025,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 24025, 24025, 24025,
    24025, 24025, 24025, 24025, 24025, 24025, 24025, 24025, 24025, 24025, 24025,
    24025, 24025, 24025, 0, 0, 0, 0, 0, 0, 24025, 0, 0, 0, 0, 24025, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 24025, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 24025, 24025, 24025, 24025, 24025,
    24025, 24025, 24025, 24025, 0, 0, 24025, 24025, 24025, 24025, 24025, 24025,
    24025, 24025, 24025, 24025, 24025, 24025, 24025, 0, 0, 0, 0, 24025, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 24025, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 24025, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 24025, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 24025, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 24025, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 24025, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 24025, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 24025, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 24025,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 24025, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 24025, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 24025, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 24025, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    24025, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 24025, 24025, 24025, 24025,
    24025, 24025, 24025, 24025, 24025, 24025, 24025, 24025, 24025, 24025, 24025,
    24025, 24025, 24025, 24025, 24025, 24025, 24025, 24025, 24025, 24025, 24025,
    24025, 24025, 24025, 24025, 24025, 24025, 24025, 24025, 24025, 24025, 24025,
    24025, 24025, 24025, 24025, 24025, 24025, 24025, 24025, 24025, 24025, 24025,
    24025, 24025, 24025, 24025, 24025, 24025, 24025, 24025, 24025, 0, 0, 0, 0,
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
];

const battleZoneData = [
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
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 24026, 24026,
    24026, 24026, 24026, 24026, 24026, 24026, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 24026, 24026, 24026, 24026, 24026, 24026, 24026, 24026, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 24026, 24026, 24026, 24026, 24026, 24026, 24026, 24026, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 24026, 24026, 24026, 24026, 24026, 24026,
    24026, 24026, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
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
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
];

const bttleEffect = document.getElementById('bttleEffect');

let lastPosition = {
    x: 0,
    y: 0,
};

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
        bonbon: 3
    },
    gen: 'all'
};

let myTeam = [];

if (canvas) {

    const activate_Gyroscope = document.getElementById("btn_Activate_Gyroscope")
    const outp_gyro = document.getElementById("outp_gyro");

    function handleOrientation(event) {
        const alpha = event.alpha;
        const beta = event.beta;
        const gamma = event.gamma;
        // Do stuff...
        outp_gyro.innerHTML = `alpha: ${alpha} | beta: ${beta} | gamma: ${gamma}`
        // const rnd = Math.random() * 10
        // outp_gyro.innerHTML = `Macht was ${rnd}`
    }

    activate_Gyroscope.addEventListener("click", ()=> {
        if (typeof DeviceMotionEvent.requestPermission === 'function') {
            // Handle iOS 13+ devices.
            DeviceMotionEvent.requestPermission()
              .then((state) => {
                if (state === 'granted') {
                  window.addEventListener('devicemotion', handleOrientation(e));
                } else {
                  console.error('Request to access the orientation was rejected');
                }
              })
              .catch(console.error);
          } else {
            // Handle regular non iOS 13+ devices.
            window.addEventListener('devicemotion', handleOrientation);
          }
    })



    window.onload = init();

    function init() {
        if (document.getElementById("mapTag")) {
            load_SaveObj();
        }
    }

    function load_SaveObj() {
        if (localStorage.getItem('stored_save_Object') != null) {
            save_Object = JSON.parse(localStorage.getItem('stored_save_Object'));
            myTeam = save_Object.myPokemonTeam;

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
            document.getElementById(`teamPoke_${i}`).src = myTeam[i].spriteFront;
            if (myTeam[i].isDefeated === true) {
                document.getElementById(`teamPoke_${i}`).classList.add('defeat');
            }
        }
    }






    canvas.width = 400;
    canvas.height = 400;
    const ctx = canvas.getContext('2d');

    ////////////////////////////////////////////////////////
    // Create Collision map
    const collisionMap = [];
    for (let i = 0; i < collisions.length; i += 70) {
        collisionMap.push(collisions.slice(i, 70 + i));
    }

    ////////////////////////////////////////////////////////

    ////////////////////////////////////////////////////////
    // Battlezone Map
    const battlezoneMap = [];
    for (let i = 0; i < battleZoneData.length; i += 70) {
        battlezoneMap.push(battleZoneData.slice(i, 70 + i));
    }
    console.log(battlezoneMap);

    class Boundary {
        static width = 28;
        static height = 28;
        constructor({position}) {
            this.position = position;
            this.width = 28;
            this.height = 28; // Weil 8 + 3.5 Zoomstufe bei TileMap
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
        x: -500,
        y: -100,
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

    // ctx.fillStyle = 'white';
    // ctx.fillRect(0, 0, canvas.width, canvas.height);

    const battleZones = [];
    battlezoneMap.forEach((row, i) => {
        row.forEach((symbol, j) => {
            if (symbol === 24026) {
                battleZones.push(
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

    console.log('battlezones', battleZones);

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

    const movables = [background, ...boundaries, ...battleZones];

    function rectangularCollision({rectangle1, rectangle2}) {
        return (
            rectangle1.position.x + rectangle1.width >= rectangle2.position.x &&
            rectangle1.position.x <= rectangle2.position.x + rectangle2.width &&
            rectangle1.position.y <=
                rectangle2.position.y + rectangle2.height &&
            rectangle1.position.y + rectangle1.height >= rectangle2.position.y
        );
    }

    const battle = {
        initiated: false,
    };

    // Animation loop
    function animate() {
        window.requestAnimationFrame(animate);

        // Draw Methods
        background.draw();

        battleZones.forEach((battlezone) => {
            battlezone.draw();
        });

        player.draw();

        boundaries.forEach((boundary) => {
            boundary.draw();
        });

        let moving = true;
        player.moving = false;

        if (battle.initiated) return;
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

            // Collision Detection for Battlezone
            for (let i = 0; i < battleZones.length; i++) {
                const battleZone = battleZones[i];
                if (
                    rectangularCollision({
                        rectangle1: player,
                        rectangle2: battleZone,
                    })
                ) {
                    const rnd_BattleTrigger = Math.random();
                    if (rnd_BattleTrigger < 0.01) {
                        battle.initiated = true;
                        player.moving = false;
                        bttleEffect.classList.add('active');
                        setTimeout(() => {
                            window.location = 'battle.html';
                        }, 2000);
                    }
                    break;
                }
            }
            if (moving)
                movables.forEach((movable) => {
                    movable.position.y += 3;
                    lastPosition.y = movable.position.y;
                    console.log('x:', lastPosition.x,' y:',  lastPosition.y);
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
            // Collision Detection for Battlezone
            for (let i = 0; i < battleZones.length; i++) {
                const battleZone = battleZones[i];
                if (
                    rectangularCollision({
                        rectangle1: player,
                        rectangle2: battleZone,
                    })
                ) {
                    const rnd_BattleTrigger = Math.random();
                    if (rnd_BattleTrigger < 0.01) {
                        battle.initiated = true;
                        player.moving = false;
                        bttleEffect.classList.add('active');
                        setTimeout(() => {
                            window.location = 'battle.html';
                        }, 2000);
                    }
                    break;
                }
            }
            if (moving)
                movables.forEach((movable) => {
                    movable.position.x += 3;
                    lastPosition.x = movable.position.x;
                    console.log('x:', lastPosition.x,' y:',  lastPosition.y);
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
            // Collision Detection for Battlezone
            for (let i = 0; i < battleZones.length; i++) {
                const battleZone = battleZones[i];
                if (
                    rectangularCollision({
                        rectangle1: player,
                        rectangle2: battleZone,
                    })
                ) {
                    const rnd_BattleTrigger = Math.random();
                    if (rnd_BattleTrigger < 0.01) {
                        battle.initiated = true;
                        player.moving = false;
                        bttleEffect.classList.add('active');
                        setTimeout(() => {
                            window.location = 'battle.html';
                        }, 2000);
                    }
                    break;
                }
            }
            if (moving)
                movables.forEach((movable) => {
                    movable.position.y -= 3;
                    lastPosition.y = movable.position.y;
                    console.log('x:', lastPosition.x,' y:',  lastPosition.y);
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
            // Collision Detection for Battlezone
            for (let i = 0; i < battleZones.length; i++) {
                const battleZone = battleZones[i];
                if (
                    rectangularCollision({
                        rectangle1: player,
                        rectangle2: battleZone,
                    })
                ) {
                    const rnd_BattleTrigger = Math.random();
                    if (rnd_BattleTrigger < 0.01) {
                        battle.initiated = true;
                        player.moving = false;
                        bttleEffect.classList.add('active');
                        setTimeout(() => {
                            window.location = 'battle.html';
                        }, 2000);
                    }
                    break;
                }
            }
            if (moving)
                movables.forEach((movable) => {
                    movable.position.x -= 3;
                    lastPosition.x = movable.position.x;
                    console.log('x:', lastPosition.x,' y:',  lastPosition.y);
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
