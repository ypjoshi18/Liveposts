export class Post{
    constructor(public title: string , 
        public desc: string,
        public imagePath: string,
        public postAddedBy: string,
        public postDateTime: Date
        ){}

}