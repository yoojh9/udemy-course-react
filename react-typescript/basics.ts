// Primitives: number, string, boolean
// More complex types: arrays, objects
// Function types, parameters

/**
 * Primitives
 */
let age: number = 1;
age = 12;
// age = '12';  // error

let userName: string;
userName = "Jeonghyun";

let isInstructor: boolean;
isInstructor = true;

/**
 * More Complex Type
 */
let hobbies: string[];
hobbies = ["Sports", "Cooking"];

let person: {
    name: string;
    age: number;
};
person = {
    name: "Jeonghyun",
    age: 32,
};
// person = {
//   isEmployee: true,   // error
// }

let people: {
    name: string;
    age: number;
}[];

/**
 * Type Inference
 */
let course = "React - The Complete Guide";
// course = 12341;   // error

/**
 * Union Type
 */
let course2: string | number | boolean = "React - The Complete Guide";
course2 = 12341;

/**
 * Functions & types
 */
function add(a: number, b: number): number {
    return a + b;
}

function printOutput(value: any): void {
    console.log(value);
}

/**
 * Generic
 */
function insertAtBeginning<T>(array: T[], value: T) {
    const newArray = [value, ...array];
    return newArray;
}

const demoArray = [1, 2, 3];
const updatedArray = insertAtBeginning(demoArray, -1); // [-1, 1, 2, 3]
const stringArray = insertAtBeginning(["a", "b", "c"], "d");

// updatedArray[0].split(""); // error
