var student = [];
var fs = require('fs');
var { resolve } = require('path');

exports.prepare = () => {
    return new Promise((resolve, reject) => {
        fs.readFile("./students.json", (err, data) => {
            if (err) {
                reject(err);
            } else {
                student = JSON.parse(data);
                resolve();
            }
        });
    
    });
}

//old code
exports.getCPA = () => {
    return new Promise((resolve, reject) => {
        if(student.length == 0) {
            reject("No students");
        }

        const cpaStudents = student.filter((student) => {
            return student.program === "CPA";
        });
        resolve(cpaStudents);
    });
};



exports.getHighestGPA = () => {
    return new Promise((resolve, reject) => {
        if(student.length == 0) {
            reject("No students");
        }

        const highestGPA = student.reduce((prev, current) => {
            return (prev.gpa > current.gpa) ? prev : current;
        });
        resolve(highestGPA);
    });
};

exports.getBSD = () => {
    return new Promise((resolve, reject) => {
        if(student.length == 0) {
            reject("No students");
        }

        var bsdStudents = student.filter((student) => {
            return student.program === "BSD";
        });
        resolve(bsdStudents);
    });
};

exports.getAllStudents = () => {
    return new Promise((resolve, reject) => {
        if(student.length === 0) {
            reject("No students");
        }
        resolve(student);
    });
}

    