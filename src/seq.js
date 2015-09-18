export const predicate = {
    // Returns a negated version of a predicate function.
    not: pred => () => !pred.apply(this, arguments),
    // Returns true if the argument is an even number, false
    // otherwise.
    isEven: n => n % 2 === 0,
    // Returns true if the argument is an odd number, false otherwise.
    isOdd: n => n % 2 !== 0,
    // Returns true if char is a digit, false otherwise.
    isDigit: char => /^\d+$/.test(char),
    // Returns true if char is alphavetic, false otherwise.
    isAlphabetic: char => /^[A-z]+$/.test(char)
};

export const transformer = {
    // The identity function. Returns the argument as is.
    id: x => x,
    // Returns an all uppercase version of the argument string.
    toUpper: String.prototype.toUpperCase,
    // Returns an all lowercase version of the argument string.
    toLower: String.prototype.toLowerCase,
    // Returns the argument string without any heading or trailing
    // whitespace.
    trim: String.prototype.trim,
    stringify: JSON.stringify
};

export const reducer = {
    // Returns the sum of the arguments.
    add: (a, b) => a + b,
    sub: (a, b) => a - b,
    mul: (a, b) => a * b,
    div: (a, b) => a / b,
    mod: (a, b) => a % b
};


// Applies fn to rest of the arguments.
export function apply(fn, ...args) {
    return fn.apply(this, args);
}

// Returns a function with partially applied arguments.
export function partial(fn, ...args) {
    return (...rest) => fn.apply(this, args.concat(rest));
}

// Returns a function that executes argument functions sequantially, passing
// their return value as an argument to the next function.
//
// let cube = compose(square, square);
// cube(2); // => 16
export function compose(...fns) {
    return result => {
        for (let i = 0; i < fns.length; i++) {
            result = fns[i].call(this, result);
        }
        return result;
    };
}

// Returns a function that checks its arguments agains a predicate function
// pred. If pred returns true, it runs a transformer function tr and returns its
// result.
export function cond(pred, tr) {
    return arg => pred(arg) ? tr(arg) : arg;
}

// Returns a sequence of all but the first n elements of the 
// sequence seq.
//
// seq may be a list, vector or string and n must be an integer. 
// The result is the same type of sequence as seq.
export function drop(seq, n = 0) {
    if (seq instanceof Array) {
        return seq.slice(n);
    } else if (typeof seq === 'string') {
        return seq.substr(n);
    }
    return null;
}

// Returns a sub-sequence of the successive elements of seq for 
// which calling pred with that element returns non-nil.
// 
// pred must be a one-argument function and seq may be an array or
// a string. The result is the same type of sequence as seq.
export function dropWhile(pred, seq) {
    if (seq instanceof Array) {
        let len = seq.length;
        for (let i = 0; i < len; i++) {
            if (!pred(seq[i])) {
                return seq.slice(i);
            }
        }
        return [];
    } else if (typeof seq === 'string') {
        let len = seq.length;
        for (let i = 0; i < len; i++) {
            if (!pred(seq.charAt(i))) {
                return seq.substr(i);
            }
        }
        return '';
    }
    return null;
}

// Returns a sequence of the first n elements of seq.
//
// seq may be an array or a string and n must be an integer.  The
// result is the same type of sequence as seq.
export function take(seq, n = 0) {
    if (seq instanceof Array) {
        return seq.slice(0, n);
    } else if (typeof seq === 'string') {
        return seq.substr(0, n);
    }
    return null;
}

// Returns a sub-sequence of the successive elements of seq for 
// which calling pred with that element returns non-nil.
//
// pred must be a one-argument function and seq may be an array, or a
// string. The result is the same type of sequence as seq.
export function takeWhile(pred, seq) {
    if (seq instanceof Array) {
        let len = seq.length;
        for (let i = 0; i < len; i++) {
            if (!pred(seq[i])) {
                return seq.slice(0, i);
            }
        }
        return [];
    } else if (typeof seq === 'string') {
        let len = seq.length;
        for (let i = 0; i < len; i++) {
            if (!pred(seq.charAt(i))) {
                return seq.substr(0, i);
            }
        }
        return '';
    }
    return null;
}

// Calls fn for each element in seq. If seq is an object, calls fn
// with key and value.
export function each(seq, fn) {
    if (seq instanceof Array) {
        let len = seq.length;
        for (let i = 0; i < len; i++) {
            fn(seq[i], i);
        }
    } else if (typeof seq === 'object') {
        let keys = Object.keys(seq);
        let len = keys.length;
        for (let i = 0; i < len; i++) {
            const key = keys[i];
            const val = seq[key];
            fn(key, val);
        }
    } else if (typeof seq === 'string') {
        let len = seq.length;
        for (let i = 0; i < len; i++) {
            fn(seq.charAt(i), i);
        }
    }
}

// Returns a list of all the elements in seq for which calling 
// pred with that element returns null.
export function filter(pred, seq) {
    if (seq instanceof Array) {
        let ret = [];
        let len = seq.length;
        for (let i = 0; i < len; i++) {
            let elem = seq[i];
            if (!pred(elem)) {
                ret.push(elem);
            }
        }
        return ret;
    } else if (typeof seq === 'object') {
        let ret = {};
        let keys = Object.keys(seq);
        let len = keys.length;
        for (let i = 0; i < len; i++) {
            let key = keys[i];
            let val = seq[key];
            if (!pred(key, val)) {
                ret[key] = val;
            }
        }
        return ret;
    } else if (typeof seq === 'string') {
        let ret = '';
        let len = seq.length;
        for (let i = 0; i < len; i++) {
            let char = seq.charAt(i);
            if (!pred(char)) {
                ret += char;
            }
        }
        return ret;
    }
    return null;
}

// Returns a collection of all arguments concatenated together.
//
// If args are objects, they are merged from right to left.
export function concat(...args) {
    if (args[0] instanceof Array) {
        return Array.concat.apply(this, args);
    } else if (typeof args[0] === 'object') {
        return Object.assign.apply(this, [{}].concat(Array.prototype.slice.call(arguments)));
    } else if (typeof args[0] === 'string') {
        return String.concat.apply(this, args);
    }
    return null;
}
