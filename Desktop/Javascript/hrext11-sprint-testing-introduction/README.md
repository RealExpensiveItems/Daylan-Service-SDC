# Testing Introduction

## Introduction to Testing

The primary difficulty in software engineering is proving that code does what it is supposed to do, especially after many conflicting changes. Automated testing is a tool which is used widely in the industry to specify and improve code.

An automated test is just a special program that runs to verify that the main program is doing what you expect, and throws a noisy error otherwise. For example, if we've written a function `isDivisibleByTwo`, we could write a test function that checks that `4`, `50`, and `2^30` all return `true`, and `3`, `151`, and `2^30-1` all return `false`.

We've fully embraced automated testing as part of our core curriculum, and much of our coursework involves test suites which specify the behavior of the code you and your pair will be writing.

#### Helpful Resources

* [Mocha](https://mochajs.org/)
* [Chai](http://chaijs.com/api/bdd/)

## Bare Minimum Requirements

Bare minimum requirements are just that - the work that will be absolutely crucial that you complete and understand. If you do not complete bare minimum requirements within the time frame allotted for the activity, please reach out to staff to let us know and to formulate a plan for getting back on track.

### Setup
- [ ] Fork the repo called `testing-introduction`
- [ ] Clone your fork to your computer
- [ ] Examine the provided code and ensure you understand what everything is doing (or have a theory about what everything is doing). **This step is important - don't skip it!**

### Testing

- [ ] For `reverse-string`, write a series of tests that you think, if passed, would indicate the function is working.
- [ ] Add and commit your tests.
- [ ] Write an implementation of `reverse-string` (go ahead and use your problem solving process from a few days ago)!
- [ ] Once all of your tests are passing, commit your solution, ensuring you have a sensible commit message.
- [ ] Push your code to your fork.
- [ ] Repeat the above process for `find-first-non-repeat-char`, until you feel the test suite you have written is complete (ie - you can't think of any ways in which someone could write an incorrect implementation that would pass all of your tests).
- [ ] Push your code to your fork.
- [ ] Repeat the above process for `sum-nested-array`, making sure you commit between writing tests and getting the implementation to pass the tests!
- [ ] Push your code to your fork.

## Advanced Content

Advanced content is meant to be attempted only after you've finished all of the bare minimum requirements. It's designed to direct you down interesting paths and help you increase your autonomy, so challenge yourself to tackle these problems without extra guidance!

- [ ] Write a series of test cases for the following problem (and don't forget to commit your tests!)
    
    ```javascript
    /* Write a function, minimumHammingDistance, that takes in two strings
    (both representing DNA strands), and returns the minimum possible
    hamming distance between the shorter string and a substring of the
    longer string. You should use your hammingDistance function as part of the solution.

    Example:
    minimumHammingDistance('GTA', 'CCTAGT') // returns 1

    The minimum Hamming Distance is found when the string 'GTA' is compared with the substring 'CTA'
       GTA
    CC|CTA|GA
    ```
- [ ] Write a solution to `minimumHammingDistance`
- [ ] Write a test that checks that the `hammingDistance` function is used as part of the solution to `minumumHammingDistance`
