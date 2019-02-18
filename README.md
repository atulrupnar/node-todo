# Online TODO List

Online TODO list is a web application to organise, manage and track your day-to-day tasks. The application stores users tasks on a server until deleted by user.

## About TODO List :
TODO List application allows users to create, complete, delete and view tasks. The web application stores tasks on a server database. To access Application, User first needs to register and verify their email. Once registration is done, user can login and access the dashboard.

The dashboard has following features :
- **Add Task :** User can add any number of tasks, Task description has a limit of 50 characters. By default task is active (not completed) when created by user.
- **Mark Task as Completed :** Marks task as a Completed task. This is can be done by checking a checkbox in front of task. An application notes timestamp of task completed.
- **Delete Task :** A task can be deleted by clicking on cross button on the right side of task. User can delete either active task or completed task.
- **View Tasks :** This functionlity shows a list of tasks created by user. user can filter available tasks by task status

  *Active :* lists all active tasks, By default dashboard shows active tasks\
	*Completed :* lists all completed tasks\
	*All :* lists all tasks

## Demo

Visit site : http://ec2-3-16-125-88.us-east-2.compute.amazonaws.com:7001/

To start, 
  1. Create an account.
  2. Verify Email
  3. Login and explore

Here are test user account credentials to get started with :
  1. **User :** atulrupnar@gmail.com **Password :** 123
  2. **User :** tech.atul1989@gmail.com **Password :** 123

## API Doc reference

## Technical Specifications
- **Server side Framework  :** Node, Express
- **Client side Frameworks :** Angular
- **Database :** MongoDB
- **Testing :** Chai, Mocha, Supertest
- **Containerization :** Docker, Docker-compose
- **Authentication :** Passport
- **Sessions :** Express Sessions
- **Logging :** Morgan(request logging), Winston(app logs)
- **Validation :** Custom configurable module
- **Unique Id :** UUID
-  **Hashing :** SHA256
- **Process Management :** PM2 (Used on AWS Deployment)

## Installation

### Prerequisite
- **Tools:** Git, Docker, Docker Compose
- **Network Ports :** Following network ports need to be open for the application to communicate

| Application |Port | Type |
| --- | --- | --- |
| TODO App | 7001 | TCP |
| MongoDB | 27017 | TCP |

### Method 1 : Using Docker

1. Clone Repository

		git clone https://github.com/atulrupnar/node-todo.git

2. create .env file
	Copy example.env file and name it as .env
	Edit Email Configuratoins
	
3. Run following docker commands on your terminal

		docker-compose build
		docker-compose up

4. visit http://localhost:7001 on your favourite browser

### Method 2 : Build from source

#### Prerequisite :  
    You will need to install following softwares on your system. 
    node 8.4.11, npm, bower, mocha, mongoDB

1. Clone Repository

		git clone https://github.com/atulrupnar/node-todo.git

2. create .env file
	Copy example.env file and name it as .env
	Edit Email Configuratoins
	
3. Install node packages
	
		npm install
4. Install Angular Packages (Navigate to /public directory)
	
		bower install
5. Run test cases (Navigate to root directory)

	npm run test

6. Start the Application

		npm start
7. visit http://localhost:7001 on your favourite browser
