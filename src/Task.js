export default class Task {
    constructor(title, deadline, priority, description, taskid) {
        this.title = title;
        this.deadline = deadline;
        this.priority = priority;
        this.status = 'do';
        this.description = description;
        this.taskid = taskid;
    }
}