## Input Componentization

### Why should I use this concept?
1. Maintainability and reuse<br/>
Since all the code regarding inputs is in the same place it's much easier to maintain and edit your code.
One change affects the whole code. This way it is much easier to fix bugs and you ensure that once a bug
is fixed the same bug won't pop out elsewhere(if you repeat the type of an input a lot it's pretty
common to forget to fix the bug somewhere).

2. Low coupling<br/>
As long as you always return the value of the input and which errors it contain, doesn't matter how you
implement it. Suppose you are using Ionic w/ Angular and you want to change from ion-input to mat-input,
using this concept you can make this change quickly and easily.

### When should I use this concept?
1. Big projects or medium/small project with a high number of inputs

### When should I not use this concept?
1. Medium/small project with a low number of inputs
