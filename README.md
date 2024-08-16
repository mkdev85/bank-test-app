# bankTestApp

bankTestApp is a web application designed to manage various banking operations such as deposits, withdrawals, and sending money to other users. The application is built with modern web technologies and follows best practices for code organization and state management.

## Installation

To get started with the project, first, install the dependencies:

```bash
npm install

```

To start the local development server:

```bash
npm run dev
```

## Tech Stack

- **TypeScript**: A strongly-typed programming language that builds on JavaScript, giving you better tooling at any scale. TypeScript allows for type safety, making the code more predictable and easier to debug.

- **Next.js**: A React-based framework that enables server-side rendering and static site generation. Next.js is used for its powerful features, such as file-based routing, API routes, and optimized performance.

- **Redux Toolkit**: A state management library that simplifies the process of managing global state in your application. Redux Toolkit offers tools like `createSlice`, `configureStore`, and `createAsyncThunk` to streamline state management and asynchronous operations.

- **Material-UI**: A popular React UI framework that implements Google's Material Design. Material-UI provides a set of customizable and accessible components to build a responsive and visually appealing user interface.

- **Formik & Yup**: Formik is a library that simplifies form management in React, handling form state, validation, and submission. Yup is used alongside Formik for schema-based form validation, ensuring data consistency and integrity.

- **IBAN**: A library for validating International Bank Account Numbers (IBAN). It ensures that account numbers entered by users are in the correct format, reducing errors in transactions.

- **MUIDatatable**: A Material-UI-based data table component that supports features like filtering, sorting, and pagination. MUIDatatable is used to display transaction data in a user-friendly and organized manner.

- **Redux Toolkit AsyncThunk**: A utility provided by Redux Toolkit to handle asynchronous operations like API calls. It integrates seamlessly with Redux, allowing you to dispatch async actions and manage loading, success, and error states in a consistent way.

## Folder Structure

- **config**

  - Contains configuration files for various parts of the application, such as API endpoints, environment settings, and other global configurations.

- **pages**

  - Handles business logic and routing for the application. Each file corresponds to a route in the application, and contains components and logic specific to that route.

- **utils**

  - Houses common utility functions and helper methods that are used throughout the application. These functions are generally reusable and abstracted from the core logic.

- **constants**

  - Stores constant values and configuration settings that are used across different parts of the application. This file helps in managing and centralizing constant data.

- **hooks**

  - Contains higher-order components (HOCs) that provide reusable functionalities by wrapping other components. These HOCs enhance components with additional features or logic.

- **redux**

Manages application state using Redux. The redux folder is organized as follows:

- **asyncThunks**: Contains asyncThunk functions for handling asynchronous actions like fetching data, depositing, and withdrawing amounts.
- **services**: Includes files for interacting with external services or APIs. These files encapsulate the logic for making HTTP requests or other service-related operations.
- **slices**: Houses Redux slices that manage specific pieces of state with reducers. Each slice is responsible for a particular feature or domain of the application.
- **store**: The main Redux store configuration file, where all slices and middleware are combined and exported for use in the application.

- **hoc**

  - Houses specific higher-order components that add functionality to existing components, such as the `withTotalBalance` HOC for displaying the total balance.

- **hooks**

  - Contains custom hooks `useSnackbar`,`` that encapsulate reusable logic and state management, such as fetching data or managing form inputs.

- **ui-kit**

  - Includes reusable UI `components` and `theme` configurations. This folder helps maintain a consistent look and feel across the application by providing common UI elements and styling.

- **validation**
  - Manages form `validation logic` using libraries like Formik and Yup. Contains schemas and functions for `validating user inputs` and ensuring data integrity.

## Data Structure

To simulate API responses and manage application state, the following data structures are used:

