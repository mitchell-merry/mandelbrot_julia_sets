const ITERATIONS = 500;

// is c (ca + cb*i) in the mandelbrot set
// https://en.wikipedia.org/wiki/Mandelbrot_set
function isUnbounded(ca, cb) {

    // z0 = 0
    let za = 0, zb = 0;
    let za_sq = 0, zb_sq = 0;
    let i = 0;
    let a = ca;

    for(; i < ITERATIONS && za_sq + zb_sq < 4; i++) {
        a = za_sq - zb_sq + ca;
        zb = 2 * za * zb + cb;
        za = a;

        za_sq = za * za;
        zb_sq = zb * zb;
    }
    
    return i === ITERATIONS;
}