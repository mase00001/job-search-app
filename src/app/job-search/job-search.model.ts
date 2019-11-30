export class JobSearch {
    constructor(public keywords: string, 
                public location: string, 
                public radius: number, 
                public page: number) { }
}