```json
{
  "user": {
    "data": {
      "id": "user123",
      "accountId": "account123",
      "name": "John Doe",
      "email": "johndoe@example.com"
    }
  },
  "statement": {
    "data": [
      {
        "transactionId": "txn007",
        "accountId": "account123",
        "amount": 5000,
        "type": "deposit",
        "createdAt": "2024-02-14T11:48:07.780Z",
        "status": "success"
      },
      {
        "transactionId": "txn006",
        "accountId": "account123",
        "amount": 5000,
        "type": "deposit",
        "createdAt": "2024-07-14T11:47:07.780Z",
        "status": "success"
      },
      {
        "transactionId": "txn004",
        "accountId": "account123",
        "amount": 5000,
        "type": "deposit",
        "createdAt": "2024-08-01T11:45:07.780Z",
        "status": "success"
      },
      {
        "transactionId": "txn005",
        "accountId": "account123",
        "amount": 5000,
        "type": "deposit",
        "createdAt": "2024-08-02T11:46:07.780Z",
        "status": "success"
      },
      {
        "transactionId": "txn009",
        "accountId": "account123",
        "amount": 5000,
        "type": "deposit",
        "createdAt": "2024-08-05T11:50:07.780Z",
        "status": "success"
      },
      {
        "transactionId": "txn008",
        "accountId": "account123",
        "amount": 5000,
        "type": "deposit",
        "createdAt": "2024-08-07T11:49:07.780Z",
        "status": "success"
      },
      {
        "transactionId": "txn003",
        "accountId": "account123",
        "amount": 5000,
        "type": "deposit",
        "createdAt": "2024-08-09T11:44:07.780Z",
        "status": "success"
      },
      {
        "transactionId": "txn010",
        "accountId": "account123",
        "amount": 5000,
        "type": "deposit",
        "createdAt": "2024-08-10T11:51:07.780Z",
        "status": "success"
      },
      {
        "transactionId": "txn002",
        "accountId": "account123",
        "amount": 5000,
        "type": "deposit",
        "createdAt": "2024-08-13T11:42:07.780Z",
        "status": "success"
      },
      {
        "transactionId": "txn011",
        "accountId": "account123",
        "amount": 5000,
        "type": "withdrawal",
        "createdAt": "2024-08-13T11:52:07.780Z",
        "status": "success"
      },
      {
        "transactionId": "txn001",
        "accountId": "account123",
        "amount": 5000,
        "type": "deposit",
        "createdAt": "2024-08-14T11:42:07.780Z",
        "status": "success"
      }
    ]
  },
  "balance": {
    "data": {
      "currentBalance": 45000,
      "currency": "USD",
      "accountId": "account123"
    }
  }
}
```

## Project Structure

### Layout

- **Navbar Component**

  - Part of the main layout, it provides navigation links to various pages like Home, Deposit, Withdrawal, and Send Money.

- **TotalBalance Component**

  - **This is a Higher-Order Component (HOC)** that wraps other components to display the user's total balance.
  - It is consistently visible across the Home, Deposit, Withdrawal, and Send Money pages as part of the main layout.

- **Transaction Summary**

**We have covered all the bonus points as mentioned in the documentation requirements.**

The `TransactionSummary` component offers the following advanced features to enhance user experience:

### Sorting and Filtering

1. **Date Sorting**: Users can sort their account statements by date, both in ascending and descending order by click on created At .
2. **Movement Filtering**: Users can filter movements based on:
   - **Deposits**
   - **Withdrawals**
   - **Date Ranges**
   - **Combination of filters**: The component supports filtering by multiple criteria using the "AND" logical operator.

### Default and Custom Search

- **Default Sorting**: Search results are displayed by date, with the most recent transactions appearing first by default.
- **Custom Sorting**: Users can further sort search results by date in both ascending and descending order.

### Pagination

- **Paginated Results**: For both account statements and search results, movements are paginated when there are more than 10 entries.
- **Navigation Controls**: Users can easily navigate through pages using:
  - **Next Page**
  - **Previous Page**
  - **First Page**
  - **Last Page**

These features ensure that users have full control over viewing and managing their account statements and transaction history efficiently.

### Pages

- **Home Page**

  - Displays a transaction amount table with the following features:
    - **Transaction Amount Table**:
      - Shows deposits, withdrawals, and send money transactions.
      - **Deposits** are highlighted in green, **withdrawals** in red.
      - Each transaction updates the table and reflects changes in the user's balance.
      - Includes sorting and filtering options to view transactions by date, amount, or type.
      - The table updates in real-time to reflect the current balance after each transaction.

- **Deposit**

  - Includes a Navbar component and a TotalBalance component.
  - Provides a form for users to deposit amounts into their account with the following features:
    - **Validation Setup**:
      - Ensures that the deposit amount is a positive value.
      - Displays error messages if the user inputs a negative value or invalid amount.
    - **Loading Indicator**:
      - Shows a loading spinner or indicator while the deposit request is being processed.
    - **Reset Functionality**:
      - Resets the form fields when the "Reset" button is clicked, clearing any entered data.
    - **Real-Time Table Update**:
      - Updates the transaction amount table in real-time to reflect the new deposit and adjust the balance accordingly.
    - **Success Confirmation**:
      - Displays a success message via a toast notification once the PIN code is verified and the withdrawal is processed successfully.

- **Withdrawal**

  - Includes a Navbar component and a TotalBalance component.
  - Allows users to withdraw funds with the following features:
  - Allows users to withdraw funds after verifying a 4-digit PIN code.

    - **Validation**:
      - Ensures the withdrawal amount is a positive value and does not exceed the available balance.
      - Displays error messages if the user attempts to withdraw more than the current balance.
    - **Loading Indicator**:
      - Shows a loading spinner or indicator while the withdrawal request is being processed.
    - **Reset Functionality**:
      - Clears the form fields when the "Reset" button is clicked, removing any entered data.
    - **PIN Code Verification**:
      - Opens a PIN code component for secure transaction verification after submitting the withdrawal request.
      - Allows users to resend the PIN code if the timer expires or if they did not receive it initially.
    - **Real-Time Updates**:
      - Updates the transaction amount table and user balance in real-time to reflect the new withdrawal.
    - **Success Confirmation**:
      - Displays a success message via a toast notification once the PIN code is verified and the withdrawal is processed successfully.

