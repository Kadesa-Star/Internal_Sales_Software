INTERNAL SALES SOFTWARE
=======================

Streamline Inventory and Sales Management with real-time 
tracking and automated notifications.


Technologies
------------ 
Libraries and Framework
Frontend 
React (for building interactive user interfaces)
Bootstrap (for responsive design)
Backend
Flask (Python web framework for handling server-side logic)
Database
MySQL (for relational data storage)
Notification System:
Email APIs (e.g. SendGrid) for sending notifications
Deployment
Docker (for containerization)
Heroku or AWS (for cloud hosting)
Version Control
Git (for source code management)
Documentation
Markdown (for writing README.md and documentation)

Technology Comparisons:
------------------------
Frontend Framework: React vs. Angular
React was chosen for the project because of its flexibility and ease of integration with other libraries. It allows for the creation of reusable components and has a large community with plenty of resources and support.
Angular was considered as an alternative. It offers a more opinionated approach with built-in features such as dependency injection and a powerful CLI. However, Angular’s learning curve is steeper compared to React, and it can be more complex to set up. React was selected due to its simplicity and faster learning curve, which aligns better with the project’s requirements and timeline.

Backend Framework: Flask vs. Django
Flask was chosen for its lightweight nature and flexibility. It allows for more control over the components and is easier to start with, especially for smaller projects.
Django was considered as an alternative. It provides a full-featured framework with built-in functionalities such as an ORM, authentication, and an admin panel. However, Django’s extensive features can be overkill for a smaller project, and it has a steeper learning curve. Flask was preferred for its simplicity and ability to customize and add only the necessary components, which is more suitable for this project's scope.

Challenge Statement
------------------- 
i)  Problem the Portfolio Project is intended to Solve
The internal sales software addresses the challenge of efficiently managing and tracking inventory and sales within a company. It provides a systematic approach to record and monitor product stock levels, track daily sales transactions, and generating monthly reports. The software automates notifications for low stock levels, aiding in timely restocking and reducing manual oversight.

ii) What the Portfolio Project Will Not Solve:
External Market Analysis: The software does not analyze external market trends or provide insights into competitive pricing.
Customer Relationship Management (CRM): It does not handle customer interactions, feedback, or support beyond sales transactions.
Integration with External Systems: The project does not integrate with other enterprise systems such as ERP or advanced analytics platforms.
Complex Forecasting: It does not provide advanced forecasting or predictive analytics for sales trends.

Target Users
------------
Sales Team: They will use the software to record sales transactions, track stock levels, and receive notifications about low stock.
Production Team: They will be notified about products running low and manage incoming stock.
Finance Team: They will access reports for financial evaluation and stock management.
Company Directors: They will review high-level reports to make strategic decisions.
Relevance to Specific Locale: The project is not highly dependent on a specific locale. It is designed to be versatile and applicable to various industries and companies regardless of location. However, it assumes a general business environment and may need adaptations for specific regional regulations or industry standards.

Risks
--------
Technical Risks:
Data Security
Potential Impact: Unauthorized access to sensitive sales and inventory data could result in data breaches or loss of confidential information.

Safeguards/Alternatives:
------------------------
Implement secure authentication and authorization mechanisms.
Encrypt sensitive data both in transit and at rest.
Regularly update software to patch known vulnerabilities.
Scalability Issues
Potential Impact: As the volume of data grows, the software might experience performance degradation or difficulties handling increased load.

Safeguards/Alternatives:
--------------------------
Use efficient database indexing and query optimization techniques.
Design the system to be modular and scalable, using cloud services that allow for easy scaling.
Conduct load testing to identify potential bottlenecks and address them proactively.
Integration Challenges
Potential Impact: Difficulty integrating with other systems (e.g., accounting software or production systems) could limit functionality or data synchronization.

Safeguards/Alternatives:
Design the system with flexible APIs to facilitate future integrations.
Document integration points and provide clear guidelines for connecting with other systems.

