let posts = [];

class Post {
    constructor(_title, _date, _desc, _content) {
        this.title = _title;
        this.date = _date;
        this.description = _desc;
        this.content = _content;
    }
};

posts.push(new Post("Title Post 1", "Jan 2, 2021", "This is a test post.", "post1"));
posts.push(new Post("Title Post 2", "Jan 2, 2021", "This is a test post.", "post2"));
posts.push(new Post("Title Post 3", "Jan 2, 2021", "This is a test post.", "post3"));
posts.push(new Post("Title Post 4", "Jan 2, 2021", "This is a test post.", "post4"));
posts.push(new Post("Title Post 5", "Jan 2, 2021", "This is a test post.", "post5"));
posts.push(new Post("Title Post 6", "Jan 2, 2021", "This is a test post.", "post6"));
posts.push(new Post("Title Post 7", "Jan 2, 2021", "This is a test post.", "post7"));
posts.push(new Post("Title Post 8", "Jan 2, 2021", "This is a test post.", "post8"));
posts.push(new Post("Title Post 9", "Jan 2, 2021", "This is a test post.", "post9"));