- **Send Money**
  Includes a Navbar component and a TotalBalance component.
  - Enables users to send money to another user.
  - Validates the account number using IBAN and verifies the transaction amount after PIN code verification.
- **Send Money**
  - Includes a Navbar component and a TotalBalance component.
  - Enables users to send money to another user with the following features:
  - Validates the account number using IBAN and verifies the transaction amount after PIN code verification.
    - **Validation**:
      - Ensures the amount to send is a positive value and does not exceed the available balance.
      - Validates the recipient’s account number using IBAN to ensure it is in the correct format.
      - Displays error messages if the user attempts to send an amount greater than their current balance or if the account number is invalid.
    - **Loading Indicator**:
      - Shows a loading spinner or indicator while the send money request is being processed.
    - **Reset Functionality**:
      - Clears the form fields when the "Reset" button is clicked, removing any entered data.
    - **PIN Code Verification**:
      - Opens a PIN code component for secure transaction verification after submitting the send money request.
      - Allows users to resend the PIN code if the timer expires or if they did not receive it initially.
    - **Real-Time Updates**:
      - Updates the transaction amount table and user balance in real-time to reflect the new transaction and adjusted balance.
    - **Success Confirmation**:
      - Displays a success message via a toast notification once the PIN code is verified and the transaction is processed successfully.

## Performance Improvements

- **Optimize Rendering**

  - Use `React.memo` and `useCallback` to optimize rendering performance and avoid unnecessary re-renders.
  - Minimize prop drilling by using context or other state management solutions to pass data efficiently.

- **Efficient Data Handling**
  - Implement efficient data fetching and caching strategies to reduce redundant API calls.
  - Optimize state management to minimize performance overhead.

## Code Quality

- **Maintain Structure**

  - Follow a clear and consistent folder and file structure to enhance code organization and readability.
  - Adhere to best practices for code organization, ensuring that related files and components are grouped logically.

- **Code Consistency**
  - Use linters and formatters to ensure consistent code style and adherence to best practices.

## Prettier and TypeScript

- **Prettier Integration**

  - Configure Prettier to automatically format code, ensuring a consistent style across the application.
  - Set up Prettier rules to enforce code style guidelines and avoid formatting conflicts.

- **TypeScript Enhancements**
  - Leverage TypeScript’s type system to enhance type safety and prevent runtime errors.
  - Ensure all components and functions are typed accurately to improve code reliability and maintainability.

## Extra Features

- **API Integration**

  - The flow of API integration is managed within Redux Toolkit.
  - To adjust for different API interactions, simply update the endpoint in the `asyncThunk` folder of Redux.

- **Custom Hooks**

  - Utilizes custom hooks like `useSnackbar`,`useAccountId` ,`useTransactionId`, and `utility hooks` for dispatching actions and selecting state.
  - These hooks streamline state management, generate unique transaction IDs, and improve UI interactions.

- **Higher-Order Components (HOC)**

  - The `withTotalBalance` HOC wraps components to provide total balance functionality.
  - This HOC enhances other components with balance-related features and ensures consistent display.

- **Constant File**

  - Contains a centralized file for managing all constant data used across the application.
  - This file helps in maintaining consistency and simplifying updates to constant values.

- **UI Kit Folder**

  - Includes common components that are reused throughout the application.
  - This folder helps maintain consistency and reduces code duplication by providing reusable UI elements.

- **Theme Setup**
  - Configured a Material-UI theme for consistent styling across the application.
  - The theme ensures a unified look and feel, improving the overall user experience.

## Areas for Improvement

- **Authentication Implementation**

  - Adding a robust authentication system to manage user sessions and secure operations.
  - Implementing features such as user registration, login, and token-based authentication.

- **Server Integration**

  - Integrating a backend server to handle API requests and manage data persistence.
  - Implementing RESTful or GraphQL APIs for seamless communication between the client and server.

- **Unit and Integration Testing**
  - Adding unit and integration tests to ensure code reliability and functionality.
  - Using testing libraries and frameworks to automate and streamline the testing process.

- **Responsive Design**
- Enhancing the application's responsiveness to ensure it provides an optimal user experience   across various devices and screen sizes.
 
 - Implementing a mobile-first design approach, using flexible layouts, and testing the UI on different screen resolutions. 

- **MUI DataTable Optimization**
- Improving the performance and customization of the MUI DataTable component.
- Implementing features such as dynamic column resizing, enhanced filtering options, and efficient pagination.
- Ensuring the DataTable supports responsive design principles and provides a seamless experience on all devices.