Software Bugs and Errors
Potential Impact: Bugs or errors in the software could lead to incorrect data handling or system crashes, affecting business operations.
Safeguards/Alternatives:
Implement comprehensive testing strategies, including unit tests, integration tests, and user acceptance testing.
Use version control and continuous integration practices to catch and fix issues early.
Non-Technical Risks:
User Adoption
Potential Impact: Resistance from users or lack of training could lead to low adoption rates and underutilization of the software.
Strategies:
Provide thorough training and support for all users.
Gather feedback from users during development and adjust the software to better meet their needs.
Develop clear and user-friendly documentation.
Project Timeline Delays
Potential Impact: Delays in project development could impact the delivery schedule and reduce the time available for testing and refinement.
Strategies:
Create a detailed project plan with milestones and deadlines.
Monitor progress regularly and address any issues or delays promptly.
Allocate extra time for unexpected challenges and adjust the plan as needed.
Budget Constraints
Potential Impact: Budget limitations could restrict the resources available for development, testing, or deployment.
Strategies:
Develop a realistic budget that includes all potential costs.
Prioritize essential features and consider a phased approach to development.
Seek additional funding or resources if needed.
Compliance and Legal Issues
Potential Impact: Failure to comply with legal or regulatory requirements could result in legal issues or penalties.
Strategies:
Research and understand any relevant regulations or standards that apply to the software.
Consult with legal or compliance experts to ensure adherence to all applicable requirements.
Implement data protection measures and maintain proper documentation.

Infrastructure
--------------
Branching and Merging Process:
Branching Strategy:
Main Branch: This is the default branch where the production-ready code resides. It should always be stable.
Development Branch: Used for integrating new features and bug fixes. It serves as an intermediate branch before merging into the main branch.
Feature Branches: Created from the development branch for each new feature or bug fix. These branches are named descriptively (e.g., feature/add-stock-management or bugfix/fix-login-issue).
Hotfix Branches: Created directly from the main branch for urgent fixes needed in production (e.g., hotfix/critical-bug).
Merging Strategy:
Feature Development: Developers create feature branches, make changes, and submit pull requests (PRs) to merge into the development branch. Code reviews are conducted before merging.
Testing and Integration: After features are merged into the development branch, extensive testing is performed. Once all tests pass, the development branch is merged into the main branch.
Hotfixes: Critical issues are addressed in hotfix branches, reviewed, and merged directly into both the main branch and the development branch to ensure consistency.
Deployment Strategy:
Staging Environment:
Deploy the latest code from the development branch to a staging environment. This environment mirrors production but is used for final testing and validation.
Production Deployment:
After successful testing in staging, merge the development branch into the main branch.
Deploy the main branch to the production environment using a Continuous Integration/Continuous Deployment (CI/CD) pipeline. Tools like GitHub Actions, Jenkins, or Travis CI can be used to automate this process.
Rollback Plan:
Implement a rollback strategy to revert to a previous stable version if issues are detected post-deployment. Maintain backups and snapshots of the production environment to facilitate this.
Populating the App with Data:
Initial Data Setup:
Use database migration tools (e.g., Alembic for SQLAlchemy) to set up the initial database schema.
Create seed scripts or use fixtures to populate the database with initial data, such as sample products and stock levels.
Data Import:
Implement functionality for importing data from external sources if needed, such as CSV files or external APIs. Provide tools or interfaces for easy data entry and management.
Tools, Automation, and Testing Process:
Testing Tools:
Unit Testing: Use frameworks like pytest for Python or Jest for JavaScript to write and run unit tests.
Integration Testing: Test interactions between components or with external systems using tools like Postman for API testing.
End-to-End Testing: Use tools like Selenium or Cypress to test the entire application flow from the user’s perspective.

Automation:
----------
CI/CD Pipelines: Set up automated pipelines using tools like GitHub Actions, Jenkins, or Travis CI to run tests, build the application, and deploy it to staging and production environments.
Code Quality: Integrate tools for linting (e.g., flake8 for Python) and static code analysis to ensure code quality and adherence to standards.
Process:
Continuous Integration: Ensure that code is continuously integrated and tested to detect issues early. Every pull request should trigger automated tests and build processes.
Continuous Deployment: Automate the deployment process to reduce manual intervention and minimize deployment errors. Ensure that deployments are smooth and can be quickly reverted if necessary.

