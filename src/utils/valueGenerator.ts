export const generateValues = (x: number) => {
    const rand = (x: number) => (Math.sin(x) * 1.0) % 1;
    const hermineCurve = (f: number) =>  f*f*(3.0-2.0*f);
    const mix = (a: number, b: number, t: number) => (1 - t)*a + t*b;

    let i = Math.floor(x); //intero
    let f = x % 1; //frazione

    return mix(rand(i), rand(i + 1.0), hermineCurve(f));
};
