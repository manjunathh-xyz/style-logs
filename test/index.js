const { style, log, styled } = require("../dist/index");

// Old API tests
console.log(style(`<text f-red>Hello There</text>`)) // Foreground Color
console.log(style(`<text b-red>Hello There</text>`)) // Background Color
console.log(style(`<text s-underline>Hello There</text>`)) // Style (Underline)
console.log(style(`<text s-bold>Hello There</text>`)) // Style (Bold)
console.log(style(`<text s-inverse>Hello There</text>`)) // Style (Inverse)

console.log(style(`<text f-red s-bold s-underline>Hello</text> There`)) // Multiuse

// New API tests
console.log("Testing log with style object:");
log("Hello", { color: "red", background: "black", bold: true, underline: true });

console.log("Testing multi-segment log:");
log([
  ["Error:", { color: "red", bold: true }],
  [" file not found ", { color: "gray" }],
  ["index.ts", { color: "yellow" }]
]);

console.log("Testing chainable API:");
styled()
  .color("cyan")
  .bg("black")
  .bold()
  .log("Hello World");

console.log("Testing invalid input:");
log("Should not crash", null);
log("Should not crash", { invalid: "value" });
log([["test", null]]);