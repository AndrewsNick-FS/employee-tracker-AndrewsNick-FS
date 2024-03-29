// Main Class
class Main {
  constructor() {
    // Hardcoded initial employees
    this.employees = [
      new Manager("Malcolm", 34, 10, 40),
      new PartTime("Inara", 31, 9, 30),
      new Manager("Kaylee", 27, 12, 40),
    ];
  }

  // Main Menu
  displayMenu() {
    console.log("1. Add Employee");
    console.log("2. Remove Employee");
    console.log("3. Edit Employee");
    console.log("4. Display Employees");
  }

  // Add Employee
  addEmployee() {
    const name = prompt("Enter employee name:");
    const age = prompt("Enter employee age:");
    const payRate = prompt("Enter employee pay rate:");
    const hours = prompt("Enter employee hours per week:");

    const isManager = hours >= 40;
    const employee = isManager
      ? new Manager(name, age, payRate, hours)
      : new PartTime(name, age, payRate, hours);

    this.employees.push(employee);

    console.clear();
    console.log("Employee added successfully!");
    this.displayEmployees();
  }

  // Remove Employee
  removeEmployee() {
    console.log("Employee List:");
    this.displayEmployees();

    const input = prompt("Enter employee number or name to remove:");

    // Check if input is a number
    const index = isNaN(input)
      ? this.employees.findIndex((e) => e.name === input)
      : input - 1;

    if (index !== -1 && index < this.employees.length) {
      this.employees.splice(index, 1);
      console.clear();
      console.log("Employee removed successfully!");
      this.displayEmployees();
    } else {
      console.log("Invalid input. No employee removed.");
    }
  }

  // Edit Employee
  editEmployee() {
    console.log("Employee List:");
    this.displayEmployees();

    const employeeNumber = prompt("Enter employee number to edit pay rate:");
    const employee = this.employees[employeeNumber - 1];

    if (employee) {
      const newPayRate = prompt(`Enter new pay rate for ${employee.name}:`);
      employee.editPayRate(newPayRate);

      console.clear();
      console.log("Employee pay rate updated successfully!");
      this.displayEmployees();
    } else {
      console.log("Invalid employee number. No changes made.");
    }
  }

  // Display Employees
  displayEmployees() {
    console.log("Serenity Cafe");
    console.log("ID\tName\tAge\tSalary\tHrs\tPay\tType");

    this.employees.forEach((employee, index) => {
      console.log(`${index + 1}\t${employee.displayInfo()}`);
    });
  }
}

// Employee Class
class Employee {
  constructor(name, age, payRate) {
    this.name = name;
    this.age = age;
    this.payRate = payRate;
    this.annualSalary = 0;
  }
}

// PartTime Class
class PartTime extends Employee {
  constructor(name, age, payRate, hours) {
    super(name, age, payRate);
    this.hours = hours;
    this.employeeType = "Part Time";
    this.calculatePay();
  }

  calculatePay() {
    this.annualSalary = this.hours * this.payRate * 52;
  }

  displayInfo() {
    return `${this.name}\t${this.age}\t${this.annualSalary}\t${this.hours}\t${this.payRate}\t${this.employeeType}`;
  }
  // Additional method to edit pay rate for Part Timer
  editPayRate(newPayRate) {
    this.payRate = newPayRate;
    this.calculatePay();
  }
}

// Manager Class
class Manager extends Employee {
  constructor(name, age, payRate, hours = 40) {
    super(name, age, payRate);
    this.hours = hours;
    this.employeeType = "Manager";
    this.calculatePay();
  }

  calculatePay() {
    this.annualSalary = this.hours * this.payRate * 52 - 1000;
  }

  displayInfo() {
    return `${this.name}\t${this.age}\t${this.annualSalary}\t${this.hours}\t${this.payRate}\t${this.employeeType}`;
  }

  // Additional method to edit pay rate for Manager
  editPayRate(newPayRate) {
    this.payRate = newPayRate;
    this.calculatePay();
  }
}

// IIFE to instantiate the Main class
(function () {
  const main = new Main();
  main.displayEmployees(); // Display initial employees
  let exitFlag = false;

  while (!exitFlag) {
    main.displayMenu();
    const choice = prompt(
      "Main Menu \n 1. Add Employee \n 2. Remove Employee \n 3. Edit Employee \n 4. Display Employees \n \n Enter your choice (1-4), or press Cancel / type exit to quit:"
    );

    if (choice == -null) {
      console.log("Exiting the program. Goodbye!");
      break;
    }

    switch (choice) {
      case "1":
        main.addEmployee();
        break;
      case "2":
        main.removeEmployee();
        break;
      case "3":
        main.editEmployee();
        break;
      case "4":
        main.displayEmployees();
        break;
      case "exit":
        exitFlag = true;
        console.log("Exiting the program. Goodbye!");
        break;
      default:
        console.log("Invalid choice. Please enter a number between 1 and 4.");
    }
  }
})();
