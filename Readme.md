# Seq.js

Functions for working with functions, sequences and collections.

## Documentation

### Functions

#### apply(fn, ...args)

Alias for `fn.apply(context, ...args)`.

```js
apply(Math.sqrt, 25) // => 5
```

#### partial(fn, ...args)

Returns a partially applied version of `fn`.

```js
let add = (a, b) => a + b;
let add10 = partial(add, 10);
add10(5); // => 15
```

#### compose(...fns)

Returns a function that executes argument functions sequantially from left to
right passing their return value as an argument to the next function.

```js
let square = n => n * n;
let cube = compose(square, square);
cube(2); // => 16
```

### Collections

#### drop(seq, n = 0)

Returns a sequence of all but the first n elements of the sequence seq.

seq may be an array or a string and n must be an integer.  The result is the
same type of sequence as seq.

```js
drop([1, 2, 3, 4], 2); // => [3, 4]
drop('foobar', 3); // => 'bar'
```

#### dropWhile(pred, seq)

Returns a sub-sequence of the successive elements of seq for which calling pred
with that element returns non-nil.
 
pred must be a one-argument function and seq may be an array or a string. The
result is the same type of sequence as seq.

```js
dropWhile(isOdd, [1, 2, 3, 4]) // => [2, 3, 4]
dropWhile(isAlphabetic, 'foo123') // => '123'
```

#### take(seq, n = 0)

Returns a sequence of the first n elements of seq.

seq may be an array or a string and n must be an integer.  The result is the
same type of sequence as seq.

```js
take([1, 2, 3, 4], 2); // => [1, 2]
take('foobar', 3); // => 'foo'
```

#### takeWhile(pred, seq)

Returns a sub-sequence of the successive elements of seq for which calling pred
with that element returns non-nil.

pred must be a one-argument function and seq may be an array, or a string. The
result is the same type of sequence as seq.

```js
takeWhile(isOdd, [1, 2, 3, 4]) // => [1]
takeWhile(isAlphabetic, 'foo123') // => 'foo'
```

#### each(seq, fn)

Calls fn for each element in seq. If seq is an object, calls fn with key and
value.

```js
each([1, 2], print) // => 1 2
```

#### map(fn, seq)

#### filter(pred, seq)

Returns a list of all the elements in seq for which calling pred with that
element returns false.

```js
filter(isOdd, [1, 2, 3, 4]) // => [2, 4]
filter(isAlphabetic, 'foo123') // => '123'
```

#### concat(...args)

Returns a collection of all arguments concatenated together.

If args are objects, they are merged from right to left.

```js
concat([1, 2], [3, 4]) // => [1, 2, 3, 4]
concat('foo', 'bar') // => 'foobar'
concat({foo: 2}, {bar: 2}, {foo: 1}) // => {foo: 1, bar: 2}
```

### Predicates

#### not(pred)

Returns a negated version of a predicate function.

```js
let isNotDigit = not(isDigit);

isDigit('1') // => true
isNotDigit('1') // => false
```

#### isDigit(char)

Returns true if char is a digit, false otherwise.

```js
isDigit('1') // => true
isDigit('f') // => false
```

#### isAlphabetic(char)

Returns true if char is alphabetic, false otherwise.

```js
isAlphabetic('a') // => true
isAlphabetic('9') // => false
```


### Transformers

#### id(x)

The identity function. Returns the argument as is.

#### toUpper(str)

Returns an all uppercase version of the argument string. Alias for
String.prototype.toUpperCase.

#### toLower(str)

Returns an all lowercase version of the argument string. Alias for
String.prototype.toLowerCase.

#### trim(str)

Returns the argument string without any heading or trailing whitespace. Alias
for String.prototype.trim.

#### stringify(arg)

Alias for JSON.stringify.
