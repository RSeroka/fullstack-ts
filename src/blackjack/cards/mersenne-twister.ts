
/**
 * Seed-able Random Number generator.
 * 
 * const random = new MersenneTwisterRandom(132);
 * random.nextInt32(); //return a pseudo random int32 number
 * random.nextInt32([10,20]); //return a pseudo random int in range [10,20]
 * random.nextNumber(); //return a a pseudo random number in range [0,1]
 * 
 * 
 */

/*
    https://stackoverflow.com/questions/424292/seedable-javascript-random-number-generator

    bennyl - 2015-09-12
    If you program in Typescript, I adapted the Mersenne Twister implementation that was 
    brought in Christoph Henkelmann's answer to this thread as a typescript class:
*/

/*
  I've wrapped Makoto Matsumoto and Takuji Nishimura's code in a namespace
  so it's better encapsulated. Now you can have multiple random number generators
  and they won't stomp all over eachother's state.
  
  If you want to use this as a substitute for Math.random(), use the random()
  method like so:
  
  var m = new MersenneTwister();
  var randomNumber = m.random();
  
  You can also call the other genrand_{foo}() methods on the instance.
  If you want to use a specific seed in order to get a repeatable random
  sequence, pass an integer into the constructor:
  var m = new MersenneTwister(123);
  and that will always produce the same random sequence.
  Sean McCullough (banksean@gmail.com)
*/

/* 
   A C-program for MT19937, with initialization improved 2002/1/26.
   Coded by Takuji Nishimura and Makoto Matsumoto.
 
   Before using, initialize the state by using init_genrand(seed)  
   or init_by_array(init_key, key_length).
 
   Copyright (C) 1997 - 2002, Makoto Matsumoto and Takuji Nishimura,
   All rights reserved.                          
 
   Redistribution and use in source and binary forms, with or without
   modification, are permitted provided that the following conditions
   are met:
 
     1. Redistributions of source code must retain the above copyright
        notice, this list of conditions and the following disclaimer.
 
     2. Redistributions in binary form must reproduce the above copyright
        notice, this list of conditions and the following disclaimer in the
        documentation and/or other materials provided with the distribution.
 
     3. The names of its contributors may not be used to endorse or promote 
        products derived from this software without specific prior written 
        permission.
 
   THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS
   "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT
   LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR
   A PARTICULAR PURPOSE ARE DISCLAIMED.  IN NO EVENT SHALL THE COPYRIGHT OWNER OR
   CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL,
   EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO,
   PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR
   PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF
   LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
   NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS
   SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 
 
   Any feedback is very welcome.
   http://www.math.sci.hiroshima-u.ac.jp/~m-mat/MT/emt.html
   email: m-mat @ math.sci.hiroshima-u.ac.jp (remove space)
*/


/**
 * copied almost directly from Mersenne Twister implementation found in https://gist.github.com/banksean/300494
 * all rights reserved to him.
 */
export class MersenneTwisterRandom {
    static N = 624;
    static M = 397;
    static MATRIX_A = 0x9908b0df;
    /* constant vector a */
    static UPPER_MASK = 0x80000000;
    /* most significant w-r bits */
    static LOWER_MASK = 0x7fffffff;
    /* least significant r bits */

    mt = new Array(MersenneTwisterRandom.N);
    /* the array for the state vector */
    mti = MersenneTwisterRandom.N + 1;
    /* mti==N+1 means mt[N] is not initialized */

    constructor(seed?:number) {
        if (seed === undefined) {
            seed = new Date().getTime();
        }

        this.init_genrand(seed);
    }

    private init_genrand(s:number) {
        this.mt[0] = s >>> 0;
        for (this.mti = 1; this.mti < MersenneTwisterRandom.N; this.mti++) {
            var s = this.mt[this.mti - 1] ^ (this.mt[this.mti - 1] >>> 30);
            this.mt[this.mti] = (((((s & 0xffff0000) >>> 16) * 1812433253) << 16) + (s & 0x0000ffff) * 1812433253)
                + this.mti;
            /* See Knuth TAOCP Vol2. 3rd Ed. P.106 for multiplier. */
            /* In the previous versions, MSBs of the seed affect   */
            /* only MSBs of the array mt[].                        */
            /* 2002/01/09 modified by Makoto Matsumoto             */
            this.mt[this.mti] >>>= 0;
            /* for >32 bit machines */
        }
    }

    /**
     * generates a random number on [0,0xffffffff]-interval
     * @private
     */
    private _nextInt32():number {
        let y:number;
        const mag01 = new Array(0x0, MersenneTwisterRandom.MATRIX_A);
        /* mag01[x] = x * MATRIX_A  for x=0,1 */

        if (this.mti >= MersenneTwisterRandom.N) { /* generate N words at one time */
            let kk:number;

            if (this.mti == MersenneTwisterRandom.N + 1)   /* if init_genrand() has not been called, */
                this.init_genrand(5489);
            /* a default initial seed is used */

            for (kk = 0; kk < MersenneTwisterRandom.N - MersenneTwisterRandom.M; kk++) {
                y = (this.mt[kk] & MersenneTwisterRandom.UPPER_MASK) | (this.mt[kk + 1] & MersenneTwisterRandom.LOWER_MASK);
                this.mt[kk] = this.mt[kk + MersenneTwisterRandom.M] ^ (y >>> 1) ^ mag01[y & 0x1]!;
            }
            for (; kk < MersenneTwisterRandom.N - 1; kk++) {
                y = (this.mt[kk] & MersenneTwisterRandom.UPPER_MASK) | (this.mt[kk + 1] & MersenneTwisterRandom.LOWER_MASK);
                this.mt[kk] = this.mt[kk + (MersenneTwisterRandom.M - MersenneTwisterRandom.N)] ^ (y >>> 1) ^ mag01[y & 0x1]!;
            }
            y = (this.mt[MersenneTwisterRandom.N - 1] & MersenneTwisterRandom.UPPER_MASK) | (this.mt[0] & MersenneTwisterRandom.LOWER_MASK);
            this.mt[MersenneTwisterRandom.N - 1] = this.mt[MersenneTwisterRandom.M - 1] ^ (y >>> 1) ^ mag01[y & 0x1]!;

            this.mti = 0;
        }

        y = this.mt[this.mti++];

        /* Tempering */
        y ^= (y >>> 11);
        y ^= (y << 7) & 0x9d2c5680;
        y ^= (y << 15) & 0xefc60000;
        y ^= (y >>> 18);

        return y >>> 0;
    }

    /**
     * generates an int32 pseudo random number
     * @param range: an optional [from, to] range, if not specified the result will be in range [0,0xffffffff]
     * @return {number}
     */
    nextInt32(range?:[number, number]):number {
        const result = this._nextInt32();
        if (range === undefined) {
            return result;
        }

        return (result % (range[1] - range[0])) + range[0];
    }

    /**
     * generates a random number on [0,0x7fffffff]-interval
     */
    nextInt31():number {
        return (this._nextInt32() >>> 1);
    }

    /**
     * generates a random number on [0,1]-real-interval
     */
    nextNumber():number {
        return this._nextInt32() * (1.0 / 4294967295.0);
    }

    /**
     * generates a random number on [0,1) with 53-bit resolution
     */
    nextNumber53():number {
        const a = this._nextInt32() >>> 5, b = this._nextInt32() >>> 6;
        return (a * 67108864.0 + b) * (1.0 / 9007199254740992.0);
    }
}