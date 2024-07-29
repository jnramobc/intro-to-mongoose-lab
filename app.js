const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Customer = require('./models/customer'); 
const prompt = require('prompt-sync')();

dotenv.config();

mongoose.connect(process.env.MONGODB_URI, {
});


async function mainMenu() {
    console.log(`\n Welcome to the CRM`);

    let choice;
  do {
    console.log('\nWhat would you like to do?');
    console.log('  1. Create a customer');
    console.log('  2. View all customers');
    console.log('  3. Update a customer');
    console.log('  4. Delete a customer');
    console.log('  5. Quit');

    choice = prompt('Number of action to run: ');

    if (choice === '1') {
      await createCustomer();
    } else if (choice === '2') {
      await viewCustomers();
    } else if (choice === '3') {
      await updateCustomer();
    } else if (choice === '4') {
      await deleteCustomer();
    } else if (choice === '5') {
      console.log('Exiting...');
      await mongoose.connection.close();
      process.exit(0);
    } else {
      console.log('Invalid choice. Please enter a number between 1 and 5.');
    }
  } while (choice !== '5');
}

async function createCustomer() {
    const name = prompt('Enter customer name: ');
    const age = prompt('Enter customer age: ');

    const newCustomer = new Customer({ name, age });
    await newCustomer.save();
    console.log('Customer created successfully');
  }

  async function viewCustomers() {
    const customers = await Customer.find();
    console.log('\nCustomers:');
    customers.forEach((customer) => {
      console.log(`id: ${customer._id} -- Name: ${customer.name}, Age: ${customer.age}`);
    });
  }
  async function updateCustomer() {
    const customers = await Customer.find();
    console.log('\nCustomers:');
    customers.forEach((customer) => {
      console.log(`id: ${customer._id} -- Name: ${customer.name}, Age: ${customer.age}`);
    });

    const customerId = prompt('Copy and paste the id of the customer you would like to update here: ');
    const customer = await Customer.findById(customerId);
    if (!customer) {
      console.log('Customer not found');
      return;
    }
  
    const newName = prompt(`What is the customers new name? (Current: ${customer.name}): `);
    const newAge = prompt(`What is the customers new age? (Current: ${customer.age}): `);
  
    customer.name = newName || customer.name;
    customer.age = newAge || customer.age;
    await customer.save();
    console.log('Customer updated successfully');
  }

  async function deleteCustomer() {
    const customers = await Customer.find();
    console.log('\nCustomers:');
    customers.forEach((customer) => {
      console.log(`id: ${customer._id} -- Name: ${customer.name}, Age: ${customer.age}`);
    });
  
    const customerId = prompt('Copy and paste the id of the customer you would like to delete here: ');
    const customer = await Customer.findById(customerId);
    if (!customer) {
      console.log('Customer not found');
      return;
    }
  
    await customer.remove();
    console.log('Customer deleted successfully');
  }
  
  mainMenu();