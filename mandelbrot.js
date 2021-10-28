const ITERATIONS = 300;

// is x,y in the mandelbrot set
// https://en.wikipedia.org/wiki/Mandelbrot_set
function isUnbounded(x, y) {

    // z0 = 0
    var z = { a: 0, b: 0 };
    var c = { a: x, b: y };

    var i = 0;
    for(; i < ITERATIONS && abs(z.a+z.b) < 7; i++) {
        z = {
            a: (z.a * z.a - z.b * z.b) + c.a,
            b: (2 * z.a * z.b) + c.b
        };
    }
    
    return i === ITERATIONS;
}