const express = require('express');

const server = express();
server.use(express.json());

const projects = [];


//Middleware
server.use((req, res, next)=>{
    console.count('Number of requests');
    return next();
});

//Check if the project exists
function checkProjectExists(req, res, next) {

    const { id } = req.params;
    const project = projects.find(p => p.id == id);

    if (!project) {
        return res.status(400).json({error: 'Project not found!'});
    }

    return next();
}

//List projects
server.get('/projects', (req, res) => {
    return res.json(projects);
});

//Create project
server.post('/projects', (req, res) => {
    const { id, title } = req.body;
    
    projects.push({
        id,
        title,
        tasks: []
    });

    return res.json(projects);
});

//Update project
server.put('/projects/:id', checkProjectExists, (req, res) => {
    const { id } = req.params;
    const { title } = req.body;
    const project = projects.find(p => p.id == id);

    project.title = title;
  
    return res.json(project);
});

//Delete project
server.delete('/projects/:id', checkProjectExists, (req, res) => {
    const { id } = req.params;
    const project = projects.findIndex(p => p.id == id);

    projects.splice(project, 1);
  
    return res.send();
});

//Create task
server.post('/projects/:id/tasks', checkProjectExists,  (req, res) => {
    const { id } = req.params;
    const { title } = req.body;    
    const project = projects.find(p => p.id == id);

    project.tasks.push(title);

    return res.json(projects);
});

server.listen(3000);