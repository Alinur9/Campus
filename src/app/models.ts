
export interface User{
    name: string
    department:string
    password: string
    email: string
  
}

export interface RegResponse{
    msg: string
}

export interface LoginResponse {
    msg: string
}

export interface Post{
    text: string 
    email: string 
    name: string 
    likes: number
    id: string
    status: string
}

export interface Like {
    likes : number
    email: string
    id: string
}

export interface PostResponse{
    msg : string
}