Existing Solutions
------------------
1. Odoo ERP:
Similarities:
Provides inventory management, sales tracking, and reporting features.
Supports integration with various business functions like accounting and production.
Differences:
Odoo is a comprehensive ERP system that covers a wide range of business operations beyond sales and inventory, making it more complex and potentially more expensive.
Our project is focused solely on internal sales and inventory management with simpler features tailored to specific company needs, rather than a full ERP solution.
2. Salesforce Sales Cloud:
Similarities:
Offers sales tracking, inventory management, and reporting capabilities.
Allows customization to fit specific business requirements.
Differences:
Salesforce is a cloud-based CRM platform with extensive features for sales and customer relationship management, often requiring significant investment and a learning curve.
Our project is intended for internal company use with a focus on stock management and sales tracking without the broader CRM functionalities. It is designed to be more cost-effective and easier to deploy.
3. Zoho Inventory:
Similarities:
Provides inventory management, order management, and sales reporting.
Integrates with other Zoho products and external services.
Differences:
Zoho Inventory is a cloud-based solution with various integrations and features designed for e-commerce and retail businesses.
Our project is intended for internal use within a company, focusing specifically on tracking internal stock and sales, with custom features for notifications and stock reviews that may not be available in Zoho Inventory.
4. Microsoft Dynamics 365:
Similarities:
Offers sales management, inventory tracking, and financial reporting functionalities.
Supports integration with other business tools and services.
Differences:
Dynamics 365 is a comprehensive suite of business applications with extensive features and capabilities, often requiring significant customization and investment.
Our project aims to provide a more focused solution with a streamlined feature set tailored specifically to internal sales and inventory management, reducing complexity and cost.


Reimplementation of Existing Solutions:
---------------------------------------
We have considered reimplementing features from existing solutions like Odoo ERP and Salesforce Sales Cloud. However, our decision to develop a custom solution is based on the following factors:
Specificity: Our project addresses unique internal requirements that may not be fully met by off-the-shelf solutions. For example, the specific notification system for low stock levels and the integration of daily stock updates from the production department.
Cost and Complexity: Existing solutions like Dynamics 365 and Salesforce can be costly and complex to implement for our specific needs. Developing a custom solution allows us to focus on essential features without the overhead of a comprehensive ERP system.
Customization: By building our software, we can tailor the functionality precisely to our company’s processes and integrate seamlessly with our existing workflows.

APIs and Methods
-----------------
1. API Routes for Web Client Communication:
a. /api/products
GET: Returns a list of all products, including product ID, name, and current stock levels.
POST: Adds a new product to the inventory with details like product ID, name, and initial stock quantity.
PUT: Updates the details of an existing product, such as name and stock quantity.
DELETE: Removes a product from the inventory based on its product ID.
b. /api/sales
GET: Retrieves a list of all sales transactions, including date, product ID, quantity sold, and payment type (cash or credit).
POST: Records a new sales transaction, including product ID, quantity sold, payment type, and date.
GET /daily-sales: Returns total sales for the current day, categorized by cash and credit.
GET /monthly-sales: Returns total sales for the current month, categorized by cash and credit.
c. /api/stock
GET: Returns current stock levels for all products, including alerts for products with stock levels below a predefined threshold (e.g., 100 units).
POST: Records incoming stock from the production department, updating the stock levels for the specified product.
GET /low-stock-alerts: Provides a list of products with stock levels below the threshold.
d. /api/reports
GET: Generates a stock review report including current stock levels and sales data for the specified month.
POST: Requests a custom report based on specified parameters, such as date range and product categories.

2. API Endpoints for External Clients:
-------------------------------------
a. class SalesAPI
Method: get_product_info(product_id)
Description: Retrieves detailed information about a specific product by its product ID.
Parameters: product_id – The unique identifier for the product.
Returns: Product details including name, current stock level, and sales history.
Method: record_sale(product_id, quantity, payment_type, date)
Description: Records a new sale, updating the sales data and stock levels.
Parameters:
product_id – The unique identifier for the product.
quantity – The amount sold.
payment_type – The type of payment (cash or credit).
date – The date of the sale.
Returns: Confirmation of the sale record and updated stock levels.
Method: get_stock_alerts()
Description: Retrieves alerts for products with stock levels below the predefined threshold.
Returns: List of products with low stock levels and associated alert details.

3. 3rd Party APIs Used:
------------------------
a. SendGrid API
POST /mail/send: Sends email notifications, such as low stock alerts, to the sales and production teams.
GET /mail/send: Retrieves the status of sent emails.
b. Stripe API
POST /v1/charges: Processes payments for sales transactions.
GET /v1/charges/{CHARGE_ID}: Retrieves details of a specific payment transaction.

c. Twilio API
POST /2010-04-01/Accounts/{AccountSid}/Messages.json: Sends SMS notifications for stock alerts or system updates.
GET /2010-04-01/Accounts/{AccountSid}/Messages/{MessageSid}.json: Retrieves the status of sent SMS messages.

